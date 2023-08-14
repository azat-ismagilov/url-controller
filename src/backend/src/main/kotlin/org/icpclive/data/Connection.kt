package org.icpclive.data

import io.ktor.websocket.*

data class Connection(val session: DefaultWebSocketSession, val config: Client)