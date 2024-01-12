import { $AppState } from "@/stores/generalConfig";
import InternalLinksJson from "../../data/internal-links.json";

/**
 * @description Función que retorna el link interno de la página
 * @param pageName Nombre de la página
 * @returns Retorna el link interno de la página
 */
const appStore = $AppState.value;
export const internalLinks = (pageName: string) => {
  const page = InternalLinksJson.find((entry) => entry.page === pageName);
  return page ? page.href : "/";
};
export const isUserRequired = (pageName: string) => {
  const page = InternalLinksJson.find((entry) => entry.page === pageName);
  return page?.userRequired;
};
export const blockedPages = (pagesNames: string[], pageName: string) => {
  return !pagesNames.includes(pageName);
};
