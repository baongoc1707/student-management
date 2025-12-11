import { SinhVien } from "./models/models";
import { DanhSachSV } from "./services/data-service";

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
