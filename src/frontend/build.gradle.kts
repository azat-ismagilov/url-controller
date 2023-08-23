import com.github.gradle.node.npm.task.NpmTask

plugins {
    alias(libs.plugins.node)
}

node {
    version.set("16.14.0")
    npmInstallCommand.set("ci")
    download.set(rootProject.findProperty("npm.download") == "true")
    fastNpmInstall.set(true)
}

tasks {
    npmInstall {
        inputs.file("admin/package.json")
        inputs.file("overlay/package.json")
    }
    named<NpmTask>("npm_run_buildAdmin") {
        environment.set(mapOf("PUBLIC_URL" to "/admin", "BUILD_PATH" to "build"))
        inputs.dir("admin/src")
        inputs.dir("admin/public")
        inputs.file("admin/index.html")
        inputs.file("admin/package.json")
        outputs.dir("admin/build")
    }
    named<NpmTask>("npm_run_buildOverlay") {
        environment.set(mapOf("PUBLIC_URL" to "/", "BUILD_PATH" to "build"))
        inputs.dir("overlay/src")
        inputs.file("overlay/index.html")
        inputs.file("overlay/package.json")
        outputs.dir("overlay/build")
    }
}
