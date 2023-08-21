import org.gradle.configurationcache.extensions.capitalized

plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.kotlin.serialization)
}


repositories {
    mavenCentral()
}

fun TaskContainerScope.genTask(classPackage: String, className: String, directory: String, fileName: String, title: String) =
    register<JavaExec>("gen${className.capitalized()}") {
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


tasks {
    val genTasks = listOf(
        genTask("org.icpclive.data", "Content", "src/frontend/admin/public", "content", "Content"),
    )
    register("gen") {
        dependsOn(genTasks)
    }
}


dependencies {
    implementation(libs.kotlinx.serialization.json)
    implementation(projects.backend)
    implementation(libs.cli)
    kotlin("reflect")
    testImplementation(libs.kotlin.junit)
}
