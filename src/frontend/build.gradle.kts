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
    }
    named<NpmTask>("npm_run_buildAdmin") {
        environment.set(mapOf("PUBLIC_URL" to "/overlay", "BUILD_PATH" to "build"))
        inputs.dir("admin/src")
        inputs.dir("admin/public")
        inputs.file("admin/index.html")
        inputs.file("admin/package.json")
        outputs.dir("admin/build")
    }
    task("buildOverlay") {
        outputs.dir("overlay")
    }
}
