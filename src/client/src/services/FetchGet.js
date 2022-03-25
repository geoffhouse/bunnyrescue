export default async function FetchGet(url) {
    const response = await fetch(url, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "GET",
    });
    const result = await response.json();
    if (result === null) {
        return null;
    }
    if (result === undefined) {
        throw new Error("no valid response");
    }
    if (result.error !== undefined) {
        throw new Error(`${result.errorcode}: ${result.error}`);
    }
    return result;
}
