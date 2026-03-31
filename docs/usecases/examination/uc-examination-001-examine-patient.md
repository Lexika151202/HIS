# UC-EXM-001: Khám bệnh ngoại trú

**Module**: Examination
**Actor**: Staff / Doctor (Bác sĩ)
**Priority**: Critical
**Last Updated**: 2026-03-31

## Precondition

- User is logged in with "staff" role
- User navigates to "Khám bệnh ngoại trú" via sidebar
- At least one registered patient exists for today

## Main Flow

1. System displays the examination list view with search filters:
   - Date range, department, record status, record type, patient info
2. Staff/Doctor clicks "Tìm kiếm" to filter
3. System shows patient table: Thao tác, STT, Mã BN, Tên, Giới tính, Năm sinh, Đối tượng, BHYT, Xác nhận, Ngày, Phòng khám
4. Staff/Doctor clicks a patient row
5. System navigates to detail view with breadcrumb
6. System displays patient summary bar (ID, name, gender, DOB, BHYT)
7. System displays clinical information form (read-only by default):
   - Admission date/time, clinic room
   - Symptoms / clinical progression
   - Reason for visit
   - Primary diagnosis (ICD-10 select)
   - Primary diagnosis explanation
   - Comorbidities (multi-tag selector)
   - Treatment consultation notes
   - Treatment progression notes
   - Accident type, exam result, treatment type, physician
   - End date/time, treatment method, conclusion
8. System displays vital signs card (pulse, temperature, BP, respiratory rate, weight)
9. System displays service orders table and prescription table
10. Right sidebar shows medical history timeline

## Alternative Flows

### AF-1: Edit Clinical Data
- Staff/Doctor clicks "Thao tác" → "Chỉnh sửa"
  1. All form fields become editable
  2. "Hủy" and "Lưu" buttons appear
  3. Doctor fills in clinical findings
  4. Doctor clicks "Lưu"
  5. Confirmation modal → save

### AF-2: Add Service Order
- Doctor clicks "+ Thêm chỉ định" on service orders section
  1. Service catalog modal opens with tree-based category browser
  2. Doctor selects services from the catalog
  3. Selected services appear in a cart summary
  4. Doctor confirms → services added to the orders table

### AF-3: Add Prescription
- Doctor clicks "+ Thêm thuốc" on prescription section
  1. Drug catalog modal opens with search and tree browser
  2. Doctor selects drugs, sets quantity, days, dosage instructions
  3. Doctor confirms → drugs added to prescription table

### AF-4: View Full Medical History
- Doctor clicks "Xem tất cả lịch sử" in the sidebar
  1. Full-screen history modal opens with split view:
     - Left: list of past visits (date, clinic, diagnosis)
     - Right: selected visit detail
  2. Tabs switch between "Dịch vụ" and "Đơn thuốc" views
  3. Doctor reviews and closes modal

### AF-5: Undo Cost Confirmation
- Doctor clicks "Hủy xác nhận chi phí"
  1. System reverses the cost confirmation for this visit

## Exception Flows

### EF-1: No Patients Found
- If filter returns no results, table shows empty state

## Postcondition

- Clinical record saved with diagnosis, services, and prescriptions
- Service orders are recorded with pricing breakdown
- Prescription record is created

## Business Rules

- BR-013: ICD-10 coding for diagnoses
- BR-014: Auto-calculated BHYT/patient cost split
