import { SinhVien } from "../models/models";

export class DanhSachSV {
  public danhSach: SinhVien[];

  constructor() {
    this.danhSach = [];
  }

  //Methods
  private timKiemSV(sv: SinhVien): boolean {
    return false;
  }

  public themSV(sv: SinhVien): void {
    const tonTai = this.timKiemSV(sv);

    if (tonTai) {
      throw new Error("Student already exists. Add failed!");
    }
    this.danhSach.push(sv);
  }

  public capNhatSV() {}
}
