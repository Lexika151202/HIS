# UC-RCP-002: Xem lịch sử khám bệnh & BHYT

**Module**: Reception
**Actor**: Staff (Nhân viên tiếp đón)
**Priority**: High
**Last Updated**: 2026-03-31

## Precondition

- User is logged in with "staff" role
- User is on the Reception page
- A patient is selected (via search or new entry)

## Main Flow

1. Staff clicks the expand icon on "Các lần đăng ký khám bệnh" panel (right sidebar)
2. System opens full-screen modal showing registration history table
3. Staff can filter by date range (from/to) and click "Làm mới"
4. Table displays: STT, reception date, intake number, service, location
5. Staff reviews history and clicks close

## Alternative Flows

### AF-1: View Medical History
- Staff clicks "Lịch sử khám bệnh" expand icon instead
  1. Modal shows: STT, exam date, clinic, physician, diagnosis
  2. Staff closes modal

### AF-2: View BHYT Usage History
- Staff clicks "Lịch sử sử dụng BHYT" expand icon
  1. Modal shows two info cards: administrative info and insurance info
  2. Below cards: treatment episodes table (record ID, facility code, dates, condition, disease name, treatment result)
  3. Staff reviews and clicks "Đóng"

## Exception Flows

### EF-1: No Patient Selected
- If no patient is selected:
  1. Sidebar panels show "Chưa chọn bệnh nhân" placeholder

## Postcondition

- Staff viewed patient history; no data modifications

## Business Rules

- No data modification in history views (read-only)
