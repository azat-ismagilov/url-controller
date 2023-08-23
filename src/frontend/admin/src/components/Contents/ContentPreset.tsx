import Done from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import { Chip } from "@mui/material";

import { pickColor } from "../../utils/colors";
import { useAppContext } from "../AppContext";

import { ContentPresetType } from "./types";

type ContentPresetProps = {
    preset: ContentPresetType,
    onEdit?: () => void
};

const ContentPreset = ({ preset, onEdit }: ContentPresetProps) => {
    const color = pickColor(preset.id!);

    const { selectedContentPreset, setSelectedContentPreset } = useAppContext();

    const selected = selectedContentPreset === preset;

    const handleClick = () => {
        if (selected) {
            setSelectedContentPreset(null);
        } else {
            setSelectedContentPreset(preset);
        }
    };

    return (
        <Chip label={preset.name}
            sx={{ 
                backgroundColor: selected ? undefined : color,
            }}
            icon={selected ? <Done /> : undefined}
            onDelete={selected ? undefined : onEdit} 
            variant={selected ? "outlined" : "filled"}
            deleteIcon={<EditIcon />} 
            onClick={handleClick} />
    );
};

export default ContentPreset;
