import { SnackbarProvider } from "notistack";

import { AppContextProvider } from "./components/AppContext";
import Body from "./components/Body";


export default function App() {
    return (
        <AppContextProvider>
            <SnackbarProvider autoHideDuration={1000} />
            <Body />
        </AppContextProvider>
    );
}
