import AsyncStorage from "@react-native-async-storage/async-storage";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { AlertProvider } from "@context/AlertProvider/AlertProvider";
import { CreateAlertScreen } from "@screens/CreateAlertScreen/CreateAlertScreen";
import { PriceAlertsScreen } from "@screens/PriceAlertsScreen/PriceAlertsScreen";

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
    push: jest.fn(),
    back: jest.fn(),
  },
}));

function App() {
  return (
    <AlertProvider>
      <CreateAlertScreen />
      <PriceAlertsScreen />
    </AlertProvider>
  );
}

describe("Create alert end-to-end flow", () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  test("creating an alert through the form makes it appear in the price alerts list", async () => {
    await render(<App />);

    expect(screen.getByText("No alerts yet")).toBeTruthy();

    await fireEvent.press(screen.getByText("Select cryptocurrency"));
    await fireEvent.press(screen.getByText("Bitcoin"));

    await fireEvent.changeText(screen.getByPlaceholderText("0.00"), "70000");

    await fireEvent.press(screen.getByText("Below target price"));

    await fireEvent.press(screen.getByRole("button", { name: "Save Alert" }));

    await waitFor(() => {
      expect(screen.queryByText("No alerts yet")).toBeNull();
    });

    expect(screen.getAllByText("Bitcoin").length).toBeGreaterThan(0);
    expect(screen.getByText("$70,000.00")).toBeTruthy();
    expect(screen.getByText("below")).toBeTruthy();
  }, 15000);

  test("does not submit the form when required fields are missing", async () => {
    await render(<App />);

    const saveButton = screen.getByRole("button", { name: "Save Alert" });
    expect(saveButton.props.accessibilityState.disabled).toBe(true);

    expect(screen.getByText("No alerts yet")).toBeTruthy();
  });
});
