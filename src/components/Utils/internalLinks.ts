import InternalLinksJson from "../../data/internal-links.json";

/**
 * @description Función que retorna el link interno de la página
 * @param pageName Nombre de la página
 * @returns Retorna el link interno de la página
 */
export const internalLinks = (pageName: string) => {
  const page = InternalLinksJson.find((entry) => entry.page === pageName);
  return page ? page.href : "/";
};
