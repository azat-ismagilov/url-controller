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

include(":frontend", ":backend", ":schema-generator")
project(":frontend").projectDir = file("src/frontend")
project(":backend").projectDir = file("src/backend")
project(":schema-generator").projectDir = file("src/schema-generator")