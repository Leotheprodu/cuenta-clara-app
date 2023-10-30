import { baseUrl } from "@/data/constants";

interface MyCustomError {
    message: string;
    status?: number;
    // Otras propiedades específicas de tu estructura de error
}
/**
 * Necesita 3 Hooks para funcionar, hice un useHttpComp personalizado para usarlo.
 * @param param0
 * @returns
 */
export async function fetchAPI<T>({
    url,
    method = "GET",
    body = null,
    isFormData = false,
}: {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: T | FormData | null;
    isFormData?: boolean;
}) {
    const config: RequestInit = {
        method,
        credentials: "include",
        body:
            method === "GET" || method === "DELETE"
                ? undefined
                : isFormData
                ? (body as FormData)
                : JSON.stringify(body),
        headers: isFormData
            ? undefined
            : { "Content-Type": "application/json" },
    };
    try {
        const response = await fetch(`${baseUrl}${url}`, config);
        const { data } = await response.json();

        if (response.status === 200) {
            return data;
        } else if (response.status === 429) {
            throw new Error("Ha excedido el limite de consultas permitido");
        } else {
            const error = data.message || "Error desconocido";
            throw new Error(error);
        }
    } catch (error) {
        const myError = error as MyCustomError;
        throw new Error(myError.message);
    }
}
