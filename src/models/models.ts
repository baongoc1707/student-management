export class Student {
  maSV: string;
  tenSV: string;
  diemToan: number;
  diemVan: number;

  constructor(
    maSV: string,
    tenSV: string,
    diemToan: number = 0.0,
    diemVan: number = 0.0
  ) {
    this.maSV = maSV;
    this.tenSV = tenSV;
    this.diemToan = diemToan;
    this.diemVan = diemVan;
  }

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
