import { DanhSachSV } from "./services/data.services.js";
import { renderDanhSach } from "./ui/studentList.ui.js";
import { StudentFormController } from "./controllers/studentForm.controllers.js";
import { StudentRowController } from "./controllers/studentRow.controllers.js";

const danhSach = new DanhSachSV();

const init = () => {
  const formController = new StudentFormController(danhSach);
  const rowController = new StudentRowController(danhSach, formController);

  renderDanhSach(danhSach);
};

document.addEventListener("DOMContentLoaded", init);
