import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, ImageRun, HeadingLevel, AlignmentType, WidthType, BorderStyle, ShadingType } from 'docx';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMG = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\700b2e24-1929-421d-b91a-d7ca98588532';
const OUT = 'C:\\Users\\admin\\.gemini\\antigravity\\scratch\\HIS\\src\\docs\\FSD_HIS_System.docx';

async function img(name, maxW = 580) {
  const fp = path.join(IMG, name);
  if (!fs.existsSync(fp)) { console.warn('Missing:', name); return null; }
  const m = await sharp(fp).metadata();
  const r = Math.min(maxW / m.width, 1);
  const buf = await sharp(fp).resize(Math.round(m.width * r), Math.round(m.height * r)).png().toBuffer();
  return { buf, w: Math.round(m.width * r), h: Math.round(m.height * r) };
}

const bdr = { style: BorderStyle.SINGLE, size: 1, color: 'D1D5DB' };
const borders = { top: bdr, bottom: bdr, left: bdr, right: bdr };

function tbl(headers, rows, widths) {
  const hRow = new TableRow({ tableHeader: true, children: headers.map((h, i) =>
    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 18, font: 'Arial', color: 'FFFFFF' })], alignment: AlignmentType.LEFT, spacing: { before: 40, after: 40 } })],
      shading: { type: ShadingType.SOLID, color: '2563EB', fill: '2563EB' }, borders,
      width: widths ? { size: widths[i], type: WidthType.PERCENTAGE } : undefined }))
  });
  const dRows = rows.map((row, ri) => new TableRow({ children: row.map((c, ci) =>
    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(c), size: 18, font: 'Arial', bold: ci === 0 && c.toString().startsWith('[') })], spacing: { before: 30, after: 30 } })],
      shading: ri % 2 === 1 ? { type: ShadingType.SOLID, color: 'F8FAFC', fill: 'F8FAFC' } : undefined, borders,
      width: widths ? { size: widths[ci], type: WidthType.PERCENTAGE } : undefined }))
  }));
  return new Table({ rows: [hRow, ...dRows], width: { size: 100, type: WidthType.PERCENTAGE } });
}

function h1(t) { return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: t, bold: true })], spacing: { before: 400, after: 200 } }); }
function h2(t) { return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: t, bold: true })], spacing: { before: 300, after: 150 } }); }
function h3(t) { return new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: t, bold: true })], spacing: { before: 250, after: 120 } }); }
function p(t, opts = {}) { return new Paragraph({ children: [new TextRun({ text: t, size: 22, font: 'Arial', ...opts })], spacing: { after: 80 } }); }
function bp(t) { return p(t, { bold: true }); }
function empty() { return new Paragraph({}); }
function bullet(t) { return new Paragraph({ children: [new TextRun({ text: '• ' + t, size: 20, font: 'Arial' })], spacing: { after: 60 }, indent: { left: 360 } }); }

async function imgPara(name, caption) {
  const r = []; const d = await img(name);
  if (d) r.push(new Paragraph({ children: [new ImageRun({ data: d.buf, transformation: { width: d.w, height: d.h }, type: 'png' })], alignment: AlignmentType.CENTER, spacing: { before: 150, after: 80 } }));
  if (caption) r.push(new Paragraph({ children: [new TextRun({ text: caption, italics: true, size: 18, color: '6B7280', font: 'Arial' })], alignment: AlignmentType.CENTER, spacing: { after: 200 } }));
  return r;
}

async function main() {
  console.log('Generating FSD document...');
  const c = []; // children

  // === COVER ===
  c.push(empty(), empty(), empty());
  c.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'TÀI LIỆU THIẾT KẾ CHỨC NĂNG', bold: true, size: 44, font: 'Arial', color: '1E293B' })] }));
  c.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Functional Specification Document (FSD)', size: 28, font: 'Arial', color: '6B7280', italics: true })] }));
  c.push(empty());
  c.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'HIS — Hospital Information System', size: 32, font: 'Arial', color: '2563EB', bold: true })] }));
  c.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Trạm Y Tế HIS', size: 26, font: 'Arial', color: '64748B' })] }));
  c.push(empty(), empty());
  c.push(tbl(['Mục', 'Nội dung'], [
    ['Hệ thống', 'Trạm Y Tế HIS (Hospital Information System)'],
    ['Phạm vi', 'Staff Interface + Admin Interface'],
    ['Cấu trúc', 'Module (M) → Feature/Screen (F) → Function/Action (A)'],
    ['Phiên bản', '1.0'],
    ['Ngày', '31/03/2026'],
    ['Tác giả', 'HIS Development Team'],
  ], [25, 75]));

  // === 1. OVERVIEW ===
  c.push(h1('1. Tổng quan'));
  c.push(p('Tài liệu này định nghĩa hệ thống phân cấp chức năng của hệ thống HIS, được cấu trúc theo 3 cấp:'));
  c.push(bullet('Module (M): Phân hệ chức năng cấp cao (VD: Tiếp đón, Đăng ký, Khám bệnh, Phân quyền).'));
  c.push(bullet('Feature/Screen (F): Màn hình (UI Page) cụ thể trong mỗi module.'));
  c.push(bullet('Function/Action (A): Thao tác hoặc chức năng đơn lẻ trong mỗi màn hình.'));
  c.push(empty());
  c.push(bp('Quy ước ký hiệu:'));
  c.push(tbl(['Ký hiệu', 'Ý nghĩa', 'Ví dụ'], [
    ['[M1]', 'Module cấp 1', '[M1] Tiếp đón'],
    ['[F1.1]', 'Feature/Screen thuộc Module 1', '[F1.1] Màn hình Tiếp đón'],
    ['[A1.1.1]', 'Action/Function thuộc Feature 1.1', '[A1.1.1] Thêm mới tiếp đón'],
  ], [15, 40, 45]));

  // === 2. STAFF INTERFACE ===
  c.push(h1('2. Staff Interface — Giao diện Nghiệp vụ'));
  c.push(p('Giao diện dành cho nhân viên y tế: Tiếp đón, Điều dưỡng, Bác sĩ. URL gốc: /his/*'));

  // --- M1: Tiếp đón ---
  c.push(h2('[M1] Tiếp đón (Reception)'));
  c.push(p('Quản lý tiếp nhận bệnh nhân mới, nhập thông tin hành chính và bảo hiểm y tế.'));

  c.push(h3('[F1.1] Màn hình Tiếp đón'));
  c.push(tbl(['Thuộc tính', 'Nội dung'], [
    ['URL', '/his/reception'], ['Actor', 'Nhân viên Tiếp đón'], ['Mô tả', 'Form nhập liệu chính cho luồng tiếp nhận bệnh nhân'],
  ], [25, 75]));
  c.push(...await imgPara('fsd_reception_1774948548615.png', 'Hình F1.1: Màn hình Tiếp đón Bệnh nhân'));
  c.push(bp('Danh sách Function/Action:'));
  c.push(tbl(['ID', 'Tên chức năng', 'Loại', 'Mô tả chi tiết'], [
    ['A1.1.1', 'Thêm mới tiếp đón (Lưu & Tiếp đón)', 'Button (Primary)', 'Điền đầy đủ thông tin → Nhấn "Lưu & Tiếp đón" → Tạo bản ghi đăng ký → Form reset. Nút "Làm mới (F5)" reset form trống.'],
    ['A1.1.2', 'Quét CCCD / Quét mã thẻ BHYT', 'Button (2 nút)', 'Nút "Quét CCCD" kích hoạt đầu đọc CCCD → Auto-fill thông tin hành chính. Nút "Quét mã thẻ" đọc QR/Barcode → Auto-fill thông tin BHYT.'],
    ['A1.1.3', 'Tra cứu lịch sử khám bệnh', 'Panel phải (3 cards)', 'Panel phải gồm 3 card: "Các lần đăng ký", "Lịch sử khám bệnh", "Lịch sử sử dụng BHYT". Mỗi card có icon ↗ mở modal chi tiết.'],
  ], [8, 28, 16, 48]));
  c.push(bp('Thành phần UI chính:'));
  c.push(tbl(['Section', 'Thành phần', 'Mô tả'], [
    ['Header', 'Tiêu đề + Nút Làm mới (F5) + Nút Lưu & Tiếp đón', 'Header hành động'],
    ['Tìm kiếm', 'Input full-width + Nút Quét CCCD + Nút Quét mã thẻ', '"Nhập Mã BN, Họ tên, CMND..."'],
    ['Thông tin thẻ BHYT', 'Đối tượng, Số thẻ BHYT, Hiệu lực, Loại tuyến, Khu vực...', '11 fields BHYT'],
    ['Thông tin hành chính', 'Mã BN (readonly), Họ tên*, Giới tính, Ngày sinh, SĐT, Dân tộc, Quốc tịch, Địa chỉ...', '16 fields hành chính'],
    ['Panel phải', 'Card Thống kê phòng khám + 3 Card lịch sử (↗ modal)', '4 sidebar cards'],
  ], [18, 42, 40]));

  // --- M2: Danh sách đăng ký ---
  c.push(h2('[M2] Danh sách đăng ký (Enrollment)'));
  c.push(p('Quản lý bệnh nhân đã đăng ký trong luồng khám bệnh hiện tại.'));

  c.push(h3('[F2.1] Xem danh sách đăng ký'));
  c.push(tbl(['Thuộc tính', 'Nội dung'], [
    ['URL', '/his/registration-list'], ['Actor', 'Nhân viên Tiếp đón, Điều dưỡng'],
  ], [25, 75]));
  c.push(...await imgPara('fsd_registration_list_1774948555619.png', 'Hình F2.1: Danh sách đăng ký khám bệnh'));
  c.push(tbl(['ID', 'Tên chức năng', 'Loại', 'Mô tả'], [
    ['A2.1.1', 'Tìm kiếm / Lọc bệnh nhân', 'Filter Bar', 'Input TT BN + Ngày từ/đến + Nút Tìm kiếm + Nút Xuất Excel'],
    ['A2.1.2', 'Xem chi tiết (Row Navigation)', 'Click Row', 'Click vào dòng bệnh nhân → Navigate đến [F2.2] Chi tiết đăng ký'],
    ['A2.1.3', 'Thanh toán nhanh (Quick Payment)', 'Icon 💰', 'Icon button trên cột Thao tác → Navigate đến màn Thanh toán'],
    ['A2.1.4', 'Chỉnh sửa nhanh', 'Dropdown ⋯', 'Menu dropdown "Thao tác" → Chỉnh sửa inline'],
    ['A2.1.5', 'Xóa bệnh nhân', 'Dropdown ⋯', 'Menu dropdown → Xóa → ConfirmationModal'],
  ], [8, 28, 16, 48]));
  c.push(bp('Data Table columns: Thao tác (3 icons) | STT | Ngày tiếp nhận | Số tiếp nhận | Mã BN | Tên BN | Đối tượng (Badge) | Dịch vụ | Nơi thực hiện'));

  c.push(h3('[F2.2] Chi tiết đăng ký (Patient Info View)'));
  c.push(...await imgPara('fsd_registration_detail_1774948562936.png', 'Hình F2.2: Chi tiết thông tin đăng ký'));
  c.push(tbl(['ID', 'Tên chức năng', 'Loại', 'Mô tả'], [
    ['A2.2.1', 'Xem chi tiết thông tin hành chính', 'Form (readonly)', 'Section BHYT + Hành chính + Đăng ký hiển thị dạng readonly'],
    ['A2.2.2', 'Chuyển khám bệnh (Bridge → M3)', 'Button "Khám bệnh"', 'Nếu hasRecord=false → tạo mới (form trống, Hủy+Lưu). Nếu hasRecord=true → xem chi tiết khám (→ F3.2)'],
    ['A2.2.3', 'Thanh toán (Payment Processing)', 'Button "Thanh toán"', 'Navigate đến màn Thanh toán: Thông tin cá nhân + Bảng chi phí + Chứng từ biên lai → Nút Xác nhận'],
    ['A2.2.4', 'Chỉnh sửa chi tiết', 'Dropdown → Chỉnh sửa', 'Vào Edit Mode: chỉ hiện Hủy + Lưu, ẩn các nút khác. Form chuyển sang editable.'],
    ['A2.2.5', 'In phiếu đăng ký', 'Button "In phiếu"', 'Mở print preview cho phiếu đăng ký'],
    ['A2.2.6', 'Xóa bản ghi', 'Dropdown → Xóa', 'ConfirmationModal → Xóa → Quay về danh sách'],
    ['A2.2.7', 'Thêm chỉ định cận lâm sàng', 'Button "Thêm chỉ định"', 'Chỉ hiện khi có bản ghi khám bệnh. Mở overlay [F2.3]'],
    ['A2.2.8', 'Thêm đơn thuốc', 'Button "Thêm thuốc"', 'Chỉ hiện khi có bản ghi khám bệnh. Mở overlay [F2.4]'],
  ], [8, 28, 18, 46]));
  c.push(bp('Panel phải: Thống kê BN/phòng + Card Đăng ký (↗ modal) + Card Lịch sử khám (↗ modal) + Card BHYT (↗ modal)'));

  c.push(h3('[F2.3] Tạo chỉ định (Full-page Overlay)'));
  c.push(...await imgPara('overlay_them_chi_dinh_1774865124150.png', 'Hình F2.3: Overlay Thêm chỉ định dịch vụ'));
  c.push(tbl(['Panel', 'Thành phần', 'Mô tả'], [
    ['Header', 'Patient Info Bar', 'Tên BN, Mã BN, BHYT, Phòng khám, Chẩn đoán (ICD), Tổng tiền/BHYT/Thực thu'],
    ['Panel trái', 'Nhóm dịch vụ (Tree View)', 'Cây danh mục expandable: Khám bệnh, Xét nghiệm, CĐHA, TDCN, PT, TT. Ô tìm kiếm mã/tên DV.'],
    ['Panel giữa', 'Danh sách dịch vụ', 'Các DV thuộc nhóm đã chọn. Mỗi item: STT + Mã/Tên + Giá BHYT (xanh) + Giá VP + Nút (+) thêm vào giỏ.'],
    ['Panel phải', 'Bảng DỊCH VỤ CHỈ ĐỊNH', 'BS chỉ định (Select) + Ngày/Giờ. Bảng: Checkbox, STT, Mã, Tên DV, SL, Loại giá, Đơn giá, Thành tiền, BHYT trả, BN trả, BS, Thao tác (Sửa/Xóa).'],
    ['Footer', 'Đóng (Esc) | In | Lưu', '3 buttons: Đóng overlay, In phiếu, Lưu chỉ định'],
  ], [12, 26, 62]));

  c.push(h3('[F2.4] Tạo đơn kê thuốc (Full-page Overlay)'));
  c.push(...await imgPara('overlay_them_thuoc_1774865149901.png', 'Hình F2.4: Overlay Kê đơn thuốc'));
  c.push(tbl(['Panel', 'Thành phần', 'Mô tả'], [
    ['Header', 'Tiêu đề + Patient Info Bar', '"KÊ ĐƠN THUỐC" + Tên BN, BHYT, Chẩn đoán'],
    ['Panel trái', 'Thông tin đơn thuốc', 'Hình thức mua (Tại BV/Mua ngoài), Nơi lĩnh thuốc, Ngày kê/Giờ, BS kê đơn, Ngày tái khám, Số tháng, Lời dặn BS.'],
    ['Panel phải trên', 'Tìm dược phẩm', 'Input search + Số ngày + Sáng/Trưa/Chiều (3x input) + Nút "Thêm vào đơn"'],
    ['Panel phải dưới', 'Chi tiết đơn thuốc', 'Bảng: STT, Mã dược, Tên/Hoạt chất, ĐVT, Số ngày, Sáng-Trưa-Chiều-Tối (inline edit), Số lượng (auto), Cách dùng, Xóa.'],
    ['Footer', 'Tổng khoản + Thành tiền + Buttons', 'Tổng số thuốc | Thành tiền VNĐ | Đóng (Esc) | In đơn thuốc | Lưu đơn'],
  ], [14, 24, 62]));

  // --- M3: Khám bệnh ngoại trú ---
  c.push(h2('[M3] Khám bệnh ngoại trú (Outpatient Exam)'));
  c.push(p('Nghiệp vụ lâm sàng cho bác sĩ và điều dưỡng. Quản lý khám bệnh, chỉ định, kê đơn.'));

  c.push(h3('[F3.1] Danh sách khám bệnh ngoại trú'));
  c.push(tbl(['Thuộc tính', 'Nội dung'], [
    ['URL', '/his/examination'], ['Actor', 'Bác sĩ, Điều dưỡng'],
  ], [25, 75]));
  c.push(...await imgPara('fsd_outpatient_list_1774948579117.png', 'Hình F3.1: Danh sách khám bệnh ngoại trú'));
  c.push(tbl(['ID', 'Tên chức năng', 'Loại', 'Mô tả'], [
    ['A3.1.1', 'Xem danh sách chỉ định/khám bệnh', 'Data Table + Filter', 'Bộ lọc: Thời gian, Khoa/PB, Trạng thái, Loại HS, TT BN. Table: Thao tác, STT, Mã BN, Tên BN, GT, Năm sinh, Đối tượng, BHYT, Xác nhận, Ngày YC, PK. Click row → F3.2.'],
    ['A3.1.2', 'Hủy xác nhận chi phí', 'Icon RotateCcw', 'Icon button trên cột Thao tác → ConfirmationModal → Hủy trạng thái xác nhận'],
  ], [8, 28, 18, 46]));

  c.push(h3('[F3.2] Chi tiết khám bệnh (Exam Room View)'));
  c.push(...await imgPara('fsd_outpatient_detail_1774948587071.png', 'Hình F3.2: Chi tiết khám bệnh ngoại trú (phần trên)'));
  c.push(...await imgPara('fsd_exam_services_prescriptions_1774948572476.png', 'Hình F3.2b: Chi tiết khám bệnh — Chỉ định & Kê đơn thuốc'));
  c.push(tbl(['ID', 'Tên chức năng', 'Loại', 'Mô tả'], [
    ['A3.2.1', 'Xem chi tiết khám bệnh', 'Form (readonly)', 'Header Info Bar (Mã BN, Tên, GT, NS, BHYT). Section: TT Khám bệnh (18 fields), Chỉ số sinh tồn (6 chỉ số), Chỉ định DV (bảng), Kê đơn thuốc (bảng). Panel phải: Timeline lịch sử 3 đợt.'],
    ['A3.2.2', 'Hủy xác nhận chi phí', 'Button (outline, danger)', 'ConfirmationModal → Hủy trạng thái xác nhận viện phí'],
    ['A3.2.3', 'In phiếu kết quả / đơn thuốc', 'Button "In phiếu"', '3 nút in: In phiếu (Header), In phiếu (Chỉ định), In phiếu (Đơn thuốc)'],
    ['A3.2.4', 'Chỉnh sửa kết quả khám', 'Dropdown → Chỉnh sửa', 'Edit Mode: chỉ Hủy + Lưu. Tất cả form fields → editable.'],
    ['A3.2.5', 'Xóa hồ sơ khám', 'Dropdown → Xóa', 'ConfirmationModal → Xóa → Quay về danh sách'],
    ['A3.2.6', 'Thêm chỉ định CLS', 'Button "Thêm chỉ định"', 'LUÔN hiện (không cần Edit Mode). Mở overlay F2.3.'],
    ['A3.2.7', 'Thêm đơn thuốc', 'Button "Thêm thuốc"', 'LUÔN hiện (không cần Edit Mode). Mở overlay F2.4.'],
  ], [8, 26, 20, 46]));
  c.push(bp('Lưu ý: Nút Thêm chỉ định (A3.2.6) và Thêm thuốc (A3.2.7) luôn hiện khi bản ghi tồn tại — khác biệt với các nút khác bị ẩn trong Edit Mode.'));

  // === 3. ADMIN INTERFACE ===
  c.push(h1('3. Admin Interface — Giao diện Quản trị'));
  c.push(p('Giao diện dành cho quản trị viên hệ thống. URL gốc: /admin/*'));

  // --- M4: Phân quyền ---
  c.push(h2('[M4] Phân quyền (Role Management)'));
  c.push(p('Thiết lập và quản lý các nhóm quyền truy cập hệ thống.'));

  c.push(h3('[F4.1] Xem danh sách quyền'));
  c.push(tbl(['Thuộc tính', 'Nội dung'], [
    ['URL', '/admin/permissions'], ['Actor', 'Quản trị viên'],
  ], [25, 75]));
  c.push(...await imgPara('fsd_permission_list_1774948487454.png', 'Hình F4.1: Danh sách phân quyền'));
  c.push(tbl(['ID', 'Tên chức năng', 'Loại', 'Mô tả'], [
    ['A4.1.1', 'Thêm quyền mới', 'Button "Thêm quyền mới"', 'Mở modal thêm nhóm quyền: Mã quyền*, Tên nhóm quyền*, Mô tả, Trạng thái. Nút Lưu → Thêm vào danh sách.'],
    ['A4.1.2', 'Sửa quyền nhanh', 'Dropdown ⋯ → Sửa', 'Sửa inline hoặc navigate đến F4.2 trong Edit Mode'],
    ['A4.1.3', 'Xóa quyền', 'Dropdown ⋯ → Xóa', 'ConfirmationModal → Xóa nhóm quyền'],
  ], [8, 22, 22, 48]));
  c.push(bp('Data Table: Thao tác (⋯) | Mã quyền (link) | Tên quyền | Số User | Trạng thái (Badge)'));

  c.push(h3('Modal: Thêm nhóm quyền mới (A4.1.1)'));
  c.push(...await imgPara('fsd_add_permission_modal_1774948503449.png', 'Hình: Modal Thêm nhóm quyền mới'));
  c.push(tbl(['Field', 'Loại', 'Bắt buộc', 'Mô tả'], [
    ['Mã quyền hệ thống', 'Input (text, uppercase)', '✓', 'VD: DOC002'],
    ['Tên nhóm quyền', 'Input (text)', '✓', 'VD: Bác sĩ nội khoa'],
    ['Mô tả', 'Textarea', '—', 'Mô tả chức năng nhóm quyền'],
    ['Trạng thái', 'Select', '—', 'Hoạt động / Ngưng hoạt động'],
  ], [22, 22, 10, 46]));

  c.push(h3('[F4.2] Chi tiết phân quyền'));
  c.push(...await imgPara('fsd_permission_detail_1774948494239.png', 'Hình F4.2: Chi tiết phân quyền'));
  c.push(tbl(['ID', 'Tên chức năng', 'Loại', 'Mô tả'], [
    ['A4.2.1', 'Xem thông tin chung', 'Card (readonly)', 'Mã quyền, Tên nhóm, Mô tả, Số lượng user, Trạng thái (Badge), Ngày tạo'],
    ['A4.2.2', 'Sửa thông tin nhóm quyền', 'Button "Chỉnh sửa"', 'Edit Mode: chỉ Hủy + Lưu. Form → editable. Bao gồm cấu hình quyền theo module (tree checkbox).'],
    ['A4.2.3', 'Xóa nhóm quyền', 'Button "Xóa"', 'ConfirmationModal → Xóa → Quay về danh sách'],
  ], [8, 26, 20, 46]));

  // --- M5: Người dùng ---
  c.push(h2('[M5] Người dùng (User Management)'));
  c.push(p('Quản lý tài khoản người dùng hệ thống, phân vai trò và kiểm soát truy cập.'));

  c.push(h3('[F5.1] Xem danh sách người dùng'));
  c.push(tbl(['Thuộc tính', 'Nội dung'], [
    ['URL', '/admin/users'], ['Actor', 'Quản trị viên'],
  ], [25, 75]));
  c.push(...await imgPara('fsd_user_list_1774948510036.png', 'Hình F5.1: Danh sách người dùng'));
  c.push(tbl(['ID', 'Tên chức năng', 'Loại', 'Mô tả'], [
    ['A5.1.1', 'Thêm người dùng mới', 'Button "Thêm mới"', 'Mở modal: Họ tên*, Username*, Email*, SĐT, Vai trò*, Mật khẩu*, Xác nhận MK. Nút Tạo tài khoản.'],
    ['A5.1.2', 'Sửa thông tin người dùng', 'Dropdown ⋯ → Sửa', 'Navigate đến F5.2 trong Edit Mode'],
    ['A5.1.3', 'Khóa/Kích hoạt tài khoản nhanh', 'Dropdown ⋯', 'Toggle trạng thái Đang hoạt động ↔ Đã khóa'],
    ['A5.1.4', 'Đổi mật khẩu nhanh', 'Dropdown ⋯', 'Modal nhập mật khẩu mới + xác nhận'],
    ['A5.1.5', 'Xóa nhanh', 'Dropdown ⋯ → Xóa', 'ConfirmationModal → Xóa tài khoản'],
  ], [8, 28, 20, 44]));
  c.push(bp('Data Table: Thao tác (⋯) | Mã User | Họ tên | Username | Email | Vai trò (Badge) | Trạng thái (Badge)'));

  c.push(h3('Modal: Thêm người dùng mới (A5.1.1)'));
  c.push(...await imgPara('fsd_add_user_modal_1774948526319.png', 'Hình: Modal Thêm người dùng mới'));
  c.push(tbl(['Field', 'Loại', 'Bắt buộc', 'Mô tả'], [
    ['Họ và tên', 'Input (text)', '✓', ''],
    ['Số điện thoại', 'Input (tel)', '—', ''],
    ['Tên đăng nhập', 'Input (text, lowercase)', '✓', 'Chỉ chữ thường, số, dấu _'],
    ['Email', 'Input (email)', '✓', 'Validate format email'],
    ['Vai trò', 'Select', '✓', 'Quản trị / Tiếp đón / BS chuyên khoa / Điều dưỡng'],
    ['Mật khẩu', 'Input (password)', '✓', 'Tối thiểu 6 ký tự'],
    ['Xác nhận mật khẩu', 'Input (password)', '✓', 'Phải khớp với MK'],
  ], [22, 22, 10, 46]));

  c.push(h3('[F5.2] Chi tiết người dùng'));
  c.push(...await imgPara('fsd_user_detail_1774948517070.png', 'Hình F5.2: Chi tiết hồ sơ người dùng'));
  c.push(tbl(['ID', 'Tên chức năng', 'Loại', 'Mô tả'], [
    ['A5.2.1', 'Xem thông tin chi tiết', 'Card (readonly)', 'Mã cơ sở, Mã user, Họ tên, Nhân viên (Select), Điện thoại, Email, Trạng thái (Badge). Panel phải: Nhóm quyền truy cập (danh sách nhóm quyền đã gán).'],
    ['A5.2.2', 'Chỉnh sửa thông tin nhân sự', 'Button "Chỉnh sửa"', 'Edit Mode: Hủy + Lưu. Form → editable.'],
    ['A5.2.3', 'Xóa tài khoản', 'Button "Xóa"', 'ConfirmationModal → Xóa → Quay về danh sách'],
    ['A5.2.4', 'Khóa / Kích hoạt tài khoản', 'Button "Khóa TK"', 'Toggle trạng thái. Button đổi text: "Khóa TK" ↔ "Kích hoạt"'],
    ['A5.2.5', 'Đổi mật khẩu', 'Button "Đổi mật khẩu"', 'Modal nhập MK mới + xác nhận'],
  ], [8, 26, 22, 44]));

  // === 4. SUMMARY ===
  c.push(h1('4. Tổng hợp thống kê'));
  c.push(tbl(['Phân hệ', 'Module', 'Feature/Screen', 'Function/Action'], [
    ['Staff', '[M1] Tiếp đón', '1', '3'],
    ['Staff', '[M2] Danh sách đăng ký', '4', '18'],
    ['Staff', '[M3] Khám bệnh ngoại trú', '2', '9'],
    ['Admin', '[M4] Phân quyền', '2', '6'],
    ['Admin', '[M5] Người dùng', '2', '10'],
    ['', 'TỔNG CỘNG', '11 Features', '46 Actions'],
  ], [15, 30, 20, 35]));

  // === 5. UI CONVENTIONS ===
  c.push(h1('5. Quy ước UI chung'));
  c.push(tbl(['Quy tắc', 'Mô tả'], [
    ['Click-to-Row', 'Toàn bộ dòng trong Data Table là vùng click để điều hướng đến chi tiết'],
    ['Edit Mode', 'isEdit=true → Action Bar chỉ hiển thị Hủy + Lưu, tất cả nút khác bị ẩn'],
    ['Clinical Actions', 'Nút "Thêm chỉ định" và "Thêm thuốc" LUÔN hiện khi bản ghi tồn tại (không cần Edit Mode)'],
    ['Breadcrumb Navigation', 'Tất cả chi tiết page có breadcrumb. Nút ← Back quay về danh sách.'],
    ['ConfirmationModal', 'Mọi action Xóa, Lưu, Hủy xác nhận đều hiện Modal xác nhận trước khi thực thi'],
    ['Active Sidebar', 'Menu cha giữ trạng thái active khi người dùng đang ở trang con'],
    ['Badge Color', 'BHYT: xanh dương | Trạng thái: Hoạt động (xanh lá), Đã khóa/Ngưng (đỏ)'],
    ['Full-page Overlay', 'F2.3 và F2.4 là overlay full-page, không phải modal nhỏ'],
  ], [22, 78]));

  // === BUILD ===
  const doc = new Document({
    styles: {
      default: {
        document: { run: { font: 'Arial', size: 22 } },
        heading1: { run: { font: 'Arial', size: 32, bold: true, color: '1E293B' }, paragraph: { spacing: { before: 500, after: 200 } } },
        heading2: { run: { font: 'Arial', size: 28, bold: true, color: '2563EB' }, paragraph: { spacing: { before: 400, after: 150 } } },
        heading3: { run: { font: 'Arial', size: 24, bold: true, color: '334155' }, paragraph: { spacing: { before: 300, after: 120 } } },
      },
    },
    sections: [{ children: c }],
  });

  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(OUT, buf);
  console.log('Done:', OUT, `(${(buf.length / 1024 / 1024).toFixed(2)} MB)`);
}

main().catch(console.error);
