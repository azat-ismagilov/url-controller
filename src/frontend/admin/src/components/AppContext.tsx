import { createContext, useContext, useState } from "react";
import useWebSocket from "react-use-websocket";

import { BASE_URL_WS, WEBSOCKET_CONFIG } from "../config";

import { ClientParams } from "./Clients/types";

type AppContextType = {
  clients: ClientParams[];
  selectedClientsIds: string[];
  isSelectedClientId: (id: string) => boolean;
  setClientIdSelection: (id: string, value: boolean) => void;
  setMultipleClientIdSelections: (ids: string[], value: boolean) => void;
  selectedContentId: string | null;
  setSelectedContentId: (id: string | null) => void;
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
    const clients = useWebSocket<ClientParams[] | null>(BASE_URL_WS + "/api/admin/clients", WEBSOCKET_CONFIG).lastJsonMessage || [];
    const [selectedClientsIds, setSelectedClientsIds] = useState<string[]>([]);
    const [selectedContentId, setSelectedContentId] = useState<string | null>(null);

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
        selectedClientsIds,
        isSelectedClientId,
        setClientIdSelection,
        setMultipleClientIdSelections,
        selectedContentId,
        setSelectedContentId,
    };

    return (
        <AppContext.Provider value={appContextValue}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContextProvider, useAppContext };
