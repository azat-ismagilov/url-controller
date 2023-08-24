import axios from "axios";

export default async function listDirectory(url: string, abortSignal: AbortSignal): Promise<string[]> {
    const response = await axios.get(url, { signal: abortSignal })
    return response.data;
}
