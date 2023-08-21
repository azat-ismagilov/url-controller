import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Form from "@rjsf/mui";
import { RegistryFieldsType, RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import axios from "axios";

import logger from "../../logger";

const JsonEditor = ({ name, submitUrl }: { name: string, submitUrl: string }) => {
    const [schema, setSchema] = useState<RJSFSchema | undefined>();
    const [uiSchema, setUiSchema] = useState<UiSchema | undefined>();

    useEffect(() => {
        axios.get(process.env.PUBLIC_URL + "/content.schema.json").then((response) => {
            setSchema(response.data);
        });

        axios.get(process.env.PUBLIC_URL + "/content.ui.schema.json").then((response) => {
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
            onSubmit={({ formData }) => {
                axios.post(submitUrl, {
                    name,
                    content: formData
                }).then((response) => {
                    logger.success(response);
                }).catch((error) => {
                    logger.error(error, "Error saving preset");
                });
            }}
        />
    );
};

export default JsonEditor;
