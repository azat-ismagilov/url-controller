package org.icpclive.admin

import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*
import kotlinx.coroutines.async
import kotlinx.serialization.encodeToString
import org.icpclive.data.ConnectionManager
import org.icpclive.utils.defaultJsonSettings
import kotlin.io.path.Path

fun Route.configureAdminRouting() {
    route("/client-presets") {
        configurePresetsRouting<ClientPreset>(Path("./client-presets.json"))
    }

    route("/content-presets") {
        configurePresetsRouting<ContentPreset>(Path("./content-presets.json"))
    }

    post("/send") {
        val parameters = call.receive<SendParams>()
        for (id in parameters.clientIds) {
            ConnectionManager.setContent(id, parameters.content)
        }
        return@post call.respondText("OK")
    }

    webSocket("/clients") {
        val sender = async {
            ConnectionManager.clientsFlow.collect {
                send(defaultJsonSettings().encodeToString(it))
            }
        }
        try {
            for (ignored in incoming) {
                ignored.let {}
            }
        } finally {
            sender.cancel()
        }
    }
}