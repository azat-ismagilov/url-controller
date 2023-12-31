import { useState } from "react";
import Delete from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Save from "@mui/icons-material/Save";
import { Autocomplete, IconButton, Stack, TextField } from "@mui/material";

import { useAppContext } from "../AppContext";

import MultipleCheckboxController from "./MultipleCheckboxController";
import { ClientPresetType } from "./types";

type ClientPresetProps = {
    preset: ClientPresetType,
    changePreset: (arg0: string, arg1: ClientPresetType) => void,
    deletePreset: (arg0: string) => void
};

const ClientPreset = ({ preset, changePreset, deletePreset }: ClientPresetProps) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [name, setName] = useState<string>(preset.name);
    const [clientIds, setClientIds] = useState<string[]>(preset.clientIds);

    const { clients } = useAppContext();

    const possibleClientIds = clients.map((client) => client.id);

    if (!edit) {
        return (<Stack direction="row" justifyContent="space-between" alignItems="center">
            <MultipleCheckboxController 
                label={`${preset.name} (${preset.clientIds.join(", ")})`}
                ids={preset.clientIds} 
            />
            <IconButton size="small" onClick={() => setEdit(true)}>
                <EditIcon fontSize="inherit" />
            </IconButton>
        </Stack>);
    } else {
        return (<Stack direction="row">
            <TextField
                label="Name"
                variant="standard"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <Autocomplete
                multiple
                fullWidth
                options={possibleClientIds}
                value={clientIds}
                onChange={(_event, value) => setClientIds(value)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Clients"
                        variant="standard"
                    />
                )}
            />

            
            <IconButton size="small" onClick={() => {
                setEdit(false);
                deletePreset(preset.id);
            }}>
                <Delete fontSize="inherit" color="error" />
            </IconButton>

            <IconButton size="small" onClick={() => {
                setEdit(false);
                changePreset(preset.id, { ...preset, name, clientIds });
            }}>
                <Save fontSize="inherit" />
            </IconButton>
        </Stack>);
    }
};

export default ClientPreset;
