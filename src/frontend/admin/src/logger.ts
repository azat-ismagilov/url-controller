import { enqueueSnackbar } from "notistack";

const logger = {
    success: (message: unknown, short_message = "") => {
        console.log(message);
        if (short_message) enqueueSnackbar(short_message, { variant: "success" });
    },
    log: (message: unknown, short_message = "") => {
        console.log(message);
        if (short_message) enqueueSnackbar(short_message, { variant: "info" });
    },
    error: (message: unknown, short_message = "") => {
        console.error(message);
        if (short_message) enqueueSnackbar(short_message, { variant: "error" });
    }
};

export default logger;
