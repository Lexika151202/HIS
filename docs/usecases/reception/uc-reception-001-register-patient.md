# UC-RCP-001: Tiếp đón bệnh nhân mới

**Module**: Reception
**Actor**: Staff (Nhân viên tiếp đón)
**Priority**: Critical
**Last Updated**: 2026-03-31

## Precondition

- User is logged in with "staff" role
- User is on the Reception page (`/his/reception`)

## Main Flow

1. Staff navigates to "Tiếp đón" via sidebar
2. System displays the reception form with 3 main sections:
   - Insurance info (Thông tin thẻ BHYT)
   - Administrative info (Thông tin hành chính)
   - Registration info (Thông tin đăng ký)
3. Staff selects patient category (BHYT or Dịch vụ)
4. Staff enters BHYT card number and related insurance fields
5. Staff enters patient personal info (name, gender, DOB, phone, etc.)
6. Staff enters address details (province, ward, village)
7. Staff enters identity document info (CCCD number, issue date/place)
8. Staff optionally enters next-of-kin information
9. System auto-generates intake number (SN format) and queue number
10. Staff selects designated service and clinic room
11. Staff clicks "Lưu & Tiếp đón" button
12. System shows confirmation modal: "Xác nhận lưu thông tin và thực hiện tiếp đón bệnh nhân này?"
13. Staff confirms
14. System saves the registration record

## Alternative Flows

### AF-1: Search Existing Patient
- Before step 3, staff uses the search bar to find a returning patient
  1. Staff enters patient ID, name, or CMND in search field
  2. System populates form with existing patient data
  3. Staff verifies and updates information
  4. Continue from step 9

### AF-2: Scan CCCD Card
- At step 5, staff clicks "Quét CCCD" button
  1. System initiates CCCD card reader (UI placeholder)
  2. Patient info auto-populates from scanned data

### AF-3: Scan BHYT Card (QR)
- At step 4, staff clicks "Quét mã thẻ" button
  1. System initiates BHYT card reader (UI placeholder)
  2. Insurance info auto-populates from scanned data

## Exception Flows

### EF-1: Missing Required Fields
- At step 11, if patient name is empty:
  1. System highlights the missing field
  2. Form does not submit

## Postcondition

- New registration record is created
- Patient receives a queue number
- Clinic room stats sidebar updates (total / waiting counts)

## Business Rules

- BR-004: Patient name is mandatory
- BR-005: BHYT card format hint ____-____-____-____
- BR-015: Queue number auto-increments per clinic room
