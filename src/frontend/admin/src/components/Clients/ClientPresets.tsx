import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Stack, Typography } from "@mui/material";
import axios from "axios";

import { BASE_URL_BACKEND } from "../../config";
import logger from "../../logger";

import ClientPreset from "./ClientPreset";
import { ClientPresetType } from "./types";

const ClientPresets = () => {
    const [presets, setPresets] = useState<ClientPresetType[]>([]);

    function updatePresets() {
        axios.get(BASE_URL_BACKEND + "/api/admin/presets")
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
        axios.post(BASE_URL_BACKEND + "/api/admin/presets", {
            name: "Preset",
            clientIds: [],
        }).then((response) => {
            logger.success(response, "New preset added");
        }).catch((error) => {
            logger.error(error, "Error adding new preset");
        });

        // Wait for server to update
        setTimeout(() => updatePresets(), 200);
    }

    function changePreset(id: string, preset: ClientPresetType) {
        // Change preset
        axios.put(BASE_URL_BACKEND + "/api/admin/presets/" + id, preset)
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
        axios.delete(BASE_URL_BACKEND + "/api/admin/presets/" + id)
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
                <Typography>
                Presets
                </Typography>
                <IconButton onClick={addNewPreset} size="small">
                    <AddIcon color="success" fontSize="small"/>
                </IconButton>
            </Stack>
            {presets.map((preset) => (
                <ClientPreset key={preset.id} preset={preset} changePreset={changePreset} deletePreset={deletePreset}/>
            ))}
        </Stack>
    );
};

export default ClientPresets;
