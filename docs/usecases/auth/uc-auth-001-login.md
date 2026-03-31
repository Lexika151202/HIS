# UC-AUTH-001: Đăng nhập hệ thống

**Module**: Authentication
**Actor**: Staff / Admin
**Priority**: Critical
**Last Updated**: 2026-03-31

## Precondition

- System is accessible at the configured URL
- User has valid credentials (admin/admin or staff/staff)

## Main Flow

1. System displays the Login screen with username and password fields
2. User enters username
3. User enters password
4. User clicks "Đăng nhập" button
5. System displays loading state ("Đang xác thực...")
6. System validates credentials (800ms mock delay)
7. System determines user role from credentials:
   - `admin/admin` → role = "admin"
   - `staff/staff` → role = "staff"
8. System redirects to the appropriate default page:
   - Admin → `/admin/permissions`
   - Staff → `/his/reception`
9. Sidebar renders role-specific navigation links

## Alternative Flows

### AF-1: Invalid Credentials
- At step 6, if credentials don't match any known pair:
  1. System displays error message: "Tên đăng nhập hoặc mật khẩu không chính xác"
  2. Loading state is removed
  3. User can retry from step 2

## Exception Flows

### EF-1: Empty Fields
- At step 4, if username or password is empty:
  1. Browser enforces HTML5 `required` validation
  2. Form does not submit

## Postcondition

- User session is established with correct role
- Navigation sidebar displays role-appropriate menu items
- User can access their authorized modules

## Business Rules

- BR-001: Admin role accesses Permission and User management only
- BR-002: Staff role accesses Reception, Registration, and Examination only
- BR-003: Invalid credentials produce a user-friendly Vietnamese error
