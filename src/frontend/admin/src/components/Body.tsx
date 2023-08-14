import { useState } from "react";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

import { BASE_URL_BACKEND } from "../config";

import { useAppContext } from "./AppContext";
import Clients from "./Clients";
import Presets from "./Presets";

const Body = () => {
    const { selectedClientsIds } = useAppContext();

    const [url, setUrl] = useState<string>();

    const clickSubmit = () => {
        // Run post request to server
        axios.post(BASE_URL_BACKEND + "/api/admin/send", {
            url,
            clientIds: selectedClientsIds,
        }).then((response) => {
            console.log(response);
            enqueueSnackbar("URL is changed", { variant: "success" });
        }).catch((error) => {
            console.error(error);
            enqueueSnackbar("Error sending request", { variant: "error" });
        });
    };

    return (
        <Container maxWidth="sm">
            <Stack p={4} spacing={2}>
                <Typography variant="h4">
                    Control panel
                </Typography>
                <TextField
                    label="URL"
                    variant="standard"
                    fullWidth
                    value={url}
                    onChange={(event) => {
                        setUrl(event.target.value);
                    }}
                />

                <Clients />
                <Presets />
                <Button
                    variant="contained"
                    disabled={selectedClientsIds.length == 0 || url === undefined}
                    onClick={clickSubmit}
                >
                    Send
                </Button>
            </Stack>
        </Container>
    );
};

export default Body;
