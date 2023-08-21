import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, DialogContent, DialogTitle, IconButton,Stack, TextField, Typography } from "@mui/material";

import JsonEditor from "./JsonEditor";

const ContentPresets = () => {
    const [open, setOpen] = useState(false);

    const [name, setName] = useState("");

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography>
                Content presets
                </Typography>
                <IconButton size="small" onClick={() => setOpen(true)}>
                    <AddIcon color="success" fontSize="small"/>
                </IconButton>
            </Stack>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    Add new content preset
                        <IconButton size="small" onClick={() => setOpen(false)}>
                            <CloseIcon fontSize="small"/>
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
                        <JsonEditor name="Default name" submitUrl="" />
                    </Stack>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default ContentPresets;
