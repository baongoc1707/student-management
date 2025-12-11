import { SinhVien, SVInput } from "../models/student.models.js";
import { STORAGE_KEYS } from "../constants/storageKeys.constants.js";
import { localStorageData } from "./localStorageData.services.js";

// Giả lập API với delay
const simulateAPIDelay = (ms: number = 1500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export class DanhSachSV {
  public danhSach: SinhVien[];

  constructor() {
    const prevData = localStorageData.getSVList(STORAGE_KEYS.DANH_SACH_SV);

    if (prevData && prevData.length > 0) {
      this.danhSach = prevData.map((obj) => SinhVien.fromObject(obj));
    } else {
      this.danhSach = [];
    }
  }

  // Methods
  private timKiemSV(maSV: string): boolean {
    return this.danhSach.some((sv) => sv.maSV === maSV);
  }

  // Reindex tất cả sinh viên
  private reindexDanhSach(): void {
    this.danhSach = this.danhSach.map((sv, index) => {
      const newMaSV = `SV${(index + 1).toString().padStart(2, "0")}`;
      return new SinhVien(newMaSV, sv.tenSV, sv.diemToan, sv.diemVan);
    });

    const newCounter = this.danhSach.length + 1;
    localStorageData.setString(
      STORAGE_KEYS.COUNTER_MA_SV,
      newCounter.toString()
    );
    localStorageData.setSVList(STORAGE_KEYS.DANH_SACH_SV, this.danhSach);
  }

  public async themSV(sv: SinhVien): Promise<void> {
    await simulateAPIDelay();

    const tonTai = this.timKiemSV(sv.maSV);

    if (tonTai) {
      throw new Error("Sinh viên đã tồn tại. Không thể thêm!");
    }

    this.danhSach = [...this.danhSach, sv];
    localStorageData.setSVList(STORAGE_KEYS.DANH_SACH_SV, this.danhSach);
  }

  public async capNhatSV(maSV: string, sv: SVInput): Promise<void> {
    await simulateAPIDelay();

    const foundIndex = this.danhSach.findIndex((sv) => sv.maSV === maSV);

    if (foundIndex === -1) {
      throw new Error("Student not found!");
    }

    const sinhVienCu = this.danhSach[foundIndex];
    const sinhVienMoi = new SinhVien(
      sinhVienCu.maSV,
      sv.tenSV,
      sv.diemToan,
      sv.diemVan
    );

    this.danhSach = [
      ...this.danhSach.slice(0, foundIndex),
      sinhVienMoi,
      ...this.danhSach.slice(foundIndex + 1),
    ];
    localStorageData.setSVList(STORAGE_KEYS.DANH_SACH_SV, this.danhSach);
  }

  public async xoaSV(maSV: string): Promise<void> {
    await simulateAPIDelay();

    const exists = this.timKiemSV(maSV);

    if (!exists) {
      throw new Error("Failed to find the deleted student!");
    }
    this.danhSach = this.danhSach.filter((sv) => sv.maSV !== maSV);
    this.reindexDanhSach();
  }

  public hienThi(): SinhVien[] {
    return [...this.danhSach];
  }
}
