package org.icpclive.data

import kotlinx.serialization.Serializable
import org.icpclive.admin.ContentPreset

@Serializable
data class ClientWithContent(val client: Client, val content: Content?)