import { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import Form from "@rjsf/mui";
import { RegistryFieldsType, RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import axios from "axios";

type JsonEditorProps = {
    defaultValue?: object,
    onSubmit: (arg0: object) => void,
    onDelete?: () => void
};

const JsonEditor = ({ defaultValue, onSubmit, onDelete }: JsonEditorProps) => {
    const [schema, setSchema] = useState<RJSFSchema | undefined>();
    const [uiSchema, setUiSchema] = useState<UiSchema | undefined>();

    useEffect(() => {
        axios.get("/generated.content.schema.json").then((response) => {
            setSchema(response.data);
        });

        axios.get("/content.ui.schema.json").then((response) => {
            setUiSchema(response.data);
        });
    }, []);

    if (!schema) return (<Typography>Loading...</Typography>);

    const fields: RegistryFieldsType = { custom_hidden: () => <div /> };

    return (
        <Form
            schema={schema}
            uiSchema={uiSchema}
            fields={fields}
            validator={validator}
            formData={defaultValue}
            onSubmit={({ formData }) => onSubmit(formData)}>
            <Stack direction="row" spacing={2} pt={2} justifyContent="space-between">
                <Button variant="contained" type="submit">Submit</Button>
                {onDelete && <Button variant="contained" onClick={onDelete} color="error">Delete</Button>}
            </Stack>
        </Form>
    );
};

export default JsonEditor;
