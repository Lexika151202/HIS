# UC-ADM-002: Quản lý người dùng

**Module**: Admin
**Actor**: Admin (Quản trị hệ thống)
**Priority**: Critical
**Last Updated**: 2026-03-31

## Precondition

- User is logged in with "admin" role
- User is on User List page (`/admin/users`)

## Main Flow

1. System displays user list with search bar
2. Table shows: Thao tác, Họ tên (with avatar initial), Tên đăng nhập, Quyền hạn, Trạng thái
3. Admin searches by name or username
4. Admin clicks a row to view user detail

## Alternative Flows

### AF-1: Add New User
- Admin clicks "Thêm người dùng"
  1. System navigates to `/admin/users/new` (detail page)
  2. Admin fills personal info (name, phone, email)
  3. Admin sets account info (username, role, password, confirm password)
  4. Admin sets status (Active/Locked)
  5. Admin clicks "Tạo người dùng" → user created

### AF-2: Edit User Info
- Admin clicks "⋯" → "Chỉnh sửa thông tin"
  1. Navigates to user detail page in edit mode
  2. Admin modifies fields and saves

### AF-3: Change Password
- Admin clicks "⋯" → "Đổi mật khẩu"
  1. ChangePasswordModal opens with 3 fields:
     - Old password (with eye toggle)
     - New password (min 6 chars)
     - Confirm new password
  2. Admin fills and clicks "Xác nhận đổi"
  3. System validates and updates password

### AF-4: Lock / Unlock Account
- Admin clicks "⋯" → "Khóa tài khoản" or "Mở khóa tài khoản"
  1. Confirmation modal appears with context-specific message
  2. Admin confirms → status toggles between "Đang hoạt động" and "Đã khóa"

### AF-5: Delete User
- Admin clicks "⋯" → "Xóa người dùng"
  1. Confirmation modal: "Bạn có chắc chắn muốn xóa người dùng này?"
  2. Admin confirms → user removed from list

## Exception Flows

### EF-1: Validation Errors on Add User
- System validates:
  - fullname required
  - username required (lowercase alphanumeric + underscore only)
  - email required (valid format)
  - role required
  - password required (min 6 chars)
  - confirm password must match
- Invalid fields show red error messages

### EF-2: Password Change Validation
- Old password required
- New password min 6 characters
- Confirm must match

## Postcondition

- User account created/updated/locked/unlocked/deleted

## Business Rules

- BR-006: Username must be lowercase alphanumeric + underscores
- BR-007: Password minimum 6 characters
- BR-008: Password confirmation must match
- BR-009: Email must be valid format
- BR-011: Delete requires confirmation
- BR-012: Lock/Unlock requires confirmation
