import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Stack, Typography } from "@mui/material";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

import { BASE_URL_BACKEND } from "../config";

import Preset from "./Preset";
import { PresetType } from "./types";

const Presets = () => {
    const [presets, setPresets] = useState<PresetType[]>([]);

    function updatePresets() {
        axios.get(BASE_URL_BACKEND + "/api/admin/presets")
            .then((response) => {
                setPresets(response.data);
            }).catch((error) => {
                console.error(error);
                enqueueSnackbar("Error getting presets", { variant: "error" });
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
            console.log(response);
        }).catch((error) => {
            console.error(error);
            enqueueSnackbar("Error adding preset", { variant: "error" });
        });

        // Wait for server to update
        setTimeout(() => updatePresets(), 200);
    }

    function changePreset(id: string, preset: PresetType) {
        // Change preset
        axios.put(BASE_URL_BACKEND + "/api/admin/presets/" + id, preset)
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.error(error);
                enqueueSnackbar("Error changing preset", { variant: "error" });
            });

        // Wait for server to update
        setTimeout(() => updatePresets(), 200);
    }

    function deletePreset(id: string) {
        // Delete preset
        axios.delete(BASE_URL_BACKEND + "/api/admin/presets/" + id)
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.error(error);
                enqueueSnackbar("Error deleting preset", { variant: "error" });
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
                <Preset key={preset.id} preset={preset} changePreset={changePreset} deletePreset={deletePreset}/>
            ))}
        </Stack>
    );
};

export default Presets;
