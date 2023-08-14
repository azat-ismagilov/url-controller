import { Checkbox,FormControlLabel } from "@mui/material";

import { useAppContext } from "./AppContext";

type MultipleCheckboxControllerProps = {
    label: string;
    ids: string[];
};

const MultipleCheckboxController = ({ label, ids }: MultipleCheckboxControllerProps) => {
    const { isSelected, setSelectedMultiple } = useAppContext();

    const childrenValues = ids.map((id) => isSelected(id));
    const checked = childrenValues.length > 0 && childrenValues.every((value) => value);
    const indeterminate = !checked && childrenValues.some((value) => value);

    return (
        <FormControlLabel
            label={label}
            control={
                <Checkbox
                    checked={checked}
                    indeterminate={indeterminate}
                    onChange={(event) => setSelectedMultiple(ids, event.target.checked)}
                />
            }
        />
    );
};

export default MultipleCheckboxController;
