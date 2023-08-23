import { Box, FormGroup } from "@mui/material";

import Client from "./Client";
import MultipleCheckboxController from "./MultipleCheckboxController";
import { ClientParams } from "./types";

type ClientsGroupProps = {
    group: string;
    clients: ClientParams[];
};

const ClientsGroup = ({ group, clients }: ClientsGroupProps) => {
    return (
        <FormGroup>
            <MultipleCheckboxController
                label={group}
                ids={clients.map((client) => client.id)}
            />
            <Box ml={3} mt={-1}>
                {clients.map((client) => (
                    <Client key={client.id} client={client}/>
                ))}
            </Box>
        </FormGroup>
    );
};

export default ClientsGroup;
