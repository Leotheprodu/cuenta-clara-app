import Home from "@/app/page";
import { $AppState } from "@/stores/generalConfig";
import { render, screen, within } from "@testing-library/react";
import { cleanStores, keepMount } from "nanostores";
import { afterEach, expect, test } from "vitest";
afterEach(() => {
  cleanStores($AppState);
});
test("is anonymous from the beginning", () => {
  keepMount($AppState);
  expect($AppState.get()).toEqual({
    isCreatedInvoice: false,
    client_id: 0,
    client_name: "",
  });
});

test("render home page", () => {
  render(<Home />);
  const main = within(screen.getByRole("main"));
  expect(
    main.getByRole("heading", {
      level: 1,
      name: "Tu negocio siempre a mano",
    })
  ).toBeDefined();
});
