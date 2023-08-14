import { Box, Checkbox,FormControlLabel, FormGroup } from "@mui/material";

import { useAppContext } from "./AppContext";
import MultipleCheckboxController from "./MultipleCheckboxController";
import { ClientParams } from "./types";

type ClientsGroupProps = {
    group: string;
    clients: ClientParams[];
};

const ClientsGroup = ({ group, clients }: ClientsGroupProps) => {
    const { isSelected, setSelected } = useAppContext();

    return (
        <FormGroup>
            <MultipleCheckboxController
                label={group}
                ids={clients.map((client) => client.id)}
            />
            <Box ml={3} mt={-1}>
                {clients.map((client) => (
                    <FormControlLabel
                        key={client.id}
                        label={client.name}
                        control={
                            <Checkbox
                                checked={isSelected(client.id)}
                                onChange={(event) => setSelected(client.id, event.target.checked)}
                            />
                        }
                    />
                ))}
            </Box>
        </FormGroup>
    );
};

export default ClientsGroup;
