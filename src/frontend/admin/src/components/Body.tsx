
import { Button, Container, Grid, Typography } from "@mui/material";
import axios from "axios";

import { BASE_URL_BACKEND } from "../config";
import logger from "../logger";

import ClientPresets from "./Clients/ClientPresets";
import Clients from "./Clients/Clients";
import ContentPresets from "./Contents/ContentPresets";
import { useAppContext } from "./AppContext";

const Body = () => {
    const { selectedClientsIds, selectedContentPreset } = useAppContext();

    const clickSubmit = () => {
        // Run post request to server
        axios.post(BASE_URL_BACKEND + "/api/admin/send", {
            content: selectedContentPreset!.content,
            clientIds: selectedClientsIds,
        }).then((response) => {
            logger.log(response, "URL is changed");
        }).catch((error) => {
            logger.error(error, "Error sending request");
        });
    };

    return (
        <Container maxWidth="md">
            <Grid container p={4} columnSpacing={5} rowSpacing={2} >
                <Grid item xs={12}>
                    <Typography variant="h4">
                            Control panel
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <ContentPresets />
                </Grid> 
                <Grid item xs={12} sm={6}>
                    <Clients />
                    <ClientPresets />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        disabled={selectedClientsIds.length == 0 || selectedContentPreset == null}
                        onClick={clickSubmit}
                    >
                        Send
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Body;
