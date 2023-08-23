import { createContext, useContext, useState } from "react";
import useWebSocket from "react-use-websocket";

import { BASE_URL_WS, WEBSOCKET_CONFIG } from "../config";

import { ClientParams,ClientWithContent } from "./Clients/types";
import { ContentPresetType } from "./Contents/types";

type AppContextType = {
    clients: ClientParams[];
    clientsWithContent: ClientWithContent[];
    contentPresets: ContentPresetType[];
    setContentPresets: (presets: ContentPresetType[]) => void;
    selectedClientsIds: string[];
    isSelectedClientId: (id: string) => boolean;
    setClientIdSelection: (id: string, value: boolean) => void;
    setMultipleClientIdSelections: (ids: string[], value: boolean) => void;
    selectedContentPreset: ContentPresetType | null;
    setSelectedContentPreset: (id: ContentPresetType | null) => void;
};

const AppContext = createContext<AppContextType | null>(null);

const useAppContext = () => {
    const currentAppContext = useContext(AppContext);

    if (!currentAppContext) {
        throw new Error(
            "useAppContext must be used within a AppContextProvider"
        );
    }

    return currentAppContext;
};

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const clientsWithContent = useWebSocket<ClientWithContent[] | null>(BASE_URL_WS + "/api/admin/clients", WEBSOCKET_CONFIG).lastJsonMessage || [];
    const clients = clientsWithContent.map((clientWithContent) => clientWithContent.client);

    const [contentPresets, setContentPresets] = useState<ContentPresetType[]>([]);

    const [selectedClientsIds, setSelectedClientsIds] = useState<string[]>([]);
    const [selectedContentPreset, setSelectedContentPreset] = useState<ContentPresetType | null>(null);

    const isSelectedClientId = (id: string) => selectedClientsIds.includes(id);
  
    const setClientIdSelection = (id: string, value: boolean) => {
        if (value) {
            setSelectedClientsIds([...selectedClientsIds, id]);
        } else {
            setSelectedClientsIds(selectedClientsIds.filter((clientId) => clientId !== id));
        }
    };

    const setMultipleClientIdSelections = (ids: string[], value: boolean) => {
        if (value) {
            setSelectedClientsIds([...selectedClientsIds, ...ids]);
        } else {
            setSelectedClientsIds(selectedClientsIds.filter((clientId) => !ids.includes(clientId)));
        }
    };

    const appContextValue = {
        clients,
        clientsWithContent,
        contentPresets,
        setContentPresets,
        selectedClientsIds,
        isSelectedClientId,
        setClientIdSelection,
        setMultipleClientIdSelections,
        selectedContentPreset,
        setSelectedContentPreset,
    };

    return (
        <AppContext.Provider value={appContextValue}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContextProvider, useAppContext };
