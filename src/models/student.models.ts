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

  //Phương thức tái tạo đối tượng
  public static fromObject(obj: any): SinhVien {
    // obj là một POJO (object thô) tải từ localStorage
    // Trả về một đối tượng SinhVien mới có đầy đủ methods
    if (!obj) {
      throw new Error("Student data is not valid!");
    }

    return new SinhVien(obj.maSV, obj.tenSV, obj.diemToan, obj.diemVan);
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
