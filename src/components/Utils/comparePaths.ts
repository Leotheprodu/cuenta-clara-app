export function comparePaths(actualPath: string, arrayDeRutas: string[]) {
  if (actualPath.length > 0) {
    return arrayDeRutas.some((ruta) => {
      const regex = new RegExp("^" + ruta.replace(/\//g, "\\/") + ".*$");
      return regex.test(actualPath);
    });
  }
}
