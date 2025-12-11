import { SinhVien } from "../models/models";

export class DanhSachSV {
  public danhSach: SinhVien[];

  constructor() {
    this.danhSach = [];
  }

  //Methods
  private storageFromLocal(sv: SinhVien): void {
    const data = this.danhSach.map((sv) => {
      maSV: sv.maSV;
      tenSV: sv.tenSV;
      diemToan: sv.diemToan;
      diemVan: sv.diemVan;
    });

    localStorage.setItem("danhSachSinhVien", JSON.stringify(data));
  }

  private timKiemSV(maSV: string): boolean {
    return this.danhSach.some((sv) => sv.maSV === maSV);
  }

  public themSV(sv: SinhVien): void {
    const tonTai = this.timKiemSV(sv.maSV);

    if (tonTai) {
      throw new Error("Student already exists. Add failed!");
    }

    this.danhSach = [...this.danhSach, sv];
  }

  public capNhatSV() {}

  public xoaSV(maSV: string) {
    this.danhSach.filter((sv) => sv.maSV !== maSV);
  }
}
