import { Button, Stack } from "@mui/material";
import Form from "@rjsf/mui";
import { RegistryFieldsType, RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import generatedContentSchema from "./generated.content.schema.json"
import contentUiSchema from "./content.ui-schema.json";

type JsonEditorProps = {
    defaultValue?: object,
    onSubmit: (arg0: object) => void,
    onDelete?: () => void
};

const JsonEditor = ({ defaultValue, onSubmit, onDelete }: JsonEditorProps) => {
    const schema = generatedContentSchema as RJSFSchema;
    const uiSchema = contentUiSchema as UiSchema;

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
