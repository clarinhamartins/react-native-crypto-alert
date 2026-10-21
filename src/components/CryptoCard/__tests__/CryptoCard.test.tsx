import { fireEvent, render, screen } from "@testing-library/react-native";
import { AlertProvider } from "@context/AlertProvider/AlertProvider";
import { AlertContext } from "@context/AlertProvider/useAlertProvider";
import type { PriceAlert } from "@context/AlertProvider/useAlertProvider";
import type { Cryptocurrency } from "@data/cryptoData";
import { CryptoCard } from "../CryptoCard";

const bitcoin: Cryptocurrency = {
  id: "bitcoin",
  name: "Bitcoin",
  symbol: "BTC",
  price: 67999.5,
  change24h: 2.45,
};

function renderWithAlerts(
  crypto: Cryptocurrency,
  alerts: PriceAlert[] = [],
) {
  return render(
    <AlertContext.Provider
      value={{ alerts, addAlert: jest.fn(), deleteAlert: jest.fn() }}
    >
      <CryptoCard crypto={crypto} />
    </AlertContext.Provider>,
  );
}

describe("CryptoCard", () => {
  test("renders the cryptocurrency name, symbol, price and change", async () => {
    await renderWithAlerts(bitcoin);

    expect(screen.getByText("Bitcoin")).toBeTruthy();
    expect(screen.getByText("BTC")).toBeTruthy();
    expect(screen.getByText("$67,999.50")).toBeTruthy();
    expect(screen.getByText("+2.45%")).toBeTruthy();
  });

  test("does not show an alert badge when there are no alerts for this crypto", async () => {
    await renderWithAlerts(bitcoin);

    expect(screen.queryByText("1 alert")).toBeNull();
    expect(
      screen.queryByRole("button", { name: "Toggle alerts for this cryptocurrency" }),
    ).toBeNull();
  });

  test("shows a singular alert badge and expands to reveal alert details on press", async () => {
    const alert: PriceAlert = {
      id: "1",
      cryptocurrency: "Bitcoin",
      symbol: "BTC",
      targetPrice: 70000,
      condition: "above",
      createdAt: new Date().toISOString(),
    };
    await renderWithAlerts(bitcoin, [alert]);

    expect(screen.getByText("1 alert")).toBeTruthy();
    expect(screen.queryByText("Above target")).toBeNull();

    await fireEvent.press(
      screen.getByRole("button", { name: "Toggle alerts for this cryptocurrency" }),
    );

    expect(screen.getByText("Above target")).toBeTruthy();
    expect(screen.getByText("$70,000.00")).toBeTruthy();
  });

  test("shows a plural alert badge when more than one alert matches", async () => {
    const alerts: PriceAlert[] = [
      {
        id: "1",
        cryptocurrency: "Bitcoin",
        symbol: "BTC",
        targetPrice: 70000,
        condition: "above",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        cryptocurrency: "Bitcoin",
        symbol: "BTC",
        targetPrice: 60000,
        condition: "below",
        createdAt: new Date().toISOString(),
      },
    ];
    await renderWithAlerts(bitcoin, alerts);

    expect(screen.getByText("2 alerts")).toBeTruthy();
  });

  test("renders with AlertProvider as the real context without crashing", async () => {
    await render(
      <AlertProvider>
        <CryptoCard crypto={bitcoin} />
      </AlertProvider>,
    );

    expect(screen.getByText("Bitcoin")).toBeTruthy();
  });
});
