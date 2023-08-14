package org.icpclive.admin

import kotlinx.serialization.Serializable
import org.icpclive.utils.generateUUID

@Serializable
data class Preset (val id: String = generateUUID(), val name: String, val clientIds: List<String>)