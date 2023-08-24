package org.icpclive.admin

import kotlinx.serialization.Serializable
import org.icpclive.utils.generateUUID

@Serializable
data class ClientPreset(
    override val id: String = generateUUID(),
    override val name: String,
    val clientIds: List<String>
) : Preset()