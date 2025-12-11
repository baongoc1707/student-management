import { SinhVien } from "../models/student.models.js";
import { DanhSachSV } from "../services/data.services.js";
import { renderDanhSach } from "../ui/studentList.ui.js";
import {
  increaseCounter,
  getNextCounter,
} from "../utils/generateMaSV.utils.js";

export class StudentFormController {
  private maSVInput!: HTMLInputElement;
  private tenSVInput!: HTMLInputElement;
  private toanInput!: HTMLInputElement;
  private vanInput!: HTMLInputElement;
  private xepLoaiSpan!: HTMLSpanElement;
  private form!: HTMLFormElement;
  private btnThem!: HTMLInputElement;
  private danhSach: DanhSachSV;
  private formDataReset: (HTMLInputElement | HTMLSpanElement)[] = [];

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
    this.xepLoaiSpan = document.getElementById("rank") as HTMLSpanElement;

    this.form = document.querySelector("form") as HTMLFormElement;
    this.btnThem = document.querySelector(
      'input[value="Thêm"]'
    ) as HTMLInputElement;
    this.formDataReset = [
      this.tenSVInput,
      this.toanInput,
      this.vanInput,
      this.xepLoaiSpan,
    ];
  }

  private prepareNextMaSV(): void {
    this.maSVInput.value = getNextCounter();
  }

  private initializeSubmitHandler(): void {
    this.btnThem.addEventListener("click", this.handleSubmit.bind(this));
  }

  // Đổi sang async/await sau
  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    const { value: maSV } = this.maSVInput;
    const { value: tenSV } = this.tenSVInput;
    const diemToan = Number.parseFloat(this.toanInput.value);
    const diemVan = Number.parseFloat(this.vanInput.value);

    try {
      this.showLoading("Loading...");

      const sv = new SinhVien(maSV, tenSV, diemToan, diemVan);
      await this.danhSach.themSV(sv);

      this.hideLoading();

      this.tenSVInput.value = "";
      this.toanInput.value = "";
      this.vanInput.value = "";
      this.xepLoaiSpan.innerText = "";

      increaseCounter();
      this.prepareNextMaSV();
      renderDanhSach(this.danhSach);
      alert("Added successfully!");
    } catch (err: any) {
      this.hideLoading();
      alert(`Errors: ${err.message}`);
    }
  }

  public resetForm(): void {
    this.formDataReset.forEach((element) => {
      if (element instanceof HTMLInputElement) {
        element.value = "";
      } else if (element instanceof HTMLSpanElement) {
        element.innerText = "";
      }
    });

    this.prepareNextMaSV();
  }

  private showLoading(message: string): void {
    const loadingDiv = document.createElement("div");
    loadingDiv.id = "loading-overlay";
    loadingDiv.className =
      "fixed inset-0 bg-gray-400 flex items-center justify-center z-50";
    loadingDiv.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p class="text-lg font-semibold text-gray-800">${message}</p>
      </div>
    `;
    document.body.appendChild(loadingDiv);
  }

  private hideLoading(): void {
    const loadingDiv = document.getElementById("loading-overlay");
    if (loadingDiv) {
      loadingDiv.remove();
    }
  }
}
