import { useEffect,useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Grid, IconButton, Stack } from "@mui/material";
import axios from "axios";

import { BASE_URL_BACKEND } from "../../config";
import logger from "../../logger";
import { useAppContext } from "../AppContext";

import ContentPreset from "./ContentPreset";
import ContentPresetEditor from "./ContentPresetEditor";
import { ContentPresetType } from "./types";

const ContentPresets = () => {
    const PRESETS_URL = BASE_URL_BACKEND + "/api/admin/content-presets";

    const [editorOpen, setEditorOpen] = useState(false);
    const [editorPreset, setEditorPreset] = useState<ContentPresetType>();

    const { contentPresets: presets, setContentPresets: setPresets } = useAppContext();

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

    function addNewPreset(preset: ContentPresetType) {
        // Add new preset
        axios.post(PRESETS_URL, preset).then((response) => {
            logger.success(response, "New preset added");
        }).catch((error) => {
            logger.error(error, "Error adding new preset");
        });

        // Wait for server to update
        setTimeout(() => updatePresets(), 200);
    }

    function changePreset(id: string, preset: ContentPresetType) {
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
    
    function openNewPresetDialog() {
        setEditorPreset(undefined);
        setEditorOpen(true);
    }

    function openEditPresetDialog(preset: ContentPresetType) {
        setEditorPreset(preset);
        setEditorOpen(true);
    }

    function onSubmit(preset: ContentPresetType) {
        if (preset.id) {
            changePreset(preset.id, preset);
        } else {
            addNewPreset(preset);
        }
        setEditorOpen(false);
    }

    const onDelete = editorPreset?.id ? () => {
        deletePreset(editorPreset.id!);
        setEditorOpen(false);
    } : undefined;

    const emptyContentPreset: ContentPresetType = { name: "Empty", content: null };

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                Content presets
                <IconButton size="small" onClick={() => openNewPresetDialog()}>
                    <AddIcon fontSize="inherit" color="success"/>
                </IconButton>
            </Stack>
            <Grid container spacing={1}>
                <Grid item>
                    <ContentPreset preset={emptyContentPreset} />
                </Grid>
                {presets.map((preset) => 
                    <Grid item key={preset.id}>
                        <ContentPreset preset={preset} onEdit={() => openEditPresetDialog(preset)} />
                    </Grid>
                )}
            </Grid>
            <ContentPresetEditor 
                key={editorOpen ? "open" : "closed"}
                open={editorOpen} 
                setOpen={setEditorOpen} 
                onSubmit={onSubmit} 
                onDelete={onDelete}
                defaultValue={editorPreset}/>
        </Box>
    );
};

export default ContentPresets;
