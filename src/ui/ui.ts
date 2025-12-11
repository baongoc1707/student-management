import { DanhSachSV } from "./../services/data-service";

const danhSach = new DanhSachSV();

export const renderDanhSach = () => {
  const studentBox = document.querySelector(".student-table");

  if (!studentBox) return;

  studentBox.innerHTML = danhSach.danhSach
    .map(
      (sv) => `
    <tr data-id="${sv.maSV}">
        <td>${sv.maSV}</td>
        <td>${sv.tenSV}</td>
        <td>${sv.diemToan}</td>
        <td>${sv.diemVan}</td>
        <td>${sv.xepLoai()}</td>
        <td>
          <button class="btn-delete">Xóa</button>
          <button class="btn-edit">Sửa</button>
        </td>
      </tr>
   `
    )
    .join("");
};
