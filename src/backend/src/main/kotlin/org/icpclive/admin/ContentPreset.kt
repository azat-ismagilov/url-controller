package org.icpclive.admin

import kotlinx.serialization.Serializable
import org.icpclive.data.Content
import org.icpclive.utils.generateUUID

@Serializable
data class ContentPreset(
    override val id: String = generateUUID(),
    override val name: String,
    val content: Content
) : Preset()