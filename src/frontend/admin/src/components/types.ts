export type ClientParams = {
    group: string;
    name: string;
    id: string;
};

export type ClientGroup = {
    name: string;
    clients: ClientParams[];
};

export type PresetType = {
    id: string;
    name: string;
    clientIds: string[];
};
