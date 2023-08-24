package org.icpclive.data

import io.ktor.websocket.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.serialization.encodeToString
import org.icpclive.utils.defaultJsonSettings
import java.util.*

object ConnectionManager {
    private val connections = Collections.synchronizedSet(mutableSetOf<Connection>())
    private val contentByConnection = Collections.synchronizedMap(mutableMapOf<String, Content?>())


    private val clients: List<ClientWithContent>
        get() = connections.map { it.config }.distinct().map { ClientWithContent(it, getContent(it.id)) }

    private val _clientsFlow = MutableStateFlow(clients)
    val clientsFlow = _clientsFlow.asStateFlow()

    suspend operator fun plusAssign(connection: Connection) {
        connections += connection
        getContent(connection.config.id)?.let { content ->
            sendContent(connection, content)
        }
        _clientsFlow.value = clients
    }

    operator fun minusAssign(connection: Connection) {
        connections -= connection
        _clientsFlow.value = clients
    }

    private suspend fun sendContent(connection: Connection, content: Content?) {
        connection.session.send(defaultJsonSettings().encodeToString(content))
    }

    private fun filteredConnections(clientId: String) = connections.filter { it.config.id == clientId }

    suspend fun setContent(clientId: String, content: Content?) {
        if (content === getContent(clientId)) {
            return
        }
        val filteredConnections = filteredConnections(clientId)
        if (filteredConnections.isEmpty()) {
            return
        }
        contentByConnection[clientId] = content
        for (connection in filteredConnections) {
            sendContent(connection, content)
        }
        _clientsFlow.value = clients
    }

    private fun getContent(clientId: String): Content? {
        return contentByConnection[clientId]
    }
}
