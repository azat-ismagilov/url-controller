package org.icpclive.admin

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.configurePresetsRouting() {
    val presetStorage = mutableListOf<Preset>()
    get {
        call.respond(presetStorage)
    }
    get("{id?}") {
        val id = call.parameters["id"] ?: return@get call.respondText(
            "Missing id",
            status = HttpStatusCode.BadRequest
        )
        val preset = presetStorage.find { it.id == id } ?: return@get call.respondText(
            "No preset with id $id",
            status = HttpStatusCode.NotFound
        )
        call.respond(preset)
    }
    post {
        val preset = call.receive<Preset>()
        presetStorage.add(preset)
        call.respond(HttpStatusCode.Created)
    }
    put("{id?}") {
        val id = call.parameters["id"] ?: return@put call.respondText(
            "Missing id",
            status = HttpStatusCode.BadRequest
        )
        val preset = call.receive<Preset>()
        val index = presetStorage.indexOfFirst { it.id == id }
        if (index == -1) {
            presetStorage.add(preset)
        } else {
            presetStorage[index] = preset
        }
        call.respond(HttpStatusCode.OK)
    }
    delete("{id?}") {
        val id = call.parameters["id"] ?: return@delete call.respondText(
            "Missing id",
            status = HttpStatusCode.BadRequest
        )
        val index = presetStorage.indexOfFirst { it.id == id }
        if (index == -1) {
            return@delete call.respondText(
                "No preset with id $id",
                status = HttpStatusCode.NotFound
            )
        }
        presetStorage.removeAt(index)
        call.respond(HttpStatusCode.OK)
    }
}