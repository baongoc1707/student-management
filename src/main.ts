import { SinhVien } from "./models/models.js";
import { DanhSachSV } from "./services/data-service.js";

/*
Used for expanding source code acts as the intermediary in the future
Base on frameworks structure
*/
const danhSach = new DanhSachSV();
const formData = document.querySelector("form");
const studentTable = document.querySelector("table.student-table");

formData?.addEventListener("submit", (e) => {
  e.preventDefault();
});

/* danhSach.themSV(new SinhVien("SV01", "Nguyen Van A", 10, 10));
danhSach.themSV(new SinhVien("SV02", "Nguyen Van B", 8, 10));
console.table(danhSach.hienThi());

danhSach.xoaSV("SV01");
console.table(danhSach.hienThi()); */
