# UC-ADM-001: Quản lý nhóm quyền

**Module**: Admin
**Actor**: Admin (Quản trị hệ thống)
**Priority**: Critical
**Last Updated**: 2026-03-31

## Precondition

- User is logged in with "admin" role
- User is on Permission List page (`/admin/permissions`)

## Main Flow

1. System displays the permission list with search bar
2. Table shows: Thao tác, Mã quyền, Tên quyền, Số User, Trạng thái
3. Admin searches by code or name
4. Admin clicks a row to view permission detail
5. Detail page shows:
   - Permission code, name, description, status
   - Per-module permission toggles (Tiếp đón, Đăng ký, Khám bệnh, Quản trị, Báo cáo)
   - Each module has granular view/add/edit/delete checkboxes
6. Admin modifies permissions and saves

## Alternative Flows

### AF-1: Add New Permission Group (via page)
- Admin clicks "Thêm quyền mới"
  1. System navigates to `/admin/permissions/new`
  2. Admin fills code, name, description, status
  3. Admin configures per-module permissions
  4. Admin clicks "Lưu" → group created → redirect to list

### AF-2: Add New Permission Group (via modal)
- Admin can also add via quick modal (AddPermissionModal)
  1. Modal shows: code, name, description, status (Active/Locked radio)
  2. Validates required fields (code, name)
  3. Admin saves → new group added to list

### AF-3: Delete Permission Group
- Admin clicks "⋯" on a row → "Xóa"
  1. Confirmation modal: "Bạn có chắc chắn muốn xóa nhóm quyền này?"
  2. Admin confirms → group deleted from list

## Exception Flows

### EF-1: Validation Error on Add
- If code or name is empty:
  1. Red error text appears below the invalid field
  2. Form does not submit

## Postcondition

- Permission group created/updated/deleted
- User count reflects assigned users (computed)

## Business Rules

- BR-010: Permission code and name are required
- BR-011: Delete requires confirmation
