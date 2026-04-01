import { Document, Packer } from 'docx';
import fs from 'fs';
import { tbl, ucTbl, h1, h2, h3, p, bp, empty, step, altStep, imgPara } from './fsd-helpers.mjs';

const OUT = 'C:\\Users\\admin\\.gemini\\antigravity\\scratch\\HIS\\src\\docs\\FSD_UseCases_HIS.docx';

async function main() {
  console.log('Building FSD Use Cases...');
  const c = [];

  // COVER
  c.push(empty(), empty(), empty());
  c.push(p('TÀI LIỆU THIẾT KẾ CHỨC NĂNG', { bold: true, size: 44, color: '1E293B' }));
  c.push(p('(Functional Specification Document — Use Cases)', { size: 26, color: '6B7280', italics: true }));
  c.push(empty());
  c.push(p('HIS — Hospital Information System', { bold: true, size: 32, color: '2563EB' }));
  c.push(empty());
  c.push(tbl(['Mục', 'Nội dung'], [
    ['Hệ thống', 'Trạm Y Tế HIS'], ['Phạm vi', 'Staff Site + Admin Site'],
    ['Tổng Use Cases', '19 Staff UCs + 12 Admin UCs = 31 UCs'],
    ['Phiên bản', '2.1'], ['Ngày', '31/03/2026'],
  ], [25, 75]));

  // === UC INDEX ===
  c.push(h1('1. Danh mục Use Case'));
  c.push(h2('Staff Site'));
  c.push(tbl(['ID', 'Use Case', 'Module', 'Ưu tiên'], [
    ['UC-S01','Đăng nhập hệ thống','Xác thực','Cao'],
    ['UC-S02','Thêm mới tiếp đón bệnh nhân','Tiếp đón','Cao'],
    ['UC-S03','Quét CCCD / Quét mã thẻ BHYT','Tiếp đón','Cao'],
    ['UC-S04','Xem danh sách đăng ký khám bệnh','Đăng ký','Cao'],
    ['UC-S05','Xem chi tiết thông tin đăng ký','Đăng ký','Cao'],
    ['UC-S06','Chỉnh sửa thông tin đăng ký','Đăng ký','TB'],
    ['UC-S07','Xóa bản ghi đăng ký','Đăng ký','TB'],
    ['UC-S08','Thanh toán viện phí','Đăng ký','Cao'],
    ['UC-S09','Thêm chỉ định cận lâm sàng','Đăng ký','Cao'],
    ['UC-S10','Kê đơn thuốc','Đăng ký','Cao'],
    ['UC-S11','Xem danh sách khám bệnh ngoại trú','Khám bệnh','Cao'],
    ['UC-S12','Xem chi tiết khám bệnh','Khám bệnh','Cao'],
    ['UC-S13','Chỉnh sửa kết quả khám bệnh','Khám bệnh','TB'],
    ['UC-S14','In phiếu kết quả khám / đơn thuốc','Khám bệnh','TB'],
    ['UC-S15','Hủy xác nhận chi phí','Khám bệnh','Thấp'],
    ['UC-S16','Xem thông tin khác (ĐK/LS khám/BHYT)','Đăng ký','Cao'],
    ['UC-S17','Khám bệnh — Tạo mới','Đăng ký','Cao'],
    ['UC-S18','Xem thông tin khám bệnh (→ UC-S12)','Đăng ký','Cao'],
    ['UC-S19','Xem lịch sử khám bệnh','Khám bệnh','Cao'],
  ], [10, 45, 20, 10]));
  c.push(h2('Admin Site'));
  c.push(tbl(['ID', 'Use Case', 'Module', 'Ưu tiên'], [
    ['UC-A01','Xem danh sách quyền','Phân quyền','Cao'],
    ['UC-A02','Thêm nhóm quyền mới','Phân quyền','Cao'],
    ['UC-A03','Xem chi tiết phân quyền','Phân quyền','Cao'],
    ['UC-A04','Chỉnh sửa nhóm quyền','Phân quyền','TB'],
    ['UC-A05','Xóa nhóm quyền','Phân quyền','TB'],
    ['UC-A06','Xem danh sách người dùng','Người dùng','Cao'],
    ['UC-A07','Thêm người dùng mới','Người dùng','Cao'],
    ['UC-A08','Xem chi tiết người dùng','Người dùng','Cao'],
    ['UC-A09','Chỉnh sửa thông tin người dùng','Người dùng','TB'],
    ['UC-A10','Khóa / Kích hoạt tài khoản','Người dùng','TB'],
    ['UC-A11','Đổi mật khẩu','Người dùng','TB'],
    ['UC-A12','Xóa tài khoản','Người dùng','TB'],
  ], [10, 45, 20, 10]));

  // === STAFF UCs ===
  c.push(h1('2. Chi tiết Use Case — Staff Site'));

  // UC-S01
  c.push(h2('UC-S01: Đăng nhập hệ thống'));
  c.push(ucTbl([['ID','UC-S01'],['Tên','Đăng nhập hệ thống'],['Actor','Tất cả nhân viên (Staff, Admin)'],['Precondition','Chưa đăng nhập, truy cập /login'],['Postcondition','Redirect đến trang chủ theo role'],['URL','/login'],['Ưu tiên','Cao']]));
  c.push(...await imgPara('login_page_final_1774862441051.png','Hình UC-S01: Màn hình Đăng nhập'));
  c.push(bp('Thành phần UI:'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['1','Logo + Tên hệ thống','Icon + Text','Syringe icon, "Trạm Y Tế HIS"'],['2','Tên đăng nhập*','Input (text)','Username'],['3','Mật khẩu*','Input (password)','Ký tự ẩn'],['4','Nút Đăng nhập','Button (Primary)','Submit form'],['5','Quick-fill Pills','Button (ghost)','Điền nhanh: "admin/admin", "staff/staff"']],[5,25,18,52]));
  c.push(bp('Luồng chính:'));
  c.push(step(1,'Truy cập URL → Hiển thị form Login.'));
  c.push(step(2,'Nhập username + password → Nhấn Đăng nhập.'));
  c.push(step(3,'Hệ thống xác thực → Role staff → /his/reception; Role admin → /admin/permissions.'));
  c.push(bp('Luồng thay thế:'));
  c.push(altStep('[3a] Sai thông tin: Toast lỗi tiếng Việt, cho phép thử lại.'));

  // UC-S02 + S03
  c.push(h2('UC-S02: Thêm mới tiếp đón bệnh nhân'));
  c.push(ucTbl([['ID','UC-S02'],['Tên','Thêm mới tiếp đón bệnh nhân'],['Actor','Nhân viên Tiếp đón'],['Precondition','Đã đăng nhập role staff'],['Postcondition','Tạo bản ghi đăng ký mới, form reset'],['URL','/his/reception'],['Ưu tiên','Cao']]));
  c.push(...await imgPara('fsd_reception_1774948548615.png','Hình UC-S02: Màn hình Tiếp đón Bệnh nhân'));
  c.push(bp('Mô tả màn hình chi tiết:'));
  c.push(h3('Header'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['1','Tiêu đề','Heading','"Tiếp đón Bệnh nhân" + mô tả phụ'],['2','Nút Làm mới (F5)','Button (outline)','Reset toàn bộ form'],['3','Nút Lưu & Tiếp đón','Button (Primary)','Submit tạo bản ghi tiếp đón']],[5,25,18,52]));
  c.push(h3('Thanh tìm kiếm'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['4','Tìm kiếm nhanh','Input (search, full-width)','"Nhập Mã BN, Họ tên, CMND hoặc Quét thẻ BHYT..."'],['5','Nút Quét CCCD','Button (Primary)','Kích hoạt đầu đọc CCCD'],['6','Nút Quét mã thẻ','Button (Outline)','Kích hoạt QR/barcode reader']],[5,25,18,52]));
  c.push(h3('Section: Thông tin thẻ BHYT'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['7','Đối tượng','Select','BHYT / Viện phí / Miễn phí'],['8','Trẻ em không thẻ','Checkbox','Toggle'],['9','Số thẻ BHYT','Input (masked)','Format: __ - __ - ___ - ___'],['10','Nơi ĐKKCB ban đầu','Select','Mã CSKCB'],['11','Hiệu lực (Từ ngày)','Date','mm/dd/yyyy'],['12','Đến ngày','Date','mm/dd/yyyy'],['13','Đủ 5 năm','Date','mm/dd/yyyy'],['14','Loại tuyến','Select','Đúng tuyến / Trái tuyến'],['15','Khu vực','Select','Bình thường / K1/K2/K3'],['16','Ngày miễn cùng chi trả','Date',''],['17','Hình thức bảo hiểm','Checkboxes','Chuyển tuyến, Cấp cứu, Nơi khác đến']],[5,25,18,52]));
  c.push(h3('Section: Thông tin hành chính'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['18','Mã bệnh nhân','Input (readonly)','Tự sinh, VD: BN20240001'],['19','Họ và tên bệnh nhân*','Input (text)','Bắt buộc'],['20','Giới tính','Button Group','Nam / Nữ / Khác'],['21','Ngày sinh','Date','dd/mm/yyyy'],['22','Tuổi','Input (readonly)','Tự tính từ ngày sinh'],['23','Số điện thoại','Input',''],['24','Số thẻ lao động','Input',''],['25','Dân tộc','Select','Kinh, Tày, Thái...'],['26','Quốc tịch','Select','Việt Nam...'],['27','Nghề nghiệp','Select',''],['28','Nơi làm việc','Input',''],['29','Khoa / Phòng BN','Input',''],['30','Địa chỉ thường trú','Input',''],['31','Tỉnh / Thành phố','Select',''],['32','Phường / Xã','Select',''],['33','Thôn / Xóm','Input','']],[5,25,18,52]));
  c.push(h3('Panel phải'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['34','Card: Thông tin tiếp đón','Table Card','Phòng khám / Tổng BN / Đang chờ'],['35','Card: Các lần đăng ký','Sidebar Card + ↗','"Chưa chọn bệnh nhân" → Click ↗ mở modal'],['36','Card: Lịch sử khám bệnh','Sidebar Card + ↗','Click ↗ mở modal lịch sử'],['37','Card: Lịch sử sử dụng BHYT','Sidebar Card + ↗','Click ↗ mở modal BHYT']],[5,25,18,52]));
  c.push(bp('Luồng chính:'));
  c.push(step(1,'Truy cập Tiếp đón → Form trống, Mã BN tự sinh.'));
  c.push(step(2,'Nhập thông tin BHYT + hành chính (hoặc Quét CCCD → auto-fill).'));
  c.push(step(3,'Nhấn "Lưu & Tiếp đón" → ConfirmationModal → Tạo bản ghi → Form reset.'));
  c.push(bp('Luồng thay thế:'));
  c.push(altStep('[2a] Quét CCCD: kích hoạt đầu đọc → auto-fill TT hành chính.'));
  c.push(altStep('[2b] Quét mã thẻ: đọc QR/Barcode → auto-fill TT BHYT.'));
  c.push(altStep('[F5] Làm mới: Reset toàn bộ form.'));

  c.push(h2('UC-S03: Quét CCCD / Quét mã thẻ BHYT'));
  c.push(ucTbl([['ID','UC-S03'],['Actor','Nhân viên Tiếp đón'],['Precondition','Đang ở UC-S02'],['Postcondition','Tự động điền thông tin từ CCCD/BHYT'],['Ưu tiên','Cao']]));
  c.push(p('Luồng: Nhấn nút Quét → Kích hoạt đầu đọc → Đọc dữ liệu → Auto-fill vào form tương ứng.'));

  // UC-S04
  c.push(h2('UC-S04: Xem danh sách đăng ký'));
  c.push(ucTbl([['ID','UC-S04'],['Actor','NV Tiếp đón, Điều dưỡng'],['Precondition','Đã đăng nhập role staff'],['Postcondition','Hiển thị danh sách BN đã đăng ký'],['URL','/his/registration-list']]));
  c.push(...await imgPara('fsd_registration_list_1774948555619.png','Hình UC-S04: Danh sách đăng ký'));
  c.push(tbl(['#','Thành phần','Mô tả'],[['1','Input TT bệnh nhân','Mã BN, Họ tên, CMND'],['2-3','Ngày tiếp nhận (Từ/Đến)','Date range filter'],['4','Nút Tìm kiếm','Button Primary'],['5','Nút Xuất Excel','Button outline green'],['6','Cột Thao tác','3 icons: Khám bệnh 🩺, Thanh toán 💰, Menu ⋯'],['7-14','Data columns','STT, Ngày TN, Số TN, Mã BN, Tên BN, Đối tượng (Badge), Dịch vụ, Nơi TH']],[5,28,67]));
  c.push(bp('Luồng chính:'));
  c.push(step(1,'Truy cập → Hiển thị toàn bộ danh sách.'));
  c.push(step(2,'(Tùy chọn) Nhập bộ lọc → Tìm kiếm.'));
  c.push(step(3,'Click dòng → Navigate đến UC-S05.'));

  // UC-S05
  c.push(h2('UC-S05: Xem chi tiết thông tin đăng ký'));
  c.push(ucTbl([['ID','UC-S05'],['Actor','NV Tiếp đón, Điều dưỡng, Bác sĩ'],['Precondition','Đã chọn BN từ UC-S04'],['Postcondition','Hiển thị đầy đủ TT đăng ký + BHYT + hành chính']]));
  c.push(...await imgPara('fsd_registration_detail_1774948562936.png','Hình UC-S05: Chi tiết đăng ký'));
  c.push(bp('Mô tả màn hình chi tiết:'));
  c.push(h3('Action Bar'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['1','Breadcrumb','Navigation','"Danh sách đăng ký > Chi tiết đăng ký"'],['2','Nút In phiếu','Button (outline)','In phiếu đăng ký'],['3','Nút Thanh toán','Button (outline)','→ UC-S08'],['4','Nút Khám bệnh','Button (outline)','→ UC-S17 (mới) / UC-S18 (đã có)'],['5','Dropdown Thao tác','Menu','Chỉnh sửa (→S06), Xóa (→S07)'],['—','(Edit Mode)','','Chỉ hiện Hủy + Lưu, ẩn tất cả nút trên']],[5,22,18,55]));
  c.push(h3('Section: Thông tin đăng ký'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['6','Số tiếp nhận','Input (readonly)','Mã tiếp nhận'],['7','STT','Input (readonly)','Số thứ tự'],['8','Ngày vào viện','Date',''],['9','Giờ vào viện','Time',''],['10','Dịch vụ','Select','Loại dịch vụ khám'],['11','Phòng khám','Select','Phòng khám chỉ định']],[5,22,18,55]));
  c.push(p('Section TT Thẻ BHYT: Giống UC-S02 (mục 7-17 — 11 trường)', { italics: true }));
  c.push(p('Section TT Hành chính: Giống UC-S02 (mục 18-33 — 16 trường)', { italics: true }));
  c.push(h3('Panel phải'));
  c.push(tbl(['#','Thành phần','Mô tả'],[['12','Card: Thông tin tiếp đón','Bảng thống kê BN theo phòng'],['13','Card: Các lần đăng ký','Tóm tắt + icon ↗ → UC-S16.1'],['14','Card: Lịch sử khám bệnh','Tóm tắt + icon ↗ → UC-S16.2'],['15','Card: Lịch sử sử dụng BHYT','Tóm tắt + icon ↗ → UC-S16.3']],[5,30,65]));
  c.push(bp('Luồng chính:'));
  c.push(step(1,'Click row từ UC-S04 → Hiển thị chi tiết readonly.'));
  c.push(step(2,'Actor chọn action: In phiếu / Thanh toán / Khám bệnh / Chỉnh sửa / Xóa.'));

  // UC-S06, S07
  c.push(h2('UC-S06: Chỉnh sửa thông tin đăng ký'));
  c.push(ucTbl([['ID','UC-S06'],['Actor','NV Tiếp đón'],['Precondition','Đang ở UC-S05 (View Mode)'],['Postcondition','Cập nhật thông tin đăng ký'],['Trigger','Dropdown Thao tác → Chỉnh sửa']]));
  c.push(step(1,'Nhấn Thao tác → Chỉnh sửa → Action bar = Hủy + Lưu, ẩn nút khác.'));
  c.push(step(2,'Sửa form fields (BHYT, hành chính, đăng ký).'));
  c.push(step(3,'Nhấn Lưu → ConfirmationModal → Xác nhận → Lưu → View Mode.'));
  c.push(altStep('[Hủy] Revert form → thoát Edit Mode.'));

  c.push(h2('UC-S07: Xóa bản ghi đăng ký'));
  c.push(ucTbl([['ID','UC-S07'],['Trigger','Dropdown Thao tác → Xóa'],['Postcondition','Xóa bản ghi, quay về UC-S04']]));
  c.push(step(1,'Nhấn Thao tác → Xóa → ConfirmationModal.'));
  c.push(step(2,'Xác nhận → Xóa → Navigate về danh sách (UC-S04).'));

  // UC-S08
  c.push(h2('UC-S08: Thanh toán viện phí'));
  c.push(ucTbl([['ID','UC-S08'],['Actor','NV Tiếp đón, Thu ngân'],['Precondition','Đang ở UC-S05 hoặc icon 💰 từ UC-S04'],['Postcondition','Xác nhận thanh toán viện phí']]));
  c.push(...await imgPara('payment_view_1774862525307.png','Hình UC-S08: Thanh toán viện phí'));
  c.push(bp('Mô tả màn hình chi tiết:'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['1','Breadcrumb','Navigation','"... > Chi tiết đăng ký > Thanh toán"'],['2','Nút Xác nhận','Button (Primary, green)','Xác nhận thanh toán'],['3','Dropdown Thao tác','Menu','Chỉnh sửa, Xóa']],[5,22,18,55]));
  c.push(h3('Card: Thông tin cá nhân'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['4','Số tiếp nhận','Text (readonly)',''],['5','Mã BN','Text (readonly)',''],['6','Họ tên','Text (bold, uppercase)',''],['7','Địa chỉ','Text',''],['8','BHYT','Text','Số thẻ BHYT'],['9','Đối tượng','Badge','BHYT / Viện phí']],[5,22,18,55]));
  c.push(h3('Card: Thanh toán + Chứng từ'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['10','Ngày thu','Date','Ngày thanh toán'],['11','Hình thức','Select','Tiền mặt / Chuyển khoản'],['12','Số quyển','Input','Số quyển biên lai'],['13','Số biên lai','Input','Mã biên lai']],[5,22,18,55]));
  c.push(h3('Bảng chi phí'));
  c.push(tbl(['Cột','Mô tả'],[['STT','Số thứ tự'],['Dịch vụ','Tên dịch vụ khám/CLS'],['SL','Số lượng'],['Đơn giá','VNĐ'],['Thành tiền','SL × Đơn giá'],['BHYT','Số tiền BHYT chi trả'],['BN Trả','Số tiền bệnh nhân trả']],[30,70]));
  c.push(bp('Luồng chính:'));
  c.push(step(1,'Navigate → Hiển thị bảng chi phí + thông tin BN.'));
  c.push(step(2,'Điền ngày thu, hình thức, chứng từ.'));
  c.push(step(3,'Nhấn Xác nhận → Lưu → Quay về UC-S05.'));

  // UC-S09
  c.push(h2('UC-S09: Thêm chỉ định cận lâm sàng'));
  c.push(ucTbl([['ID','UC-S09'],['Actor','Bác sĩ'],['Precondition','Đang ở Chi tiết khám bệnh (UC-S12/S17/S18), bản ghi đã tồn tại'],['Postcondition','Thêm chỉ định DV vào hồ sơ khám'],['Trigger','Nút "Thêm chỉ định" tại section Chỉ định dịch vụ']]));
  c.push(...await imgPara('overlay_them_chi_dinh_1774865124150.png','Hình UC-S09: Overlay Thêm chỉ định dịch vụ (3-panel layout)'));
  c.push(tbl(['Panel','Thành phần','Mô tả'],[['Header','Patient Info Bar','Tên BN, Mã BN, BHYT, Phòng khám, Chẩn đoán ICD (đỏ), Tổng tiền/BHYT/Thực thu'],['Trái','Cây danh mục DV + Tìm kiếm','Tree expandable: Khám bệnh, Xét nghiệm, CĐHA, TDCN, PT, TT. Ô search "Mã/tên DV"'],['Giữa','Danh sách DV theo nhóm','STT, Mã+Tên, Giá BHYT (xanh), Giá VP, Nút (+) thêm vào giỏ'],['Phải','Bảng DỊCH VỤ CHỈ ĐỊNH','BS chỉ định (Select), Ngày/Giờ YC. Bảng: ☑, STT, Mã, Tên, SL, Loại giá, Đơn giá, TT, BHYT, BN, BS, Thao tác (Sửa/Xóa)'],['Footer','Đóng (Esc) | In | Lưu','3 buttons']],[10,25,65]));
  c.push(bp('Luồng chính:'));
  c.push(step(1,'Nhấn "Thêm chỉ định" → Full-page overlay xuất hiện.'));
  c.push(step(2,'Panel trái: Chọn nhóm DV trong cây danh mục.'));
  c.push(step(3,'Panel giữa: DS DV hiện theo nhóm → Nhấn (+) thêm vào giỏ.'));
  c.push(step(4,'Panel phải: DV thêm vào bảng, tự tính giá.'));
  c.push(step(5,'Chọn BS chỉ định, Ngày/Giờ → Nhấn Lưu → Đóng overlay.'));
  c.push(altStep('[Tìm kiếm] Gõ mã/tên DV → Lọc danh sách.'));
  c.push(altStep('[Sửa DV] Icon ✏️ → Sửa SL, Loại giá.'));
  c.push(altStep('[Xóa DV] Icon 🗑️ → Xóa khỏi giỏ.'));
  c.push(altStep('[Esc] Đóng overlay, không lưu.'));

  // UC-S10
  c.push(h2('UC-S10: Kê đơn thuốc'));
  c.push(ucTbl([['ID','UC-S10'],['Actor','Bác sĩ'],['Precondition','Đang ở Chi tiết khám bệnh, bản ghi đã tồn tại'],['Postcondition','Tạo/cập nhật đơn thuốc'],['Trigger','Nút "Thêm thuốc" tại section Kê đơn thuốc']]));
  c.push(...await imgPara('overlay_them_thuoc_1774865149901.png','Hình UC-S10: Overlay Kê đơn thuốc (2-panel layout)'));
  c.push(tbl(['Panel','Thành phần','Mô tả'],[['Header','Tiêu đề + Patient Info Bar','"KÊ ĐƠN THUỐC", Tên BN, BHYT, Chẩn đoán'],['Trái','TT đơn thuốc','Hình thức mua, Nơi lĩnh, Ngày/Giờ kê, BS, Ngày tái khám, Số tháng, Lời dặn'],['Phải trên','Tìm dược phẩm','Input search + Số ngày + Sáng/Trưa/Chiều (3 input) + Nút Thêm'],['Phải dưới','Bảng CHI TIẾT ĐƠN THUỐC','STT, Mã, Tên/Hoạt chất, ĐVT, Ngày, S-T-C-Tối (inline edit), SL (auto), Cách dùng, Xóa'],['Footer','Tổng khoản + Thành tiền VNĐ + Đóng | In | Lưu đơn','']],[10,25,65]));
  c.push(bp('Luồng chính:'));
  c.push(step(1,'Nhấn "Thêm thuốc" → Full-page overlay.'));
  c.push(step(2,'Panel trái: Điền TT đơn (hình thức, nơi lĩnh, BS, lời dặn).'));
  c.push(step(3,'Panel phải: Tìm thuốc → Nhập liều → "Thêm vào đơn".'));
  c.push(step(4,'Thuốc vào bảng, SL = Ngày × (S+T+C+Tối). Sửa inline.'));
  c.push(step(5,'Nhấn Lưu đơn → Lưu → Đóng overlay.'));
  c.push(altStep('[Xóa] Icon 🗑️ xóa thuốc. [In] Mở PDF preview.'));

  // UC-S11
  c.push(h2('UC-S11: Xem danh sách khám bệnh ngoại trú'));
  c.push(ucTbl([['ID','UC-S11'],['Actor','Bác sĩ, Điều dưỡng'],['URL','/his/examination']]));
  c.push(...await imgPara('fsd_outpatient_list_1774948579117.png','Hình UC-S11: Danh sách khám bệnh ngoại trú'));
  c.push(bp('Mô tả màn hình chi tiết:'));
  c.push(h3('Bộ lọc'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['1','Thời gian (Từ - Đến)','2x Date','Khoảng ngày lọc'],['2','Khoa / Phòng ban','Select',''],['3','Trạng thái','Select','Đã XN / Chưa XN'],['4','Loại hồ sơ','Select',''],['5','Thông tin BN','Input (text)','Mã BN, Họ tên'],['6','Nút Tìm kiếm','Button (Primary)','']],[5,22,18,55]));
  c.push(h3('Data Table'));
  c.push(tbl(['Cột','Mô tả'],[['Thao tác','Icon: Hủy xác nhận (RotateCcw)'],['STT khám','Số thứ tự khám'],['Mã BN','Mã bệnh nhân'],['Tên BN','Họ và tên'],['Giới tính','Nam/Nữ'],['Năm sinh','Number'],['Đối tượng','Badge (BHYT/VP)'],['Số thẻ BHYT','Text'],['Xác nhận','Badge (Đã XN xanh / Chưa XN vàng)'],['Ngày yêu cầu','DateTime'],['Phòng khám','Text']],[30,70]));
  c.push(p('Hành vi: Click dòng → UC-S12.'));

  // UC-S12
  c.push(h2('UC-S12: Xem chi tiết khám bệnh'));
  c.push(ucTbl([['ID','UC-S12'],['Actor','Bác sĩ'],['Precondition','Chọn BN từ UC-S11 hoặc UC-S18'],['Postcondition','Hiển thị đầy đủ hồ sơ khám bệnh']]));
  c.push(...await imgPara('fsd_outpatient_detail_1774948587071.png','Hình UC-S12: Chi tiết khám bệnh (phần trên)'));
  c.push(...await imgPara('fsd_exam_services_prescriptions_1774948572476.png','Hình UC-S12b: Chỉ định dịch vụ + Kê đơn thuốc'));
  c.push(bp('Mô tả màn hình chi tiết:'));
  c.push(h3('Action Bar'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['1','Nút Hủy xác nhận chi phí','Button (outline, danger)','Hủy trạng thái XN'],['2','Nút In phiếu','Button (outline)','In phiếu kết quả'],['3','Dropdown Thao tác','Menu','Chỉnh sửa (→S13), Xóa'],['—','(Edit Mode)','','Chỉ Hủy + Lưu, ẩn tất cả nút trên']],[5,25,18,52]));
  c.push(h3('Header Info Bar'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['4','Mã BN','Text (bold)','Readonly'],['5','Họ và tên','Text (bold)',''],['6','Giới tính','Text',''],['7','Ngày sinh','Date',''],['8','BHYT','Text (blue, bold)','Số thẻ + (Loại)']],[5,25,18,52]));
  c.push(h3('Section: Thông tin khám bệnh (18 trường)'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['9','Ngày vào khám','Date',''],['10','Giờ vào viện','Time',''],['11','Phòng khám','Select',''],['12','Triệu chứng / Diễn biến','Textarea',''],['13','Lý do vào viện','Textarea',''],['14','Bệnh chính (ICD10)','Select','Mã ICD-10'],['15','Diễn giải bệnh chính','Input',''],['16','Bệnh kèm theo','Multi-select tags','Nhiều mã ICD'],['17','Diễn giải bệnh kèm theo','Input',''],['18','Tư vấn điều trị','Textarea',''],['19','Diễn biến điều trị','Textarea',''],['20','Loại tai nạn','Select',''],['21','Kết quả khám','Select','Không thay đổi/Khỏi/Đỡ'],['22','Loại khám chữa bệnh','Select',''],['23','Bác sĩ khám','Select',''],['24','Kết thúc khám (Ngày)','Date',''],['25','Kết thúc khám (Giờ)','Time',''],['26','Phương pháp khám','Select','Tây y/Đông y/Kết hợp'],['27','Ghi chú kết luận','Input','']],[5,25,18,52]));
  c.push(h3('Section: Chỉ số sinh tồn (6 trường)'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['28','Mạch','Input (number)','Nhịp/phút'],['29','Nhiệt độ','Input (number)','°C'],['30','Huyết áp (min)','Input (number)','mmHg'],['31','Huyết áp (max)','Input (number)','mmHg'],['32','Nhịp thở','Input (number)','Lần/phút'],['33','Cân nặng','Input (number)','kg']],[5,25,18,52]));
  c.push(h3('Section: Chỉ định dịch vụ'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['34','Nút In phiếu','Button (outline)','In phiếu chỉ định'],['35','Nút Thêm chỉ định','Button (Primary)','→ UC-S09 (LUÔN hiện, không cần Edit Mode)']],[5,25,18,52]));
  c.push(tbl(['Cột bảng','Mô tả'],[['STT','Số thứ tự'],['Tên dịch vụ','Tên DV CLS'],['Ngày yêu cầu','DateTime'],['Loại giá','Badge (Giá BHYT / Giá VP)'],['SL','Số lượng'],['Đơn giá','VNĐ'],['Thành tiền','SL × Đơn giá'],['BHYT trả','Số tiền BHYT'],['BN trả','Số tiền BN'],['Bác sĩ','BS chỉ định'],['Trạng thái','Checkbox (Kết quả ✓, Viện phí ✓)']],[30,70]));
  c.push(h3('Section: Kê đơn thuốc'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['36','Nút In phiếu','Button (outline)','In đơn thuốc'],['37','Nút Thêm thuốc','Button (Primary)','→ UC-S10 (LUÔN hiện, không cần Edit Mode)']],[5,25,18,52]));
  c.push(tbl(['Cột bảng','Mô tả'],[['STT','Số thứ tự'],['Tên thuốc','Tên thương mại'],['Hàm lượng','Hoạt chất + nồng độ'],['SL','Số lượng (tự tính)'],['Ngày','Số ngày uống'],['Cách dùng','VD: Uống sau ăn'],['Nơi mua','Tại BV / Mua ngoài']],[30,70]));
  c.push(h3('Panel phải: Lịch sử khám bệnh'));
  c.push(tbl(['#','Thành phần','Mô tả'],[['38','Timeline 3 đợt gần nhất','Card: Ngày, Phòng khám, Chẩn đoán ICD (đỏ)'],['39','Nút "Xem tất cả lịch sử"','Button (outline) → UC-S19']],[5,30,65]));
  c.push(p('Lưu ý: Nút Thêm chỉ định (#35) và Thêm thuốc (#37) LUÔN hiện khi bản ghi tồn tại — không ẩn trong Edit Mode.', { bold: true, color: 'DC2626' }));

  // UC-S13,14,15
  c.push(h2('UC-S13: Chỉnh sửa kết quả khám'));
  c.push(ucTbl([['Trigger','Dropdown Thao tác → Chỉnh sửa'],['Postcondition','Cập nhật hồ sơ khám bệnh']]));
  c.push(p('Luồng: Thao tác → Chỉnh sửa → Action bar = Hủy + Lưu → Sửa → Lưu → ConfirmationModal.'));

  c.push(h2('UC-S14: In phiếu kết quả / đơn thuốc'));
  c.push(p('3 nút in: In phiếu (Header), In phiếu (Chỉ định), In phiếu (Đơn thuốc) → Mở print preview.'));

  c.push(h2('UC-S15: Hủy xác nhận chi phí'));
  c.push(p('Luồng: Nút "Hủy XN chi phí" → ConfirmationModal → Hủy trạng thái xác nhận.'));

  // UC-S16
  c.push(h2('UC-S16: Xem thông tin khác'));
  c.push(ucTbl([['ID','UC-S16'],['Precondition','Đang ở UC-S05'],['Trigger','Icon ↗ trên panel phải sidebar']]));

  c.push(h3('UC-S16.1: Xem các lần đăng ký'));
  c.push(...await imgPara('modal_cac_lan_dang_ky_1774865013578.png','Modal: Các lần đăng ký khám bệnh'));
  c.push(p('Bộ lọc: Từ ngày, Đến ngày, Nút Làm mới. Bảng: STT, Ngày TN, Số TN, Dịch vụ, Nơi TH.'));

  c.push(h3('UC-S16.2: Xem lịch sử khám bệnh'));
  c.push(...await imgPara('modal_lich_su_kham_benh_1774865038574.png','Modal: Lịch sử khám bệnh'));
  c.push(p('Bộ lọc tương tự. Bảng: STT, Ngày khám, Phòng khám, Bác sĩ, Chẩn đoán (ICD).'));

  c.push(h3('UC-S16.3: Xem lịch sử sử dụng BHYT'));
  c.push(...await imgPara('modal_lich_su_bhyt_1774865067350.png','Modal: Lịch sử sử dụng thẻ BHYT'));
  c.push(p('Card TT hành chính + Card TT bảo hiểm + Bảng đợt điều trị (Mã HS, CSKCB, Ngày vào/ra, Tình trạng, Tên bệnh, Kết quả).'));

  // UC-S17, S18
  c.push(h2('UC-S17: Khám bệnh — Tạo mới'));
  c.push(ucTbl([['Precondition','hasRecord = false (chưa có bản ghi khám)'],['Trigger','Nút Khám bệnh (UC-S05) hoặc icon 🩺 (UC-S04)'],['Postcondition','Tạo bản ghi khám bệnh mới → chuyển sang UC-S18']]));
  c.push(step(1,'Nhấn Khám bệnh → Form trống, Action Bar = Hủy + Lưu.'));
  c.push(step(2,'Điền TT khám bệnh, chỉ số sinh tồn.'));
  c.push(step(3,'Nhấn Lưu → hasRecord=true → chuyển sang UC-S18 (xem chi tiết).'));

  c.push(h2('UC-S18: Xem thông tin khám bệnh (→ UC-S12)'));
  c.push(ucTbl([['Precondition','hasRecord = true'],['Mô tả','UI giống UC-S12. Refer → UC-S12.']]));
  c.push(...await imgPara('examination_detail_with_data_1774862543955.png','Hình UC-S18: Chi tiết khám bệnh (hasRecord=true, từ Đăng ký)'));

  // UC-S19
  c.push(h2('UC-S19: Xem lịch sử khám bệnh'));
  c.push(ucTbl([['ID','UC-S19'],['Actor','Bác sĩ'],['Trigger','Nút "Xem tất cả lịch sử" tại UC-S12 panel phải']]));
  c.push(...await imgPara('outpatient_exam_history_modal_1774862404023.png','Hình UC-S19: Modal Lịch sử khám chữa bệnh'));
  c.push(tbl(['#','Thành phần','Mô tả'],[['1','Header','"Lịch sử khám chữa bệnh" + BN + Mã BN + Nút Đóng'],['2','Sidebar trái (320px)','DS đợt khám dạng cards: Ngày, PK, Chẩn đoán ICD (đỏ). Card active = border blue.'],['3','Visit Header','Phòng khám & BS, Chẩn đoán (đỏ, bold)'],['4','Tab "Dịch vụ (N)"','Grouped Table theo loại DV: STT, Tên DV, Loại giá, SL, BS, Trạng thái (✓)'],['5','Tab "Đơn thuốc (N)"','Bảng: STT, Tên thuốc, Hàm lượng, SL, Ngày, Cách dùng, Nơi mua'],['6','Nút Đóng lịch sử','Button Primary dark']],[5,25,70]));

  // === ADMIN UCs ===
  c.push(h1('3. Chi tiết Use Case — Admin Site'));

  c.push(h2('UC-A01: Xem danh sách quyền'));
  c.push(ucTbl([['Actor','Quản trị viên'],['URL','/admin/permissions']]));
  c.push(...await imgPara('fsd_permission_list_1774948487454.png','Hình UC-A01: Danh sách phân quyền'));
  c.push(bp('Mô tả màn hình chi tiết:'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['1','Ô tìm kiếm','Input (search)','"Tìm kiếm theo mã hoặc tên quyền..."'],['2','Nút Tìm kiếm','Button (Primary)',''],['3','Nút Thêm quyền mới','Button (Primary, outline)','→ UC-A02 (modal)']],[5,25,18,52]));
  c.push(tbl(['Cột','Mô tả'],[['Thao tác','Menu ⋯ (Sửa, Xóa)'],['Mã quyền','Text (link, blue) — VD: ADM001'],['Tên quyền','Text — VD: Quản trị hệ thống'],['Số User','Number — Số người dùng thuộc nhóm'],['Trạng thái','Badge (Hoạt động: xanh lá)']],[30,70]));
  c.push(p('Hành vi: Click dòng → UC-A03.'));

  c.push(h2('UC-A02: Thêm nhóm quyền mới'));
  c.push(ucTbl([['Trigger','Nút "Thêm quyền mới"'],['Postcondition','Tạo nhóm quyền mới']]));
  c.push(...await imgPara('fsd_add_permission_modal_1774948503449.png','Hình UC-A02: Modal Thêm nhóm quyền'));
  c.push(tbl(['Field','Loại','Bắt buộc'],[['Mã quyền hệ thống','Input (uppercase)','✓'],['Tên nhóm quyền','Input','✓'],['Mô tả','Textarea','—'],['Trạng thái','Select','—']],[40,35,25]));

  c.push(h2('UC-A03: Xem chi tiết phân quyền'));
  c.push(...await imgPara('fsd_permission_detail_1774948494239.png','Hình UC-A03: Chi tiết phân quyền'));
  c.push(bp('Mô tả màn hình chi tiết:'));
  c.push(h3('Action Bar'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['1','Nút ← Back','Button (icon)','Quay về danh sách'],['2','Breadcrumb','Navigation','"Danh sách phân quyền > Chi tiết"'],['3','Nút Chỉnh sửa','Button (outline)','→ UC-A04'],['4','Nút Xóa','Button (outline, danger)','→ UC-A05']],[5,22,18,55]));
  c.push(h3('Card: Thông tin nhóm quyền'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['5','Mã quyền','Text (readonly)','VD: ADM001'],['6','Tên nhóm quyền','Text / Input','VD: Quản trị hệ thống'],['7','Mô tả','Text / Textarea','Mô tả chức năng'],['8','Số lượng user','Number (readonly)','Tự tính'],['9','Trạng thái','Badge / Select','Hoạt động / Ngưng'],['10','Ngày tạo','Date (readonly)','']],[5,22,18,55]));
  c.push(h3('Section: Cấu hình quyền theo Module'));
  c.push(p('Tree checkbox theo cấu trúc Module > Chức năng > Quyền (Xem/Thêm/Sửa/Xóa). Các module: Tiếp đón, Đăng ký, Khám bệnh, Quản trị, Báo cáo.'));

  c.push(h2('UC-A04: Chỉnh sửa nhóm quyền'));
  c.push(p('Trigger: Nút Chỉnh sửa → Edit Mode (Hủy + Lưu) → Sửa → Lưu → ConfirmationModal.'));

  c.push(h2('UC-A05: Xóa nhóm quyền'));
  c.push(p('Trigger: Nút Xóa → ConfirmationModal → Xóa → Quay về UC-A01.'));

  c.push(h2('UC-A06: Xem danh sách người dùng'));
  c.push(ucTbl([['Actor','Quản trị viên'],['URL','/admin/users']]));
  c.push(...await imgPara('fsd_user_list_1774948510036.png','Hình UC-A06: Danh sách người dùng'));
  c.push(p('Bảng: Thao tác (⋯) | Mã User | Họ tên | Username | Email | Vai trò (Badge) | Trạng thái (Badge). Click row → UC-A08.'));

  c.push(h2('UC-A07: Thêm người dùng mới'));
  c.push(ucTbl([['Trigger','Nút "Thêm mới"'],['Postcondition','Tạo tài khoản người dùng mới']]));
  c.push(...await imgPara('fsd_add_user_modal_1774948526319.png','Hình UC-A07: Modal Thêm người dùng'));
  c.push(tbl(['Field','Loại','Bắt buộc'],[['Họ và tên','Input','✓'],['SĐT','Input','—'],['Username','Input (lowercase)','✓'],['Email','Input (email)','✓'],['Vai trò','Select','✓'],['Mật khẩu','Input (password, min 6)','✓'],['Xác nhận MK','Input (password)','✓']],[35,35,30]));

  c.push(h2('UC-A08: Xem chi tiết người dùng'));
  c.push(...await imgPara('fsd_user_detail_1774948517070.png','Hình UC-A08: Chi tiết người dùng'));
  c.push(bp('Mô tả màn hình chi tiết:'));
  c.push(h3('Action Bar'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['1','Nút ← Back','Button (icon)','Quay về danh sách'],['2','Breadcrumb','Navigation','"Quản trị Người dùng > Hồ sơ"'],['3','Nút Đổi mật khẩu','Button (outline)','→ UC-A11'],['4','Nút Khóa tài khoản','Button (outline, warning)','→ UC-A10'],['5','Nút Xóa','Button (outline, danger)','→ UC-A12'],['6','Nút Chỉnh sửa','Button (outline)','→ UC-A09']],[5,22,18,55]));
  c.push(h3('Card: Thông tin nhân sự'));
  c.push(tbl(['#','Thành phần','Loại','Mô tả'],[['7','Mã cơ sở','Input (readonly)','VD: HIS_HN_01 (Tự sinh)'],['8','Mã user','Input (readonly)','VD: AD001'],['9','Mật khẩu','Input (password)','Ẩn ký tự'],['10','Họ tên*','Input (text)','Bắt buộc'],['11','Nhân viên','Select','Bác sĩ / Điều dưỡng / ...'],['12','Điện thoại','Input',''],['13','Email','Input (email)','VD: admin@his.vn'],['14','Trạng thái','Badge','Đang hoạt động (xanh) / Đã khóa (đỏ)']],[5,22,18,55]));
  c.push(h3('Panel phải: Nhóm quyền truy cập'));
  c.push(p('Danh sách các nhóm quyền đã gán cho user. Mỗi item: Tên nhóm + Mã nhóm. Radio button để chọn nhóm active.'));

  c.push(h2('UC-A09: Chỉnh sửa thông tin người dùng'));
  c.push(p('Nút Chỉnh sửa → Edit Mode (Hủy + Lưu) → Sửa fields → Lưu → ConfirmationModal.'));

  c.push(h2('UC-A10: Khóa / Kích hoạt tài khoản'));
  c.push(p('Nút "Khóa TK" → ConfirmationModal → Toggle trạng thái Đang hoạt động ↔ Đã khóa. Button text tự đổi.'));

  c.push(h2('UC-A11: Đổi mật khẩu'));
  c.push(p('Nút "Đổi mật khẩu" → Modal nhập MK mới + xác nhận → Validate → Lưu.'));

  c.push(h2('UC-A12: Xóa tài khoản'));
  c.push(p('Nút Xóa → ConfirmationModal → Xóa → Quay về UC-A06.'));

  // === CROSS REFERENCE ===
  c.push(h1('4. Ma trận tham chiếu chéo'));
  c.push(tbl(['UC','Điểm vào','Tham chiếu đến'],[
    ['UC-S01','Login page','→ UC-S02 (staff) hoặc UC-A01 (admin)'],
    ['UC-S04','Sidebar','→ UC-S05'],
    ['UC-S05','UC-S04 click row','→ S06, S07, S08, S09, S10, S16, S17, S18'],
    ['UC-S09','UC-S12/S17/S18 (Thêm chỉ định)','—'],
    ['UC-S10','UC-S12/S17/S18 (Thêm thuốc)','—'],
    ['UC-S11','Sidebar','→ UC-S12'],
    ['UC-S12','UC-S11 click row, UC-S18','→ S09, S10, S13-S15, S19'],
    ['UC-S17','UC-S05 (hasRecord=false)','→ S09, S10'],
    ['UC-S18','UC-S05 (hasRecord=true)','→ UC-S12'],
    ['UC-S19','UC-S12 sidebar','—'],
    ['UC-A01','Sidebar','→ UC-A03'],
    ['UC-A06','Sidebar','→ UC-A08'],
  ],[12,42,46]));

  // === UI STANDARDS ===
  c.push(h1('5. Quy ước UI chung'));
  c.push(tbl(['Quy tắc','Mô tả'],[
    ['Click-to-Row','Toàn bộ dòng bảng là vùng click điều hướng'],
    ['Edit Mode','isEdit=true → chỉ hiện Hủy + Lưu, ẩn tất cả nút khác'],
    ['Clinical Actions','Thêm chỉ định / Thêm thuốc LUÔN hiện khi bản ghi tồn tại'],
    ['Breadcrumb','Tất cả trang chi tiết có breadcrumb + nút ← Back'],
    ['ConfirmationModal','Mọi action Xóa/Lưu/Hủy XN đều cần xác nhận'],
    ['Active Sidebar','Menu cha giữ active khi ở trang con'],
    ['Full-page Overlay','Thêm chỉ định (UC-S09) và Kê đơn (UC-S10) là overlay full-page'],
    ['Badge Colors','BHYT: xanh dương | Hoạt động: xanh lá | Đã khóa: đỏ'],
  ],[22,78]));

  // BUILD
  const doc = new Document({
    styles: { default: {
      document: { run: { font: 'Arial', size: 21 } },
      heading1: { run: { font: 'Arial', size: 32, bold: true, color: '1E293B' }, paragraph: { spacing: { before: 500, after: 200 } } },
      heading2: { run: { font: 'Arial', size: 26, bold: true, color: '2563EB' }, paragraph: { spacing: { before: 400, after: 150 } } },
      heading3: { run: { font: 'Arial', size: 22, bold: true, color: '334155' }, paragraph: { spacing: { before: 300, after: 120 } } },
    }},
    sections: [{ children: c }],
  });

  const buf = await Packer.toBuffer(doc);
  fs.mkdirSync('C:\\Users\\admin\\.gemini\\antigravity\\scratch\\HIS\\src\\docs', { recursive: true });
  fs.writeFileSync(OUT, buf);
  console.log('Done:', OUT, `(${(buf.length/1024/1024).toFixed(2)} MB)`);
}

main().catch(console.error);
