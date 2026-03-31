import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, ImageRun, HeadingLevel, AlignmentType, WidthType, BorderStyle, TableLayoutType, ShadingType } from 'docx';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMG_DIR = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\700b2e24-1929-421d-b91a-d7ca98588532';
const OUT_PATH = 'C:\\Users\\admin\\.gemini\\antigravity\\scratch\\HIS\\src\\docs\\SRS_StaffSite.docx';

// Helper: load image and resize to fit page width (~600px)
async function loadImage(filename) {
  const fp = path.join(IMG_DIR, filename);
  if (!fs.existsSync(fp)) { console.warn('Image not found:', fp); return null; }
  const meta = await sharp(fp).metadata();
  const maxW = 600;
  const ratio = Math.min(maxW / meta.width, 1);
  const w = Math.round(meta.width * ratio);
  const h = Math.round(meta.height * ratio);
  const buf = await sharp(fp).resize(w, h).png().toBuffer();
  return { buf, w, h };
}

function heading(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({ heading: level, children: [new TextRun({ text, bold: true })] });
}

function para(text, opts = {}) {
  return new Paragraph({ children: [new TextRun({ text, ...opts })], spacing: { after: 100 } });
}

function boldPara(text) {
  return para(text, { bold: true, size: 22 });
}

function emptyLine() {
  return new Paragraph({ children: [] });
}

// Simplified table builder
function makeTable(headers, rows, colWidths) {
  const borderStyle = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
  const borders = { top: borderStyle, bottom: borderStyle, left: borderStyle, right: borderStyle };

  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => new TableCell({
      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 18, font: 'Arial' })], alignment: AlignmentType.LEFT })],
      shading: { type: ShadingType.SOLID, color: '2563EB', fill: '2563EB' },
      borders,
      width: colWidths ? { size: colWidths[i], type: WidthType.PERCENTAGE } : undefined,
    })),
  });

  // Override header text color
  const headerRowWhite = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => new TableCell({
      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 18, font: 'Arial', color: 'FFFFFF' })], alignment: AlignmentType.LEFT })],
      shading: { type: ShadingType.SOLID, color: '2563EB', fill: '2563EB' },
      borders,
      width: colWidths ? { size: colWidths[i], type: WidthType.PERCENTAGE } : undefined,
    })),
  });

  const dataRows = rows.map((row, ri) => new TableRow({
    children: row.map((cell, ci) => new TableCell({
      children: [new Paragraph({ children: [new TextRun({ text: String(cell), size: 18, font: 'Arial' })], alignment: AlignmentType.LEFT })],
      shading: ri % 2 === 1 ? { type: ShadingType.SOLID, color: 'F8FAFC', fill: 'F8FAFC' } : undefined,
      borders,
      width: colWidths ? { size: colWidths[ci], type: WidthType.PERCENTAGE } : undefined,
    })),
  }));

  return new Table({
    rows: [headerRowWhite, ...dataRows],
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
  });
}

async function imageParagraph(filename, caption) {
  const img = await loadImage(filename);
  const children = [];
  if (img) {
    children.push(new Paragraph({
      children: [new ImageRun({ data: img.buf, transformation: { width: img.w, height: img.h }, type: 'png' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 100 },
    }));
  }
  if (caption) {
    children.push(new Paragraph({
      children: [new TextRun({ text: caption, italics: true, size: 18, color: '64748B', font: 'Arial' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }));
  }
  return children;
}

async function main() {
  console.log('Generating SRS_StaffSite.docx...');

  const sections = [];
  const children = [];

  // ======= TITLE PAGE =======
  children.push(emptyLine(), emptyLine(), emptyLine(), emptyLine());
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'TÀI LIỆU THIẾT KẾ CHỨC NĂNG', bold: true, size: 40, font: 'Arial', color: '1E293B' })] }));
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: 'Phân hệ: Staff Site (Nghiệp vụ Lâm sàng)', size: 28, font: 'Arial', color: '2563EB' })] }));
  children.push(emptyLine());
  children.push(makeTable(['Mục', 'Nội dung'], [
    ['Hệ thống', 'Trạm Y Tế HIS'],
    ['Phân hệ', 'Staff Site (Cổng Nghiệp vụ Lâm sàng)'],
    ['URL gốc', '/his/*'],
    ['Đối tượng', 'Nhân viên tiếp đón, Điều dưỡng, Bác sĩ (Role: staff)'],
    ['Phiên bản', '2.1'],
    ['Ngày', '31/03/2026'],
  ], [30, 70]));

  // ======= UC LIST =======
  children.push(emptyLine());
  children.push(heading('2. Danh sách Use Case', HeadingLevel.HEADING_1));

  children.push(heading('Module 1 — Xác thực', HeadingLevel.HEADING_2));
  children.push(makeTable(['ID', 'Tên Use Case', 'Ưu tiên'], [
    ['UC-S01', 'Đăng nhập hệ thống', 'Cao'],
  ], [15, 65, 20]));

  children.push(heading('Module 2 — Tiếp đón', HeadingLevel.HEADING_2));
  children.push(makeTable(['ID', 'Tên Use Case', 'Ưu tiên'], [
    ['UC-S02', 'Thêm mới tiếp đón bệnh nhân', 'Cao'],
    ['UC-S03', 'Quét CCCD / Quét mã thẻ BHYT', 'Cao'],
  ], [15, 65, 20]));

  children.push(heading('Module 3 — Danh sách đăng ký', HeadingLevel.HEADING_2));
  children.push(makeTable(['ID', 'Tên Use Case', 'Ưu tiên'], [
    ['UC-S04', 'Xem danh sách đăng ký khám bệnh', 'Cao'],
    ['UC-S05', 'Xem chi tiết thông tin đăng ký', 'Cao'],
    ['UC-S06', 'Chỉnh sửa thông tin đăng ký', 'TB'],
    ['UC-S07', 'Xóa bản ghi đăng ký', 'TB'],
    ['UC-S08', 'Thanh toán viện phí', 'Cao'],
    ['UC-S09', 'Thêm chỉ định cận lâm sàng', 'Cao'],
    ['UC-S10', 'Kê đơn thuốc', 'Cao'],
    ['UC-S16', 'Xem thông tin khác (Đăng ký / Lịch sử khám / BHYT)', 'Cao'],
    ['UC-S17', 'Khám bệnh — Tạo mới thông tin khám bệnh', 'Cao'],
    ['UC-S18', 'Xem thông tin khám bệnh (Refer → UC-S12)', 'Cao'],
  ], [15, 65, 20]));

  children.push(heading('Module 4 — Khám bệnh ngoại trú', HeadingLevel.HEADING_2));
  children.push(makeTable(['ID', 'Tên Use Case', 'Ưu tiên'], [
    ['UC-S11', 'Xem danh sách khám bệnh ngoại trú', 'Cao'],
    ['UC-S12', 'Xem chi tiết khám bệnh', 'Cao'],
    ['UC-S13', 'Chỉnh sửa kết quả khám bệnh', 'TB'],
    ['UC-S14', 'In phiếu kết quả khám / đơn thuốc', 'TB'],
    ['UC-S15', 'Hủy xác nhận chi phí', 'Thấp'],
    ['UC-S19', 'Xem lịch sử khám bệnh', 'Cao'],
  ], [15, 65, 20]));

  // ======= UC DETAILS =======
  children.push(heading('3. Chi tiết Use Case', HeadingLevel.HEADING_1));

  // --- UC-S01 ---
  children.push(heading('MODULE 1: XÁC THỰC', HeadingLevel.HEADING_2));
  children.push(heading('UC-S01: Đăng nhập hệ thống', HeadingLevel.HEADING_3));
  children.push(makeTable(['Thuộc tính', 'Nội dung'], [
    ['Actor', 'Tất cả nhân viên'], ['URL', '/login'],
  ], [30, 70]));
  children.push(...await imageParagraph('login_page_final_1774862441051.png', 'Hình 1: Màn hình Đăng nhập'));
  children.push(boldPara('Thành phần UI:'));
  children.push(makeTable(['#', 'Thành phần', 'Loại', 'Mô tả'], [
    ['1', 'Logo + Tên hệ thống', 'Icon + Text', 'Syringe icon, "Trạm Y Tế HIS"'],
    ['2', 'Tên đăng nhập', 'Input (text)', 'Bắt buộc — Username'],
    ['3', 'Mật khẩu', 'Input (password)', 'Bắt buộc — Ký tự ẩn'],
    ['4', 'Nút Đăng nhập', 'Button (Primary)', 'Submit → redirect theo role'],
    ['5', 'Quick-fill Pills', 'Button (ghost)', 'Điền nhanh: "admin/admin", "staff/staff"'],
  ], [5, 25, 20, 50]));
  children.push(boldPara('Luồng chính:'));
  children.push(para('1. Truy cập URL → Hiển thị Login.'));
  children.push(para('2. Nhập username + password → Nhấn Đăng nhập.'));
  children.push(para('3. Role staff → /his/reception; Role admin → /admin/permissions.'));
  children.push(para('[3a] Sai thông tin: Toast lỗi, cho phép thử lại.'));

  // --- UC-S02/03 ---
  children.push(heading('MODULE 2: TIẾP ĐÓN', HeadingLevel.HEADING_2));
  children.push(heading('UC-S02 + UC-S03: Tiếp đón Bệnh nhân', HeadingLevel.HEADING_3));
  children.push(makeTable(['Thuộc tính', 'Nội dung'], [
    ['Actor', 'Nhân viên Tiếp đón'], ['URL', '/his/reception'],
  ], [30, 70]));
  children.push(...await imageParagraph('reception_page_top_1774864522822.png', 'Hình 2: Màn hình Tiếp đón Bệnh nhân'));
  children.push(boldPara('Thành phần UI chi tiết:'));
  children.push(makeTable(['#', 'Thành phần', 'Loại', 'Mô tả'], [
    ['', 'HEADER', '', ''],
    ['1', 'Tiêu đề', 'Heading', '"Tiếp đón Bệnh nhân"'],
    ['2', 'Nút Làm mới (F5)', 'Button (outline)', 'Reset form'],
    ['3', 'Nút Lưu & Tiếp đón', 'Button (Primary)', 'Submit tạo bản ghi'],
    ['4', 'Tìm kiếm nhanh', 'Input (search)', 'Mã BN, Họ tên, CMND, BHYT'],
    ['5', 'Nút Quét CCCD', 'Button (Primary)', 'Kích hoạt đầu đọc CCCD'],
    ['6', 'Nút Quét mã thẻ', 'Button (Outline)', 'Kích hoạt QR/barcode'],
    ['', 'THÔNG TIN THẺ BHYT', '', ''],
    ['7', 'Đối tượng', 'Select', 'BHYT / Viện phí / Miễn phí'],
    ['8', 'Trẻ em không thẻ', 'Checkbox', ''],
    ['9', 'Số thẻ BHYT', 'Input (masked)', 'Format: __ - __ - ___ - ___'],
    ['10', 'Nơi ĐKKCB ban đầu', 'Select', 'Mã CSKCB'],
    ['11', 'Hiệu lực (Từ ngày)', 'Date', ''],
    ['12', 'Đến ngày', 'Date', ''],
    ['13', 'Đủ 5 năm', 'Date', ''],
    ['14', 'Loại tuyến', 'Select', 'Đúng tuyến / Trái tuyến'],
    ['15', 'Khu vực', 'Select', 'Bình thường / K1/K2/K3'],
    ['16', 'Ngày miễn cùng chi trả', 'Date', ''],
    ['17', 'Hình thức bảo hiểm', 'Checkboxes', 'Chuyển tuyến, Cấp cứu, Nơi khác đến'],
    ['', 'THÔNG TIN HÀNH CHÍNH', '', ''],
    ['18', 'Mã bệnh nhân', 'Input (readonly)', 'Tự sinh'],
    ['19', 'Họ và tên bệnh nhân*', 'Input (text)', 'Bắt buộc'],
    ['20', 'Giới tính', 'Button Group', 'Nam / Nữ / Khác'],
    ['21', 'Ngày sinh', 'Date', ''],
    ['22', 'Tuổi', 'Input (readonly)', 'Tự tính'],
    ['23', 'Số điện thoại', 'Input', ''],
    ['24', 'Số thẻ lao động', 'Input', ''],
    ['25', 'Dân tộc', 'Select', ''],
    ['26', 'Quốc tịch', 'Select', ''],
    ['27', 'Nghề nghiệp', 'Select', ''],
    ['28', 'Nơi làm việc', 'Input', ''],
    ['29', 'Khoa / Phòng BN', 'Input', ''],
    ['30', 'Địa chỉ thường trú', 'Input', ''],
    ['31', 'Tỉnh / Thành phố', 'Select', ''],
    ['32', 'Phường / Xã', 'Select', ''],
    ['33', 'Thôn / Xóm', 'Input', ''],
    ['', 'PANEL PHẢI', '', ''],
    ['34', 'Card: Thông tin tiếp đón', 'Table Card', 'Phòng khám / Tổng BN / Đang chờ'],
    ['35', 'Card: Các lần đăng ký', 'Sidebar Card', '+ icon ↗ mở modal'],
    ['36', 'Card: Lịch sử khám bệnh', 'Sidebar Card', '+ icon ↗ mở modal'],
    ['37', 'Card: Lịch sử sử dụng BHYT', 'Sidebar Card', '+ icon ↗ mở modal'],
  ], [5, 28, 20, 47]));

  // --- MODULE 3 ---
  children.push(heading('MODULE 3: DANH SÁCH ĐĂNG KÝ', HeadingLevel.HEADING_2));

  // UC-S04
  children.push(heading('UC-S04: Xem danh sách đăng ký', HeadingLevel.HEADING_3));
  children.push(...await imageParagraph('registration_list_page_1774862373923.png', 'Hình 3: Màn hình Danh sách đăng ký'));
  children.push(makeTable(['#', 'Thành phần', 'Mô tả'], [
    ['1', 'Thông tin BN', 'Input (text) — Mã BN, Họ tên, CMND'],
    ['2', 'Ngày tiếp nhận (Từ)', 'Date'],
    ['3', 'Ngày tiếp nhận (Đến)', 'Date'],
    ['4', 'Nút Tìm kiếm', 'Button (Primary)'],
    ['5', 'Nút Xuất Excel', 'Button (outline, green)'],
    ['6', 'Cột: Thao tác', '3 icon: Khám bệnh, Thanh toán, Thêm'],
    ['7', 'Cột: STT, Ngày tiếp nhận, Số tiếp nhận, Mã BN, Tên BN, Đối tượng, Dịch vụ, Nơi TH', 'Table columns'],
  ], [5, 30, 65]));
  children.push(para('Hành vi: Click dòng → mở Chi tiết đăng ký (UC-S05).'));

  // UC-S05
  children.push(heading('UC-S05: Xem chi tiết thông tin đăng ký', HeadingLevel.HEADING_3));
  children.push(...await imageParagraph('registration_detail_overview_1774862514549.png', 'Hình 4: Màn hình Chi tiết đăng ký'));
  children.push(makeTable(['#', 'Thành phần', 'Mô tả'], [
    ['1', 'Breadcrumb', '"Danh sách đăng ký > Chi tiết đăng ký"'],
    ['2', 'Action Bar (View)', 'In phiếu, Thanh toán, Khám bệnh, Dropdown Thao tác'],
    ['3', 'Action Bar (Edit)', 'Chỉ Hủy + Lưu'],
    ['4', 'Section: Thông tin thẻ BHYT', 'Giống UC-S02, mục 7-17'],
    ['5', 'Section: Thông tin hành chính', 'Giống UC-S02, mục 18-33'],
    ['6', 'Section: Thông tin đăng ký', 'Số tiếp nhận, STT, Ngày/Giờ, Dịch vụ, Phòng khám'],
    ['7', 'Panel phải: Thông tin tiếp đón', 'Bảng thống kê BN theo phòng'],
    ['8', 'Panel phải: Các lần đăng ký', 'Card + icon ↗ → UC-S16.1'],
    ['9', 'Panel phải: Lịch sử khám bệnh', 'Card + icon ↗ → UC-S16.2'],
    ['10', 'Panel phải: Lịch sử sử dụng BHYT', 'Card + icon ↗ → UC-S16.3'],
  ], [5, 35, 60]));

  // UC-S06, S07
  children.push(heading('UC-S06: Chỉnh sửa thông tin đăng ký', HeadingLevel.HEADING_3));
  children.push(para('Luồng: Thao tác → Chỉnh sửa → Action bar = Hủy + Lưu → Sửa → Lưu → ConfirmationModal.'));

  children.push(heading('UC-S07: Xóa bản ghi đăng ký', HeadingLevel.HEADING_3));
  children.push(para('Luồng: Thao tác → Xóa → ConfirmationModal → Xác nhận → Quay về danh sách.'));

  // UC-S08
  children.push(heading('UC-S08: Thanh toán viện phí', HeadingLevel.HEADING_3));
  children.push(...await imageParagraph('payment_view_1774862525307.png', 'Hình 5: Màn hình Thanh toán viện phí'));
  children.push(makeTable(['#', 'Thành phần', 'Mô tả'], [
    ['1', 'Breadcrumb', '"... > Chi tiết đăng ký > Thanh toán"'],
    ['2', 'Nút Xác nhận', 'Button (Primary, green)'],
    ['3', 'Card: Thông tin cá nhân', 'Số tiếp nhận, Mã BN, Họ tên, Địa chỉ, BHYT, Đối tượng'],
    ['4', 'Card: Thanh toán', 'Ngày thu (Date), Hình thức (Select)'],
    ['5', 'Card: Chứng từ', 'Số quyển, Số biên lai'],
    ['6', 'Bảng chi phí', 'STT, Dịch vụ, SL, Đơn giá, Thành tiền, BHYT, BN Trả'],
  ], [5, 30, 65]));

  // UC-S09
  children.push(heading('UC-S09: Thêm chỉ định cận lâm sàng', HeadingLevel.HEADING_3));
  children.push(makeTable(['Thuộc tính', 'Nội dung'], [
    ['Actor', 'Bác sĩ'],
    ['Precondition', 'Đang ở Chi tiết khám bệnh, bản ghi đã tồn tại'],
    ['Điểm vào', 'Nút "Thêm chỉ định" tại section Chỉ định dịch vụ'],
  ], [30, 70]));
  children.push(...await imageParagraph('overlay_them_chi_dinh_1774865124150.png', 'Hình 6: Overlay Thêm chỉ định dịch vụ'));
  children.push(makeTable(['#', 'Thành phần', 'Loại', 'Mô tả'], [
    ['', 'HEADER BỆNH NHÂN', '', ''],
    ['1', 'Avatar + Tên BN', 'Icon + Text', 'Tên (Giới tính - Tuổi)'],
    ['2', 'Mã BN', 'Text', 'readonly'],
    ['3', 'Bảo hiểm y tế', 'Text', 'Số thẻ BHYT'],
    ['4', 'Phòng khám', 'Text', 'Mã | Tên phòng khám'],
    ['5', 'Chẩn đoán', 'Text (red)', 'ICD10 + diễn giải'],
    ['6', 'Tổng tiền / BHYT / Thực thu', 'Summary Card', 'Tính tự động'],
    ['', 'PANEL TRÁI: NHÓM DV', '', ''],
    ['7', 'Nút "Tất cả dịch vụ"', 'Button (Primary)', 'Hiển thị toàn bộ'],
    ['8', 'Ô tìm kiếm', 'Input (search)', '"Mã / tên dịch vụ..."'],
    ['9', 'Cây danh mục', 'Tree View', '1.Khám bệnh, 3.Xét nghiệm, 4.CĐHA, 5.TDCN, 6.PT, 7.TT'],
    ['', 'PANEL GIỮA: DS DỊCH VỤ', '', ''],
    ['10', 'Danh sách DV', 'List', 'STT, Mã+Tên, Giá BHYT, Giá Viện phí, Nút (+)'],
    ['', 'PANEL PHẢI: CHỈ ĐỊNH', '', ''],
    ['11', 'Bác sĩ chỉ định', 'Select', ''],
    ['12', 'Ngày yêu cầu', 'Date', ''],
    ['13', 'Giờ', 'Time', ''],
    ['14', 'Bảng "DỊCH VỤ CHỈ ĐỊNH"', 'Table', 'Checkbox, STT, Mã, Tên DV, SL, Loại giá, Đơn giá, Thành tiền, BHYT trả, BN trả, Ngày YC, BS, Thao tác(Sửa/Xóa)'],
    ['', 'FOOTER', '', ''],
    ['15', 'Nút Đóng (Esc)', 'Button (outline)', 'Đóng overlay'],
    ['16', 'Nút In', 'Button (outline)', 'In phiếu chỉ định'],
    ['17', 'Nút Lưu', 'Button (Primary)', 'Lưu chỉ định'],
  ], [5, 25, 20, 50]));
  children.push(boldPara('Luồng chính:'));
  children.push(para('1. Nhấn "Thêm chỉ định" → Full-page overlay xuất hiện.'));
  children.push(para('2. Panel trái: Chọn nhóm DV trong cây danh mục.'));
  children.push(para('3. Panel giữa: DS DV hiện theo nhóm → Nhấn (+) để thêm.'));
  children.push(para('4. Panel phải: DV thêm vào bảng, tự tính giá.'));
  children.push(para('5. Chọn BS chỉ định, Ngày/Giờ → Nhấn Lưu → ConfirmationModal → Đóng overlay.'));

  // UC-S10
  children.push(heading('UC-S10: Kê đơn thuốc', HeadingLevel.HEADING_3));
  children.push(makeTable(['Thuộc tính', 'Nội dung'], [
    ['Actor', 'Bác sĩ'],
    ['Precondition', 'Đang ở Chi tiết khám bệnh, bản ghi đã tồn tại'],
    ['Điểm vào', 'Nút "Thêm thuốc" tại section Kê đơn thuốc'],
  ], [30, 70]));
  children.push(...await imageParagraph('overlay_them_thuoc_1774865149901.png', 'Hình 7: Overlay Kê đơn thuốc'));
  children.push(makeTable(['#', 'Thành phần', 'Loại', 'Mô tả'], [
    ['', 'HEADER', '', ''],
    ['1', 'Tiêu đề', 'Heading', '"KÊ ĐƠN THUỐC"'],
    ['2', 'Patient Info Bar', 'Row', 'Tên BN, BHYT, Chẩn đoán'],
    ['', 'PANEL TRÁI: TT ĐƠN THUỐC', '', ''],
    ['3', 'Hình thức mua', 'Button Group', '"Tại bệnh viện" / "Mua ngoài"'],
    ['4', 'Nơi lĩnh thuốc', 'Select', '"Kho dược Trạm y tế"'],
    ['5', 'Ngày kê + Giờ', 'Date + Time', ''],
    ['6', 'Bác sĩ kê đơn', 'Select', ''],
    ['7', 'Ngày tái khám', 'Date', ''],
    ['8', 'Số tháng', 'Input', ''],
    ['9', 'Lời dặn bác sĩ', 'Textarea', ''],
    ['', 'PANEL PHẢI TRÊN: TÌM THUỐC', '', ''],
    ['10', 'Tìm dược phẩm', 'Input (search)', '"Mã / Tên / Hoạt chất..."'],
    ['11', 'Số ngày', 'Input (number)', ''],
    ['12', 'Sáng / Trưa / Chiều', '3x Input', 'Liều mỗi buổi'],
    ['13', 'Nút Thêm vào đơn', 'Button (Primary)', ''],
    ['', 'BẢNG ĐƠN THUỐC', '', ''],
    ['14', 'STT, Mã dược', 'Columns', ''],
    ['15', 'Tên dược / Hoạt chất', 'Text + subtext', ''],
    ['16', 'ĐVT, Số ngày', 'Text, Number', ''],
    ['17', 'Sáng-Trưa-Chiều-Tối', '4x Input (editable)', 'Inline edit liều'],
    ['18', 'Số lượng', 'Number (auto)', 'Ngày × (S+T+C+T)'],
    ['19', 'Cách dùng', 'Text', '"Uống sau ăn"'],
    ['20', 'Thao tác', 'Icon Button', 'Xóa (🗑️)'],
    ['', 'FOOTER', '', ''],
    ['21', 'Tổng khoản / Thành tiền', 'Number', 'Tổng tiền VNĐ'],
    ['22', 'Nút Đóng (Esc)', 'Button (outline)', ''],
    ['23', 'Nút In đơn thuốc', 'Button (outline)', ''],
    ['24', 'Nút Lưu đơn', 'Button (Primary)', ''],
  ], [5, 25, 20, 50]));
  children.push(boldPara('Luồng chính:'));
  children.push(para('1. Nhấn "Thêm thuốc" → Full-page overlay.'));
  children.push(para('2. Panel trái: Điền TT đơn thuốc (hình thức mua, nơi lĩnh, BS, lời dặn).'));
  children.push(para('3. Panel phải: Tìm thuốc → Nhập liều (Số ngày, S, T, C) → Thêm vào đơn.'));
  children.push(para('4. Thuốc thêm vào bảng, tự tính số lượng. Có thể sửa inline.'));
  children.push(para('5. Nhấn Lưu đơn → Lưu → Đóng overlay.'));

  // UC-S16
  children.push(heading('UC-S16: Xem thông tin khác (Modals)', HeadingLevel.HEADING_3));
  children.push(para('Precondition: Đang ở UC-S05, panel phải sidebar. Nhấn icon ↗ trên mỗi card.'));

  children.push(boldPara('UC-S16.1: Các lần đăng ký'));
  children.push(...await imageParagraph('modal_cac_lan_dang_ky_1774865013578.png', 'Hình 8: Modal — Các lần đăng ký khám bệnh'));
  children.push(makeTable(['#', 'Thành phần', 'Mô tả'], [
    ['1', 'Tiêu đề', '"Các lần đăng ký khám bệnh"'],
    ['2', 'Bộ lọc: Từ ngày, Đến ngày', 'Date + Date'],
    ['3', 'Nút Làm mới', 'Button (Primary)'],
    ['4', 'Bảng', 'STT, Ngày tiếp nhận, Số tiếp nhận, Dịch vụ, Nơi thực hiện'],
  ], [5, 30, 65]));

  children.push(boldPara('UC-S16.2: Lịch sử khám bệnh'));
  children.push(...await imageParagraph('modal_lich_su_kham_benh_1774865038574.png', 'Hình 9: Modal — Lịch sử khám bệnh'));
  children.push(makeTable(['#', 'Thành phần', 'Mô tả'], [
    ['1', 'Tiêu đề', '"Lịch sử khám bệnh"'],
    ['2', 'Bộ lọc: Từ ngày, Đến ngày', 'Date + Date'],
    ['3', 'Nút Làm mới', 'Button (Primary)'],
    ['4', 'Bảng', 'STT, Ngày khám, Phòng khám, Bác sĩ, Chẩn đoán'],
  ], [5, 30, 65]));

  children.push(boldPara('UC-S16.3: Lịch sử sử dụng BHYT'));
  children.push(...await imageParagraph('modal_lich_su_bhyt_1774865067350.png', 'Hình 10: Modal — Lịch sử sử dụng thẻ BHYT'));
  children.push(makeTable(['#', 'Thành phần', 'Mô tả'], [
    ['1', 'Tiêu đề', '"Lịch sử sử dụng thẻ BHYT"'],
    ['2', 'Card: Thông tin hành chính', 'Họ tên, Ngày sinh, Địa chỉ'],
    ['3', 'Card: Thông tin bảo hiểm', 'Số BHXH, Mã ĐKKCB, Cơ quan BHXH, Mã KV, Hạn thẻ'],
    ['4', 'Bảng: Danh sách đợt điều trị', 'Mã HS, Mã CSKCB, Ngày vào/ra, Tình trạng, Tên bệnh, Kết quả'],
    ['5', 'Nút Đóng', 'Button (outline)'],
  ], [5, 30, 65]));

  // UC-S17
  children.push(heading('UC-S17: Khám bệnh — Tạo mới', HeadingLevel.HEADING_3));
  children.push(para('Precondition: hasRecord = false. Điểm vào: Nút Khám bệnh (UC-S05) hoặc icon 🩺 (UC-S04).'));
  children.push(para('Form trống, Action Bar = Hủy + Lưu. Sau khi lưu → hasRecord=true → chuyển sang UC-S18.'));

  // UC-S18
  children.push(heading('UC-S18: Xem thông tin khám bệnh (Refer → UC-S12)', HeadingLevel.HEADING_3));
  children.push(...await imageParagraph('examination_detail_with_data_1774862543955.png', 'Hình 11: Chi tiết khám bệnh (từ Đăng ký, hasRecord=true)'));
  children.push(para('Khi hasRecord=true → UI giống UC-S12. Refer → UC-S12.'));

  // --- MODULE 4 ---
  children.push(heading('MODULE 4: KHÁM BỆNH NGOẠI TRÚ', HeadingLevel.HEADING_2));

  // UC-S11
  children.push(heading('UC-S11: Danh sách khám bệnh ngoại trú', HeadingLevel.HEADING_3));
  children.push(...await imageParagraph('outpatient_exam_list_page_1774862389175.png', 'Hình 12: Màn hình Danh sách khám bệnh ngoại trú'));
  children.push(makeTable(['#', 'Thành phần', 'Mô tả'], [
    ['1', 'Bộ lọc', 'Thời gian, Khoa/PB, Trạng thái, Loại HS, TT BN, Nút Tìm kiếm'],
    ['2', 'Data Table', 'Thao tác, STT khám, Mã BN, Tên BN, GT, Năm sinh, Đối tượng, BHYT, Xác nhận, Ngày YC, PK'],
  ], [5, 25, 70]));
  children.push(para('Hành vi: Click dòng → UC-S12.'));

  // UC-S12
  children.push(heading('UC-S12: Xem chi tiết khám bệnh', HeadingLevel.HEADING_3));
  children.push(...await imageParagraph('outpatient_exam_detail_page_1774862395951.png', 'Hình 13: Màn hình Chi tiết khám bệnh ngoại trú'));
  children.push(makeTable(['#', 'Thành phần', 'Mô tả'], [
    ['', 'ACTION BAR (View)', ''],
    ['1', 'Nút Hủy xác nhận chi phí', 'Button (outline, danger)'],
    ['2', 'Nút In phiếu', 'Button (outline)'],
    ['3', 'Dropdown Thao tác', 'Chỉnh sửa, Xóa'],
    ['', 'HEADER INFO BAR', ''],
    ['4', 'Mã BN, Họ tên, Giới tính, Ngày sinh, BHYT', 'Info Row (readonly)'],
    ['', 'THÔNG TIN KHÁM BỆNH (18 trường)', ''],
    ['5', 'Ngày vào khám, Giờ, Phòng khám', 'Date, Time, Select'],
    ['6', 'Triệu chứng, Lý do vào viện', '2x Textarea'],
    ['7', 'Bệnh chính (ICD10), Diễn giải', 'Select + Input'],
    ['8', 'Bệnh kèm theo, Diễn giải', 'Multi-select tags + Input'],
    ['9', 'Tư vấn điều trị, Diễn biến', '2x Textarea'],
    ['10', 'Loại tai nạn, Kết quả, Loại KCB, Bác sĩ', '4x Select'],
    ['11', 'Kết thúc khám, PP khám, Ghi chú', 'Date+Time, Select, Input'],
    ['', 'CHỈ SỐ SINH TỒN', ''],
    ['12', 'Mạch, Nhiệt độ, HA min/max, Nhịp thở, Cân nặng', '6x Input (number)'],
    ['', 'CHỈ ĐỊNH DỊCH VỤ', ''],
    ['13', 'Nút In phiếu + Nút Thêm chỉ định', 'Buttons → UC-S09'],
    ['14', 'Bảng chỉ định', 'STT, Tên DV, Ngày YC, Loại giá, SL, Đơn giá, TT, BHYT, BN, BS, TT'],
    ['', 'KÊ ĐƠN THUỐC', ''],
    ['15', 'Nút In phiếu + Nút Thêm thuốc', 'Buttons → UC-S10'],
    ['16', 'Bảng thuốc', 'STT, Tên thuốc, Hàm lượng, SL, Ngày, Cách dùng, Nơi mua'],
    ['', 'PANEL PHẢI: LỊCH SỬ', ''],
    ['17', 'Timeline 3 đợt gần nhất', 'Card: Ngày, Phòng, Chẩn đoán'],
    ['18', 'Nút "Xem tất cả lịch sử"', 'Button (outline) → UC-S19'],
  ], [5, 35, 60]));
  children.push(para('Lưu ý: Nút Thêm chỉ định (#13) và Thêm thuốc (#15) LUÔN hiện, không cần Edit Mode.'));

  // UC-S13,14,15
  children.push(heading('UC-S13: Chỉnh sửa kết quả khám', HeadingLevel.HEADING_3));
  children.push(para('Thao tác → Chỉnh sửa → Action bar = Hủy + Lưu → Sửa → Lưu → ConfirmationModal.'));
  children.push(heading('UC-S14: In phiếu', HeadingLevel.HEADING_3));
  children.push(para('3 nút in: In phiếu (Header), In phiếu (Chỉ định), In phiếu (Đơn thuốc).'));
  children.push(heading('UC-S15: Hủy xác nhận chi phí', HeadingLevel.HEADING_3));
  children.push(para('Hủy xác nhận chi phí → ConfirmationModal → Hủy trạng thái.'));

  // UC-S19
  children.push(heading('UC-S19: Xem lịch sử khám bệnh', HeadingLevel.HEADING_3));
  children.push(...await imageParagraph('outpatient_exam_history_modal_1774862404023.png', 'Hình 14: Modal Lịch sử khám chữa bệnh'));
  children.push(makeTable(['#', 'Thành phần', 'Mô tả'], [
    ['1', 'Header', '"Lịch sử khám chữa bệnh" + BN + Mã BN + Nút Đóng'],
    ['2', 'Left Sidebar (320px)', 'DS đợt khám (cards, scrollable): Ngày, PK, Chẩn đoán'],
    ['3', 'Visit Header', 'Phòng khám & BS, Chẩn đoán (red)'],
    ['4', 'Tab "Dịch vụ (N)"', 'Grouped Table: STT, Tên DV, Loại giá, SL, BS, Trạng thái'],
    ['5', 'Tab "Đơn thuốc (N)"', 'Table: STT, Tên thuốc, HL, SL, Ngày, Cách dùng, Nơi mua'],
    ['6', 'Nút "Đóng lịch sử"', 'Button (Primary, dark)'],
  ], [5, 30, 65]));
  children.push(boldPara('Luồng:'));
  children.push(para('Nhấn "Xem tất cả lịch sử" → Modal → Click đợt khám trái → Chi tiết phải → Chuyển tab → Đóng.'));

  // ======= CROSS REFERENCE =======
  children.push(heading('4. Ma trận UC — Tham chiếu chéo', HeadingLevel.HEADING_1));
  children.push(makeTable(['UC', 'Điểm vào', 'Tham chiếu đến'], [
    ['UC-S04', 'Sidebar', 'UC-S05'],
    ['UC-S05', 'UC-S04 (click row)', 'UC-S06, S07, S08, S09, S10, S16, S17, S18'],
    ['UC-S08', 'UC-S05 (Thanh toán)', '—'],
    ['UC-S09', 'UC-S12/S17/S18 (Thêm chỉ định)', '—'],
    ['UC-S10', 'UC-S12/S17/S18 (Thêm thuốc)', '—'],
    ['UC-S16', 'UC-S05 (sidebar ↗)', '—'],
    ['UC-S17', 'UC-S05 (Khám bệnh, hasRecord=false)', 'UC-S09, S10'],
    ['UC-S18', 'UC-S05 (Khám bệnh, hasRecord=true)', '→ UC-S12'],
    ['UC-S11', 'Sidebar', 'UC-S12'],
    ['UC-S12', 'UC-S11 (click row), UC-S18', 'UC-S09, S10, S13-S15, S19'],
    ['UC-S19', 'UC-S12 (Xem tất cả lịch sử)', '—'],
  ], [12, 44, 44]));

  // ======= UI STANDARDS =======
  children.push(heading('5. UI Standards', HeadingLevel.HEADING_1));
  children.push(makeTable(['Tiêu chuẩn', 'Mô tả'], [
    ['Click-to-Row', 'Toàn bộ dòng bảng là vùng click điều hướng'],
    ['Edit Mode Focus', 'isEdit=true → chỉ hiện Hủy + Lưu, ẩn tất cả nút khác'],
    ['Clinical Actions Available', 'Thêm chỉ định / Thêm thuốc luôn hiện khi bản ghi tồn tại'],
    ['Active Sidebar', 'Menu cha giữ active khi ở trang con'],
    ['ConfirmationModal', 'Tất cả action quan trọng hiện Modal xác nhận'],
    ['Badge Color Coding', 'BHYT L4: xanh, L3: xanh lá; Khỏi: xanh, Đỡ: vàng'],
  ], [30, 70]));

  // ======= BUILD DOCUMENT =======
  const doc = new Document({
    styles: {
      default: {
        document: { run: { font: 'Arial', size: 22 } },
        heading1: { run: { font: 'Arial', size: 32, bold: true, color: '1E293B' }, paragraph: { spacing: { before: 400, after: 200 } } },
        heading2: { run: { font: 'Arial', size: 28, bold: true, color: '2563EB' }, paragraph: { spacing: { before: 300, after: 150 } } },
        heading3: { run: { font: 'Arial', size: 24, bold: true, color: '1E293B' }, paragraph: { spacing: { before: 250, after: 120 } } },
      },
    },
    sections: [{ children }],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(OUT_PATH, buffer);
  console.log('Done! File saved to:', OUT_PATH);
  console.log('Size:', (buffer.length / 1024 / 1024).toFixed(2), 'MB');
}

main().catch(console.error);
