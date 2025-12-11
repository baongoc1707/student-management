import { SinhVien, SVInput } from "../models/student.models.js";
import { STORAGE_KEYS } from "../constants/storageKeys.constants.js";
import { localStorageData } from "./localStorageData.services.js";

export class DanhSachSV {
  public danhSach: SinhVien[];

  constructor() {
    const prevData = localStorageData.getSVList(STORAGE_KEYS.DANH_SACH_SV);
    this.danhSach = prevData || [];
  }

  //Methods
  // Thêm SV / Search + Add Student
  private timKiemSV(maSV: string): boolean {
    return this.danhSach.some((sv) => sv.maSV === maSV);
  }

  public themSV(sv: SinhVien): void {
    const tonTai = this.timKiemSV(sv.maSV);

    if (tonTai) {
      throw new Error("Student already exists. Add failed!");
    }

    this.danhSach = [...this.danhSach, sv];
    localStorageData.setSVList(STORAGE_KEYS.DANH_SACH_SV, this.danhSach);
  }

  // Cập nhật SV / Update Student
  public capNhatSV(maSV: string, sv: SVInput): void {
    const foundIndex = this.danhSach.findIndex((sv) => sv.maSV === maSV);

    if (foundIndex === -1) {
      throw new Error("Unidentified student!");
    }

    const sinhVienCu = this.danhSach[foundIndex];
    const sinhVienMoi = new SinhVien(
      sinhVienCu.maSV,
      sv.tenSV,
      sv.diemToan,
      sv.diemVan // Fixed maSV once updating
    );

    this.danhSach = [
      ...this.danhSach.slice(0, foundIndex),
      sinhVienMoi,
      ...this.danhSach.slice(foundIndex + 1),
    ];
    localStorageData.setSVList(STORAGE_KEYS.DANH_SACH_SV, this.danhSach);
  }

  // Xóa SV / Delete Student
  public xoaSV(maSV: string) {
    this.danhSach = this.danhSach.filter((sv) => sv.maSV !== maSV);
    localStorageData.setSVList(STORAGE_KEYS.DANH_SACH_SV, this.danhSach);
  }

  // Hiển thị danh sách SV
  public hienThi() {
    return [...this.danhSach];
  }
}
