import AsyncStorage from "@react-native-async-storage/async-storage";
import { act, renderHook, waitFor } from "@testing-library/react-native";
import { useAlertProviderState } from "../useAlertProvider";

describe("useAlertProviderState", () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  test("starts with an empty alerts list before storage hydration finishes", async () => {
    const { result } = await renderHook(() => useAlertProviderState());

    expect(result.current.alerts).toEqual([]);
  });

  test("hydrates alerts from AsyncStorage asynchronously on mount", async () => {
    const stored = [
      {
        id: "1",
        cryptocurrency: "Bitcoin",
        symbol: "BTC",
        targetPrice: 50000,
        condition: "above",
        createdAt: "2024-01-01T00:00:00.000Z",
      },
    ];
    await AsyncStorage.setItem("cryptoAlerts", JSON.stringify(stored));

    const { result } = await renderHook(() => useAlertProviderState());

    await waitFor(() => {
      expect(result.current.alerts).toHaveLength(1);
    });
    expect(result.current.alerts[0].cryptocurrency).toBe("Bitcoin");
  });

  test("addAlert appends a new alert with a generated id and timestamp", async () => {
    const { result } = await renderHook(() => useAlertProviderState());

    await waitFor(() => expect(result.current.alerts).toEqual([]));

    await act(() => {
      result.current.addAlert({
        cryptocurrency: "Solana",
        symbol: "SOL",
        targetPrice: 200,
        condition: "above",
      });
    });

    expect(result.current.alerts).toHaveLength(1);
    expect(result.current.alerts[0]).toMatchObject({
      cryptocurrency: "Solana",
      symbol: "SOL",
      targetPrice: 200,
      condition: "above",
    });
    expect(result.current.alerts[0].id).toBeTruthy();
    expect(result.current.alerts[0].createdAt).toBeTruthy();
  });

  test("persists alerts to AsyncStorage after they change", async () => {
    const { result } = await renderHook(() => useAlertProviderState());
    await waitFor(() => expect(result.current.alerts).toEqual([]));

    await act(() => {
      result.current.addAlert({
        cryptocurrency: "Cardano",
        symbol: "ADA",
        targetPrice: 1,
        condition: "below",
      });
    });

    await waitFor(async () => {
      const raw = await AsyncStorage.getItem("cryptoAlerts");
      expect(raw).not.toBeNull();
      expect(JSON.parse(raw as string)).toHaveLength(1);
    });
  });

  test("deleteAlert removes the alert with the matching id", async () => {
    const { result } = await renderHook(() => useAlertProviderState());
    await waitFor(() => expect(result.current.alerts).toEqual([]));

    await act(() => {
      result.current.addAlert({
        cryptocurrency: "Polkadot",
        symbol: "DOT",
        targetPrice: 10,
        condition: "above",
      });
    });
    const createdId = result.current.alerts[0].id;

    await act(() => {
      result.current.deleteAlert(createdId);
    });

    expect(result.current.alerts).toEqual([]);
  });
});
