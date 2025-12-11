import { DanhSachSV } from "../services/data.services.js";
import { renderDanhSach } from "../ui/studentList.ui.js";
import { localStorageData } from "../services/localStorageData.services.js";
import { STORAGE_KEYS } from "../constants/storageKeys.constants.js";
import { StudentFormController } from "./studentForm.controllers.js";

export class StudentRowController {
  private danhSach: DanhSachSV;
  private formController: StudentFormController;
  private tableContainer: HTMLElement | null;
  private selectedMaSV: string | null = null;

  private maSVInput!: HTMLInputElement;
  private tenSVInput!: HTMLInputElement;
  private toanInput!: HTMLInputElement;
  private vanInput!: HTMLInputElement;
  private xepLoaiSpan!: HTMLSpanElement;

  private btnSua!: HTMLInputElement;
  private btnXoa!: HTMLInputElement;

  constructor(danhSach: DanhSachSV, formController: StudentFormController) {
    this.danhSach = danhSach;
    this.formController = formController;
    this.tableContainer = document.getElementById("student-container");
    this.initializeDOMElements();
    this.initializeEventDelegation();
    this.loadSelectedStudent();
  }

  private initializeDOMElements(): void {
    this.maSVInput = document.getElementById("studentId") as HTMLInputElement;
    this.tenSVInput = document.getElementById("name") as HTMLInputElement;
    this.toanInput = document.getElementById("math") as HTMLInputElement;
    this.vanInput = document.getElementById("literature") as HTMLInputElement;
    this.xepLoaiSpan = document.getElementById("rank") as HTMLSpanElement;

    this.btnSua = document.querySelector(
      'input[value="Sửa"]'
    ) as HTMLInputElement;
    this.btnXoa = document.querySelector(
      'input[value="Xóa"]'
    ) as HTMLInputElement;
  }

  private initializeEventDelegation(): void {
    // Xử lý event click trên container thay vì từng row
    if (this.tableContainer) {
      this.tableContainer.addEventListener(
        "click",
        this.handleRowClick.bind(this)
      );
    }

    this.btnSua.addEventListener("click", this.handleEdit.bind(this));
    this.btnXoa.addEventListener("click", this.handleDelete.bind(this));
  }

  private handleRowClick(e: Event): void {
    const target = e.target as HTMLElement;
    const row = target.closest("tr[data-id]") as HTMLTableRowElement;

    if (!row) return;

    const maSV = row.dataset.id;
    if (!maSV) return;

    this.selectedMaSV = maSV;
    localStorageData.setString(STORAGE_KEYS.SELECTED_MA_SV, maSV);

    this.highlightSelectedRow(row);
    this.fillFormWithStudent(maSV);
  }

  private highlightSelectedRow(selectedRow: HTMLTableRowElement): void {
    // Remove highlight từ tất cả các row
    const allRows = this.tableContainer?.querySelectorAll("tr[data-id]");
    allRows?.forEach((row) => {
      row.classList.remove("bg-blue-100", "border-blue-500");
    });

    // Add highlight cho row được chọn
    selectedRow.classList.add("bg-blue-100", "border-blue-500");
  }

  private fillFormWithStudent(maSV: string): void {
    const danhSach = this.danhSach.hienThi();
    const sv = danhSach.find((s) => s.maSV === maSV);

    if (!sv) return;

    this.maSVInput.value = sv.maSV;
    this.tenSVInput.value = sv.tenSV;
    this.toanInput.value = sv.diemToan.toString();
    this.vanInput.value = sv.diemVan.toString();
    this.xepLoaiSpan.innerText = sv.xepLoai();
  }

  // Đổi sang async/await sau
  private async handleEdit(e: Event): Promise<void> {
    e.preventDefault();

    if (!this.selectedMaSV) return;

    const tenSV = this.tenSVInput.value.trim();
    const diemToan = Number.parseFloat(this.toanInput.value);
    const diemVan = Number.parseFloat(this.vanInput.value);

    try {
      this.showLoading("Updating...");

      await this.danhSach.capNhatSV(this.selectedMaSV, {
        tenSV,
        diemToan,
        diemVan,
      });

      this.hideLoading();
      alert("Updated successfully!");

      this.clearSelection();
      renderDanhSach(this.danhSach);
    } catch (err: any) {
      this.hideLoading();
      alert(`Update errors: ${err.message}`);
    }
  }

  // Đổi sang async/await sau
  private async handleDelete(e: Event): Promise<void> {
    e.preventDefault();

    if (!this.selectedMaSV) return;

    const confirmed = confirm(
      `Are you sure to delete the student with id: ${this.selectedMaSV}?`
    );
    if (!confirmed) return;

    try {
      this.showLoading("Deleting...");
      await this.danhSach.xoaSV(this.selectedMaSV);

      this.hideLoading();
      alert("Deleted successfully!");

      this.clearSelection();
      renderDanhSach(this.danhSach);
    } catch (err: any) {
      this.hideLoading();
      alert(`Delete errors: ${err.message}`);
    }
  }

  private clearSelection(): void {
    this.selectedMaSV = null;
    localStorageData.removeString(STORAGE_KEYS.SELECTED_MA_SV);

    this.formController.resetForm();

    const allRows = this.tableContainer?.querySelectorAll("tr[data-id]");
    allRows?.forEach((row) => {
      row.classList.remove("bg-blue-100", "border-blue-500");
    });
  }

  private loadSelectedStudent(): void {
    const savedMaSV = localStorageData.getString(STORAGE_KEYS.SELECTED_MA_SV);
    if (savedMaSV) {
      this.selectedMaSV = savedMaSV;
      this.fillFormWithStudent(savedMaSV);

      // Highlight row if exists
      setTimeout(() => {
        const row = this.tableContainer?.querySelector(
          `tr[data-id="${savedMaSV}"]`
        ) as HTMLTableRowElement;
        if (row) {
          this.highlightSelectedRow(row);
        }
      }, 100);
    }
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
