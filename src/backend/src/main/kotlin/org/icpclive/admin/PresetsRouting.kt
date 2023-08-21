package org.icpclive.admin

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.decodeFromStream
import kotlinx.serialization.json.encodeToStream
import java.nio.file.Path
import org.icpclive.utils.prettyJsonSettings
import java.nio.file.Files
import java.util.Collections

inline fun <reified PresetType : Preset> Route.configurePresetsRouting(presetsPath: Path) {
    val presetStorage = Collections.synchronizedList(presetsFromJson<PresetType>(presetsPath).toMutableList())

    get {
        call.respond(presetStorage)
    }
    get("{id?}") {
        val id = call.parameters["id"] ?: return@get call.respondText(
            "Missing id",
            status = HttpStatusCode.BadRequest
        )
        val index = presetStorage.indexOfFirst { it.id == id }
        if (index == -1) {
            return@get call.respondText(
                "No preset with id $id",
                status = HttpStatusCode.NotFound
            )
        }
        call.respond(presetStorage[index])
    }
    post {
        val preset = call.receive<PresetType>()
        presetStorage.add(preset)
        presetsToJson(presetsPath, presetStorage)
        call.respond(HttpStatusCode.Created)
    }
    put("{id?}") {
        val id = call.parameters["id"] ?: return@put call.respondText(
            "Missing id",
            status = HttpStatusCode.BadRequest
        )
        val index = presetStorage.indexOfFirst { it.id == id }
        if (index == -1) {
            return@put call.respondText(
                "No preset with id $id",
                status = HttpStatusCode.NotFound
            )
        }
        val preset = call.receive<PresetType>()
        presetStorage[index] = preset
        presetsToJson(presetsPath, presetStorage)
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
        presetsToJson(presetsPath, presetStorage)
        call.respond(HttpStatusCode.OK)
    }
}

inline fun <reified PresetType : Preset> presetsFromJson(presetsPath: Path): List<PresetType> =
    presetsPath.toFile().takeIf { it.exists() }?.inputStream()?.use {
        prettyJsonSettings().decodeFromStream(it)
    } ?: emptyList()

suspend inline fun <reified PresetType : Preset> presetsToJson(presetsPath: Path, presetStorage: List<PresetType>): Unit = withContext(Dispatchers.IO) {
    val tempFile = Files.createTempFile(presetsPath.parent, null, null)
    tempFile.toFile().outputStream().use { file ->
        prettyJsonSettings().encodeToStream(presetStorage, file)
    }
    Files.deleteIfExists(presetsPath)
    Files.move(tempFile, presetsPath)
}
