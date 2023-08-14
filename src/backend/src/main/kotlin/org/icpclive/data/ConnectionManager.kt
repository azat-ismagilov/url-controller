package org.icpclive.data

import io.ktor.websocket.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import java.util.*

object ConnectionManager {
    private val connections = Collections.synchronizedSet(mutableSetOf<Connection>())
    private val urlByConnection = Collections.synchronizedMap(mutableMapOf<String, String>())


    private val clients: List<Client>
        get() = connections.map { it.config }.distinct()

    private val _clientsFlow = MutableStateFlow(clients)
    val clientsFlow = _clientsFlow.asStateFlow()

    suspend operator fun plusAssign(connection: Connection) {
        connections += connection
        getUrl(connection.config.id)?.let { url ->
            connection.session.send(url)
        }
        _clientsFlow.value = clients
    }

    operator fun minusAssign(connection: Connection) {
        connections -= connection
        _clientsFlow.value = clients
    }

    fun filteredConnections(id: String) = connections.filter { it.config.id == id }

    suspend fun setUrl(id: String, url: String) {
        if (url === getUrl(id)) {
            return
        }
        val filteredConnections = filteredConnections(id)
        if (filteredConnections.isEmpty()) {
            return
        }
        urlByConnection[id] = url
        for (connection in filteredConnections) {
            connection.session.send(url)
        }
    }

    fun getUrl(id: String): String? {
        return urlByConnection[id]
    }
}
