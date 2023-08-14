package org.icpclive.overlay

import io.ktor.http.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import org.icpclive.data.Connection
import org.icpclive.data.Client
import org.icpclive.data.ConnectionManager

fun Route.configureOverlayRouting() {
    webSocket {
        val parameters = call.parameters
        val group = parameters["group"] ?: return@webSocket call.respondText(
            "Missing group",
            status = HttpStatusCode.BadRequest
        )
        val name = parameters["name"] ?: return@webSocket call.respondText(
            "Missing name",
            status = HttpStatusCode.BadRequest
        )
        val connectionConfig = Client(group, name)
        val currentConnection = Connection(this, connectionConfig)


        ConnectionManager += currentConnection
        try {
            for (ignored in incoming) {
                ignored.let {}
            }
        } finally {
            ConnectionManager -= currentConnection
        }
    }
}