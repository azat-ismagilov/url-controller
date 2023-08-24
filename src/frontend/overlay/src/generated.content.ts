export type Content =
  | Content.IFrame
  | Content.Image
  | Content.ImageFolder
  | Content.Sequence
  | Content.SmartSVG
  | Content.Text
  | Content.Video
  | Content.VideoFolder;

export namespace Content {
  export enum Type {
    Sequence = "Sequence",
    IFrame = "IFrame",
    Image = "Image",
    ImageFolder = "ImageFolder",
    SmartSVG = "SmartSVG",
    Text = "Text",
    Video = "Video",
    VideoFolder = "VideoFolder",
  }
  
  export interface Sequence {
    type: Content.Type.Sequence;
    sequence: SimpleContent[];
  }
  
  export interface IFrame {
    type: Content.Type.IFrame;
    url: string;
    durationSeconds?: number | null;
  }
  
  export interface Image {
    type: Content.Type.Image;
    url: string;
    durationSeconds?: number | null;
  }
  
  export interface ImageFolder {
    type: Content.Type.ImageFolder;
    url: string;
    durationSeconds?: number | null;
  }
  
  export interface SmartSVG {
    type: Content.Type.SmartSVG;
    url: string;
    substitutions: Substitution[];
    durationSeconds?: number | null;
  }
  
  export interface Text {
    type: Content.Type.Text;
    text: string;
    durationSeconds?: number | null;
  }
  
  export interface Video {
    type: Content.Type.Video;
    url: string;
  }
  
  export interface VideoFolder {
    type: Content.Type.VideoFolder;
    url: string;
  }
}

export type SimpleContent =
  | SimpleContent.IFrame
  | SimpleContent.Image
  | SimpleContent.ImageFolder
  | SimpleContent.SmartSVG
  | SimpleContent.Text
  | SimpleContent.Video
  | SimpleContent.VideoFolder;

export namespace SimpleContent {
  export enum Type {
    IFrame = "IFrame",
    Image = "Image",
    ImageFolder = "ImageFolder",
    SmartSVG = "SmartSVG",
    Text = "Text",
    Video = "Video",
    VideoFolder = "VideoFolder",
  }
  
  export interface IFrame {
    type: SimpleContent.Type.IFrame;
    url: string;
    durationSeconds?: number | null;
  }
  
  export interface Image {
    type: SimpleContent.Type.Image;
    url: string;
    durationSeconds?: number | null;
  }
  
  export interface ImageFolder {
    type: SimpleContent.Type.ImageFolder;
    url: string;
    durationSeconds?: number | null;
  }
  
  export interface SmartSVG {
    type: SimpleContent.Type.SmartSVG;
    url: string;
    substitutions: Substitution[];
    durationSeconds?: number | null;
  }
  
  export interface Text {
    type: SimpleContent.Type.Text;
    text: string;
    durationSeconds?: number | null;
  }
  
  export interface Video {
    type: SimpleContent.Type.Video;
    url: string;
  }
  
  export interface VideoFolder {
    type: SimpleContent.Type.VideoFolder;
    url: string;
  }
}

export interface Substitution {
  from: string;
  to: string;
}
