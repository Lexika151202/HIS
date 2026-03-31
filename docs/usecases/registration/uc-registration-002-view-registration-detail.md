# UC-REG-002: Xem & chỉnh sửa chi tiết đăng ký

**Module**: Registration
**Actor**: Staff
**Priority**: Critical
**Last Updated**: 2026-03-31

## Precondition

- User is on the Registration List page
- At least one registration exists

## Main Flow

1. Staff clicks a patient row in the registration list
2. System navigates to detail view (overview mode) with breadcrumb navigation
3. System displays 3 form sections (read-only by default):
   - BHYT info (card number, validity, coverage type)
   - Administrative info (personal data, address, identity, relative)
   - Registration info (intake number, queue, date/time, service, room)
4. Right sidebar shows: clinic stats, past registrations, medical history, BHYT history panels
5. Staff reviews patient data

## Alternative Flows

### AF-1: Edit Mode
- Staff clicks "Thao tác" → "Chỉnh sửa"
  1. Form fields become editable
  2. "Hủy" and "Lưu" buttons appear
  3. Staff modifies fields
  4. Staff clicks "Lưu"
  5. Confirmation modal appears
  6. Staff confirms → changes saved

### AF-2: Navigate to Payment
- Staff clicks "Thanh toán" button
  1. System switches to Payment sub-view
  2. Displays patient summary, payment form (date, method), receipt info, cost breakdown table
  3. Staff clicks "Xác nhận" to confirm payment

### AF-3: Navigate to Examination
- Staff clicks "Khám bệnh" button
  1. System switches to Examination sub-view
  2. Displays full clinical form (same as Examination module)
  3. Staff can enter clinical data if record doesn't exist yet

### AF-4: Delete Registration
- Staff clicks "Thao tác" → "Xóa"
  1. Confirmation modal: "Bạn có chắc chắn muốn xóa?"
  2. Staff confirms → record deleted → return to list

## Exception Flows

None specific.

## Postcondition

- Registration viewed/edited/deleted as per selected action

## Business Rules

- BR-011: Delete requires explicit confirmation modal
