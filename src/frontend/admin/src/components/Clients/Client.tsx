import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import { Chip } from "@mui/material";
import isEqual from "lodash.isequal";

import { pickColor } from "../../utils/colors";
import { useAppContext } from "../AppContext";

import { ClientParams } from "./types";

type ClientProps = {
    client: ClientParams
};

const Client = ({ client }: ClientProps) => {
    const { isSelectedClientId, setClientIdSelection, contentPresets, clientsWithContent } = useAppContext();

    const content = clientsWithContent.find((clientWithContent) => clientWithContent.client.id === client.id)?.content;

    const preset = contentPresets.find((preset) => isEqual(preset.content, content));

    return (
        <FormControlLabel 
            label={
                <Stack direction="row" spacing={1}>
                    <Typography>
                        {client.name}
                    </Typography>
                    {content && 
                        <Chip 
                            label={preset?.name || "something"} 
                            sx={{ backgroundColor: preset?.id ? pickColor(preset.id) : undefined }}
                            size="small" 
                        />
                    }
                </Stack>}
            control={
                <Checkbox 
                    checked={isSelectedClientId(client.id)} 
                    onChange={event => setClientIdSelection(client.id, event.target.checked)} 
                />
            }
        />
    );
};

export default Client;
