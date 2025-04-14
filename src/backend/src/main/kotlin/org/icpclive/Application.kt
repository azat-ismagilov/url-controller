package org.icpclive

import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.http.content.*
import io.ktor.server.plugins.autohead.*
import io.ktor.server.plugins.callloging.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.plugins.defaultheaders.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.util.*
import io.ktor.server.websocket.*
import io.ktor.util.*
import org.icpclive.admin.configureAdminRouting
import org.icpclive.overlay.configureOverlayRouting
import org.icpclive.utils.defaultJsonSettings
import org.slf4j.event.Level
import java.io.File
import java.time.Duration

fun main(args: Array<String>): Unit =
    io.ktor.server.netty.EngineMain.main(args)

private fun Application.setupKtorPlugins() {
    install(DefaultHeaders)
    install(CallLogging) {
        level = Level.INFO
        filter { call -> call.request.path().startsWith("/") }
    }
    install(StatusPages) {
        exception<Throwable> { call, ex ->
            call.application.environment.log.error("Query ${call.url()} failed with exception", ex)
            throw ex
        }
    }
    install(AutoHeadResponse)
    install(IgnoreTrailingSlash)
    install(ContentNegotiation) {
        json(defaultJsonSettings())
    }
    install(WebSockets) {
        pingPeriod = Duration.ofSeconds(15)
        timeout = Duration.ofSeconds(15)
        maxFrameSize = Long.MAX_VALUE
        masking = false
    }
    install(Authentication) {
        if (config.authEnabled) {
            basic("admin-auth") {
                realm = "Access to the '/api/admin' path"
                validate { credentials ->
                    if (credentials.name == config.authUsername && credentials.password == config.authPassword) {
                        UserIdPrincipal(credentials.name)
                    } else {
                        null
                    }
                }
            }
        }
    }
    install(CORS) {
        allowHeader(HttpHeaders.Authorization)
        allowHeader(HttpHeaders.ContentType)
        allowHeader("*")
        allowMethod(HttpMethod.Put)
        allowMethod(HttpMethod.Delete)
        allowSameOrigin = true
        anyHost()
    }
}

private const val pathParameterName = "static-content-path-parameter"

@Suppress("unused") // application.yaml references the main function. This annotation prevents the IDE from marking it as unused.
fun Application.module() {
    config = Config(environment)
    setupKtorPlugins()

    routing {
        staticResources("/", "overlay")
        route("/media") {
            val dir = File("media")
            get("{${pathParameterName}...}") {
                val relativePath =
                    call.parameters.getAll(pathParameterName)?.joinToString(File.separator) ?: return@get
                val file = dir.combineSafe(relativePath)
                if (file.isDirectory) {
                    call.respond(file.listFiles()?.map { "/${file.path}/${it.name}" } ?: emptyList())
                }
                if (file.isFile) {
                    call.respondFile(file)
                }
                call.respond(HttpStatusCode.NotFound)
            }
        }
        singlePageApplication {
            useResources = true
            applicationRoute = "admin"
            react("admin")
        }
        route("/api") {
            route("/overlay") { configureOverlayRouting() }
            if (config.authEnabled) {
                authenticate("admin-auth") {
                    route("/admin") { configureAdminRouting() }
                }
            } else {
                route("/admin") { configureAdminRouting() }
            }
        }
    }
}
