package org.icpclive.admin

import kotlinx.serialization.Serializable
import org.icpclive.data.Content

@Serializable
data class SendParams(val clientIds: List<String>, val content: Content)