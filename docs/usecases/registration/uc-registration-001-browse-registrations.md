# UC-REG-001: Duyệt danh sách đăng ký khám

**Module**: Registration
**Actor**: Staff (Nhân viên tiếp đón)
**Priority**: Critical
**Last Updated**: 2026-03-31

## Precondition

- User is logged in with "staff" role
- User navigates to "Danh sách đăng ký" via sidebar

## Main Flow

1. System displays the registration list page with search filter area at top
2. Staff optionally sets date range, department/status filters, search keyword
3. Staff clicks "Tìm kiếm" or presses Enter
4. System filters and displays patient registrations table with columns:
   - Thao tác, STT, Ngày tiếp nhận, Số tiếp nhận, Mã BN, Tên BN, Ngày sinh, Giới tính, CMND, Đối tượng, Số thẻ BHYT, Dịch vụ, Nơi thực hiện
5. Staff clicks on a patient row
6. System navigates to Registration Detail (overview mode)

## Alternative Flows

### AF-1: Row Action Dropdown
- Staff clicks "⋯" action button on a row
  1. Dropdown shows: Chỉnh sửa, Xóa
  2. Staff selects action

## Exception Flows

### EF-1: No Results
- If no registrations match the filters:
  1. Table displays empty state

## Postcondition

- Staff viewed registration list; optionally navigated to detail

## Business Rules

- BR-002: Only staff role can access this module
