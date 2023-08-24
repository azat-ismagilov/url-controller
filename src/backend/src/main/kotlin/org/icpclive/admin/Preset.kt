package org.icpclive.admin

import kotlinx.serialization.Serializable

@Serializable
sealed class Preset {
    abstract val id: String
    abstract val name: String
}