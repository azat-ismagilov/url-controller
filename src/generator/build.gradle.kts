import org.gradle.configurationcache.extensions.capitalized

plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.kotlin.serialization)
}


repositories {
    mavenCentral()
}

fun TaskContainerScope.genSchemaTask(classPackage: String, className: String, directory: String, fileName: String, title: String) =
    register<JavaExec>("genSchema${className.capitalized()}") {
        dependsOn(build)
        classpath = sourceSets.main.get().runtimeClasspath
        mainClass = "org.icpclive.generator.schema.GenKt"
        workingDir = rootProject.rootDir
        val file = workingDir.resolve(directory).resolve("$fileName.schema.json")
        outputs.file(file)
        args = listOf(
            "$classPackage.$className",
            "--output", file.relativeTo(workingDir).path,
            "--title", title
        )
    }

fun TaskContainerScope.genTypescriptTask(classPackage: String, className: String, directory: String, fileName: String) =
    register<JavaExec>("genTypescript${className.capitalized()}") {
        dependsOn(build)
        classpath = sourceSets.main.get().runtimeClasspath
        mainClass = "org.icpclive.generator.typescript.GenKt"
        workingDir = rootProject.rootDir
        val file = workingDir.resolve(directory).resolve("$fileName.ts")
        outputs.file(file)
        args = listOf(
            "$classPackage.$className",
            "--output", file.relativeTo(workingDir).path,
        )
    }

tasks {
    val genTasks = listOf(
        genSchemaTask("org.icpclive.data", "Content", "src/frontend/admin/public", "content", "Content"),
        genTypescriptTask("org.icpclive.data", "Content", "src/frontend/overlay/public", "content"),
    )
    register("gen") {
        dependsOn(genTasks)
    }
}


dependencies {
    implementation(libs.kotlinx.serialization.json)
    implementation(libs.kxs.ts.gen.core)
    implementation(projects.backend)
    implementation(libs.cli)
    kotlin("reflect")
    testImplementation(libs.kotlin.junit)
}
