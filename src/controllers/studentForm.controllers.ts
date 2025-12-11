import { SinhVien } from "../models/student.models.js";
import { DanhSachSV } from "../services/data.services.js";
import { renderDanhSach } from "../ui/studentList.ui.js";
import { generateMaSV } from "../utils/generateMaSV.utils.js";

export class StudentFormController {
  private maSVInput!: HTMLInputElement;
  private tenSVInput!: HTMLInputElement;
  private toanInput!: HTMLInputElement;
  private vanInput!: HTMLInputElement;
  private form!: HTMLFormElement;
  private danhSach: DanhSachSV;
  private formDataReset: HTMLInputElement[] = [];

  constructor(danhSach: DanhSachSV) {
    this.danhSach = danhSach;
    this.initializeDOMElements();
    this.prepareNextMaSV();
    this.initializeSubmitHandler();
  }

  private initializeDOMElements(): void {
    this.maSVInput = document.getElementById("studentId") as HTMLInputElement;
    this.tenSVInput = document.getElementById("name") as HTMLInputElement;
    this.toanInput = document.getElementById("math") as HTMLInputElement;
    this.vanInput = document.getElementById("literature") as HTMLInputElement;

    this.form = document.querySelector("form") as HTMLFormElement;
    this.formDataReset = [this.tenSVInput, this.toanInput, this.vanInput];
  }

  private prepareNextMaSV(): void {
    this.maSVInput.value = generateMaSV();
  }

  private initializeSubmitHandler(): void {
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  private handleSubmit(e: Event): void {
    e.preventDefault();

    const { value: maSV } = this.maSVInput;
    const { value: tenSV } = this.tenSVInput;
    const diemToan = Number.parseFloat(this.toanInput.value);
    const diemVan = Number.parseFloat(this.vanInput.value);

    try {
      const sv = new SinhVien(maSV, tenSV, diemToan, diemVan);

      this.danhSach.themSV(sv);

      this.formDataReset.forEach((input) => (input.value = ""));
      this.prepareNextMaSV();
      renderDanhSach(this.danhSach);
    } catch (err: any) {
      alert(`Something went wrong! ${err.message}`);
    }
  }
}
