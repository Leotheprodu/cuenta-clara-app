export async function getData(url: string, cache: boolean = false) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const cacheConfig = cache ? "force-cache" : "no-store";
    const res = await fetch(`${baseUrl}${url}`, {
        cache: cacheConfig,
        credentials: "include",
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }
    const { data } = await res.json();
    return data;
}
