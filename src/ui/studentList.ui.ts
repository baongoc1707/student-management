import { DanhSachSV } from "../services/data.services.js";

export const renderDanhSach = (ds: DanhSachSV) => {
  const studentBox = document.querySelector(".student-table");

  if (!studentBox) return;

  const danhSach = ds.hienThi();

  if (danhSach.length === 0) {
    studentBox.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-gray-500 py-8">
          There is no new students. Please add!
        </td>
      </tr>
    `;
    return;
  }

  studentBox.innerHTML = `
    <thead class="bg-gray-200">
      <tr>
        <th class="border border-gray-400 px-4 py-2 font-semibold">Mã SV</th>
        <th class="border border-gray-400 px-4 py-2 font-semibold">Họ và tên</th>
        <th class="border border-gray-400 px-4 py-2 font-semibold">Điểm Toán</th>
        <th class="border border-gray-400 px-4 py-2 font-semibold">Điểm Văn</th>
        <th class="border border-gray-400 px-4 py-2 font-semibold">Xếp loại</th>
      </tr>
    </thead>
    <tbody>
      ${danhSach
        .map(
          (sv) => `
        <tr 
          data-id="${sv.maSV}" 
          class="border border-solid border-gray-400 hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <td class="text-center">${sv.maSV}</td>
          <td>${sv.tenSV}</td>
          <td class="text-center">${sv.diemToan}</td>
          <td class="text-center">${sv.diemVan}</td>
          <td class="text-center font-semibold ${getXepLoaiColor(
            sv.xepLoai()
          )}">${sv.xepLoai()}</td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  `;
};

const getXepLoaiColor = (xepLoai: string): string => {
  switch (xepLoai) {
    case "Giỏi":
      return "text-green-600";
    case "Khá":
      return "text-blue-600";
    case "Trung bình":
      return "text-yellow-600";
    case "Yếu":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};
