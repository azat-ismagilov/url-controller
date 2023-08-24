package org.icpclive.generator.typescript

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.parameters.arguments.argument
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.options.required
import dev.adamko.kxstsgen.KxsTsGenerator
import kotlinx.serialization.serializer
import java.io.File

class GenCommand : CliktCommand() {
    private val className by argument(help = "Class name for which schema should be generated")
    private val output by option("--output", "-o", help = "File to print output").required()

    override fun run() {
        val tsGenerator = KxsTsGenerator()
        val thing = serializer(Class.forName(className))
        File(output).printWriter().use {
            it.println(tsGenerator.generate(thing))
        }
    }
}

fun main(args: Array<String>) {
    GenCommand().main(args)
}