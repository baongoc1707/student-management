interface SV {
  maSV: string;
  tenSV: string;
  diemToan: number;
  diemVan: number;
  xepLoai(): string;
}

export class SinhVien implements SV {
  constructor(
    public maSV: string,
    public tenSV: string,
    public diemToan: number = 0.0,
    public diemVan: number = 0.0
  ) {}

  private tinhDiemTB(): number {
    return (this.diemToan + this.diemVan) / 2;
  }

  public xepLoai(): string {
    const diemTB: number = this.tinhDiemTB();
    return diemTB >= 8.5
      ? "Giỏi"
      : diemTB >= 6.5
      ? "Khá"
      : diemTB >= 5
      ? "Trung bình"
      : "Yếu";
  }
}
