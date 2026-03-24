import React, { useState } from 'react';
import {
  Search, FileSpreadsheet, Edit3, Calendar, User,
  Filter, ChevronDown, Stethoscope, CircleDollarSign,
  MoreHorizontal, Printer, Trash2, RotateCcw, Save,
  IdCard, QrCode, CreditCard, LogIn, MapPin, Activity,
  Clock, X, ChevronRight, Maximize2, RefreshCw, Edit, ClipboardCheck,
  Settings, Pill, FileText, CheckCircle, AlertCircle, Plus, History, Eye
} from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
      <div className="card shadow-md" style={{ width: '1100px', maxWidth: '95vw', background: '#fff', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b' }}>{title}</h2>
          <button
            onClick={onClose}
            style={{ background: '#f8fafc', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer', color: '#64748b', transition: 'all 0.2s' }}
            onMouseEnter={(e) => e.target.style.background = '#fee2e2'}
            onMouseLeave={(e) => e.target.style.background = '#f8fafc'}
          >
            <X size={20} />
          </button>
        </div>
        <div style={{ padding: '1.5rem', maxHeight: '85vh', overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

const RegistrationList = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'details'
  const [openDropdown, setOpenDropdown] = useState(-1);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [showRegPopup, setShowRegPopup] = useState(false);
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [detailMode, setDetailMode] = useState('overview'); // 'overview', 'payment', 'examination'
  const [showActionDropdown, setShowActionDropdown] = useState(false);

  const mockData = [
    { stt: 2970, date: '24/03/2026 08:47', intakeId: 'TN.01078.2023.03.24.000081', patientId: '0107822001505', name: 'Phạm Thị Dung', dob: '10/11/1960', yob: 1960, gender: 'Nữ', cmnd: '040350017304', target: 'BHYT-L3', insurance: 'HT3404018115580', service: 'Khám Tai Mũi Họng | Khám Tai Mũi Họng', location: '116 | 116 - Phòng khám Tai mũi họng' },
    { stt: 2969, date: '24/03/2026 08:46', intakeId: 'TN.01078.2023.03.24.000080', patientId: '0107822001504', name: 'Trần Xuân Phúc', dob: '25/07/1954', yob: 1954, gender: 'Nam', cmnd: '040054013130', target: 'BHYT-L3', insurance: 'HT3404018097143', service: 'Khám Da liễu | Khám Da liễu', location: '105 | 105 - Phòng khám Ngoại - Da liễu' },
    { stt: 2968, date: '24/03/2026 08:44', intakeId: 'TN.01078.2023.03.24.000079', patientId: '0107822001503', name: 'Trần Thị Tứ', dob: '27/01/1966', yob: 1966, gender: 'Nữ', cmnd: '026166012388', target: 'BHYT-L4', insurance: 'GD4252620698079', service: 'Khám Nội tổng hợp | Khám Nội tổng hợp', location: '001.6 | 114 - Phòng khám Nội 1- Nhi' },
  ];

  const handleRowClick = (patient) => {
    setSelectedPatient(patient);
    setDetailMode('overview');
    setViewMode('details');
  };

  const renderFilterRow = () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginBottom: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
      <div className="form-field" style={{ flex: 1 }}>
        <label>Từ ngày</label>
        <input type="date" className="modern-input" defaultValue="2026-03-24" />
      </div>
      <div className="form-field" style={{ flex: 1 }}>
        <label>Đến ngày</label>
        <input type="date" className="modern-input" defaultValue="2026-03-24" />
      </div>
      <button className="btn btn-primary" style={{ height: '40px', padding: '0 1rem', display: 'flex', alignItems: 'center', gap: '8px', background: '#2563eb' }}>
        <RefreshCw size={16} /> Làm mới
      </button>
    </div>
  );

  if (viewMode === 'details') {
    return (
      <div className="animate-fade" style={{ background: '#f8fafc', minHeight: '100vh', padding: '1.5rem 2rem' }}>
        {/* Modals */}
        <Modal isOpen={showRegPopup} onClose={() => setShowRegPopup(false)} title="Chi tiết các lần đăng ký khám bệnh">
          {renderFilterRow()}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: 700, whiteSpace: 'nowrap' }}>STT</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, whiteSpace: 'nowrap' }}>Ngày tiếp nhận</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, whiteSpace: 'nowrap' }}>Số tiếp nhận</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, whiteSpace: 'nowrap' }}>Dịch vụ</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, whiteSpace: 'nowrap' }}>Nơi thực hiện</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px', textAlign: 'center', whiteSpace: 'nowrap' }}>1</td>
                  <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>24/03/2026 08:47</td>
                  <td style={{ padding: '12px', fontWeight: 600, whiteSpace: 'nowrap' }}>TN.01078.2023.03.24.000081</td>
                  <td style={{ padding: '12px', color: '#2563eb', whiteSpace: 'nowrap' }}>Khám Tai Mũi Họng</td>
                  <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>116 - Phòng khám Tai mũi họng</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fcfdfe' }}>
                  <td style={{ padding: '12px', textAlign: 'center', whiteSpace: 'nowrap' }}>2</td>
                  <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>20/03/2026 14:20</td>
                  <td style={{ padding: '12px', fontWeight: 600, whiteSpace: 'nowrap' }}>TN.01078.2023.03.20.000045</td>
                  <td style={{ padding: '12px', color: '#2563eb', whiteSpace: 'nowrap' }}>Khám Nội tổng hợp</td>
                  <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>114 - Phòng khám Nội</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal>

        <Modal isOpen={showHistoryPopup} onClose={() => setShowHistoryPopup(false)} title="Chi tiết lịch sử khám bệnh">
          {renderFilterRow()}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: 700, whiteSpace: 'nowrap' }}>STT</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, whiteSpace: 'nowrap' }}>Ngày khám</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, whiteSpace: 'nowrap' }}>Phòng khám</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, whiteSpace: 'nowrap' }}>Bác sĩ</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, whiteSpace: 'nowrap' }}>Chẩn đoán</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px', textAlign: 'center', whiteSpace: 'nowrap' }}>1</td>
                  <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>24/03/2026 08:50</td>
                  <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>116 - Tai mũi họng</td>
                  <td style={{ padding: '12px', fontWeight: 600, whiteSpace: 'nowrap' }}>Nguyễn Thị Bình</td>
                  <td style={{ padding: '12px', color: '#ef4444', fontWeight: 500, lineHeight: '1.4', wordBreak: 'break-word', minWidth: '300px' }}>
                    H65.2 - Viêm tai giữa xuất tiết mạn tính (Viêm tai giữa thanh dịch mạn tính; Viêm tai giữa mạn tính có dịch tiết không mủ)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal>

        {/* Breadcrumb Navigation */}
        {detailMode !== 'overview' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', fontSize: '0.9rem', color: '#64748b' }}>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => setDetailMode('overview')} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>Chi tiết đăng ký</span>
            <ChevronRight size={14} />
            <span style={{ color: '#2563eb', fontWeight: 600 }}>{detailMode === 'payment' ? 'Thanh toán' : 'Khám bệnh'}</span>
          </div>
        )}

        {/* Detail Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button
              onClick={() => {
                if (detailMode !== 'overview') setDetailMode('overview');
                else setViewMode('list');
              }}
              style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
            >
              <ChevronRight size={24} style={{ transform: 'rotate(180deg)', color: '#64748b' }} />
            </button>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>
                {detailMode === 'payment' ? 'Thanh toán chi phí' : detailMode === 'examination' ? 'Khám bệnh ngoại trú' : `Chi tiết đăng ký: ${selectedPatient?.name}`}
              </h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {detailMode === 'overview' && (
              <>
                <button className="btn btn-outline" style={{ background: '#fff', height: '42px', padding: '0 1.25rem' }}><Printer size={18} /> In phiếu</button>
                <button className="btn btn-outline" style={{ background: '#fff', height: '42px', padding: '0 1.25rem' }} onClick={() => setDetailMode('payment')}>
                  <CircleDollarSign size={18} /> Thanh toán
                </button>
                <button className="btn btn-outline" style={{ background: '#fff', height: '42px', padding: '0 1.25rem' }} onClick={() => setDetailMode('examination')}>
                  <Stethoscope size={18} /> Khám bệnh
                </button>
              </>
            )}

            {detailMode === 'payment' && (
              <button className="btn btn-primary" style={{ height: '42px', padding: '0 1.5rem', background: '#10b981' }} onClick={() => setDetailMode('overview')}>
                <Save size={18} /> Xác nhận thanh toán
              </button>
            )}

            {detailMode === 'examination' && (
              <button className="btn btn-primary" style={{ height: '42px', padding: '0 1.5rem', background: '#2563eb' }} onClick={() => setDetailMode('overview')}>
                <Save size={18} /> Lưu kết quả
              </button>
            )}

            <div style={{ position: 'relative' }}>
              <button
                className="btn btn-outline"
                style={{ background: '#fff', height: '42px', padding: '0 1rem', display: 'flex', gap: '8px' }}
                onClick={() => setShowActionDropdown(!showActionDropdown)}
              >
                <Settings size={18} /> Thao tác <ChevronDown size={14} style={{ transform: showActionDropdown ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
              </button>

              {showActionDropdown && (
                <div className="card shadow-lg" style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: '8px',
                  zIndex: 1000, width: '180px', padding: '6px', border: '1px solid #f1f5f9'
                }}>
                  <button
                    className="dropdown-item"
                    style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '10px', padding: '10px', border: 'none', background: 'transparent', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}
                    onMouseEnter={(e) => e.target.style.background = '#f8fafc'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    <Edit size={16} color="#64748b" /> Chỉnh sửa
                  </button>
                  <button
                    className="dropdown-item"
                    style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '10px', padding: '10px', border: 'none', background: 'transparent', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', color: '#ef4444' }}
                    onMouseEnter={(e) => e.target.style.background = '#fef2f2'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    <Trash2 size={16} /> Xóa đăng ký
                  </button>
                </div>
              )}
            </div>

            <div style={{ width: '1px', height: '24px', background: '#e2e8f0', margin: '0 4px' }}></div>
            <button
              className="btn btn-primary"
              style={{ height: '42px', padding: '0 1.5rem', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)', background: '#1e293b' }}
              onClick={() => setViewMode('list')}
            >
              <Save size={18} /> Lưu (F11)
            </button>
          </div>
        </div>

        {/* Content Area Rendering */}
        {detailMode === 'overview' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start' }}>
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
                    <div style={{ display: 'flex', gap: '2rem', padding: '10px 0' }}>
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

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem 1rem' }}>
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
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Ngày sinh/Tháng/Năm</label>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <input type="text" className="modern-input" defaultValue={selectedPatient?.dob} style={{ flex: 1 }} />
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', top: '-18px', left: '0', fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Tuổi</span>
                        <input type="text" className="modern-input" defaultValue={2026 - selectedPatient?.yob} style={{ width: '60px' }} />
                      </div>
                    </div>
                  </div>

                  <div className="form-field"><label>Số điện thoại</label><input type="text" className="modern-input" defaultValue="0987xxx..." /></div>
                  <div className="form-field" style={{ gridColumn: 'span 2' }}><label>Số thẻ lao động</label><input type="text" className="modern-input" placeholder="Số thẻ LĐ..." /></div>
                  <div className="form-field"><label>Dân tộc</label><select className="modern-select"><option>Kinh</option></select></div>
                  <div className="form-field"><label>Quốc tịch</label><select className="modern-select"><option>Việt Nam</option></select></div>

                  <div className="form-field"><label>Nghề nghiệp</label><select className="modern-select"><option>Khác</option></select></div>
                  <div className="form-field" style={{ gridColumn: 'span 2' }}><label>Nơi làm việc</label><input type="text" className="modern-input" placeholder="Tên cơ quan..." /></div>
                  <div className="form-field" style={{ gridColumn: 'span 2' }}><label>Khoa / Phòng BN</label><input type="text" className="modern-input" placeholder="Khoa/Phòng..." /></div>

                  <div className="form-field" style={{ gridColumn: 'span 2' }}><label>Địa chỉ thường trú</label><input type="text" className="modern-input" defaultValue="Số 10, Yên Hòa, Cầu Giấy, Hà Nội" /></div>
                  <div className="form-field"><label>Tỉnh / Thành phố</label><select className="modern-select"><option>Thành phố Hà Nội</option></select></div>
                  <div className="form-field"><label>Phường / Xã</label><select className="modern-select"><option>Phường Yên Hoà</option></select></div>
                  <div className="form-field"><label>Thôn / Xóm</label><input type="text" className="modern-input" /></div>

                  <div className="form-field"><label>CCCD/Hộ chiếu</label><input type="text" className="modern-input" defaultValue={selectedPatient?.cmnd} /></div>
                  <div className="form-field"><label>Họ tên người thân</label><input type="text" className="modern-input" placeholder="Tên thân nhân..." /></div>
                  <div className="form-field"><label>CCCD người thân</label><input type="text" className="modern-input" placeholder="Số CCCD..." /></div>
                  <div className="form-field"><label>SĐT người thân</label><input type="text" className="modern-input" placeholder="09xx..." /></div>
                  <div className="form-field"><label>Địa chỉ người thân</label><input type="text" className="modern-input" placeholder="Địa chỉ thân nhân..." /></div>
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
                  <div className="form-field"><label>STT khám</label><input type="text" className="modern-input" readOnly defaultValue={selectedPatient?.stt} style={{ background: '#f1f5f9', color: '#000' }} /></div>
                  <div className="form-field" style={{ gridColumn: 'span 2' }}><label>Dịch vụ chỉ định</label><select className="modern-select"><option>{selectedPatient?.service}</option></select></div>
                  <div className="form-field"><label>Phòng khám</label><select className="modern-select"><option>{selectedPatient?.location}</option></select></div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="card" style={{ padding: '1.25rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Activity size={16} color="#2563eb" /> Thông tin tiếp đón
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    { room: 'Phòng 101', total: 42, wait: 8 },
                    { room: 'Phòng 102', total: 31, wait: 3 },
                    { room: 'Tổng cộng', total: 116, wait: 13, isTotal: true },
                  ].map((r, idx) => (
                    <div key={idx} style={{ display: 'flex', padding: '0.75rem', fontSize: '0.85rem', background: r.isTotal ? '#f8fafc' : 'transparent', borderRadius: '8px', fontWeight: r.isTotal ? 700 : 400 }}>
                      <span style={{ flex: 1.5 }}>{r.room}</span>
                      <span style={{ flex: 1, textAlign: 'center' }}>{r.total}</span>
                      <span style={{ flex: 1, textAlign: 'center', color: '#2563eb', fontWeight: 700 }}>{r.wait}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card shadow-sm" style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2563eb' }}>Các lần đăng ký</h4>
                  <Maximize2 size={14} style={{ cursor: 'pointer' }} onClick={() => setShowRegPopup(true)} />
                </div>
                <div style={{ background: '#f8fafc', padding: '8px 10px', fontSize: '0.75rem', borderRadius: '4px' }}>{selectedPatient?.date?.split(' ')[0]} - {selectedPatient?.location}</div>
              </div>

              <div className="card shadow-sm" style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2563eb' }}>Lịch sử khám</h4>
                  <Maximize2 size={14} style={{ cursor: 'pointer' }} onClick={() => setShowHistoryPopup(true)} />
                </div>
                <div style={{ background: '#f8fafc', padding: '8px 10px', fontSize: '0.7rem', borderRadius: '4px' }}>
                  <div>BS: Nguyễn Thị Bình</div>
                  <div>C.Đoán: H65.2 - Viêm tai giữa...</div>
                </div>
              </div>
            </div>
          </div>
        ) : detailMode === 'payment' ? (
          <div className="animate-fade">
            {/* Payment Content View */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div className="card" style={{ padding: '1.25rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', color: '#2563eb' }}>Thông tin cá nhân</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                   <span>Số tiếp nhận:</span> <strong>{selectedPatient?.intakeId}</strong>
                   <span>Mã BN:</span> <strong>{selectedPatient?.patientId}</strong>
                   <span>Họ tên:</span> <strong style={{color: '#1e293b'}}>{selectedPatient?.name?.toUpperCase()}</strong>
                   <span>Địa chỉ:</span> <span>Số 10, Yên Hòa, Cầu Giấy, Hà Nội</span>
                   <span>BHYT:</span> <span>{selectedPatient?.insurance}</span>
                   <span>Đối tượng:</span> <span style={{color: '#2563eb', fontWeight: 600}}>{selectedPatient?.target}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="card" style={{ padding: '1.25rem' }}>
                   <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', color: '#2563eb' }}>Thanh toán</h4>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-field"><label>Ngày thu</label><input type="date" className="modern-input" defaultValue="2026-03-24" /></div>
                      <div className="form-field"><label>Hình thức</label><select className="modern-select"><option>Tiền mặt</option><option>Chuyển khoản</option></select></div>
                   </div>
                </div>
                <div className="card" style={{ padding: '1.25rem' }}>
                   <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', color: '#2563eb' }}>Chứng từ</h4>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-field"><label>Số quyển</label><input type="text" className="modern-input" placeholder="Q001" /></div>
                      <div className="form-field"><label>Số biên lai</label><input type="text" className="modern-input" placeholder="000123" /></div>
                   </div>
                </div>
              </div>
            </div>
            <div className="card" style={{ marginTop: '1.5rem', padding: 0 }}>
               <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                 <thead style={{ background: '#f8fafc' }}>
                   <tr>
                     <th style={{ padding: '12px' }}>STT</th>
                     <th style={{ padding: '12px', textAlign: 'left' }}>Dịch vụ</th>
                     <th style={{ padding: '12px' }}>SL</th>
                     <th style={{ padding: '12px', textAlign: 'right' }}>Đơn giá</th>
                     <th style={{ padding: '12px', textAlign: 'right' }}>Thành tiền</th>
                     <th style={{ padding: '12px', textAlign: 'right' }}>BHYT</th>
                     <th style={{ padding: '12px', textAlign: 'right' }}>BN Trả</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr style={{ borderTop: '1px solid #f1f5f9' }}>
                     <td style={{ padding: '12px', textAlign: 'center' }}>1</td>
                     <td style={{ padding: '12px' }}>{selectedPatient?.service}</td>
                     <td style={{ padding: '12px', textAlign: 'center' }}>1</td>
                     <td style={{ padding: '12px', textAlign: 'right' }}>36.500</td>
                     <td style={{ padding: '12px', textAlign: 'right' }}>36.500</td>
                     <td style={{ padding: '12px', textAlign: 'right' }}>36.500</td>
                     <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#ef4444' }}>0</td>
                   </tr>
                 </tbody>
               </table>
            </div>
          </div>
        ) : (
          <div className="animate-fade">
            {/* Examination Content View (Synced with Examination.jsx) */}
            <div className="card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem', background: '#fff', border: 'none' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
                <div><label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Mã BN</label><span style={{ fontWeight: 700 }}>{selectedPatient?.patientId}</span></div>
                <div><label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Họ và tên</label><span style={{ fontWeight: 700 }}>{selectedPatient?.name}</span></div>
                <div><label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Giới tính</label><span style={{ fontWeight: 600 }}>{selectedPatient?.gender}</span></div>
                <div><label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Ngày sinh</label><span style={{ fontWeight: 600 }}>{selectedPatient?.dob}</span></div>
                <div><label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>BHYT</label><span style={{ fontWeight: 700, color: '#2563eb' }}>{selectedPatient?.insurance}</span></div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem', alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="card" style={{ padding: '1.5rem', border: 'none' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                     <Stethoscope size={20} color="#2563eb" />
                     <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Thông tin khám bệnh</h3>
                     <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }}></div>
                   </div>

                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
                     <div className="form-field"><label>Ngày vào khám</label><input type="date" className="modern-input" defaultValue="2026-03-24" /></div>
                     <div className="form-field"><label>Giờ vào viện</label><input type="time" className="modern-input" defaultValue="08:50" /></div>
                     <div className="form-field" style={{ gridColumn: 'span 2' }}><label>Phòng khám</label><select className="modern-select"><option>{selectedPatient?.location}</option></select></div>

                     <div className="form-field" style={{ gridColumn: 'span 2' }}>
                       <label>Triệu chứng / Diễn biến</label>
                       <textarea className="modern-input" rows="3" placeholder="Ghi chú triệu chứng..."></textarea>
                     </div>
                     <div className="form-field" style={{ gridColumn: 'span 2' }}>
                       <label>Lý do vào viện</label>
                       <textarea className="modern-input" rows="3" placeholder="Ghi chú lý do..."></textarea>
                     </div>

                     <div className="form-field" style={{ gridColumn: 'span 1' }}>
                       <label>Bệnh chính (ICD10)</label>
                       <select className="modern-select"><option>J02 - Viêm họng cấp</option></select>
                     </div>
                     <div className="form-field" style={{ gridColumn: 'span 3' }}>
                       <label>Diễn giải bệnh chính</label>
                       <input type="text" className="modern-input" placeholder="Nhập diễn giải..." />
                     </div>
                   </div>
                </div>

                {/* Vital Signs */}
                <div className="card" style={{ padding: '1.5rem', border: 'none' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                     <Activity size={20} color="#ef4444" />
                     <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Chỉ số sinh tồn</h3>
                   </div>
                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }}>
                      {['Mạch', 'Nhiệt độ', 'HA (min)', 'HA (max)', 'Nhịp thở', 'Cân nặng'].map((l, i) => (
                        <div key={i} style={{ padding: '1rem 0.5rem', background: '#f8fafc', borderRadius: '12px', textAlign: 'center' }}>
                          <label style={{ fontSize: '0.7rem', color: '#64748b', display: 'block', marginBottom: '6px' }}>{l}</label>
                          <input type="text" style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center', fontWeight: 700 }} placeholder="..." />
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              {/* Modern Right History Bar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="card" style={{ padding: '1.5rem', border: 'none', background: '#fff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <History size={20} color="#2563eb" />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Lịch sử khám bệnh</h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {[
                      { date: '23/03/2026 07:54', clinic: '109 - Đông y', doctor: 'Cao Thu Hằng', diag: 'M54 - Đau lưng' },
                      { date: '18/07/2024 08:08', clinic: '114 - Nội 1', doctor: 'Nguyễn Bình', diag: 'J20 - Viêm phế quản' },
                    ].map((item, i) => (
                      <div key={i} style={{ position: 'relative', paddingLeft: '20px', borderLeft: '2px solid #e2e8f0' }}>
                        <div style={{ 
                          position: 'absolute', left: '-7px', top: '0', 
                          width: '12px', height: '12px', borderRadius: '50%', 
                          background: i === 0 ? '#2563eb' : '#fff', 
                          border: '2px solid #2563eb' 
                        }}></div>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#2563eb', marginBottom: '4px' }}>{item.date}</div>
                        <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', fontSize: '0.75rem', color: '#1e293b' }}>
                          <div style={{ marginBottom: '2px' }}><span style={{ color: '#64748b' }}>Phòng:</span> <strong>{item.clinic}</strong></div>
                          <div style={{ color: '#ef4444', fontWeight: 600 }}>{item.diag}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="btn btn-outline" style={{ width: '100%', marginTop: '1.5rem', fontSize: '0.8rem', padding: '8px' }}>
                    <Eye size={14} /> Xem tất cả lịch sử
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <style>{`
          .form-field { display: flex; flex-direction: column; gap: 4px; }
          .form-field label { font-size: 0.75rem; font-weight: 600; color: #64748b; }
          .modern-input, .modern-select { padding: 8px 10px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 0.8rem; outline: none; transition: all 0.2s; }
          .modern-input:focus, .modern-select:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1); }
          .modern-checkbox { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: 500; color: #334155; cursor: pointer; }
          .modern-checkbox input { width: 14px; height: 14px; accent-color: #2563eb; }
          .animate-fade { animation: fadeIn 0.3s ease-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    );
  }

  // --- LIST VIEW ---
  return (
    <div className="animate-fade" style={{ background: '#f8fafc', minHeight: '100vh', padding: '1.5rem' }}>
      {/* Search Bar */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem', border: 'none' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#334155', marginBottom: '1rem', borderLeft: '4px solid #2563eb', paddingLeft: '12px' }}>Tìm kiếm</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 2fr) 1fr 1fr auto auto', gap: '1rem', alignItems: 'flex-end' }}>
          <div className="form-group">
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '6px', display: 'block' }}>Thông tin bệnh nhân</label>
            <input type="text" className="modern-input" placeholder="Mã BN, họ tên, CMND, BHYT..." style={{ width: '100%' }} />
          </div>
          <div className="form-group">
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '6px', display: 'block' }}>Ngày tiếp nhận</label>
            <input type="date" className="modern-input" defaultValue="2026-03-24" style={{ width: '100%' }} />
          </div>
          <div className="form-group">
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '6px', display: 'block' }}>Đến ngày</label>
            <input type="date" className="modern-input" defaultValue="2026-03-24" style={{ width: '100%' }} />
          </div>
          <button className="btn btn-primary" style={{ background: '#1e293b', height: '42px', padding: '0 1.5rem' }}>Tìm kiếm</button>
          <button className="btn btn-outline" style={{ height: '42px', borderColor: '#10b981', color: '#10b981', background: '#fff' }}>
            <FileSpreadsheet size={16} style={{ marginRight: '8px' }} /> Xuất Excel
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="card" style={{ padding: '0', border: 'none' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#2563eb' }}>Danh sách bệnh nhân đã tiếp nhận</h3>
          <span style={{ background: '#10b981', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '12px' }}>{mockData.length}</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                <th style={{ padding: '0.9rem 1rem', textAlign: 'center', color: '#475569', fontWeight: 700 }}>Thao tác</th>
                <th style={{ padding: '1rem', color: '#475569', fontWeight: 700 }}>STT</th>
                <th style={{ padding: '1rem', color: '#475569', fontWeight: 700 }}>Ngày tiếp nhận</th>
                <th style={{ padding: '1rem', color: '#475569', fontWeight: 700 }}>Số tiếp nhận</th>
                <th style={{ padding: '1rem', color: '#475569', fontWeight: 700 }}>Mã bệnh nhân</th>
                <th style={{ padding: '1rem', color: '#475569', fontWeight: 700 }}>Tên bệnh nhân</th>
                <th style={{ padding: '1rem', color: '#475569', fontWeight: 700 }}>Đối tượng</th>
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
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                      <button className="action-circle-btn" style={{borderColor: '#2563eb', color: '#2563eb'}} onClick={(e) => { e.stopPropagation(); setSelectedPatient(row); setDetailMode('examination'); setViewMode('details'); }} title="Khám bệnh"><Stethoscope size={12} /></button>
                      <button className="action-circle-btn" style={{borderColor: '#10b981', color: '#10b981'}} onClick={(e) => { e.stopPropagation(); setSelectedPatient(row); setDetailMode('payment'); setViewMode('details'); }} title="Thanh toán"><CircleDollarSign size={12} /></button>
                      <div style={{ position: 'relative' }}>
                        <button className="action-circle-btn" onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === idx ? -1 : idx); }} title="Thao tác khác"><MoreHorizontal size={11} /></button>
                        {openDropdown === idx && (
                          <div className="action-dropdown shadow-lg">
                            <div className="dropdown-item"><Edit3 size={13} /> <span>Sửa</span></div>
                            <div className="dropdown-item delete"><Trash2 size={13} /> <span>Xóa</span></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>{row.stt}</td>
                  <td style={{ padding: '1rem', color: '#64748b' }}>{row.date}</td>
                  <td style={{ padding: '1rem', color: '#64748b' }}>{row.intakeId}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{row.patientId}</td>
                  <td style={{ padding: '1rem', fontWeight: 700 }}>{row.name}</td>
                  <td style={{ padding: '1rem' }}><span className="badge-target">{row.target}</span></td>
                  <td style={{ padding: '1rem', color: '#2563eb', fontWeight: 600 }}>{row.service}</td>
                  <td style={{ padding: '1rem', color: '#64748b' }}>{row.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .action-circle-btn { width: 22px; height: 22px; border-radius: 50%; border: 1px solid #e2e8f0; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; padding: 0; }
        .action-circle-btn:hover { transform: scale(1.1); }
        .action-dropdown { position: absolute; top: 100%; left: 0; margin-top: 4px; background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; min-width: 110px; z-index: 50; padding: 4px 0; }
        .dropdown-item { padding: 8px 12px; display: flex; align-items: center; gap: 10px; font-size: 0.8rem; color: #475569; cursor: pointer; }
        .dropdown-item:hover { background: #f8fafc; }
        .dropdown-item.delete { color: #ef4444; }
        .badge-target { background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 4px; font-weight: 600; font-size: 0.75rem; }
        .animate-fade { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .modern-input, .modern-select { padding: 8px 12px; border-radius: 10px; border: 1px solid #e2e8f0; background: #fff; font-size: 0.85rem; outline: none; transition: all 0.2s; }
      `}</style>
    </div>
  );
};

export default RegistrationList;
