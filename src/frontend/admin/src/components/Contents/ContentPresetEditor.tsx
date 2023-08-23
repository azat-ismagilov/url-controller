import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";

import JsonEditor from "./JsonEditor";
import { ContentPresetType } from "./types";

type ContentPresetEditorProps = {
    open: boolean,
    setOpen: (arg0: boolean) => void,
    onSubmit: (arg0: ContentPresetType) => void,
    onDelete?: () => void,
    defaultValue: ContentPresetType | undefined  
};

const ContentPresetEditor = ({ open, setOpen, onSubmit, onDelete, defaultValue }: ContentPresetEditorProps) => {
    const [name, setName] = useState<string>(defaultValue?.name || "");

    const onSubmitForm = (formData: object) => {
        onSubmit({ name, content: formData, id: defaultValue?.id });
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    Content preset
                    <IconButton size="small" onClick={() => setOpen(false)}>
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Stack py={1} spacing={4}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <JsonEditor defaultValue={defaultValue?.content || undefined} onSubmit={onSubmitForm} onDelete={onDelete}/>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default ContentPresetEditor;
