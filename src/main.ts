import { DanhSachSV } from "./services/data.services.js";
import { renderDanhSach } from "./ui/studentList.ui.js";
import { StudentFormController } from "./controllers/studentForm.controllers.js";

const danhSach = new DanhSachSV();

const init = () => {
  new StudentFormController(danhSach);
  renderDanhSach(danhSach);
};

document.addEventListener("DOMContentLoaded", init);
