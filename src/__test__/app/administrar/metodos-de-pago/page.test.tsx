import PaymentMethods from "@/app/administrar/metodos-de-pago/page";
import { usePaymentMethodsAdminPage } from "@/components/clientside-pages/Admin/PaymentMethodsAdminPage/usePaymentMethodsAdminPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render,
  screen,
  within,
  renderHook,
  waitFor,
} from "@testing-library/react";
import { expect, test } from "vitest";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  // eslint-disable-next-line react/display-name
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
test("render PaymentMethods page", async () => {
  const wrapper = createWrapper();
  render(<PaymentMethods />, { wrapper });
  const main = within(screen.getByRole("main"));
  expect(main.getByText("PaymentMethodsAdminPage")).toBeDefined();
});

test("fetch users_business_payment_Methods error", async () => {
  const wrapper = createWrapper();
  const selectedBusinessId = 15;

  const { result } = renderHook(() => usePaymentMethodsAdminPage(), {
    wrapper,
  });

  await waitFor(() => expect(result.current.tanstack.status).toBe("error"));
});
