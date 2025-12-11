import { STORAGE_KEYS } from "../constants/storageKeys.constants.js";
import { localStorageData } from "../services/localStorageData.services.js";

function createCounter() {
  let counter = 1;

  return function () {
    // Định dạng 2 chữ số "0x" cho maSV
    const id = `SV${counter.toString().padStart(2, "0")}`;
    counter++;
    localStorageData.setString(STORAGE_KEYS.COUNTER_MA_SV, counter.toString());
    return id;
  };
}

//Lỗi reset bộ đếm -> tạo bộ đếm dùng chung
export const generateMaSV = createCounter();
