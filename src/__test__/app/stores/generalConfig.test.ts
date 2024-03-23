import { $AppState } from "@/stores/generalConfig";
import { cleanStores, keepMount } from "nanostores";
import { afterEach, expect, test } from "vitest";
/* afterEach(() => {
  cleanStores($AppState);
}); */
test("AppState Store", () => {
  /* keepMount($AppState); */
  expect($AppState.get()).toEqual({
    isCreatedInvoice: false,
    client_id: 0,
    client_name: "",
  });
});
