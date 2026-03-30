import React, { useState } from 'react';
import {
  Search, Filter, List, User, Calendar,
  ChevronRight, MoreVertical, ClipboardCheck,
  Stethoscope, XCircle, Eye, Trash2, LayoutGrid,
  Clock, CheckCircle, AlertCircle, RefreshCcw, RotateCcw,
  Activity, Printer, Save, Plus, LogIn, Pill, FileText, History, Pencil,
  ChevronLeft, Minus, Settings, ChevronDown, Edit
} from 'lucide-react';
import ConfirmationModal from '../../components/ConfirmationModal';

const Examination = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'details'
  const [isEdit, setIsEdit] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUndoConfirm, setShowUndoConfirm] = useState(false);

  const [showServiceOrder, setShowServiceOrder] = useState(false);
  const [showPrescriptionOrder, setShowPrescriptionOrder] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState(['1', '3', '4']); // IDs of expanded categories
  const [collapseTree, setCollapseTree] = useState(false);
  const [collapseList, setCollapseList] = useState(false);
  const [cartExpandedGroups, setCartExpandedGroups] = useState(['KB', 'XN', 'CDHA']);
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyExpandedVisits, setHistoryExpandedVisits] = useState(['1']); // Expanded by default for demo
  const [historyActiveTabs, setHistoryActiveTabs] = useState({ '1': 'services', '2': 'services', '3': 'services' });
  const [selectedHistoryVisitId, setSelectedHistoryVisitId] = useState('1');
  const [selectedPatient, setSelectedPatient] = useState(null);

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

  const mockPatients = [
    { stt: 2660, id: '0107822000811', name: 'Lê Thị Loan', gender: 'Nữ', yob: 1982, target: 'BHYT-L4', insurance: 'GD4010120972718', confirmed: true, date: '23/03/2026', room: '109 | Phòng khám Đông y' },
    { stt: 2661, id: '0107825001157', name: 'Trần Thị Chanh', gender: 'Nữ', yob: 1951, target: 'BHYT-L2', insurance: 'CT2383821506943', confirmed: true, date: '23/03/2026', room: '001.6 | Phòng khám Nội 1 - Nhi' },
    { stt: 2662, id: '0107820001392', name: 'Kim Trọng Tuệ', gender: 'Nam', yob: 1973, target: 'BHYT-L4', insurance: 'GD4010112068042', confirmed: true, date: '23/03/2026', room: '105 | Phòng khám Ngoại - Da liễu' },
    { stt: 2663, id: '0107822004777', name: 'Nguyễn Kim Dũng', gender: 'Nam', yob: 1957, target: 'BHYT-L4', insurance: 'GD4010121091710', confirmed: true, date: '23/03/2026', room: '001.6 | Phòng khám Nội 1 - Nhi' },
  ];

  return (
    <div className="animate-fade" style={{ background: '#f8fafc', minHeight: '100vh', padding: '1.5rem 2rem' }}>



      {viewMode === 'list' ? (
        <div className="animate-fade">
          {/* I. Search Area */}
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', border: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Search size={18} color="#2563eb" />
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>Bộ lọc tìm kiếm</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
              <div className="form-field">
                <label>Thời gian khám (Từ - Đến)</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input type="date" className="modern-input" defaultValue="2026-03-23" style={{ flex: 1 }} />
                  <span style={{ color: '#94a3b8' }}>-</span>
                  <input type="date" className="modern-input" defaultValue="2026-03-23" style={{ flex: 1 }} />
                </div>
              </div>
              <div className="form-field">
                <label>Khoa / Phòng ban</label>
                <select className="modern-select"><option>Tất cả khoa phòng</option></select>
              </div>
              <div className="form-field">
                <label>Trạng thái hồ sơ</label>
                <select className="modern-select"><option>Tất cả trạng thái</option></select>
              </div>
              <div className="form-field">
                <label>Loại hồ sơ</label>
                <select className="modern-select"><option>Hồ sơ ngoại trú</option></select>
              </div>

              <div className="form-field" style={{ gridColumn: 'span 2' }}>
                <label>Thông tin bệnh nhân</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <select className="modern-select" style={{ width: '180px' }}><option>Tên hoặc mã BN</option></select>
                  <input type="text" className="modern-input" style={{ flex: 1 }} placeholder="Nhập từ khóa tìm kiếm..." />
                </div>
              </div>
              <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'flex-end' }}>
                <button
                  className="btn btn-primary"
                  style={{
                    height: '42px', padding: '0 1.5rem', borderRadius: '12px',
                    background: '#2563eb', color: '#fff', border: 'none',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    fontWeight: 600, cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
                  }}
                >
                  <Search size={18} /> Tìm kiếm
                </button>
              </div>
            </div>
          </div>

          {/* II. Patient Table */}
          <div className="card" style={{ padding: '0', border: 'none', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Danh sách khám bệnh ngoại trú</h3>
                <span style={{ padding: '2px 10px', background: '#2563eb15', color: '#2563eb', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>227 bệnh nhân</span>
              </div>
              {/* <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}><Filter size={16} /> Lọc nâng cao</button>
              </div> */}
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                    <th style={{ padding: '1rem', textAlign: 'center', width: '120px' }}>Thao tác</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>STT khám</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Mã BN</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Tên bệnh nhân</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>Giới tính</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>Năm sinh</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>Đối tượng</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Số thẻ BHYT</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>Xác nhận</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>Ngày yêu cầu</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Phòng khám</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPatients.map((p, idx) => (
                    <tr key={idx} style={{
                      borderBottom: '1px solid #f1f5f9',
                      background: idx % 2 === 0 ? '#fff' : '#fcfdfe',
                      transition: 'all 0.2s',
                      cursor: 'pointer'
                    }}
                      onClick={() => { setSelectedPatient(p); setViewMode('details'); }}
                    >
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button
                            className="btn-action"
                            style={{
                              padding: '6px',
                              borderRadius: '8px',
                              border: '1px solid #fee2e2',
                              background: '#fff',
                              color: '#ef4444',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                            title="Hủy xác nhận chi phí"
                            onClick={(e) => { e.stopPropagation(); setShowUndoConfirm(true); }}
                          >
                            <RotateCcw size={16} />
                          </button>
                        </div>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#2563eb' }}>{p.stt}</td>
                      <td style={{ padding: '1rem', color: '#475569' }}>{p.id}</td>
                      <td style={{ padding: '1rem', fontWeight: 600, color: '#0f172a' }}>{p.name}</td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>{p.gender}</td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>{p.yob}</td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <span style={{ padding: '4px 8px', borderRadius: '6px', background: '#e0f2fe', color: '#0369a1', fontSize: '0.75rem', fontWeight: 600 }}>{p.target}</span>
                      </td>
                      <td style={{ padding: '1rem', fontFamily: 'monospace', color: '#64748b' }}>{p.insurance}</td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        {p.confirmed ? <CheckCircle size={18} color="#10b981" /> : <Clock size={18} color="#f59e0b" />}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.85rem' }}>{p.date}</td>
                      <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.85rem' }}>{p.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-fade">
          {/* Detail Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button
                onClick={() => setViewMode('list')}
                style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
              >
                <ChevronRight size={24} style={{ transform: 'rotate(180deg)', color: '#64748b' }} />
              </button>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.8rem', fontWeight: 500, marginBottom: '4px' }}>
                  <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => setViewMode('list')} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>Khám bệnh ngoại trú</span>
                  <ChevronRight size={14} />
                  <span style={{ color: '#2563eb' }}>Chi tiết khám bệnh</span>
                </div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>
                  Chi tiết khám bệnh
                </h1>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button
                className="btn btn-outline"
                style={{
                  background: '#fff',
                  height: '42px',
                  padding: '0 1.25rem',
                  borderColor: '#fee2e2',
                  color: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 600
                }}
                onClick={() => setShowUndoConfirm(true)}
              >
                <RotateCcw size={18} /> Hủy xác nhận chi phí
              </button>
              <button className="btn btn-outline" style={{ background: '#fff', height: '42px', padding: '0 1.25rem' }}><Printer size={18} /> In phiếu</button>

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
                    <button className="dropdown-item" 
                      onClick={() => { setIsEdit(true); setShowActionDropdown(false); }}
                      style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '10px', padding: '10px', border: 'none', background: 'transparent', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }} 
                      onMouseEnter={(e) => e.target.style.background = '#f8fafc'} 
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      <Pencil size={16} color="#64748b" /> Chỉnh sửa
                    </button>
                    <button className="dropdown-item" 
                      onClick={() => { setShowDeleteConfirm(true); setShowActionDropdown(false); }}
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
              {isEdit && (
                <button
                  className="btn btn-primary"
                  style={{
                    height: '42px', padding: '0 1.5rem', borderRadius: '12px',
                    background: '#2563eb', color: '#fff', border: 'none',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    fontWeight: 600, cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  onClick={() => setShowSaveConfirm(true)}
                >
                  <Save size={18} /> Lưu
                </button>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* Patient Info Summary */}
              <div className="card" style={{ padding: '1.25rem 2rem', border: '1px solid #e2e8f0', background: '#fff', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div><label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Mã BN</label><span style={{ fontWeight: 800, color: '#1e293b', fontSize: '1rem' }}>0107822000811</span></div>
                  <div><label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Họ và tên</label><span style={{ fontWeight: 800, color: '#1e293b', fontSize: '1rem' }}>Lê Thị Loan</span></div>
                  <div><label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Giới tính</label><span style={{ fontWeight: 700, color: '#1e293b', fontSize: '1rem' }}>Nữ</span></div>
                  <div><label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Ngày sinh</label><span style={{ fontWeight: 700, color: '#1e293b', fontSize: '1rem' }}>19/10/1982</span></div>
                  <div><label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>BHYT</label><span style={{ fontWeight: 800, color: '#2563eb', fontSize: '1rem' }}>GD4010101234567 (L4)</span></div>
                </div>
              </div>

              {/* Main Clinical Info */}
              <div className="card" style={{ padding: '1.5rem', border: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <Stethoscope size={20} color="#2563eb" />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Thông tin khám bệnh</h3>
                  <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }}></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
                  <div className="form-field"><label>Ngày vào khám</label><input type="date" className="modern-input" defaultValue="2026-03-23" disabled={!isEdit} /></div>
                  <div className="form-field"><label>Giờ vào viện</label><input type="time" className="modern-input" defaultValue="07:51" disabled={!isEdit} /></div>
                  <div className="form-field" style={{ gridColumn: 'span 2' }}><label>Phòng khám</label><select className="modern-select" disabled={!isEdit}><option>109 | Phòng khám Đông y</option></select></div>

                  <div className="form-field" style={{ gridColumn: 'span 2' }}>
                    <label>Triệu chứng / Diễn biến</label>
                    <textarea className="modern-input" rows="3" defaultValue="Bệnh nhân đau nhức vùng thắt lưng vài ngày nay..." disabled={!isEdit}></textarea>
                  </div>
                  <div className="form-field" style={{ gridColumn: 'span 2' }}>
                    <label>Lý do vào viện</label>
                    <textarea className="modern-input" rows="3" placeholder="Ghi chú lý do..." disabled={!isEdit}></textarea>
                  </div>

                  {/* Diagnosis Row */}
                  <div className="form-field" style={{ gridColumn: 'span 1' }}>
                    <label>Bệnh chính (ICD10)</label>
                    <select className="modern-select" disabled={!isEdit}><option>M54 - Đau lưng (Dorsalgia)</option></select>
                  </div>
                  <div className="form-field" style={{ gridColumn: 'span 3' }}>
                    <label>Diễn giải bệnh chính</label>
                    <input type="text" className="modern-input" placeholder="Nhập diễn giải chi tiết cho bệnh chính..." disabled={!isEdit} />
                  </div>

                  <div className="form-field" style={{ gridColumn: 'span 1' }}>
                    <label>Bệnh kèm theo (Chọn nhiều)</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', padding: '6px', border: '1px solid #e2e8f0', borderRadius: '10px', minHeight: '44px', background: isEdit ? '#fff' : '#f8fafc' }}>
                      <span style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>M47 - Thoái hoá cột sống {isEdit && <XCircle size={12} cursor="pointer" />}</span>
                      {isEdit && <input type="text" placeholder="Tìm..." style={{ border: 'none', outline: 'none', fontSize: '0.85rem', flex: 1, minWidth: '50px' }} />}
                    </div>
                  </div>
                  <div className="form-field" style={{ gridColumn: 'span 3' }}>
                    <label>Diễn giải bệnh kèm theo</label>
                    <input type="text" className="modern-input" placeholder="Nhập diễn giải cho các bệnh kèm theo..." disabled={!isEdit} />
                  </div>

                  {/* Treatment Row */}
                  <div className="form-field" style={{ gridColumn: 'span 2' }}>
                    <label>Tư vấn điều trị</label>
                    <textarea className="modern-input" rows="2" defaultValue="khám, chuyển" disabled={!isEdit}></textarea>
                  </div>
                  <div className="form-field" style={{ gridColumn: 'span 2' }}>
                    <label>Diễn biến điều trị</label>
                    <textarea className="modern-input" rows="2" defaultValue="Bệnh nhân đau nhức vùng thắt lưng vài ngày nay. Khám bệnh nhân tỉnh, đau nhức nhiều, vận động đau tăng" disabled={!isEdit}></textarea>
                  </div>

                  <div className="form-field"><label>Loại tai nạn</label><select className="modern-select" disabled={!isEdit}><option>-- Chọn loại tai nạn --</option></select></div>
                  <div className="form-field"><label>Kết quả khám</label><select className="modern-select" disabled={!isEdit}><option>Không thay đổi</option><option>Khỏi</option><option>Đỡ/Giảm</option></select></div>
                  <div className="form-field"><label>Loại khám chữa bệnh</label><select className="modern-select" disabled={!isEdit}><option>Khám bệnh</option></select></div>
                  <div className="form-field"><label>Bác sĩ khám</label><select className="modern-select" disabled={!isEdit}><option>106 | Cao Thu Hằng</option></select></div>

                  <div className="form-field">
                    <label>Kết thúc khám</label>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <input type="date" className="modern-input" defaultValue="2026-03-23" style={{ flex: 1.2, minWidth: '0' }} disabled={!isEdit} />
                      <input type="time" className="modern-input" defaultValue="08:09" style={{ flex: 0.8, minWidth: '0' }} disabled={!isEdit} />
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Phương pháp khám bệnh</label>
                    <select className="modern-select" disabled={!isEdit}><option>Tây y</option><option>Đông y</option><option>Kết hợp</option></select>
                  </div>
                  <div className="form-field" style={{ gridColumn: 'span 2' }}>
                    <label>Ghi chú kết luận</label>
                    <input type="text" className="modern-input" placeholder="Nhập ghi chú cuối cùng..." disabled={!isEdit} />
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
                      <input type="text" className="modern-input" style={{ width: '80%', textAlign: 'center', fontWeight: 700, border: 'none', background: 'transparent' }} placeholder="..." />
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Orders */}
              <div className="card" style={{ padding: '0', border: 'none', overflow: 'hidden' }}>
                <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#2563eb' }}>Chi định dịch vụ</h3>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-outline btn-sm"><Printer size={16} /> In phiếu</button>
                    {isEdit && <button className="btn btn-primary btn-sm" onClick={() => setShowServiceOrder(true)}><Plus size={16} /> Thêm chỉ định</button>}
                  </div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9', color: '#64748b' }}>
                        <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>STT</th>
                        <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>Tên dịch vụ</th>
                        <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Ngày yêu cầu</th>
                        <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Loại giá</th>
                        <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>SL</th>
                        <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Đơn giá (VNĐ)</th>
                        <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Thành tiền</th>
                        <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>BHYT (VNĐ)</th>
                        <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>BN (VNĐ)</th>
                        <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Bác sĩ chỉ định</th>
                        <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
                        <td colSpan="11" style={{ padding: '8px 12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                              background: '#fff', border: '1px solid #cbd5e1',
                              borderRadius: '2px', width: '14px', height: '14px',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                            }}>
                              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', lineHeight: 0, marginTop: '-1px' }}>-</span>
                            </div>
                            <span style={{ fontWeight: 600, color: '#2563eb', fontSize: '0.75rem' }}>109 | 109 - Phòng khám Đông y</span>
                          </div>
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '1rem', textAlign: 'center' }}>1</td>
                        <td style={{ padding: '1rem', fontWeight: 600 }}>Khám Y học cổ truyền</td>
                        <td style={{ padding: '1rem', textAlign: 'center' }}>23/03/2026<br />07:54</td>
                        <td style={{ padding: '1rem', textAlign: 'center', color: '#64748b' }}>Giá DV BHYT</td>
                        <td style={{ padding: '1rem', textAlign: 'center' }}>1</td>
                        <td style={{ padding: '1rem', textAlign: 'right' }}>36.500</td>
                        <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 600 }}>36.500</td>
                        <td style={{ padding: '1rem', textAlign: 'right', color: '#10b981' }}>36.500</td>
                        <td style={{ padding: '1rem', textAlign: 'right', color: '#64748b' }}>0</td>
                        <td style={{ padding: '1rem', textAlign: 'center' }}>Cao Thu Hằng</td>
                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.7rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="checkbox" checked readOnly /> Kết quả</label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="checkbox" readOnly /> Viện phí</label>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Prescription */}
              <div className="card" style={{ padding: '0', border: 'none', background: '#fff' }}>
                <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#2563eb', margin: 0 }}>Kê đơn thuốc</h3>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', background: '#fff' }}><Printer size={16} /> In phiếu</button>
                    {isEdit && <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => setShowPrescriptionOrder(true)}><Plus size={16} /> Thêm thuốc</button>}
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

            {/* Sidebar Actions & History */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="card" style={{ padding: '1.5rem', border: 'none', background: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <History size={20} color="#2563eb" />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Lịch sử khám bệnh</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {[
                    { date: '23/03/2026 07:54', clinic: '109 - Phòng khám Đông y', doctor: 'Cao Thu Hằng', diag: 'M54 - Đau lưng' },
                    { date: '18/07/2024 08:08', clinic: '114 - Phòng khám Nội 1- Nhi', doctor: 'Nguyễn Thị Bình', diag: 'J20 - Viêm phế quản cấp' },
                    { date: '16/02/2022 09:34', clinic: '114 - Phòng khám Nội 1- Nhi', doctor: 'Trần Văn A', diag: 'I10 - Tăng huyết áp' }
                  ].map((item, i) => (
                    <div key={i} style={{ position: 'relative', paddingLeft: '20px', borderLeft: '2px solid #e2e8f0' }}>
                      <div style={{
                        position: 'absolute', left: '-7px', top: '0',
                        width: '12px', height: '12px', borderRadius: '50%',
                        background: i === 0 ? '#2563eb' : '#fff',
                        border: '2px solid #2563eb'
                      }}></div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb', marginBottom: '4px' }}>{item.date}</div>
                      <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: '#1e293b' }}>
                        <div style={{ marginBottom: '4px' }}><span style={{ color: '#64748b' }}>Phòng:</span> <strong>{item.clinic}</strong></div>
                        <div style={{ marginBottom: '4px' }}><span style={{ color: '#64748b' }}>Bác sĩ:</span> <strong>{item.doctor}</strong></div>
                        <div style={{ color: '#ef4444', fontWeight: 600 }}>{item.diag}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="btn btn-outline"
                  style={{ width: '100%', marginTop: '1.5rem', fontSize: '0.85rem' }}
                  onClick={() => setShowHistoryModal(true)}
                >
                  <Eye size={16} /> Xem tất cả lịch sử
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && (
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
                onClick={() => setShowHistoryModal(false)}
                style={{ width: '36px', height: '36px', background: '#f8fafc', border: 'none', borderRadius: '10px', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' }}
                onMouseEnter={(e) => e.target.style.background = '#fee2e2'}
                onMouseLeave={(e) => e.target.style.background = '#f8fafc'}
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
                                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.7rem', textAlign: 'left', width: 'fit-content', margin: '0 auto' }}>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}><input type="checkbox" checked readOnly /> Kết quả</label>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}><input type="checkbox" checked readOnly /> Viện phí</label>
                                              </div>
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
                onClick={() => setShowHistoryModal(false)}
              >
                Đóng lịch sử
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .form-field { display: flex; flex-direction: column; gap: 6px; }
        .form-field label { font-size: 0.8rem; font-weight: 600; color: #475569; }
        .modern-input, .modern-select { 
          padding: 10px 12px; border-radius: 10px; border: 1px solid #e2e8f0; 
          background: #fff; font-size: 0.85rem; outline: none; transition: all 0.2s;
        }
        .modern-input:focus, .modern-select:focus { border-color: #2563eb; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1); }
        .animate-fade { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .btn-sm { padding: 0.4rem 0.8rem; font-size: 0.8rem; }
        .btn-sidebar { 
          display: flex; alignItems: center; gap: 10px; padding: 10px; 
          borderRadius: 8px; border: 1px solid #f1f5f9; background: #fff;
          fontSize: 0.85rem; color: #475569; cursor: pointer; textAlign: left;
          transition: all 0.2s;
        }
        .btn-sidebar:hover { background: #f8fafc; border-color: #2563eb; color: #2563eb; }

        .service-tree-item { 
          padding: 6px 12px; cursor: pointer; display: flex; align-items: center; gap: 8px; border-radius: 6px; 
          transition: all 0.2s; font-size: 0.85rem; color: #475569; position: relative;
        }
        .service-tree-item:hover { background: #eff6ff; color: #2563eb; }
        .service-tree-item.active { background: #2563eb; color: #fff; font-weight: 600; }
        .service-tree-item .tree-chevron { width: 16px; display: flex; justify-content: center; }
        
        .service-list-item { border-bottom: 1px solid #f1f5f9; transition: background 0.2s; }
        .service-list-item:hover { background: #fcfdfe; }
        
        /* Compact table styles */
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
        <div className="animate-fade" style={{ position: 'fixed', inset: 0, background: '#f1f5f9', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
          {/* Header with Modern Patient Info Card */}
          <div style={{ padding: '16px 2rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <div className="patient-info-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#3b82f610', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.025em' }}>Bệnh nhân</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>Bùi Văn Kính <span style={{ fontWeight: 400, color: '#64748b', fontSize: '0.9rem' }}>(Nam - 57 tuổi)</span></div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Mã BN: <span style={{ color: '#3b82f6', fontWeight: 600 }}>0107822002729</span></div>
                  </div>
                </div>

                <div style={{ height: '40px', width: '1px', background: '#e2e8f0' }} />

                <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
                  <div style={{ minWidth: '150px' }}>
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '2px' }}>Bảo hiểm y tế</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>GD4010120960736</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '2px' }}>Phòng khám</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 500, color: '#334155' }}>114 - Nội 1</div>
                    </div>
                  </div>

                  <div style={{ maxWidth: '400px' }}>
                    <div style={{ marginBottom: '4px' }}>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '2px' }}>Chẩn đoán</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2563eb' }}>
                        D64.9 | Thiếu máu không đặc hiệu
                      </div>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.4' }}>
                      Bệnh nhân khám ngày 24/3/26 tại Bệnh viện Phổi Hà Nội, tình trạng sức khỏe ổn định...
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
              <div style={{ width: '260px', background: '#fff', borderRight: '1px solid #e2e8f0', overflowY: 'auto', padding: '1rem', position: 'relative', transition: 'width 0.3s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>NHÓM DỊCH VỤ</h3>
                  <button onClick={() => setCollapseTree(true)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><ChevronLeft size={16} /></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div className="service-tree-item active">
                    <span className="tree-chevron"><LayoutGrid size={14} /></span>
                    Tất cả dịch vụ
                  </div>

                  {/* 1. Khám bệnh */}
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

                  {/* 3. Xét nghiệm */}
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

                  {/* 4. CDHA */}
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
                <button onClick={() => setCollapseTree(false)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer' }} title="Mở rộng Nhóm dịch vụ"><ChevronRight size={20} /></button>
                <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', marginTop: '20px', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>NHÓM DỊCH VỤ</div>
              </div>
            )}

            {/* Middle Column: Service Selection Table */}
            {!collapseList ? (
              <div style={{ width: '420px', display: 'flex', flexDirection: 'column', background: '#fcfdfe', borderRight: '1px solid #e2e8f0', transition: 'width 0.3s' }}>
                <div style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>DANH SÁCH DỊCH VỤ</h3>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {/* <label style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}><input type="checkbox" checked readOnly /> Nhóm</label> */}
                      <button onClick={() => setCollapseList(true)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><ChevronLeft size={16} /></button>
                    </div>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input type="text" className="modern-input" placeholder="Mã / tên dịch vụ..." style={{ width: '100%', paddingRight: '40px' }} />
                    <Search size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  </div>
                  <div style={{ marginTop: '8px', fontSize: '0.7rem', color: '#ef4444' }}>(*) Theo ngày 25/03/2026</div>
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
                        { code: '22.0121.1369', name: 'fg Tổng phân tích tế bào máu ngoại vi', bh: '49.700', bv: '49.700' },
                        { code: 'CKMP', name: 'fg Công khám miễn phí', bh: '0', bv: '0' },
                        { code: 'DMKT_0023', name: 'fg AFB trực tiếp nhuộm Ziehl-Neelsen', bh: '74.200', bv: '74.200' },
                        { code: 'DVKT_0001', name: 'fg AFB trực tiếp nhuộm huỳnh quang', bh: '71.600', bv: '71.600' },
                        { code: 'DVKT_0002', name: 'fg Bó thuốc', bh: '57.600', bv: '57.600' }
                      ].map((s, idx) => (
                        <tr key={idx} className="service-list-item">
                          <td style={{ padding: '0.75rem 0.75rem', textAlign: 'center' }}>
                            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{idx + 1}</span>
                          </td>
                          <td style={{ padding: '0.75rem 1rem 0.75rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#1e293b', lineHeight: '1.4', wordBreak: 'break-word' }}>
                                {s.code} - {s.name}
                              </div>
                              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '4px', fontSize: '0.75rem' }}>
                                <span style={{ color: '#64748b' }}>BHYT: <span style={{ color: '#10b981', fontWeight: 600 }}>{s.bh}</span></span>
                                <span style={{ color: '#64748b' }}>Viện: <span style={{ color: '#ef4444', fontWeight: 600 }}>{s.bv}</span></span>
                              </div>
                            </div>
                            <button
                              className="btn btn-primary"
                              style={{ width: '24px', height: '24px', padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgb(37 99 235 / 0.2)', flexShrink: 0 }}
                            >
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
                <button onClick={() => setCollapseList(false)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer' }} title="Mở rộng Danh sách"><ChevronRight size={20} /></button>
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
                        <th style={{ textAlign: 'center', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>Ngày yêucầu</th>
                        <th style={{ textAlign: 'center', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>Giường</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>PP vô cảm</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>Bác sĩ</th>
                        <th style={{ textAlign: 'center', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '0.75rem' }}>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ border: 'none', cursor: 'pointer' }} onClick={() => setCartExpandedGroups(prev => prev.includes('KB') ? prev.filter(i => i !== 'KB') : [...prev, 'KB'])}>
                        <td colSpan="17" style={{ padding: '12px 0 4px 0' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: '#eff6ff', borderRadius: '6px', width: 'fit-content' }}>
                            <div style={{ background: '#3b82f6', borderRadius: '4px', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {!cartExpandedGroups.includes('KB') ? <ChevronRight size={10} color="#fff" /> : <Minus size={10} color="#fff" />}
                            </div>
                            <span style={{ fontWeight: 700, color: '#1d4ed8', fontSize: '0.75rem', letterSpacing: '0.025em' }}>Khám bệnh (1)</span>
                          </div>
                        </td>
                      </tr>
                      {cartExpandedGroups.includes('KB') && (
                        <tr className="hover-row" style={{ borderBottom: '1px solid #f1f5f9' }}>
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
                              <div title="Sửa" style={{ width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid #e2e8f0', background: '#fff' }}>
                                <Pencil size={12} color="#3b82f6" />
                              </div>
                              <div title="Xóa" style={{ width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid #fee2e2', background: '#fff' }}>
                                <Trash2 size={12} color="#ef4444" />
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}

                      <tr style={{ border: 'none', cursor: 'pointer' }} onClick={() => setCartExpandedGroups(prev => prev.includes('XN') ? prev.filter(i => i !== 'XN') : [...prev, 'XN'])}>
                        <td colSpan="17" style={{ padding: '16px 0 4px 0' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: '#eff6ff', borderRadius: '6px', width: 'fit-content' }}>
                            <div style={{ background: '#3b82f6', borderRadius: '4px', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {!cartExpandedGroups.includes('XN') ? <ChevronRight size={10} color="#fff" /> : <Minus size={10} color="#fff" />}
                            </div>
                            <span style={{ fontWeight: 700, color: '#1d4ed8', fontSize: '0.75rem', letterSpacing: '0.025em' }}>Xét nghiệm (2)</span>
                          </div>
                        </td>
                      </tr>
                      {cartExpandedGroups.includes('XN') && (
                        <>
                          <tr className="hover-row" style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ textAlign: 'center', padding: '10px 8px' }}><input type="checkbox" checked readOnly /></td>
                            <td style={{ textAlign: 'center', padding: '10px 8px', color: '#94a3b8', fontSize: '0.8rem' }}>2</td>
                            <td style={{ textAlign: 'left', padding: '10px 8px', color: '#64748b', fontSize: '0.8rem' }}>22.0121.1369</td>
                            <td style={{ textAlign: 'left', padding: '10px 8px', fontWeight: 600, color: '#334155', fontSize: '0.85rem' }}>Tổng phân tích tế bào máu ngoại vi</td>
                            <td style={{ textAlign: 'center', padding: '10px 8px', fontWeight: 600 }}>1</td>
                            <td style={{ textAlign: 'left', padding: '10px 8px' }}>
                              <span style={{ padding: '2px 8px', borderRadius: '12px', background: '#dcfce7', color: '#166534', fontSize: '0.7rem', fontWeight: 600 }}>Giá BHYT</span>
                            </td>
                            <td style={{ textAlign: 'right', padding: '10px 8px', color: '#475569' }}>49.700</td>
                            <td style={{ textAlign: 'right', padding: '10px 8px', fontWeight: 700, color: '#1e293b' }}>49.700</td>
                            <td style={{ textAlign: 'right', padding: '10px 8px', color: '#10b981', fontWeight: 600 }}>49.700</td>
                            <td style={{ textAlign: 'right', padding: '10px 8px', color: '#ef4444', fontWeight: 600 }}>0</td>
                            <td style={{ textAlign: 'center', padding: '10px 8px', color: '#64748b' }}>25/03/2026</td>
                            <td style={{ textAlign: 'center', padding: '10px 8px', color: '#64748b' }}>G-102</td>
                            <td style={{ textAlign: 'left', padding: '10px 8px', color: '#cbd5e1' }}>--</td>
                            <td style={{ textAlign: 'left', padding: '10px 8px', color: '#1e293b', fontWeight: 500 }}>Nguyễn Ngọc Ánh</td>
                            <td style={{ textAlign: 'center', padding: '10px 8px' }}>
                              <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                                <div title="Sửa" style={{ width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid #e2e8f0', background: '#fff' }}>
                                  <Pencil size={12} color="#3b82f6" />
                                </div>
                                <div title="Xóa" style={{ width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid #fee2e2', background: '#fff' }}>
                                  <Trash2 size={12} color="#ef4444" />
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="hover-row" style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ textAlign: 'center', padding: '10px 8px' }}><input type="checkbox" checked readOnly /></td>
                            <td style={{ textAlign: 'center', padding: '10px 8px', color: '#94a3b8', fontSize: '0.8rem' }}>3</td>
                            <td style={{ textAlign: 'left', padding: '10px 8px', color: '#64748b', fontSize: '0.8rem' }}>DMKT_0023</td>
                            <td style={{ textAlign: 'left', padding: '10px 8px', fontWeight: 600, color: '#334155', fontSize: '0.85rem' }}>AFB trực tiếp nhuộm Ziehl-Neelsen</td>
                            <td style={{ textAlign: 'center', padding: '10px 8px', fontWeight: 600 }}>1</td>
                            <td style={{ textAlign: 'left', padding: '10px 8px' }}>
                              <span style={{ padding: '2px 8px', borderRadius: '12px', background: '#dcfce7', color: '#166534', fontSize: '0.7rem', fontWeight: 600 }}>Giá BHYT</span>
                            </td>
                            <td style={{ textAlign: 'right', padding: '10px 8px', color: '#475569' }}>74.200</td>
                            <td style={{ textAlign: 'right', padding: '10px 8px', fontWeight: 700, color: '#1e293b' }}>74.200</td>
                            <td style={{ textAlign: 'right', padding: '10px 8px', color: '#10b981', fontWeight: 600 }}>74.200</td>
                            <td style={{ textAlign: 'right', padding: '10px 8px', color: '#ef4444', fontWeight: 600 }}>0</td>
                            <td style={{ textAlign: 'center', padding: '10px 8px', color: '#64748b' }}>25/03/2026</td>
                            <td style={{ textAlign: 'center', padding: '10px 8px', color: '#64748b' }}>G-102</td>
                            <td style={{ textAlign: 'left', padding: '10px 8px', color: '#cbd5e1' }}>--</td>
                            <td style={{ textAlign: 'left', padding: '10px 8px', color: '#1e293b', fontWeight: 500 }}>Nguyễn Ngọc Ánh</td>
                            <td style={{ textAlign: 'center', padding: '10px 8px' }}>
                              <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                                <div title="Sửa" style={{ width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid #e2e8f0', background: '#fff' }}>
                                  <Pencil size={12} color="#3b82f6" />
                                </div>
                                <div title="Xóa" style={{ width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid #fee2e2', background: '#fff' }}>
                                  <Trash2 size={12} color="#ef4444" />
                                </div>
                              </div>
                            </td>
                          </tr>
                        </>
                      )}

                      <tr style={{ border: 'none', cursor: 'pointer' }} onClick={() => setCartExpandedGroups(prev => prev.includes('CDHA') ? prev.filter(i => i !== 'CDHA') : [...prev, 'CDHA'])}>
                        <td colSpan="17" style={{ padding: '16px 0 4px 0' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: '#eff6ff', borderRadius: '6px', width: 'fit-content' }}>
                            <div style={{ background: '#3b82f6', borderRadius: '4px', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {!cartExpandedGroups.includes('CDHA') ? <ChevronRight size={10} color="#fff" /> : <Minus size={10} color="#fff" />}
                            </div>
                            <span style={{ fontWeight: 700, color: '#1d4ed8', fontSize: '0.75rem', letterSpacing: '0.025em' }}>Chẩn đoán hình ảnh (1)</span>
                          </div>
                        </td>
                      </tr>
                      {cartExpandedGroups.includes('CDHA') && (
                        <tr className="hover-row" style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ textAlign: 'center', padding: '10px 8px' }}><input type="checkbox" checked readOnly /></td>
                          <td style={{ textAlign: 'center', padding: '10px 8px', color: '#94a3b8', fontSize: '0.8rem' }}>4</td>
                          <td style={{ textAlign: 'left', padding: '10px 8px', color: '#64748b', fontSize: '0.8rem' }}>XQ_001</td>
                          <td style={{ textAlign: 'left', padding: '10px 8px', fontWeight: 600, color: '#334155', fontSize: '0.85rem' }}>X-Quang Ngực thẳng</td>
                          <td style={{ textAlign: 'center', padding: '10px 8px', fontWeight: 600 }}>1</td>
                          <td style={{ textAlign: 'left', padding: '10px 8px' }}>
                            <span style={{ padding: '2px 8px', borderRadius: '12px', background: '#dcfce7', color: '#166534', fontSize: '0.7rem', fontWeight: 600 }}>Giá BHYT</span>
                          </td>
                          <td style={{ textAlign: 'right', padding: '10px 8px', color: '#475569' }}>120.000</td>
                          <td style={{ textAlign: 'right', padding: '10px 8px', fontWeight: 700, color: '#1e293b' }}>120.000</td>
                          <td style={{ textAlign: 'right', padding: '10px 8px', color: '#10b981', fontWeight: 600 }}>120.000</td>
                          <td style={{ textAlign: 'right', padding: '10px 8px', color: '#ef4444', fontWeight: 600 }}>0</td>
                          <td style={{ textAlign: 'center', padding: '10px 8px', color: '#64748b' }}>25/03/2026</td>
                          <td style={{ textAlign: 'center', padding: '10px 8px', color: '#64748b' }}>G-102</td>
                          <td style={{ textAlign: 'left', padding: '10px 8px', color: '#cbd5e1' }}>--</td>
                          <td style={{ textAlign: 'left', padding: '10px 8px', color: '#1e293b', fontWeight: 500 }}>Nguyễn Ngọc Ánh</td>
                          <td style={{ textAlign: 'center', padding: '10px 8px' }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                              <div title="Sửa" style={{ width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid #e2e8f0', background: '#fff' }}>
                                <Pencil size={12} color="#3b82f6" />
                              </div>
                              <div title="Xóa" style={{ width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid #fee2e2', background: '#fff' }}>
                                <Trash2 size={12} color="#ef4444" />
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ padding: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '8px', background: '#f8fafc' }}>
            <button className="btn btn-outline" onClick={() => setShowServiceOrder(false)} style={{ background: '#fff' }}>Đóng (Esc)</button>
            <button className="btn btn-outline" style={{ background: '#fff' }}><Printer size={16} /> In</button>
            <button className="btn btn-primary" onClick={() => setShowServiceOrder(false)} style={{ padding: '0 2rem' }}><Save size={16} /> Lưu</button>
          </div>
        </div>
      )}
      {/* Medication / Prescription Overlay */}
      {showPrescriptionOrder && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1200, display: 'flex', flexDirection: 'column', background: '#f1f5f9', animation: 'fadeIn 0.2s ease-out' }}>
          {/* Header Area */}
          <div style={{ padding: '1.25rem 2rem', background: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: '#eff6ff', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Pill size={22} color="#2563eb" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>KÊ ĐƠN THUỐC</h2>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500, marginTop: '2px' }}>Chi tiết đơn thuốc bệnh nhân</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button className="btn btn-outline" style={{ background: '#fff', height: '38px' }}><History size={16} /> Đơn cũ</button>
              {/* <button className="btn btn-outline" style={{ background: '#fff', height: '38px' }}><FileText size={16} /> Đơn mẫu</button> */}
              <div style={{ width: '1px', height: '24px', background: '#e2e8f0', margin: '0 4px' }}></div>
              <button onClick={() => setShowPrescriptionOrder(false)} style={{ background: '#f1f5f9', border: 'none', color: '#64748b', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.2s' }} onMouseEnter={(e) => e.target.style.background = '#e2e8f0'} onMouseLeave={(e) => e.target.style.background = '#f1f5f9'}>
                <XCircle size={20} />
              </button>
            </div>
          </div>

          {/* Patient Info Card (Sync design) */}
          <div style={{ padding: '0.75rem 2rem', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
            <div className="patient-info-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', gap: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={18} color="#64748b" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Bệnh nhân</div>
                    <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.95rem' }}>{selectedPatient?.name || 'Lê Thị Loan'} <span style={{ fontWeight: 400, color: '#64748b' }}>({selectedPatient?.gender || 'Nữ'} - {selectedPatient?.yob || '1982'})</span></div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Bảo hiểm y tế</div>
                  <div style={{ fontWeight: 600, color: '#334155' }}>GD40101... (L4)</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Chẩn đoán</div>
                  <div style={{ fontWeight: 600, color: '#ef4444' }}>M54 - Đau lưng (Dorsalgia)</div>
                </div>
              </div>
              {/* <div style={{ display: 'flex', gap: '24px', alignItems: 'center', borderLeft: '1px solid #e2e8f0', paddingLeft: '24px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>TỔNG TIỀN</div>
                  <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '1.2rem' }}>125.000 <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>VNĐ</span></div>
                </div>
              </div> */}
            </div>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1, overflow: 'hidden', padding: '1.5rem 2rem', display: 'flex', gap: '1.5rem' }}>
            {/* Left Panel: Form Metadata */}
            <div style={{ width: '380px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="card shadow-sm" style={{ padding: '1.25rem', border: 'none', background: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                  <FileText size={18} color="#2563eb" />
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b' }}>THÔNG TIN ĐƠN THUỐC</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                  <div className="form-field">
                    <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Hình thức mua</label>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                      <button className="btn btn-primary btn-sm" style={{ flex: 1, height: '32px', borderRadius: '6px' }}>Tại bệnh viện</button>
                      <button className="btn btn-outline btn-sm" style={{ flex: 1, height: '32px', borderRadius: '6px', background: '#fff' }}>Mua ngoài</button>
                    </div>
                  </div>
                  <div className="form-field">
                    <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Nơi lĩnh thuốc</label>
                    <select className="modern-select"><option>Kho dược Trạm y tế</option></select>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div className="form-field" style={{ flex: 1.5 }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Ngày kê</label>
                      <input type="date" className="modern-input" defaultValue="2026-03-26" />
                    </div>
                    <div className="form-field" style={{ flex: 1 }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Giờ</label>
                      <input type="time" className="modern-input" defaultValue="00:30" />
                    </div>
                  </div>
                  <div className="form-field">
                    <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Bác sĩ kê đơn</label>
                    <select className="modern-select"><option>Cao Thu Hằng</option></select>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div className="form-field" style={{ flex: 1 }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Ngày tái khám</label>
                      <input type="date" className="modern-input" />
                    </div>
                    <div className="form-field" style={{ flex: 0.6 }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Số thang</label>
                      <input type="number" className="modern-input" defaultValue="1" />
                    </div>
                  </div>
                  <div className="form-field">
                    <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Lời dặn bác sĩ</label>
                    <textarea className="modern-input" rows="2" placeholder="Nghỉ ngơi, tránh vận động mạnh..."></textarea>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>
                      <input type="checkbox" /> SMS uống thuốc
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>
                      <input type="checkbox" /> SMS nhắc tái khám
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Drug List & Selection */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Drug Search / Quick Add Row */}
              <div className="card shadow-sm" style={{ padding: '1rem 1.5rem', border: 'none', background: '#fff' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                  <div className="form-field" style={{ flex: 2.5 }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>TÌM DƯỢC PHẨM</label>
                    <div style={{ position: 'relative' }}>
                      <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      <input type="text" className="modern-input" placeholder="Mã dược / Tên dược / Hoạt chất..." style={{ paddingLeft: '40px', height: '42px', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }} />
                    </div>
                  </div>
                  <div className="form-field" style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>SỐ NGÀY</label>
                    <input type="number" className="modern-input" defaultValue="7" style={{ height: '42px', textAlign: 'center', fontWeight: 700 }} />
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flex: 2.5 }}>
                    <div className="form-field" style={{ flex: 1 }}>
                      <label style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b', textAlign: 'center' }}>SÁNG</label>
                      <input type="text" className="modern-input" defaultValue="1" style={{ height: '42px', textAlign: 'center' }} />
                    </div>
                    <div className="form-field" style={{ flex: 1 }}>
                      <label style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b', textAlign: 'center' }}>TRƯA</label>
                      <input type="text" className="modern-input" defaultValue="0" style={{ height: '42px', textAlign: 'center' }} />
                    </div>
                    <div className="form-field" style={{ flex: 1 }}>
                      <label style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b', textAlign: 'center' }}>CHIỀU</label>
                      <input type="text" className="modern-input" defaultValue="1" style={{ height: '42px', textAlign: 'center' }} />
                    </div>
                  </div>
                  <button className="btn btn-primary" style={{ height: '42px', padding: '0 1.5rem', display: 'flex', gap: '8px', borderRadius: '10px' }}>
                    <Plus size={18} /> Thêm vào đơn
                  </button>
                </div>
              </div>

              {/* Added Drugs Table */}
              <div className="card shadow-sm" style={{ flex: 1, border: 'none', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b' }}>CHI TIẾT ĐƠN THUỐC</h3>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Tổng số: <span style={{ color: '#2563eb', fontWeight: 700 }}>2</span> dược phẩm</div>
                </div>
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  <table className="compact-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', zIndex: 10 }}>
                      <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                        <th style={{ textAlign: 'center', width: '40px' }}>STT</th>
                        <th style={{ textAlign: 'left', width: '100px' }}>Mã dược</th>
                        <th style={{ textAlign: 'left', minWidth: '200px' }}>Tên dược / Hoạt chất</th>
                        <th style={{ textAlign: 'center' }}>ĐVT</th>
                        <th style={{ textAlign: 'center' }}>Số ngày</th>
                        <th style={{ textAlign: 'center' }}>Sáng-Trưa-Chiều-Tối</th>
                        <th style={{ textAlign: 'center' }}>Số lượng</th>
                        <th style={{ textAlign: 'left' }}>Cách dùng</th>
                        <th style={{ textAlign: 'center' }}>Tồn kho</th>
                        <th style={{ textAlign: 'center' }}>Free</th>
                        <th style={{ textAlign: 'center', width: '80px' }}>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { code: 'D001', name: 'Paracetamol 500mg', active: 'Paracetamol', unit: 'Viên', days: 5, schedule: '1-0-1-0', qty: 10, usage: 'Uống sau ăn', stock: 1500 },
                        { code: 'D042', name: 'Alpha chymotrypsin', active: 'Chymotrypsin', unit: 'Viên', days: 5, schedule: '2-0-2-0', qty: 20, usage: 'Uống sau ăn', stock: 420 }
                      ].map((d, i) => (
                        <tr key={i} className="hover-row" style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ textAlign: 'center', color: '#94a3b8' }}>{i + 1}</td>
                          <td style={{ fontWeight: 600, color: '#475569' }}>{d.code}</td>
                          <td>
                            <div style={{ fontWeight: 700, color: '#334155' }}>{d.name}</div>
                            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{d.active}</div>
                          </td>
                          <td style={{ textAlign: 'center' }}>{d.unit}</td>
                          <td style={{ textAlign: 'center' }}>{d.days}</td>
                          <td style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '2px', justifyContent: 'center' }}>
                              {d.schedule.split('-').map((v, idx) => (
                                <span key={idx} style={{ padding: '2px 4px', background: v === '0' ? '#f1f5f9' : '#eff6ff', borderRadius: '4px', fontSize: '0.75rem', fontWeight: v === '0' ? 400 : 700, color: v === '0' ? '#94a3b8' : '#2563eb', border: v === '0' ? 'none' : '1px solid #bfdbfe' }}>{v}</span>
                              ))}
                            </div>
                          </td>
                          <td style={{ textAlign: 'center', fontWeight: 800, color: '#1e293b' }}>{d.qty}</td>
                          <td style={{ fontSize: '0.8rem' }}>{d.usage}</td>
                          <td style={{ textAlign: 'center', color: d.stock < 100 ? '#ef4444' : '#64748b', fontWeight: 600 }}>{d.stock}</td>
                          <td style={{ textAlign: 'center' }}><input type="checkbox" /></td>
                          <td style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                              <div className="action-circle-btn" style={{ width: '28px', height: '28px', borderColor: '#fee2e2' }}><Trash2 size={12} color="#ef4444" /></div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Prescription Footer Summary */}
                <div style={{ padding: '1rem 1.5rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '2rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>TỔNG KHOẢN</div>
                    <div style={{ fontWeight: 700, color: '#1e293b' }}>2</div>
                  </div>
                  {/* <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>THA TRÀN</div>
                    <div style={{ fontWeight: 700, color: '#1e293b' }}>0</div>
                  </div> */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>THÀNH TIỀN</div>
                    <div style={{ fontWeight: 800, color: '#2563eb', fontSize: '1.1rem' }}>85.000 VNĐ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div style={{ padding: '1.25rem 2rem', background: '#fff', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button className="btn btn-outline" style={{ background: '#fff', padding: '0 2rem', height: '44px' }} onClick={() => setShowPrescriptionOrder(false)}>Đóng (Esc)</button>
            <button className="btn btn-outline" style={{ background: '#fff', padding: '0 1.5rem', height: '44px' }}><Printer size={18} /> In đơn thuốc</button>
            <button className="btn btn-primary" style={{ padding: '0 2.5rem', height: '44px', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }} onClick={() => setShowPrescriptionOrder(false)}><Save size={18} /> Lưu đơn</button>
          </div>
        </div>
      )}
      <ConfirmationModal 
        isOpen={showSaveConfirm}
        onClose={() => setShowSaveConfirm(false)}
        onConfirm={() => { setIsEdit(false); setViewMode('list'); }}
        title="Lưu hồ sơ khám bệnh"
        message="Bạn có chắc chắn muốn lưu các thông tin khám bệnh này không?"
        type="success"
        confirmText="Lưu ngay"
      />

      <ConfirmationModal 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => setViewMode('list')}
        title="Xóa hồ sơ khám"
        message="Hành động này sẽ xóa vĩnh viễn hồ sơ này. Bạn có chắc chắn không?"
        type="danger"
        confirmText="Xác nhận xóa"
      />

      <ConfirmationModal 
        isOpen={showUndoConfirm}
        onClose={() => setShowUndoConfirm(false)}
        onConfirm={() => {}}
        title="Hủy xác nhận chi phí"
        message="Bạn có chắc chắn muốn hủy xác nhận chi phí cho bệnh nhân này không?"
        type="warning"
        confirmText="Xác nhận hủy"
      />
    </div>
  );
};

export default Examination;

