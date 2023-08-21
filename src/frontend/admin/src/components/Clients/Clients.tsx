import { Stack, Typography } from "@mui/material";

import { useAppContext } from "../AppContext";

import ClientsGroup from "./ClientsGroup";

const Clients = () => {
    const { clients } = useAppContext();
    const groups = clients.reduce((acc, client) => {
        if (!acc.includes(client.group)) {
            acc.push(client.group);
        }
        return acc;
    }, [] as string[]);


    return (
        <Stack>
            <Typography>
                Clients
            </Typography>
            {groups.map((group: string) => {
                const groupClients = clients.filter((client) => client.group === group);

                return (
                    <ClientsGroup
                        key={group}
                        group={group}
                        clients={groupClients}
                    />
                );
            })}
        </Stack>
    );
};

export default Clients;
