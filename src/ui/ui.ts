import { DanhSachSV } from "./../services/data-service";

export const renderDanhSach = (ds: DanhSachSV) => {
  const studentBox = document.querySelector(".student-table");

  if (!studentBox) return;

  const danhSach = ds.hienThi();

  studentBox.innerHTML = danhSach
    .map(
      (sv) => `
      <tr data-id="${sv.maSV}" class="border border-solid border-gray-400">
        <td>${sv.maSV}</td>
        <td>${sv.tenSV}</td>
        <td>${sv.diemToan}</td>
        <td>${sv.diemVan}</td>
        <td>${sv.xepLoai()}</td>
      </tr>
   `
    )
    .join("");
};
