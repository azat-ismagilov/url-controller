import { useState } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import axios from "axios";

import { BASE_URL_BACKEND } from "../config";
import logger from "../logger";

import { useAppContext } from "./AppContext";
import Clients from "./Clients/Clients";
import ContentPresets from "./Contents/ContentPresets";
import ClientPresets from "./Clients/ClientPresets";

const Body = () => {
    const { selectedClientsIds } = useAppContext();

    const [url, setUrl] = useState<string>();

    const clickSubmit = () => {
        // Run post request to server
        axios.post(BASE_URL_BACKEND + "/api/admin/send", {
            url,
            clientIds: selectedClientsIds,
        }).then((response) => {
            logger.log(response, "URL is changed");
        }).catch((error) => {
            logger.error(error, "Error sending request");
        });
    };

    return (
        <Container maxWidth="sm">
            <Stack p={4} spacing={2}>
                <Typography variant="h4">
                    Control panel
                </Typography>
                <ContentPresets />
                <Clients />
                <ClientPresets />
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
