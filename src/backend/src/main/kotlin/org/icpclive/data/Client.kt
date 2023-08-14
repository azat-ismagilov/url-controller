package org.icpclive.data

import kotlinx.serialization.Serializable

@Serializable
data class Client(val group: String, val name: String, val id: String = "$group/$name")