import { ContentPresetType } from "../Contents/types";

export type ClientParams = {
    group: string;
    name: string;
    id: string;
};

export type ClientWithContent = {
    client: ClientParams;
    content: object;
};

export type ClientWithContentPreset = {
    client: ClientParams;
    contentPreset: ContentPresetType;
};

export type ClientPresetType = {
    id: string;
    name: string;
    clientIds: string[];
};
