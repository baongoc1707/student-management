import { SinhVien } from "../models/student.models";

export class localStorageData {
  // Singleton for selected maSV
  public static getString(key: string): string | null {
    return localStorage.getItem(key);
  }

  public static setString(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public static removeString(key: string): void {
    localStorage.removeItem(key);
  }

  // localStorage for array of SinhVien
  public static getSVList(key: string): SinhVien[] | null {
    const item = localStorage.getItem(key);

    if (item) {
      try {
        return JSON.parse(item) as SinhVien[];
      } catch (err: any) {
        console.log(`Parse failed at the key ${key}! ${err.message}`);
        return null;
      }
    }

    return null;
  }

  public static setSVList(key: string, ds: SinhVien[]) {
    const data = JSON.stringify(ds);
    localStorage.setItem(key, data);
  }
}
