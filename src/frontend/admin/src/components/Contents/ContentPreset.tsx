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

    if (!onEdit) {
        return (
            <Chip label={preset.name} 
                sx={{ backgroundColor: color, color: "white" }}
            />
        );
    }

    const { selectedContentId, setSelectedContentId } = useAppContext();

    const selected = selectedContentId == preset.id;

    const handleClick = () => {
        if (selected) {
            setSelectedContentId(null);
        } else {
            setSelectedContentId(preset.id!);
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
