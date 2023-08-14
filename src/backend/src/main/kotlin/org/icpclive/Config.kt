package org.icpclive

import io.ktor.server.application.*
import io.ktor.server.config.*
import java.nio.file.Path

class Config(environment: ApplicationEnvironment) {
    private fun ApplicationConfig.stringOrNull(name: String) = propertyOrNull(name)?.getString()
    private fun ApplicationConfig.string(name: String) = property(name).getString()
    private fun ApplicationConfig.bool(name: String) = stringOrNull(name) == "true"
    val authDisabled = environment.config.bool("auth.disabled")
}

lateinit var config: Config
