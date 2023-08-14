rootProject.name = "url-controller"

dependencyResolutionManagement {
    repositories {
        mavenCentral()
    }
    versionCatalogs {
        create("libs") {}
    }
}

enableFeaturePreview("TYPESAFE_PROJECT_ACCESSORS")

include(":frontend", ":backend")
project(":frontend").projectDir = file("src/frontend")
project(":backend").projectDir = file("src/backend")
