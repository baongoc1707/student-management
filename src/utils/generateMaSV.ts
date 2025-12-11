export function createCounter() {
  let counter = 1;

  return function () {
    // Định dạng 2 chữ số "0x" cho maSV
    const id = `SV${counter.toString().padStart(2, "0")}`;
    counter++;
    return id;
  };
}

//Lỗi reset bộ đếm -> tạo bộ đếm dùng chung
export const generateMaSV = createCounter();
