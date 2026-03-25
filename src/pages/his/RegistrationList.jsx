import React, { useState } from 'react';
import {
  Search, FileSpreadsheet, Edit3, Calendar, User,
  Filter, ChevronDown, Stethoscope, CircleDollarSign,
  MoreHorizontal, Printer, Trash2, RotateCcw, Save, Settings,
  IdCard, QrCode, CreditCard, LogIn, MapPin, Activity,
  Clock, X, ChevronRight, Maximize2, RefreshCw, Edit, ClipboardCheck,
  Pill, FileText, CheckCircle, AlertCircle, Plus, History, Eye, XCircle,
  LayoutGrid, ChevronLeft, Minus, Pencil
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
  const [showFullHistoryModal, setShowFullHistoryModal] = useState(false);
  const [selectedHistoryVisitId, setSelectedHistoryVisitId] = useState('1');
  const [detailMode, setDetailMode] = useState('overview'); // 'overview', 'payment', 'examination'
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [historyExpandedVisits, setHistoryExpandedVisits] = useState(['1']);
  const [historyActiveTabs, setHistoryActiveTabs] = useState({ '1': 'services', '2': 'services', '3': 'services' });
  const [showServiceOrder, setShowServiceOrder] = useState(false);
  const [collapseTree, setCollapseTree] = useState(false);
  const [collapseList, setCollapseList] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState(['1', '3', '4']);
  const [cartExpandedGroups, setCartExpandedGroups] = useState(['KB', 'XN', 'CDHA']);

  const toggleHistoryVisit = (id) => {
    if (historyExpandedVisits.includes(id)) {
      setHistoryExpandedVisits(historyExpandedVisits.filter(vid => vid !== id));
    } else {
      setHistoryExpandedVisits([...historyExpandedVisits, id]);
    }
  };

  const setVisitTab = (id, tab) => {
    setHistoryActiveTabs({ ...historyActiveTabs, [id]: tab });
  };

  const historyData = [
    {
      id: '1',
      date: '24/02/2026 13:40',
      clinic: '120 - Phòng khám Nội 2 | Phòng khám đa khoa Yên Hoà',
      doctor: 'DƯƠNG MẠNH CƯỜNG',
      diagnosis: 'J45 - Hen phế quản',
      services: [
        {
          groupName: 'Khám bệnh Trạm y tế xã và đơn vị tương đương',
          items: [
            { stt: 1, name: 'Khám bệnh Trạm y tế xã và đơn vị tương đương', date: '24/02/2026', type: 'Giá DV BHYT', qty: 1, doctor: 'Dương Mạnh Cường', status: 'Hoàn thành' }
          ]
        },
        {
          groupName: 'Nội soi tai mũi họng (1 cơ quan)',
          items: [
            { stt: 1, name: 'Nội soi tai mũi họng (1 cơ quan)', date: '24/02/2026', type: 'Giá DV BHYT', qty: 1, doctor: 'Nguyễn Văn Nam', status: 'Hoàn thành' }
          ]
        }
      ],
      prescription: [
        { stt: 1, name: 'Hiteen gel 10g', activeIngredient: 'Erythromycine 4%; Tretinoin 0.025%', unit: 'Tuýp', quantity: 1, days: 15, usage: 'Bôi ngày 1 lần vào buổi tối', origin: 'Kho tủ trực Ngoại - Da liễu' },
        { stt: 2, name: 'Atids 10ml', activeIngredient: 'Acid Salicylic', unit: 'Lọ', quantity: 2, days: 15, usage: 'Bôi ngày 2 lần sáng, tối', origin: 'Nhà thuốc bệnh viện' }
      ]
    },
    {
      id: '2',
      date: '18/07/2024 08:08',
      clinic: '114 - Phòng khám Nội 1- Nhi | Phòng khám đa khoa Yên Hoà',
      doctor: 'Nguyễn Thị Bình',
      diagnosis: 'J20 - Viêm phế quản cấp',
      services: [
        {
          groupName: 'Khám bệnh',
          items: [
            { stt: 1, name: 'Khám bệnh Nội khoa', date: '18/07/2024', type: 'Giá DV BHYT', qty: 1, doctor: 'Nguyễn Thị Bình', status: 'Hoàn thành' }
          ]
        }
      ],
      prescription: [
        { stt: 1, name: 'Amoxicillin 500mg', activeIngredient: 'Amoxicillin', unit: 'Viên', quantity: 21, days: 7, usage: 'Ngày uống 3 lần, mỗi lần 1 viên', origin: 'Nhà thuốc bệnh viện' }
      ]
    },
    {
      id: '3',
      date: '16/02/2022 09:34',
      clinic: '105 - Phòng khám Ngoại - Da liễu | Phòng khám đa khoa Yên Hoà',
      doctor: 'Trần Văn A',
      diagnosis: 'I10 - Tăng huyết áp',
      services: [
        {
          groupName: 'Khám bệnh',
          items: [
            { stt: 1, name: 'Khám bệnh Ngoại khoa', date: '16/02/2022', type: 'Giá DV BHYT', qty: 1, doctor: 'Trần Văn A', status: 'Hoàn thành' }
          ]
        }
      ],
      prescription: [
        { stt: 1, name: 'Amlodipin 5mg', activeIngredient: 'Amlodipin', unit: 'Viên', quantity: 30, days: 30, usage: 'Ngày uống 1 lần vào buổi sáng', origin: 'Nhà thuốc bệnh viện' }
      ]
    }
  ];

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

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {viewMode === 'details' ? (
        <div className="animate-fade" style={{ background: '#f8fafc', minHeight: '100vh', padding: '1.5rem 2rem' }}>
        {/* Modals */}
        <Modal isOpen={showRegPopup} onClose={() => setShowRegPopup(false)} title="Các lần đăng ký khám bệnh">
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

        <Modal isOpen={showHistoryPopup} onClose={() => setShowHistoryPopup(false)} title="Lịch sử khám bệnh">
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.8rem', fontWeight: 500, marginBottom: '4px' }}>
                <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => { setViewMode('list'); setDetailMode('overview'); }} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>Danh sách đăng ký</span>
                <ChevronRight size={14} />
                {detailMode === 'overview' ? (
                  <span style={{ color: '#2563eb' }}>Chi tiết đăng ký</span>
                ) : (
                  <>
                    <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => setDetailMode('overview')} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>Chi tiết đăng ký</span>
                    <ChevronRight size={14} />
                    <span style={{ color: '#2563eb' }}>{detailMode === 'payment' ? 'Thanh toán' : 'Khám bệnh ngoại trú'}</span>
                  </>
                )}
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>
                {detailMode === 'payment' ? 'Thanh toán chi phí' : detailMode === 'examination' ? 'Khám bệnh ngoại trú' : `Chi tiết đăng ký`}
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
              <button
                className="btn btn-primary"
                style={{
                  height: '42px', padding: '0 1.5rem', borderRadius: '12px',
                  background: '#10b981', color: '#fff', border: 'none',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  fontWeight: 600, cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
                onClick={() => setDetailMode('overview')}
              >
                <CheckCircle size={18} /> Xác nhận
              </button>
            )}

            {/* {detailMode === 'examination' && (
              <button className="btn btn-primary" style={{ height: '42px', padding: '0 1.5rem', background: '#2563eb' }} onClick={() => setDetailMode('overview')}>
                <Save size={18} /> Lưu kết quả
              </button>
            )} */}

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
                    <Settings size={16} color="#64748b" /> Chỉnh sửa
                  </button>
                  <button
                    className="dropdown-item"
                    style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '10px', padding: '10px', border: 'none', background: 'transparent', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}
                    onMouseEnter={(e) => e.target.style.background = '#fcf2f2'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    <Trash2 size={16} color="#ef4444" /> Xóa
                  </button>
                </div>
              )}
            </div>

            <div style={{ width: '1px', height: '24px', background: '#e2e8f0', margin: '0 4px' }}></div>
            <button
              className="btn btn-primary"
              style={{
                height: '42px', padding: '0 1.5rem', borderRadius: '12px',
                background: '#2563eb', color: '#fff', border: 'none',
                display: 'flex', alignItems: 'center', gap: '8px',
                fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              onClick={() => setViewMode('list')}
            >
              <Save size={18} /> Lưu
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
                  <div className="form-field"><label>Ngày vào viện</label><input type="date" className="modern-input" defaultValue="2026-03-24" /></div>
                  <div className="form-field"><label>Giờ vào viện</label><input type="time" className="modern-input" defaultValue="08:47" /></div>
                  <div className="form-field"><label>Thời gian y lệnh</label><input type="time" className="modern-input" defaultValue="08:50" /></div>

                  <div className="form-field" style={{ gridColumn: 'span 2' }}>
                    <label>Dịch vụ chỉ định</label>
                    <select className="modern-select" style={{ fontWeight: 600, color: '#2563eb' }}>
                      <option>{selectedPatient?.service}</option>
                    </select>
                  </div>
                  <div className="form-field" style={{ gridColumn: 'span 3' }}>
                    <label>Phòng khám tiếp nhận</label>
                    <select className="modern-select">
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
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2563eb' }}>Lịch sử khám bệnh</h4>
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
                  <span>Họ tên:</span> <strong style={{ color: '#1e293b' }}>{selectedPatient?.name?.toUpperCase()}</strong>
                  <span>Địa chỉ:</span> <span>Số 10, Yên Hòa, Cầu Giấy, Hà Nội</span>
                  <span>BHYT:</span> <span>{selectedPatient?.insurance}</span>
                  <span>Đối tượng:</span> <span style={{ color: '#2563eb', fontWeight: 600 }}>{selectedPatient?.target}</span>
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
                {/* Main Clinical Info */}
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
                      <select className="modern-select"><option>M54 - Đau lưng (Dorsalgia)</option></select>
                    </div>
                    <div className="form-field" style={{ gridColumn: 'span 3' }}>
                      <label>Diễn giải bệnh chính</label>
                      <input type="text" className="modern-input" placeholder="Nhập diễn giải..." />
                    </div>

                    <div className="form-field" style={{ gridColumn: 'span 1' }}>
                      <label>Bệnh kèm theo</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', padding: '6px', border: '1px solid #e2e8f0', borderRadius: '10px', minHeight: '44px', background: '#fff' }}>
                        <span style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>M47 - Thoái hoá <X size={12} cursor="pointer" /></span>
                        <input type="text" placeholder="Tìm..." style={{ border: 'none', outline: 'none', fontSize: '0.85rem', flex: 1, minWidth: '40px' }} />
                      </div>
                    </div>
                    <div className="form-field" style={{ gridColumn: 'span 3' }}>
                      <label>Diễn giải bệnh kèm theo</label>
                      <input type="text" className="modern-input" placeholder="Nhập diễn giải..." />
                    </div>

                    <div className="form-field" style={{ gridColumn: 'span 2' }}><label>Tư vấn điều trị</label><textarea className="modern-input" rows="2"></textarea></div>
                    <div className="form-field" style={{ gridColumn: 'span 2' }}><label>Diễn biến điều trị</label><textarea className="modern-input" rows="2"></textarea></div>

                    <div className="form-field"><label>Loại tai nạn</label><select className="modern-select"><option>-- Chọn loại tai nạn --</option></select></div>
                    <div className="form-field"><label>Kết quả khám</label><select className="modern-select"><option>Không thay đổi</option><option>Khỏi</option><option>Đỡ/Giảm</option></select></div>
                    <div className="form-field"><label>Loại khám chữa bệnh</label><select className="modern-select"><option>Khám bệnh</option></select></div>
                    <div className="form-field"><label>Bác sĩ khám</label><select className="modern-select"><option>Cao Thu Hằng</option></select></div>

                    <div className="form-field">
                      <label>Kết thúc khám</label>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <input type="date" className="modern-input" defaultValue="2026-03-24" style={{ flex: 1.2, minWidth: '0' }} />
                        <input type="time" className="modern-input" defaultValue="22:37" style={{ flex: 0.8, minWidth: '0' }} />
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Phương pháp khám bệnh</label>
                      <select className="modern-select"><option>Tây y</option><option>Đông y</option><option>Kết hợp</option></select>
                    </div>
                    <div className="form-field" style={{ gridColumn: 'span 2' }}>
                      <label>Ghi chú kết luận</label>
                      <input type="text" className="modern-input" placeholder="Ghi chú kết luận..." />
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

                {/* Service Orders Table */}
                <div className="card" style={{ padding: '0', border: 'none', overflow: 'hidden' }}>
                  <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#2563eb' }}>Chỉ định dịch vụ</h3>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-outline btn-sm"><Printer size={16} /> In phiếu</button>
                      <button className="btn btn-primary btn-sm" onClick={() => setShowServiceOrder(true)}><Plus size={16} /> Thêm chỉ định</button>
                    </div>
                  </div>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                      <thead style={{ background: '#f8fafc', color: '#64748b' }}>
                        <tr>
                          <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center', width: '40px' }}>STT</th>
                          <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Tên dịch vụ</th>
                          <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Ngày yêu cầu</th>
                          <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Loại giá</th>
                          <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>SL</th>
                          <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Đơn giá (VNĐ)</th>
                          <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Thành tiền</th>
                          <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>BHYT (VNĐ)</th>
                          <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>BN (VNĐ)</th>
                          <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Bác sĩ chỉ định</th>
                          <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', width: '100px' }}>Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Group Header */}
                        <tr style={{ background: '#f1f5f9', fontWeight: 600 }}>
                          <td colSpan="11" style={{ padding: '0.5rem 1rem', color: '#2563eb' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '4px', width: '16px', height: '16px', justifyContent: 'center', fontSize: '14px' }}>-</span>
                              109 | 109 - Phòng khám Đông y
                            </div>
                          </td>
                        </tr>
                        {/* Data Row */}
                        <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>1</td>
                          <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Khám Y học cổ truyền</td>
                          <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                            23/03/2026<br /><small style={{ color: '#64748b' }}>07:54</small>
                          </td>
                          <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Giá DV BHYT</td>
                          <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>1</td>
                          <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>36.500</td>
                          <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: 600 }}>36.500</td>
                          <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', color: '#10b981' }}>36.500</td>
                          <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>0</td>
                          <td style={{ padding: '0.75rem 0.5rem' }}>Cao Thu Hằng</td>
                          <td style={{ padding: '0.75rem 0.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.7rem' }}>
                              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                <input type="checkbox" checked readOnly style={{ width: '12px', height: '12px' }} /> Kết quả
                              </label>
                              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                <input type="checkbox" style={{ width: '12px', height: '12px' }} /> Viện phí
                              </label>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Prescription Section */}
                <div className="card" style={{ padding: '0', border: 'none', background: '#fff' }}>
                  <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#2563eb', margin: 0 }}>Kê đơn thuốc</h3>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', background: '#fff' }}><Printer size={16} /> In phiếu</button>
                      <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Plus size={16} /> Thêm thuốc</button>
                    </div>
                  </div>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc', color: '#475569', textAlign: 'left' }}>
                          <th style={{ padding: '12px 1rem', fontWeight: 600, borderBottom: '2px solid #e2e8f0', width: '50px', textAlign: 'center' }}>STT</th>
                          <th style={{ padding: '12px 1rem', fontWeight: 600, borderBottom: '2px solid #e2e8f0' }}>Tên dược</th>
                          <th style={{ padding: '12px 1rem', fontWeight: 600, borderBottom: '2px solid #e2e8f0' }}>Hoạt chất</th>
                          <th style={{ padding: '12px 1rem', fontWeight: 600, borderBottom: '2px solid #e2e8f0' }}>Đơn vị tính</th>
                          <th style={{ padding: '12px 1rem', fontWeight: 600, borderBottom: '2px solid #e2e8f0', textAlign: 'center' }}>Số lượng</th>
                          <th style={{ padding: '12px 1rem', fontWeight: 600, borderBottom: '2px solid #e2e8f0', textAlign: 'center' }}>Số ngày</th>
                          <th style={{ padding: '12px 1rem', fontWeight: 600, borderBottom: '2px solid #e2e8f0' }}>Cách dùng</th>
                          <th style={{ padding: '12px 1rem', fontWeight: 600, borderBottom: '2px solid #e2e8f0' }}>Nơi mua thuốc</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { stt: 1, name: 'Hiteen gel 10g', activeIngredient: 'Erythromycine 4%; Tretinoin 0.025%', unit: 'Tuýp', quantity: 1, days: 15, usage: 'Bôi ngày 1 lần vào buổi tối', origin: 'Kho tủ trực Ngoại - Da liễu' },
                          { stt: 2, name: 'Atids 10ml', activeIngredient: 'Acid Salicylic', unit: 'Lọ', quantity: 2, days: 15, usage: 'Bôi ngày 2 lần sáng, tối', origin: 'Nhà thuốc bệnh viện' },
                          { stt: 3, name: 'Vitamin C 500mg', activeIngredient: 'Acid Ascorbic', unit: 'Viên', quantity: 30, days: 15, usage: 'Uống sáng 1 viên, chiều 1 viên', origin: 'Nhà thuốc bệnh viện' }
                        ].map((item, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '1rem', textAlign: 'center', color: '#64748b' }}>{item.stt}</td>
                            <td style={{ padding: '1rem', fontWeight: 600, color: '#0f172a' }}>{item.name}</td>
                            <td style={{ padding: '1rem', color: '#475569' }}>{item.activeIngredient}</td>
                            <td style={{ padding: '1rem', color: '#475569' }}>{item.unit}</td>
                            <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>{item.quantity}</td>
                            <td style={{ padding: '1rem', textAlign: 'center' }}>{item.days}</td>
                            <td style={{ padding: '1rem', color: '#475569' }}>{item.usage}</td>
                            <td style={{ padding: '1rem', color: '#64748b' }}>{item.origin}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Sidebar: Clinical History Only */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="card" style={{ padding: '1.5rem', border: 'none', background: '#fff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <History size={20} color="#2563eb" />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Lịch sử khám bệnh</h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {[
                      { date: '23/03/2026 07:54', clinic: '109 - Đông y', diag: 'M54 - Đau lưng' },
                      { date: '18/07/2024 08:08', clinic: '114 - Nội 1', diag: 'J20 - Viêm phế quản' },
                      { date: '16/02/2022 09:34', clinic: '114 - Nội 1', diag: 'I10 - Tăng huyết áp' }
                    ].map((item, i) => (
                      <div key={i} style={{ position: 'relative', paddingLeft: '20px', borderLeft: '2px solid #e2e8f0' }}>
                        <div style={{
                          position: 'absolute', left: '-7px', top: '0',
                          width: '12px', height: '12px', borderRadius: '50%',
                          background: i === 0 ? '#2563eb' : '#fff',
                          border: '2px solid #2563eb'
                        }}></div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb', marginBottom: '4px' }}>{item.date}</div>
                        <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', fontSize: '0.8rem' }}>
                          <div style={{ marginBottom: '2px' }}><span style={{ color: '#64748b' }}>Phòng:</span> <strong>{item.clinic}</strong></div>
                          <div style={{ color: '#ef4444', fontWeight: 600 }}>{item.diag}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn btn-outline"
                    style={{ width: '100%', marginTop: '1.5rem', fontSize: '0.85rem' }}
                    onClick={() => setShowFullHistoryModal(true)}
                  >
                    <Eye size={16} /> Xem tất cả lịch sử
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History Detail Popup */}
        {showFullHistoryModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(8px)', padding: '24px' }}>
            <div className="card shadow-2xl animate-fade" style={{ width: '1300px', maxWidth: '95vw', background: '#fff', borderRadius: '20px', overflow: 'hidden', height: '90vh', display: 'flex', flexDirection: 'column', border: 'none' }}>

              {/* Header */}
              <div style={{ padding: '1.25rem 2rem', background: '#fff', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', background: '#eff6ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <History size={20} color="#2563eb" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#1e293b' }}>Lịch sử khám chữa bệnh</h2>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>Bệnh nhân: <span style={{ fontWeight: 600, color: '#334155' }}>Lê Thị Loan</span> • Mã BN: <span style={{ fontWeight: 600, color: '#334155' }}>0107822000811</span></p>
                  </div>
                </div>
                <button
                  onClick={() => setShowFullHistoryModal(false)}
                  style={{ width: '36px', height: '36px', background: '#f8fafc', border: 'none', borderRadius: '10px', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' }}
                >
                  <XCircle size={20} />
                </button>
              </div>

              <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                {/* Left Sidebar: Visits List */}
                <div style={{ width: '320px', borderRight: '1px solid #f1f5f9', background: '#fcfdfe', overflowY: 'auto', padding: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Danh sách đợt khám ({historyData.length})</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {historyData.map((visit) => (
                      <div
                        key={visit.id}
                        onClick={() => setSelectedHistoryVisitId(visit.id)}
                        style={{
                          padding: '1rem', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s',
                          background: selectedHistoryVisitId === visit.id ? '#fff' : 'transparent',
                          border: '1px solid',
                          borderColor: selectedHistoryVisitId === visit.id ? '#2563eb' : 'transparent',
                          boxShadow: selectedHistoryVisitId === visit.id ? '0 4px 12px rgba(37, 99, 235, 0.08)' : 'none'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: selectedHistoryVisitId === visit.id ? '#2563eb' : '#1e293b' }}>{visit.date.split(' ')[0]}</span>
                          <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{visit.date.split(' ')[1]}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '4px', fontWeight: 500 }}>{visit.clinic.split('|')[0]}</div>
                        <div style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 600 }}>{visit.diagnosis}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Content Area */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
                  {selectedHistoryVisitId ? (
                    <>
                      {/* Visit Header Detail */}
                      {historyData.filter(v => v.id === selectedHistoryVisitId).map(visit => (
                        <React.Fragment key={visit.id}>
                          <div style={{ padding: '1.5rem 2rem', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1.25rem' }}>
                              <div>
                                <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Phòng khám & Bác sĩ</div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>{visit.clinic}</div>
                                <div style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 600 }}>BS: {visit.doctor}</div>
                              </div>
                              <div>
                                <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Chẩn đoán đợt khám</div>
                                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ef4444' }}>{visit.diagnosis}</div>
                              </div>
                            </div>

                            {/* Tabs Navigation */}
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={() => setVisitTab(visit.id, 'services')}
                                style={{
                                  padding: '8px 20px', borderRadius: '10px', border: 'none', fontSize: '0.85rem', fontWeight: 600,
                                  cursor: 'pointer', transition: 'all 0.2s',
                                  background: (historyActiveTabs[visit.id] || 'services') === 'services' ? '#2563eb' : 'transparent',
                                  color: (historyActiveTabs[visit.id] || 'services') === 'services' ? '#fff' : '#64748b'
                                }}
                              >
                                Dịch vụ ({visit.services.reduce((acc, g) => acc + g.items.length, 0)})
                              </button>
                              <button
                                onClick={() => setVisitTab(visit.id, 'prescription')}
                                style={{
                                  padding: '8px 20px', borderRadius: '10px', border: 'none', fontSize: '0.85rem', fontWeight: 600,
                                  cursor: 'pointer', transition: 'all 0.2s',
                                  background: historyActiveTabs[visit.id] === 'prescription' ? '#2563eb' : 'transparent',
                                  color: historyActiveTabs[visit.id] === 'prescription' ? '#fff' : '#64748b'
                                }}
                              >
                                Đơn thuốc ({visit.prescription.length})
                              </button>
                            </div>
                          </div>

                          <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                            {(historyActiveTabs[visit.id] || 'services') === 'services' ? (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {visit.services.map((group, gIdx) => (
                                  <div key={gIdx}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                      <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: '#1e293b' }}>{group.groupName}</h4>
                                      <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }}></div>
                                      <span style={{ fontSize: '0.75rem', background: '#eff6ff', color: '#2563eb', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>{group.items.length} dịch vụ</span>
                                    </div>
                                    <div className="card" style={{ padding: 0, border: '1px solid #f1f5f9', overflow: 'hidden' }}>
                                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                                        <thead>
                                          <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                                            <th style={{ padding: '12px', textAlign: 'center', width: '50px', color: '#64748b' }}>STT</th>
                                            <th style={{ padding: '12px', textAlign: 'left', color: '#64748b' }}>Tên dịch vụ</th>
                                            <th style={{ padding: '12px', textAlign: 'center', color: '#64748b' }}>Loại giá</th>
                                            <th style={{ padding: '12px', textAlign: 'center', width: '60px', color: '#64748b' }}>SL</th>
                                            <th style={{ padding: '12px', textAlign: 'center', color: '#64748b' }}>Bác sĩ</th>
                                            <th style={{ padding: '12px', textAlign: 'center', color: '#64748b' }}>Trạng thái</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {group.items.map((item, iIdx) => (
                                            <tr key={iIdx} style={{ borderBottom: iIdx === group.items.length - 1 ? 'none' : '1px solid #f8fafc' }}>
                                              <td style={{ padding: '12px', textAlign: 'center', color: '#94a3b8' }}>{item.stt}</td>
                                              <td style={{ padding: '12px', fontWeight: 600, color: '#334155' }}>{item.name}</td>
                                              <td style={{ padding: '12px', textAlign: 'center', color: '#64748b' }}>{item.type}</td>
                                              <td style={{ padding: '12px', textAlign: 'center', fontWeight: 700 }}>{item.qty}</td>
                                              <td style={{ padding: '12px', textAlign: 'center', color: '#64748b' }}>{item.doctor}</td>
                                              <td style={{ padding: '12px', textAlign: 'center' }}>
                                                <span style={{ background: '#dcfce7', color: '#166534', padding: '3px 10px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 600 }}>{item.status}</span>
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="card" style={{ padding: 0, border: '1px solid #f1f5f9', overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                                  <thead>
                                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                                      <th style={{ padding: '14px 1rem', textAlign: 'center', color: '#64748b', width: '50px' }}>STT</th>
                                      <th style={{ padding: '14px 1rem', textAlign: 'left', color: '#64748b' }}>Tên thuốc</th>
                                      <th style={{ padding: '14px 1rem', textAlign: 'left', color: '#64748b' }}>Hàm lượng / Hoạt chất</th>
                                      <th style={{ padding: '14px 1rem', textAlign: 'center', color: '#64748b' }}>SL</th>
                                      <th style={{ padding: '14px 1rem', textAlign: 'center', color: '#64748b', width: '80px' }}>Ngày</th>
                                      <th style={{ padding: '14px 1rem', textAlign: 'left', color: '#64748b' }}>Cách dùng</th>
                                      <th style={{ padding: '14px 1rem', textAlign: 'left', color: '#64748b' }}>Nơi mua</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {visit.prescription.map((item, pIdx) => (
                                      <tr key={pIdx} style={{ borderBottom: pIdx === visit.prescription.length - 1 ? 'none' : '1px solid #f8fafc' }}>
                                        <td style={{ padding: '1rem', textAlign: 'center', color: '#94a3b8' }}>{item.stt}</td>
                                        <td>
                                          <div style={{ padding: '1rem', fontWeight: 700, color: '#1e293b' }}>{item.name}</div>
                                        </td>
                                        <td style={{ padding: '1rem', color: '#64748b', maxWidth: '200px' }}>{item.activeIngredient}</td>
                                        <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 700, color: '#2563eb' }}>{item.quantity} {item.unit}</td>
                                        <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>{item.days}</td>
                                        <td style={{ padding: '1rem', color: '#475569', fontSize: '0.8rem', lineHeight: '1.4' }}>{item.usage}</td>
                                        <td style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.75rem' }}>{item.origin}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        </React.Fragment>
                      ))}
                    </>
                  ) : (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                      <History size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                      <p>Chọn một đợt khám từ danh sách bên trái để xem chi tiết</p>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ padding: '1.25rem 2rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end', background: '#fff' }}>
                <button
                  className="btn btn-primary"
                  style={{ height: '42px', padding: '0 2rem', borderRadius: '12px', background: '#1e293b' }}
                  onClick={() => setShowFullHistoryModal(false)}
                >
                  Đóng lịch sử
                </button>
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
    ) : (
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
          <button
            className="btn btn-primary"
            style={{
              background: '#2563eb', height: '42px', padding: '0 1.5rem',
              borderRadius: '12px', color: '#fff', border: 'none',
              display: 'flex', alignItems: 'center', gap: '8px',
              fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
            }}
          >
            <Search size={18} /> Tìm kiếm
          </button>
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
                      <button className="action-circle-btn" style={{ borderColor: '#2563eb', color: '#2563eb' }} onClick={(e) => { e.stopPropagation(); setSelectedPatient(row); setDetailMode('examination'); setViewMode('details'); }} title="Khám bệnh"><Stethoscope size={12} /></button>
                      <button className="action-circle-btn" style={{ borderColor: '#10b981', color: '#10b981' }} onClick={(e) => { e.stopPropagation(); setSelectedPatient(row); setDetailMode('payment'); setViewMode('details'); }} title="Thanh toán"><CircleDollarSign size={12} /></button>
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
      </div>
    )}

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
        .form-field { display: flex; flex-direction: column; gap: 6px; }
        .form-field label { font-size: 0.8rem; font-weight: 600; color: #475569; }
        .modern-input, .modern-select { padding: 10px 12px; border-radius: 10px; border: 1px solid #e2e8f0; background: #fff; font-size: 0.85rem; outline: none; transition: all 0.2s; }
        .modern-input:focus, .modern-select:focus { border-color: #2563eb; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1); }
        .btn-sm { padding: 0.4rem 0.8rem; font-size: 0.8rem; }
        
        .service-tree-item { 
          padding: 6px 12px; cursor: pointer; display: flex; align-items: center; gap: 8px; border-radius: 6px; 
          transition: all 0.2s; font-size: 0.85rem; color: #475569; position: relative;
        }
        .service-tree-item:hover { background: #eff6ff; color: #2563eb; }
        .service-tree-item.active { background: #2563eb; color: #fff; font-weight: 600; }
        .service-tree-item .tree-chevron { width: 16px; display: flex; justify-content: center; }
        
        .service-list-item { border-bottom: 1px solid #f1f5f9; transition: background 0.2s; }
        .service-list-item:hover { background: #fcfdfe; }

        .compact-table th { 
          background: #f1f5f9; color: #475569; font-size: 0.7rem; font-weight: 700; 
          padding: 6px 4px; border: 1px solid #e2e8f0;
          white-space: nowrap;
        }
        .compact-table td { 
          padding: 4px; border: 1px solid #e2e8f0; font-size: 0.75rem; color: #1e293b;
          height: 32px;
        }
        .patient-info-card {
          background: #fff; border-radius: 12px; padding: 16px 32px;
          display: flex; gap: 250px; align-items: center; justify-content: center;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);
          margin-bottom: 4px; z-index: 10;
        }
      `}</style>

      {/* Service Order Full-page Overlay */}
      {showServiceOrder && (
        <div className="animate-fade" style={{ position: 'fixed', inset: 0, background: '#f1f5f9', zIndex: 1100, display: 'flex', flexDirection: 'column' }}>
          {/* Header with Patient Info Card */}
          <div style={{ padding: '16px 2rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <div className="patient-info-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#3b82f610', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.025em' }}>Bệnh nhân</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>
                      {selectedPatient?.name} <span style={{ fontWeight: 400, color: '#64748b', fontSize: '0.9rem' }}>({selectedPatient?.gender} - {2026 - selectedPatient?.yob} tuổi)</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Mã BN: <span style={{ color: '#3b82f6', fontWeight: 600 }}>{selectedPatient?.patientId}</span></div>
                  </div>
                </div>

                <div style={{ height: '40px', width: '1px', background: '#e2e8f0' }} />

                <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
                  <div style={{ minWidth: '150px' }}>
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '2px' }}>Bảo hiểm y tế</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>{selectedPatient?.insurance}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '2px' }}>Phòng khám</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 500, color: '#334155' }}>{selectedPatient?.location}</div>
                    </div>
                  </div>

                  <div style={{ maxWidth: '400px' }}>
                    <div style={{ marginBottom: '4px' }}>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '2px' }}>Chẩn đoán</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2563eb' }}>
                        M54 - Đau lưng (Dorsalgia)
                      </div>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.4' }}>
                      Bệnh nhân có tiền sử đau thắt lưng mạn tính, đợt này đau tăng kèm theo hạn chế vận động...
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '12px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', minWidth: '220px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span style={{ color: '#64748b' }}>Tổng tiền:</span>
                  <span style={{ fontWeight: 700, color: '#1e293b' }}>36.500</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span style={{ color: '#64748b' }}>BHYT:</span>
                  <span style={{ fontWeight: 600, color: '#10b981' }}>- 36.500</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', paddingTop: '4px', borderTop: '1px dashed #cbd5e1' }}>
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>Thực thu:</span>
                  <span style={{ fontWeight: 800, color: '#ef4444' }}>0 VNĐ</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {/* Left Column: Category Tree */}
            {!collapseTree ? (
              <div style={{ width: '260px', background: '#fff', borderRight: '1px solid #e2e8f0', overflowY: 'auto', padding: '1rem', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>NHÓM DỊCH VỤ</h3>
                  <button onClick={() => setCollapseTree(true)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><ChevronLeft size={16} /></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div className="service-tree-item active">
                    <span className="tree-chevron"><LayoutGrid size={14} /></span>
                    Tất cả dịch vụ
                  </div>

                  <div style={{ marginTop: '4px' }}>
                    <div
                      className="service-tree-item"
                      style={{ fontWeight: expandedGroups.includes('1') ? 700 : 500 }}
                      onClick={() => setExpandedGroups(prev => prev.includes('1') ? prev.filter(i => i !== '1') : [...prev, '1'])}
                    >
                      <span className="tree-chevron">
                        {expandedGroups.includes('1') ? <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }} /> : <ChevronRight size={14} />}
                      </span>
                      1. Khám bệnh
                    </div>
                    {expandedGroups.includes('1') && (
                      <div style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div className="service-tree-item">Khám bệnh</div>
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: '2px' }}>
                    <div
                      className="service-tree-item"
                      style={{ fontWeight: expandedGroups.includes('3') ? 700 : 500 }}
                      onClick={() => setExpandedGroups(prev => prev.includes('3') ? prev.filter(i => i !== '3') : [...prev, '3'])}
                    >
                      <span className="tree-chevron">
                        {expandedGroups.includes('3') ? <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }} /> : <ChevronRight size={14} />}
                      </span>
                      3. Xét nghiệm
                    </div>
                    {expandedGroups.includes('3') && (
                      <div style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div className="service-tree-item">XN Huyết học</div>
                        <div className="service-tree-item">XN Sinh hóa</div>
                        <div className="service-tree-item">XN Vi sinh</div>
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: '2px' }}>
                    <div
                      className="service-tree-item"
                      style={{ fontWeight: expandedGroups.includes('4') ? 700 : 500 }}
                      onClick={() => setExpandedGroups(prev => prev.includes('4') ? prev.filter(i => i !== '4') : [...prev, '4'])}
                    >
                      <span className="tree-chevron">
                        {expandedGroups.includes('4') ? <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }} /> : <ChevronRight size={14} />}
                      </span>
                      4. Chẩn đoán hình ảnh
                    </div>
                    {expandedGroups.includes('4') && (
                      <div style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div className="service-tree-item">X-Quang</div>
                        <div className="service-tree-item">Siêu âm</div>
                      </div>
                    )}
                  </div>

                  <div className="service-tree-item"><span className="tree-chevron"><ChevronRight size={14} /></span> 5. Thăm dò chức năng</div>
                  <div className="service-tree-item"><span className="tree-chevron"><ChevronRight size={14} /></span> 6. Phẫu thuật</div>
                  <div className="service-tree-item"><span className="tree-chevron"><ChevronRight size={14} /></span> 7. Thủ thuật</div>
                </div>
              </div>
            ) : (
              <div style={{ width: '40px', background: '#fff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem 0' }}>
                <button onClick={() => setCollapseTree(false)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer' }}><ChevronRight size={20} /></button>
                <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', marginTop: '20px', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>NHÓM DỊCH VỤ</div>
              </div>
            )}

            {/* Middle Column: Service Selection Table */}
            {!collapseList ? (
              <div style={{ width: '420px', display: 'flex', flexDirection: 'column', background: '#fcfdfe', borderRight: '1px solid #e2e8f0' }}>
                <div style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>DANH SÁCH DỊCH VỤ</h3>
                    <button onClick={() => setCollapseList(true)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><ChevronLeft size={16} /></button>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input type="text" className="modern-input" placeholder="Mã / tên dịch vụ..." style={{ width: '100%', paddingRight: '40px' }} />
                    <Search size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', zIndex: 10 }}>
                      <tr>
                        <th style={{ padding: '0.75rem 0.75rem', textAlign: 'center', width: '50px' }}>STT</th>
                        <th style={{ padding: '0.75rem 1rem 0.75rem 0', textAlign: 'left' }}>Dịch vụ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { code: '22.0121.1369', name: 'Tổng phân tích tế bào máu ngoại vi', bh: '49.700', bv: '49.700' },
                        { code: 'CKMP', name: 'Công khám miễn phí', bh: '0', bv: '0' },
                        { code: 'DMKT_0023', name: 'AFB trực tiếp nhuộm Ziehl-Neelsen', bh: '74.200', bv: '74.200' },
                      ].map((s, idx) => (
                        <tr key={idx} className="service-list-item">
                          <td style={{ padding: '0.75rem 0.75rem', textAlign: 'center' }}><span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{idx + 1}</span></td>
                          <td style={{ padding: '0.75rem 1rem 0.75rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#1e293b' }}>{s.code} - {s.name}</div>
                              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '4px', fontSize: '0.75rem' }}>
                                <span style={{ color: '#64748b' }}>BHYT: <span style={{ color: '#10b981', fontWeight: 600 }}>{s.bh}</span></span>
                                <span style={{ color: '#64748b' }}>Viện: <span style={{ color: '#ef4444', fontWeight: 600 }}>{s.bv}</span></span>
                              </div>
                            </div>
                            <button className="btn btn-primary" style={{ width: '24px', height: '24px', padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Plus size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div style={{ width: '40px', background: '#fff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem 0' }}>
                <button onClick={() => setCollapseList(false)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer' }}><ChevronRight size={20} /></button>
                <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', marginTop: '20px', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>DANH SÁCH DỊCH VỤ</div>
              </div>
            )}

            {/* Right Column: Order Cart (Wider) */}
            <div style={{ flex: 1, background: '#fff', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '16px 1rem', borderBottom: '1px solid #f1f5f9', background: '#f8fafc', display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                <div className="form-field" style={{ flex: 2 }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Bác sĩ chỉ định</label>
                  <select className="modern-select" style={{ height: '38px', fontSize: '0.85rem', padding: '0 12px' }}>
                    <option>V080103 | Nguyễn Ngọc Ánh</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '8px', flex: 3 }}>
                  <div className="form-field" style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Ngày yêu cầu</label>
                    <input type="date" className="modern-input" defaultValue="2026-03-25" style={{ height: '38px', fontSize: '0.85rem', padding: '0 12px' }} />
                  </div>
                  <div className="form-field">
                    <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Giờ</label>
                    <input type="time" className="modern-input" defaultValue="09:03" style={{ height: '38px', fontSize: '0.85rem', width: '90px', padding: '0 10px' }} />
                  </div>
                </div>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ padding: '8px 1rem', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>DỊCH VỤ CHỈ ĐỊNH</h3>
                </div>
                <div style={{ flex: 1, overflowX: 'auto', padding: '0 1rem 1rem 1rem' }}>
                  <table className="compact-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1200px' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                        <th style={{ textAlign: 'center', padding: '12px 8px' }}><input type="checkbox" checked readOnly /></th>
                        <th style={{ textAlign: 'center', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>STT</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>Mã</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '0.75rem', width: '250px' }}>Tên dịch vụ</th>
                        <th style={{ textAlign: 'center', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>SL</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>Loại giá</th>
                        <th style={{ textAlign: 'right', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>Đơn giá</th>
                        <th style={{ textAlign: 'right', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>Thành tiền</th>
                        <th style={{ textAlign: 'right', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>BHYT trả</th>
                        <th style={{ textAlign: 'right', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>BN trả</th>
                        <th style={{ textAlign: 'center', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>Ngày yêu cầu</th>
                        <th style={{ textAlign: 'center', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>Giường</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>PP vô cảm</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>Bác sĩ</th>
                        <th style={{ textAlign: 'center', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ border: 'none', cursor: 'pointer' }} onClick={() => setCartExpandedGroups(prev => prev.includes('KB') ? prev.filter(i => i !== 'KB') : [...prev, 'KB'])}>
                        <td colSpan="15" style={{ padding: '12px 0 4px 0' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: '#eff6ff', borderRadius: '6px', width: 'fit-content' }}>
                            <div style={{ background: '#3b82f6', borderRadius: '4px', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {!cartExpandedGroups.includes('KB') ? <ChevronRight size={10} color="#fff" /> : <Minus size={10} color="#fff" />}
                            </div>
                            <span style={{ fontWeight: 700, color: '#1d4ed8', fontSize: '0.75rem', letterSpacing: '0.025em' }}>Khám bệnh (1)</span>
                          </div>
                        </td>
                      </tr>
                      {cartExpandedGroups.includes('KB') && (
                        <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ textAlign: 'center', padding: '10px 8px' }}><input type="checkbox" checked readOnly /></td>
                          <td style={{ textAlign: 'center', padding: '10px 8px', color: '#94a3b8', fontSize: '0.8rem' }}>1</td>
                          <td style={{ textAlign: 'left', padding: '10px 8px', color: '#64748b', fontSize: '0.8rem' }}>001.01</td>
                          <td style={{ textAlign: 'left', padding: '10px 8px', fontWeight: 600, color: '#334155', fontSize: '0.85rem' }}>Khám Nội tổng hợp</td>
                          <td style={{ textAlign: 'center', padding: '10px 8px', fontWeight: 600 }}>1</td>
                          <td style={{ textAlign: 'left', padding: '10px 8px' }}>
                            <span style={{ padding: '2px 8px', borderRadius: '12px', background: '#dcfce7', color: '#166534', fontSize: '0.7rem', fontWeight: 600 }}>Giá BHYT</span>
                          </td>
                          <td style={{ textAlign: 'right', padding: '10px 8px', color: '#475569' }}>36.500</td>
                          <td style={{ textAlign: 'right', padding: '10px 8px', fontWeight: 700, color: '#1e293b' }}>36.500</td>
                          <td style={{ textAlign: 'right', padding: '10px 8px', color: '#10b981', fontWeight: 600 }}>36.500</td>
                          <td style={{ textAlign: 'right', padding: '10px 8px', color: '#ef4444', fontWeight: 600 }}>0</td>
                          <td style={{ textAlign: 'center', padding: '10px 8px', color: '#64748b' }}>25/03/2026</td>
                          <td style={{ textAlign: 'center', padding: '10px 8px', color: '#64748b' }}>G-102</td>
                          <td style={{ textAlign: 'left', padding: '10px 8px', color: '#64748b' }}>Tê tại chỗ</td>
                          <td style={{ textAlign: 'left', padding: '10px 8px', color: '#1e293b', fontWeight: 500 }}>Nguyễn Ngọc Ánh</td>
                          <td style={{ textAlign: 'center', padding: '10px 8px' }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                              <Pencil size={14} color="#3b82f6" cursor="pointer" />
                              <Trash2 size={14} color="#ef4444" cursor="pointer" />
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ padding: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '8px', background: '#f8fafc' }}>
                <button className="btn btn-outline" onClick={() => setShowServiceOrder(false)} style={{ background: '#fff' }}>Đóng (Esc)</button>
                <button className="btn btn-outline" style={{ background: '#fff' }}><Printer size={16} /> In</button>
                <button className="btn btn-primary" onClick={() => setShowServiceOrder(false)} style={{ padding: '0 2rem' }}><Save size={16} /> Lưu</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationList;
