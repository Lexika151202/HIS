import React, { useState } from 'react';
import {
  Search, FileSpreadsheet, Edit3, Calendar, User,
  Filter, ChevronDown, Stethoscope, CircleDollarSign,
  MoreHorizontal, Printer, Trash2, RotateCcw, Save,
  IdCard, QrCode, CreditCard, LogIn, MapPin, Activity,
  Clock, X, ChevronRight, Maximize2
} from 'lucide-react';

const RegistrationList = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'details'
  const [openDropdown, setOpenDropdown] = useState(-1);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const mockData = [
    { stt: 2970, date: '24/03/2026 08:47', intakeId: 'TN.01078.2023.03.24.000081', patientId: '0107822001505', name: 'Phạm Thị Dung', dob: '10/11/1960', yob: 1960, gender: 'Nữ', cmnd: '040350017304', target: 'BHYT-L3', insurance: 'HT3404018115580', service: 'Khám Tai Mũi Họng | Khám Tai Mũi Họng', location: '116 | 116 - Phòng khám Tai mũi họng' },
    { stt: 2969, date: '24/03/2026 08:46', intakeId: 'TN.01078.2023.03.24.000080', patientId: '0107822001504', name: 'Trần Xuân Phúc', dob: '25/07/1954', yob: 1954, gender: 'Nam', cmnd: '040054013130', target: 'BHYT-L3', insurance: 'HT3404018097143', service: 'Khám Da liễu | Khám Da liễu', location: '105 | 105 - Phòng khám Ngoại - Da liễu' },
    { stt: 2968, date: '24/03/2026 08:44', intakeId: 'TN.01078.2023.03.24.000079', patientId: '0107822001503', name: 'Trần Thị Tứ', dob: '27/01/1966', yob: 1966, gender: 'Nữ', cmnd: '026166012388', target: 'BHYT-L4', insurance: 'GD4252620698079', service: 'Khám Nội tổng hợp | Khám Nội tổng hợp', location: '001.6 | 114 - Phòng khám Nội 1- Nhi' },
  ];

  const handleRowClick = (patient) => {
    setSelectedPatient(patient);
    setViewMode('details');
  };

  if (viewMode === 'details') {
    return (
      <div className="animate-fade" style={{ background: '#f8fafc', minHeight: '100vh', padding: '1.5rem 2rem' }}>

        {/* Detail Header (same as Reception Action Bar) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button
              onClick={() => setViewMode('list')}
              style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
            >
              <ChevronRight size={24} style={{ transform: 'rotate(180deg)', color: '#64748b' }} />
            </button>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>Chi tiết Tiếp đón: {selectedPatient?.name}</h1>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Chỉnh sửa thông tin hành chính & thẻ BHYT bệnh nhân</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-outline" style={{ background: '#fff' }} onClick={() => setViewMode('list')}><RotateCcw size={18} /> Quay lại danh sách</button>
            <button className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}><Save size={18} /> Lưu thay đổi (F11)</button>
          </div>
        </div>

        {/* Search/Scan Area (from Reception) */}
        <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem', border: 'none', background: 'linear-gradient(90deg, #fff 0%, #f1f5f9 100%)' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Tìm kiếm nhanh: Nhập Mã BN, Họ tên, CMND hoặc Quét thẻ BHYT..."
                className="modern-input"
                style={{ width: '100%', paddingLeft: '3rem', height: '54px', borderRadius: '12px' }}
              />
            </div>
            <button className="btn btn-primary" style={{ height: '54px', padding: '0 1.5rem', borderRadius: '12px', background: '#2563eb' }}>
              <IdCard size={20} /> <span style={{ marginLeft: '8px' }}>Quét CCCD</span>
            </button>
            <button className="btn btn-primary" style={{ height: '54px', padding: '0 1.5rem', borderRadius: '12px' }}>
              <QrCode size={20} /> <span style={{ marginLeft: '8px' }}>Quét mã thẻ</span>
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start' }}>

          {/* Main Content Area (FULL RECEPTION FORM) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* II. Thông tin thẻ bảo hiểm y tế */}
            <div className="card" style={{ padding: '1.5rem', border: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '10px' }}>
                  <CreditCard size={20} color="#2563eb" />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Thông tin thẻ bảo hiểm y tế</h3>
                <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }}></div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem 1.5rem' }}>
                <div className="form-field">
                  <label>Đối tượng</label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <select className="modern-select" style={{ flex: 1 }}><option>BHYT</option><option>Dịch vụ</option></select>
                    <label className="modern-checkbox" style={{ whiteSpace: 'nowrap' }}>
                      <input type="checkbox" /> <span>Trẻ em không thẻ</span>
                    </label>
                  </div>
                </div>
                <div className="form-field" style={{ gridColumn: 'span 2' }}>
                  <label>Số thẻ BHYT</label>
                  <input type="text" className="modern-input" defaultValue={selectedPatient?.insurance} placeholder="____-____-____-____" />
                </div>
                <div className="form-field">
                  <label>Nơi đăng ký KCB ban đầu</label>
                  <select className="modern-select"><option>01078 - PK Đa khoa Yên Hòa</option></select>
                </div>

                <div className="form-field"><label>Thời gian hiệu lực (Từ ngày)</label><input type="date" className="modern-input" /></div>
                <div className="form-field"><label>Đến ngày</label><input type="date" className="modern-input" /></div>
                <div className="form-field"><label>Đủ 5 năm</label><input type="date" className="modern-input" /></div>
                <div className="form-field" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div><label>Loại tuyến</label><select className="modern-select"><option>Đúng tuyến</option></select></div>
                  <div><label>Khu vực</label><select className="modern-select"><option>Bình thường</option></select></div>
                </div>

                <div className="form-field"><label>Ngày miễn cùng chi trả</label><input type="date" className="modern-input" /></div>
                <div style={{ gridColumn: 'span 3' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '8px', display: 'block' }}>Hình thức bảo hiểm</label>
                  <div style={{ display: 'flex', gap: '2rem', padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <label className="modern-checkbox"><input type="checkbox" /> <span>Chuyển tuyến điều trị</span></label>
                    <label className="modern-checkbox"><input type="checkbox" /> <span>Cấp cứu</span></label>
                    <label className="modern-checkbox"><input type="checkbox" /> <span>Nơi khác đến</span></label>
                  </div>
                </div>
              </div>
            </div>

            {/* III. Thông tin hành chính */}
            <div className="card" style={{ padding: '1.5rem', border: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px' }}>
                  <User size={20} color="#10b981" />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Thông tin hành chính</h3>
                <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }}></div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem 0.75rem' }}>
                <div className="form-field">
                  <label>Mã bệnh nhân</label>
                  <input type="text" className="modern-input" defaultValue={selectedPatient?.patientId} readOnly style={{ background: '#f1f5f9', color: '#64748b' }} />
                </div>
                <div className="form-field" style={{ gridColumn: 'span 2' }}>
                  <label style={{ color: '#2563eb' }}>Họ và tên bệnh nhân*</label>
                  <input type="text" className="modern-input" defaultValue={selectedPatient?.name} style={{ fontWeight: 600 }} />
                </div>
                <div className="form-field">
                  <label>Giới tính</label>
                  <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
                    <button style={{ flex: 1, padding: '6px', border: 'none', borderRadius: '6px', background: selectedPatient?.gender === 'Nam' ? '#fff' : 'transparent', fontSize: '0.8rem', fontWeight: selectedPatient?.gender === 'Nam' ? 600 : 500, color: selectedPatient?.gender === 'Nam' ? '#2563eb' : '#64748b' }}>Nam</button>
                    <button style={{ flex: 1, padding: '6px', border: 'none', borderRadius: '6px', background: selectedPatient?.gender === 'Nữ' ? '#fff' : 'transparent', fontSize: '0.8rem', fontWeight: selectedPatient?.gender === 'Nữ' ? 600 : 500, color: selectedPatient?.gender === 'Nữ' ? '#2563eb' : '#64748b' }}>Nữ</button>
                    <button style={{ flex: 1, padding: '6px', border: 'none', borderRadius: '6px', background: 'transparent', fontSize: '0.8rem', color: '#64748b' }}>Khác</button>
                  </div>
                </div>
                <div className="form-field">
                  <label>Ngày sinh / Tháng / Năm</label>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <input type="text" className="modern-input" defaultValue={selectedPatient?.dob} style={{ flex: 1 }} />
                    <input type="text" className="modern-input" defaultValue={2026 - selectedPatient?.yob} style={{ width: '60px' }} />
                  </div>
                </div>

                <div className="form-field" style={{ gridColumn: 'span 2' }}><label>Địa chỉ thường trú</label><input type="text" className="modern-input" defaultValue="Số 10, Yên Hòa, Cầu Giấy, Hà Nội" /></div>
                <div className="form-field"><label>Tỉnh / Thành phố</label><select className="modern-select"><option>Thành phố Hà Nội</option></select></div>
                <div className="form-field"><label>Phường / Xã</label><select className="modern-select"><option>Phường Yên Hoà</option></select></div>
                <div className="form-field"><label>Thôn / Xóm</label><input type="text" className="modern-input" /></div>

                <div className="form-field"><label>Số điện thoại</label><input type="text" className="modern-input" defaultValue="0987xxx..." /></div>
                <div className="form-field" style={{ gridColumn: 'span 2' }}><label>Nghề nghiệp</label><select className="modern-select"><option>Khác</option></select></div>
                <div className="form-field"><label>Dân tộc</label><select className="modern-select"><option>Kinh</option></select></div>
                <div className="form-field"><label>Quốc tịch</label><select className="modern-select"><option>Việt Nam</option></select></div>

                <div className="form-field"><label>CCCD/Hộ chiếu</label><input type="text" className="modern-input" defaultValue={selectedPatient?.cmnd} /></div>
                <div className="form-field"><label>Ngày cấp</label><input type="date" className="modern-input" /></div>
                <div className="form-field" style={{ gridColumn: 'span 3' }}><label>Nơi cấp</label><select className="modern-select"><option>Cục Cảnh sát</option></select></div>
              </div>
            </div>

            {/* IV. Thông tin đăng ký */}
            <div className="card" style={{ padding: '1.5rem', border: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(244, 63, 94, 0.1)', borderRadius: '10px' }}>
                  <LogIn size={20} color="#f43f5e" />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Thông tin đăng ký</h3>
                <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }}></div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem' }}>
                <div className="form-field"><label>Số tiếp nhận</label><input type="text" className="modern-input" readOnly defaultValue={selectedPatient?.intakeId} style={{ background: '#f1f5f9' }} /></div>
                <div className="form-field"><label>STT khám</label><input type="text" className="modern-input" readOnly defaultValue={selectedPatient?.stt} style={{ background: '#2563eb', color: '#fff', fontWeight: 700 }} /></div>
                <div className="form-field"><label>Ngày vào viện</label><input type="date" className="modern-input" defaultValue="2026-03-24" /></div>
                <div className="form-field"><label>Giờ vào viện</label><input type="time" className="modern-input" defaultValue="08:47" /></div>
                <div className="form-field"><label>Thời gian y lệnh</label><input type="time" className="modern-input" defaultValue="08:50" /></div>

                <div className="form-field" style={{ gridColumn: 'span 2' }}>
                  <label>Dịch vụ chỉ định</label>
                  <select className="modern-select" style={{ height: '48px', fontWeight: 600, color: '#2563eb' }}>
                    <option>{selectedPatient?.service}</option>
                  </select>
                </div>
                <div className="form-field" style={{ gridColumn: 'span 3' }}>
                  <label>Phòng khám tiếp nhận</label>
                  <select className="modern-select" style={{ height: '48px' }}>
                    <option>{selectedPatient?.location}</option>
                  </select>
                </div>
                <div className="form-field" style={{ gridColumn: 'span 5' }}>
                  <label>Ghi chú</label>
                  <textarea className="modern-input" rows="2" style={{ resize: 'none' }} placeholder="Nhập ghi chú..."></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* New Sidebar from previous turn */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'sticky', top: '1.5rem' }}>

            <div className="card" style={{ padding: '1.25rem', border: 'none' }}>
              <h4 style={{ fontSize: '0.9rem', color: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Activity size={16} color="#2563eb" /> Thông tin tiếp đón
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {/* Header Row */}
                <div style={{ display: 'flex', padding: '0 0.75rem 0.5rem', borderBottom: '1px solid #f1f5f9', fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
                  <span style={{ flex: 1.5 }}>Phòng khám</span>
                  <span style={{ flex: 1, textAlign: 'center' }}>Tổng BN</span>
                  <span style={{ flex: 1, textAlign: 'center' }}>Đang chờ</span>
                </div>

                {/* Data Rows */}
                {[
                  { room: 'Phòng 101', total: 42, wait: 8 },
                  { room: 'Phòng 102', total: 31, wait: 3 },
                  { room: 'Phòng 103', total: 25, wait: 0 },
                  { room: 'Phòng 104', total: 18, wait: 2 },
                  { room: 'Tổng cộng', total: 116, wait: 13, isTotal: true },
                ].map((r, idx) => (
                  <div key={idx} style={{
                    display: 'flex', padding: '0.75rem',
                    fontSize: '0.85rem', color: '#1e293b',
                    background: r.isTotal ? '#f8fafc' : (idx % 2 === 0 ? 'transparent' : '#f8fafc'),
                    borderRadius: '8px',
                    fontWeight: r.isTotal ? 700 : 400
                  }}>
                    <span style={{ flex: 1.5, fontWeight: r.isTotal ? 700 : 500 }}>{r.room}</span>
                    <span style={{ flex: 1, textAlign: 'center', color: '#475569' }}>{r.total}</span>
                    <span style={{ flex: 1, textAlign: 'center', fontWeight: 700, color: '#2563eb' }}>{r.wait}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card shadow-sm" style={{ padding: '1rem', border: 'none', background: '#fff' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2563eb', marginBottom: '10px' }}>Các lần đăng ký khám bệnh</h4>
              <div style={{ border: '1px solid #f1f5f9', borderRadius: '4px' }}>
                <div style={{ background: '#f8fafc', padding: '8px 10px', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ChevronDown size={14} /> 24/03/2026
                </div>
                <div style={{ padding: '8px 10px', fontSize: '0.75rem', color: '#2563eb' }}>{selectedPatient?.location}</div>
              </div>
            </div>

            <div className="card shadow-sm" style={{ padding: '1rem', border: 'none', background: '#fff' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2563eb', marginBottom: '10px' }}>Lịch sử khám bệnh</h4>
              <div style={{ border: '1px solid #f1f5f9', borderRadius: '4px' }}>
                <div style={{ background: '#f8fafc', padding: '8px 10px', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ChevronDown size={14} /> 24/03/2026 08:50
                </div>
                <div style={{ padding: '8px 10px', fontSize: '0.7rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div>- Phòng: <span style={{ fontWeight: 600 }}>116 - Tai mũi họng</span></div>
                  <div>- BS: <span style={{ fontWeight: 600 }}>Nguyễn Thị Bình</span></div>
                  <div>- C.Đoán: <span style={{ fontWeight: 600, color: '#0f172a' }}>H65.2 - Viêm tai giữa...</span></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <style>{`
          .form-field { display: flex; flex-direction: column; gap: 4px; }
          .form-field label { font-size: 0.75rem; font-weight: 600; color: #64748b; }
          .modern-input, .modern-select { 
            padding: 8px 10px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 0.8rem;
          }
          .modern-checkbox { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: 500; color: #334155; cursor: pointer; }
          .modern-checkbox input { width: 14px; height: 14px; accent-color: #2563eb; }
          .animate-fade { animation: fadeIn 0.3s ease-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="animate-fade" style={{ background: '#f8fafc', minHeight: '100vh', padding: '1.5rem' }}>

      {/* Search Bar */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem', border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#334155', marginBottom: '1rem', borderLeft: '4px solid #2563eb', paddingLeft: '12px' }}>Tìm kiếm</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 2fr) 1fr 1fr auto auto', gap: '1rem', alignItems: 'flex-end' }}>
          <div className="form-group">
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '6px', display: 'block' }}>Thông tin bệnh nhân</label>
            <input type="text" className="modern-input" placeholder="Nhập Mã bệnh nhân, họ tên, số CMND, số BHYT" style={{ width: '100%' }} />
          </div>
          <div className="form-group">
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '6px', display: 'block' }}>Ngày tiếp nhận</label>
            <input type="date" className="modern-input" defaultValue="2026-03-24" style={{ width: '100%' }} />
          </div>
          <div className="form-group">
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '6px', display: 'block' }}>Đến ngày</label>
            <input type="date" className="modern-input" defaultValue="2026-03-24" style={{ width: '100%' }} />
          </div>
          <button className="btn btn-primary" style={{ background: '#2563eb', height: '42px', padding: '0 1.5rem' }}>Tìm kiếm</button>
          <button className="btn btn-outline" style={{ height: '42px', borderColor: '#10b981', color: '#fff', background: '#10b981' }}>
            <FileSpreadsheet size={16} style={{ marginRight: '8px' }} /> Xuất Excel
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="card" style={{ padding: '0', border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#2563eb' }}>Danh sách bệnh nhân đã tiếp nhận</h3>
          {/* <span style={{ background: '#10b981', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '12px' }}>80</span> */}
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                <th style={{ padding: '0.9rem 1rem', textAlign: 'center', color: '#475569', fontWeight: 700 }}>Thao tác</th>
                <th style={{ padding: '1rem', color: '#475569', fontWeight: 700 }}>STT khám</th>
                <th style={{ padding: '1rem', color: '#475569', fontWeight: 700 }}>Ngày tiếp nhận</th>
                <th style={{ padding: '1rem', color: '#475569', fontWeight: 700 }}>Số tiếp nhận</th>
                <th style={{ padding: '1rem', color: '#475569', fontWeight: 700 }}>Mã bệnh nhân</th>
                <th style={{ padding: '1rem', color: '#475569', fontWeight: 700 }}>Tên bệnh nhân</th>
                <th style={{ padding: '1rem', color: '#475569', fontWeight: 700, textAlign: 'center' }}>Ngày sinh</th>
                <th style={{ padding: '1rem', color: '#475569', fontWeight: 700, textAlign: 'center' }}>Năm sinh</th>
                <th style={{ padding: '1rem', color: '#475569', fontWeight: 700, textAlign: 'center' }}>Giới tính</th>
                <th style={{ padding: '1rem', color: '#475569', fontWeight: 700 }}>CMND</th>
                <th style={{ padding: '1rem', color: '#475569', fontWeight: 700 }}>Đối tượng</th>
                <th style={{ padding: '1rem', color: '#475569', fontWeight: 700 }}>Số thẻ BHYT</th>
                <th style={{ padding: '1rem', color: '#475569', fontWeight: 700 }}>Dịch vụ</th>
                <th style={{ padding: '1rem', color: '#475569', fontWeight: 700 }}>Nơi thực hiện</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((row, idx) => (
                <tr
                  key={idx}
                  style={{ borderBottom: '1px solid #f1f5f9', background: idx % 2 !== 0 ? '#fcfdfe' : '#fff', cursor: 'pointer' }}
                  onClick={() => handleRowClick(row)}
                >
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', alignItems: 'center' }}>
                      <button className="action-circle-btn exam-btn" title="Khám bệnh"><Stethoscope size={12} /></button>
                      <button className="action-circle-btn payment-btn" title="Thanh toán"><CircleDollarSign size={12} /></button>
                      <div style={{ position: 'relative' }}>
                        <button
                          className={`action-circle-btn more-btn ${openDropdown === idx ? 'active' : ''}`}
                          onClick={() => setOpenDropdown(openDropdown === idx ? -1 : idx)}
                        >
                          <MoreHorizontal size={11} />
                        </button>
                        {openDropdown === idx && (
                          <div className="action-dropdown shadow-lg">
                            <div className="dropdown-item"><Printer size={13} /> <span>In</span></div>
                            <div className="dropdown-item"><Edit3 size={13} /> <span>Sửa</span></div>
                            <div className="dropdown-item delete"><Trash2 size={13} /> <span>Xóa</span></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'center', fontWeight: 600 }}>{row.stt}</td>
                  <td style={{ padding: '1rem', color: '#64748b' }}>{row.date}</td>
                  <td style={{ padding: '1rem', color: '#64748b' }}>{row.intakeId}</td>
                  <td style={{ padding: '1rem', fontWeight: 600, color: '#334155' }}>{row.patientId}</td>
                  <td style={{ padding: '1rem', fontWeight: 700, color: '#0f172a' }}>{row.name}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: '#64748b' }}>{row.dob}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: '#64748b' }}>{row.yob}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: '#64748b' }}>{row.gender}</td>
                  <td style={{ padding: '1rem', color: '#64748b' }}>{row.cmnd}</td>
                  <td style={{ padding: '1rem' }}>
                    <span className="badge-target">{row.target}</span>
                  </td>
                  <td style={{ padding: '1rem', color: '#64748b' }}>{row.insurance}</td>
                  <td style={{ padding: '1rem', color: '#2563eb', fontWeight: 600 }}>{row.service}</td>
                  <td style={{ padding: '1rem', color: '#64748b' }}>{row.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .action-circle-btn {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid #e2e8f0;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          color: #64748b;
        }
        .exam-btn { border-color: #2563eb; color: #2563eb; }
        .payment-btn { border-color: #64748b; color: #64748b; }
        .more-btn { border-color: #2563eb; color: #2563eb; }
        .more-btn.active { background: #2563eb; color: #fff; }
        
        .action-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 4px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          min-width: 110px;
          z-index: 50;
          padding: 4px 0;
          text-align: left;
        }
        .dropdown-item {
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.8rem;
          color: #475569;
          cursor: pointer;
          transition: background 0.2s;
        }
        .dropdown-item:hover { background: #f8fafc; }
        .dropdown-item.delete { color: #ef4444; }
        .badge-target {
          background: #e0f2fe;
          color: #0369a1;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.75rem;
        }
        .animate-fade { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .modern-input, .modern-select { 
          padding: 8px 12px; border-radius: 10px; border: 1px solid #e2e8f0; 
          background: #fff; font-size: 0.85rem; outline: none; transition: all 0.2s;
        }
      `}</style>
    </div>
  );
};

export default RegistrationList;
