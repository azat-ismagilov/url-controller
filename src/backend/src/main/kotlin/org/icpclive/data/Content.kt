package org.icpclive.data

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
@SerialName("Substitution")
data class Substitution(val from: String, val to: String)

@Serializable
@SerialName("Content")
sealed class Content

@Serializable
@SerialName("SimpleContent")
sealed class SimpleContent : Content()

@Serializable
@SerialName("IFrame")
data class IFrame(val url: String, val durationSeconds: Int? = null, val preloadBannerTimeSeconds: Int? = null) :
    SimpleContent()

@Serializable
@SerialName("Image")
data class Image(val url: String, val durationSeconds: Int? = null) : SimpleContent()

@Serializable
@SerialName("ImageFolder")
data class ImageFolder(val url: String, val durationSeconds: Int? = null) : SimpleContent()

@Serializable
@SerialName("Video")
data class Video(val url: String) : SimpleContent()

@Serializable
@SerialName("VideoFolder")
data class VideoFolder(val url: String) : SimpleContent()

@Serializable
@SerialName("Text")
data class Text(val text: String, val durationSeconds: Int? = null) : SimpleContent()

@Serializable
@SerialName("SmartSVG")
data class SmartSVG(val url: String, val substitutions: List<Substitution>, val durationSeconds: Int? = null) :
    SimpleContent()

@Serializable
@SerialName("Sequence")
data class Sequence(val sequence: List<SimpleContent>) : Content()
