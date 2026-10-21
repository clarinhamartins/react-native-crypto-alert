import { fireEvent, render, screen } from "@testing-library/react-native";
import type { PriceAlert } from "@context/AlertProvider/useAlertProvider";
import { AlertCard } from "../AlertCard";

const aboveAlert: PriceAlert = {
  id: "alert-1",
  cryptocurrency: "Ethereum",
  symbol: "ETH",
  targetPrice: 4000,
  condition: "above",
  createdAt: new Date().toISOString(),
};

describe("AlertCard", () => {
  test("renders the cryptocurrency name, condition and formatted target price", async () => {
    await render(<AlertCard alert={aboveAlert} onDelete={jest.fn()} />);

    expect(screen.getByText("Ethereum")).toBeTruthy();
    expect(screen.getByText("above")).toBeTruthy();
    expect(screen.getByText("$4,000.00")).toBeTruthy();
  });

  test("renders the below condition text for a below-target alert", async () => {
    const belowAlert: PriceAlert = { ...aboveAlert, id: "alert-2", condition: "below" };
    await render(<AlertCard alert={belowAlert} onDelete={jest.fn()} />);

    expect(screen.getByText("below")).toBeTruthy();
  });

  test("calls onDelete with the alert id when the delete button is pressed", async () => {
    const onDelete = jest.fn();
    await render(<AlertCard alert={aboveAlert} onDelete={onDelete} />);

    await fireEvent.press(screen.getByRole("button", { name: "Delete alert" }));

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith("alert-1");
  });
});
