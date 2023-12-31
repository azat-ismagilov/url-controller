import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Stack } from "@mui/material";
import axios from "axios";

import { BASE_URL_BACKEND } from "../../config";
import logger from "../../logger";

import ClientPreset from "./ClientPreset";
import { ClientPresetType } from "./types";

const ClientPresets = () => {
    const PRESETS_URL = BASE_URL_BACKEND + "/api/admin/client-presets";

    const DEFAULT_PRESET = {
        name: "Preset",
        clientIds: [],
    };

    const [presets, setPresets] = useState<ClientPresetType[]>([]);

    function updatePresets() {
        axios.get(PRESETS_URL)
            .then((response) => {
                setPresets(response.data);
            }).catch((error) => {
                logger.error(error, "Error loading presets");
            });
    }

    useEffect(() => {
        // Get presets from server
        updatePresets();
    }, []);

    function addNewPreset() {
        // Add new preset
        axios.post(PRESETS_URL, DEFAULT_PRESET).then((response) => {
            logger.success(response, "New preset added");
        }).catch((error) => {
            logger.error(error, "Error adding new preset");
        });

        // Wait for server to update
        setTimeout(() => updatePresets(), 200);
    }

    function changePreset(id: string, preset: ClientPresetType) {
        // Change preset
        axios.put(PRESETS_URL + `/${id}`, preset)
            .then((response) => {
                logger.success(response, "Preset changed");
            }).catch((error) => {
                logger.error(error, "Error changing preset");
            });

        // Wait for server to update
        setTimeout(() => updatePresets(), 200);
    }

    function deletePreset(id: string) {
        // Delete preset
        axios.delete(PRESETS_URL + `/${id}`)
            .then((response) => {
                logger.success(response, "Preset deleted");
            }).catch((error) => {
                logger.error(error, "Error deleting preset");
            });

        // Wait for server to update
        setTimeout(() => updatePresets(), 200);
    }

    return (
        <Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                Client presets
                <IconButton size="small" onClick={addNewPreset} >
                    <AddIcon color="success" fontSize="inherit"/>
                </IconButton>
            </Stack>
            {presets.map((preset) => (
                <ClientPreset key={preset.id} preset={preset} changePreset={changePreset} deletePreset={deletePreset}/>
            ))}
        </Stack>
    );
};

export default ClientPresets;
