package org.icpclive.admin

import kotlinx.serialization.Serializable

@Serializable
data class SendParams(val clientIds: List<String>, val url: String)