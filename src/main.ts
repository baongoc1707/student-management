import { SinhVien } from "./models/models.js";
import { DanhSachSV } from "./services/data-service.js";
import { renderDanhSach } from "./ui/ui.js";
import { generateMaSV } from "./utils/generateMaSV.js";

const danhSach = new DanhSachSV();

const init = () => {
  const maSVInput = document.getElementById("studentId") as HTMLInputElement;
  const tenInput = document.getElementById("name") as HTMLInputElement;
  const toanInput = document.getElementById("math") as HTMLInputElement;
  const vanInput = document.getElementById("literature") as HTMLInputElement;
  const form = document.querySelector("form");

  const formDataReset = [tenInput, toanInput, vanInput];

  const prepareNextMaSV = () => {
    maSVInput.value = generateMaSV();
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const { value: maSV } = maSVInput;
    const { value: tenSV } = tenInput;
    const diemToan = Number.parseFloat(toanInput.value);
    const diemVan = Number.parseFloat(vanInput.value);

    try {
      const sv = new SinhVien(maSV, tenSV, diemToan, diemVan);
      danhSach.themSV(sv);
      renderDanhSach(danhSach);

      formDataReset.forEach((input) => (input.value = ""));
      prepareNextMaSV();
    } catch (err: any) {
      alert(`Lỗi: ${err.message}`);
    }
  };

  form?.addEventListener("submit", handleSubmit);

  prepareNextMaSV();
  renderDanhSach(danhSach);
};

document.addEventListener("DOMContentLoaded", init);
