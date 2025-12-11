import { STORAGE_KEYS } from "../constants/storageKeys.constants.js";
import { localStorageData } from "../services/localStorageData.services.js";

const formatCounter = (counterValue: number): string => {
  return `SV${counterValue.toString().padStart(2, "0")}`;
};

const getCurrentCounter = (): number => {
  const savedCounter = localStorageData.getString(STORAGE_KEYS.COUNTER_MA_SV);
  return savedCounter ? Number.parseInt(savedCounter) : 1;
};

export const getNextCounter = (): string => {
  const currentCounter = getCurrentCounter();
  return formatCounter(currentCounter);
};

export const increaseCounter = (): void => {
  let currentCounter = getCurrentCounter();
  currentCounter++;

  localStorageData.setString(
    STORAGE_KEYS.COUNTER_MA_SV,
    currentCounter.toString()
  );
};
