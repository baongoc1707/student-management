export interface SVInput {
  tenSV: string;
  diemToan: number;
  diemVan: number;
}

export interface SV extends SVInput {
  maSV: string;
  xepLoai(): string;
}

export class SinhVien implements SV {
  public readonly maSV: string; //Không cho sửa sau khi tạo

  constructor(
    maSV: string,
    public tenSV: string,
    public diemToan: number = 0.0,
    public diemVan: number = 0.0
  ) {
    // Fix lỗi tự động cập nhật maSV trong capNhatSV()
    this.maSV = maSV;
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
