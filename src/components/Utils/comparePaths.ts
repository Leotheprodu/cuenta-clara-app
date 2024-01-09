export function compareRoutes(route1: string, route2: string) {
  // Get the part of the route without the ID
  const routeWithoutId1 = route1.replace(/\/\d+/, ""); // Remove any number from the route
  const routeWithoutId2 = route2.replace(/\/\d+/, ""); // Remove any number from the route

  // Compare the routes without the ID
  return routeWithoutId1 === routeWithoutId2;
}
