import { SinhVien, SVInput } from "../models/models.js";
import { generateMaSV } from "../utils/generateMaSV.js";

export class DanhSachSV {
  public danhSach: SinhVien[];

  constructor() {
    this.danhSach = [];
  }

  //Methods
  //Local Storage Handler
  private luuLocalStorage(): void {
    const data = this.danhSach.map((sv) => ({
      maSV: sv.maSV,
      tenSV: sv.tenSV,
      diemToan: sv.diemToan,
      diemVan: sv.diemVan,
    }));

    localStorage.setItem("danhSachSinhVien", JSON.stringify(data));
  }

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
    this.luuLocalStorage();
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
    this.luuLocalStorage();
  }

  // Xóa SV / Delete Student
  public xoaSV(maSV: string) {
    this.danhSach = this.danhSach.filter((sv) => sv.maSV !== maSV);
    this.luuLocalStorage();
  }

  // Hiển thị danh sách SV
  public hienThi() {
    return [...this.danhSach];
  }
}
