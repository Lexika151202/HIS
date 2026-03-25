import React, { useState } from 'react';
import {
  Search, Filter, List, User, Calendar,
  ChevronRight, MoreVertical, ClipboardCheck,
  Stethoscope, XCircle, Eye, Trash2, LayoutGrid,
  Clock, CheckCircle, AlertCircle, RefreshCcw,
  Activity, Printer, Save, Plus, LogIn, Pill, FileText, History, Pencil,
  ChevronLeft, Minus
} from 'lucide-react';

const Examination = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'details'
  const [showServiceOrder, setShowServiceOrder] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState(['1', '3', '4']); // IDs of expanded categories
  const [collapseTree, setCollapseTree] = useState(false);
  const [collapseList, setCollapseList] = useState(false);
  const [cartExpandedGroups, setCartExpandedGroups] = useState(['KB', 'XN', 'CDHA']);

  const mockPatients = [
    { stt: 2660, id: '0107822000811', name: 'Lê Thị Loan', gender: 'Nữ', yob: 1982, target: 'BHYT-L4', insurance: 'GD4010120972718', confirmed: true, date: '23/03/2026', room: '109 | Phòng khám Đông y' },
    { stt: 2661, id: '0107825001157', name: 'Trần Thị Chanh', gender: 'Nữ', yob: 1951, target: 'BHYT-L2', insurance: 'CT2383821506943', confirmed: true, date: '23/03/2026', room: '001.6 | Phòng khám Nội 1 - Nhi' },
    { stt: 2662, id: '0107820001392', name: 'Kim Trọng Tuệ', gender: 'Nam', yob: 1973, target: 'BHYT-L4', insurance: 'GD4010112068042', confirmed: true, date: '23/03/2026', room: '105 | Phòng khám Ngoại - Da liễu' },
    { stt: 2663, id: '0107822004777', name: 'Nguyễn Kim Dũng', gender: 'Nam', yob: 1957, target: 'BHYT-L4', insurance: 'GD4010121091710', confirmed: true, date: '23/03/2026', room: '001.6 | Phòng khám Nội 1 - Nhi' },
  ];

  return (
    <div className="animate-fade" style={{ background: '#f8fafc', minHeight: '100vh', padding: '1.5rem 2rem' }}>

      {/* Modern Page Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        marginBottom: '2rem',
        background: 'linear-gradient(to right, #fff, #f8fafc)',
        padding: '1.25rem 1.5rem',
        borderRadius: '16px',
        boxShadow: '0 4px 20px -5px rgba(0,0,0,0.05)',
        border: '1px solid #fff'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.8rem', fontWeight: 500 }}>
            <span>Phần mềm HIS</span>
            <ChevronRight size={14} />
            <span style={{ color: '#2563eb' }}>Khám bệnh</span>
            {viewMode === 'details' && (
              <>
                <ChevronRight size={14} />
                <span style={{ color: '#94a3b8' }}>Chi tiết bệnh nhân</span>
              </>
            )}
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>
            {viewMode === 'list' ? 'Danh sách khám bệnh' : 'Chi tiết khám bệnh'}
          </h1>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Đang khám: <b style={{ color: '#0f172a' }}>12</b></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></div>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Đang chờ: <b style={{ color: '#0f172a' }}>45</b></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></div>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Hoàn thành: <b style={{ color: '#0f172a' }}>120</b></span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ display: 'flex', background: '#fff', padding: '4px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <button 
              onClick={() => setViewMode('list')}
              style={{ 
                padding: '8px 16px', 
                borderRadius: '6px', 
                border: 'none', 
                background: viewMode === 'list' ? '#f1f5f9' : 'transparent',
                color: viewMode === 'list' ? '#2563eb' : '#64748b',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <List size={16} /> Danh sách
            </button>
            <button 
              onClick={() => setViewMode('details')}
              style={{ 
                padding: '8px 16px', 
                borderRadius: '6px', 
                border: 'none', 
                background: viewMode === 'details' ? '#f1f5f9' : 'transparent',
                color: viewMode === 'details' ? '#2563eb' : '#64748b',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Eye size={16} /> Chi tiết
            </button>
          </div>
          
          <button 
            className="btn btn-outline" 
            onClick={() => window.location.reload()}
            style={{ 
              height: '44px',
              padding: '0 1.25rem',
              borderRadius: '10px',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
          >
            <RefreshCcw size={18} color="#64748b" /> 
            <span style={{ color: '#475569', fontWeight: 600 }}>Cập nhật</span>
          </button>
          
          <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)' }}>
            <User size={20} color="#fff" />
          </div>
        </div>
      </div>

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
                <button className="btn btn-primary" style={{ height: '44px', padding: '0 1rem' }}>
                  <Search size={18} />
                  <span style={{ marginLeft: '5px' }}>Tìm kiếm</span>
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
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}><Filter size={16} /> Lọc nâng cao</button>
              </div>
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
                      onClick={() => setViewMode('details')}
                    >
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button
                            className="btn-action"
                            style={{ padding: '6px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', cursor: 'pointer' }}
                            title="Khám bệnh"
                            onClick={(e) => { e.stopPropagation(); setViewMode('details'); }}
                          >
                            <Stethoscope size={16} />
                          </button>
                          <button
                            className="btn-action"
                            style={{ padding: '6px', borderRadius: '8px', border: '1px solid #fee2e2', background: '#fff', color: '#ef4444', cursor: 'pointer' }}
                            title="Hủy yêu cầu"
                            onClick={(e) => { e.stopPropagation(); }}
                          >
                            <Trash2 size={16} />
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* Patient Info Summary */}
              <div className="card" style={{ padding: '1.25rem 1.5rem', border: 'none', background: '#fff' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
                  <div><label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Mã BN</label><span style={{ fontWeight: 700 }}>0107822000811</span></div>
                  <div><label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Họ và tên</label><span style={{ fontWeight: 700 }}>Lê Thị Loan</span></div>
                  <div><label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Giới tính</label><span style={{ fontWeight: 600 }}>Nữ</span></div>
                  <div><label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Ngày sinh</label><span style={{ fontWeight: 600 }}>19/10/1982</span></div>
                  <div><label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>BHYT</label><span style={{ fontWeight: 700, color: '#2563eb' }}>GD40101... (L4)</span></div>
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
                  <div className="form-field"><label>Ngày vào khám</label><input type="date" className="modern-input" defaultValue="2026-03-23" /></div>
                  <div className="form-field"><label>Giờ vào viện</label><input type="time" className="modern-input" defaultValue="07:51" /></div>
                  <div className="form-field" style={{ gridColumn: 'span 2' }}><label>Phòng khám</label><select className="modern-select"><option>109 | Phòng khám Đông y</option></select></div>

                  <div className="form-field" style={{ gridColumn: 'span 2' }}>
                    <label>Triệu chứng / Diễn biến</label>
                    <textarea className="modern-input" rows="3" defaultValue="Bệnh nhân đau nhức vùng thắt lưng vài ngày nay..."></textarea>
                  </div>
                  <div className="form-field" style={{ gridColumn: 'span 2' }}>
                    <label>Lý do vào viện</label>
                    <textarea className="modern-input" rows="3" placeholder="Ghi chú lý do..."></textarea>
                  </div>

                  {/* Diagnosis Row */}
                  <div className="form-field" style={{ gridColumn: 'span 1' }}>
                    <label>Bệnh chính (ICD10)</label>
                    <select className="modern-select"><option>M54 - Đau lưng (Dorsalgia)</option></select>
                  </div>
                  <div className="form-field" style={{ gridColumn: 'span 3' }}>
                    <label>Diễn giải bệnh chính</label>
                    <input type="text" className="modern-input" placeholder="Nhập diễn giải chi tiết cho bệnh chính..." />
                  </div>

                  <div className="form-field" style={{ gridColumn: 'span 1' }}>
                    <label>Bệnh kèm theo (Chọn nhiều)</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', padding: '6px', border: '1px solid #e2e8f0', borderRadius: '10px', minHeight: '44px', background: '#fff' }}>
                      <span style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>M47 - Thoái hoá cột sống <XCircle size={12} cursor="pointer" /></span>
                      <input type="text" placeholder="Tìm..." style={{ border: 'none', outline: 'none', fontSize: '0.85rem', flex: 1, minWidth: '50px' }} />
                    </div>
                  </div>
                  <div className="form-field" style={{ gridColumn: 'span 3' }}>
                    <label>Diễn giải bệnh kèm theo</label>
                    <input type="text" className="modern-input" placeholder="Nhập diễn giải cho các bệnh kèm theo..." />
                  </div>

                  {/* Treatment Row */}
                  <div className="form-field" style={{ gridColumn: 'span 2' }}>
                    <label>Tư vấn điều trị</label>
                    <textarea className="modern-input" rows="2" defaultValue="khám, chuyển"></textarea>
                  </div>
                  <div className="form-field" style={{ gridColumn: 'span 2' }}>
                    <label>Diễn biến điều trị</label>
                    <textarea className="modern-input" rows="2" defaultValue="Bệnh nhân đau nhức vùng thắt lưng vài ngày nay. Khám bệnh nhân tỉnh, đau nhức nhiều, vận động đau tăng"></textarea>
                  </div>

                  <div className="form-field"><label>Loại tai nạn</label><select className="modern-select"><option>-- Chọn loại tai nạn --</option></select></div>
                  <div className="form-field"><label>Kết quả khám</label><select className="modern-select"><option>Không thay đổi</option><option>Khỏi</option><option>Đỡ/Giảm</option></select></div>
                  <div className="form-field"><label>Loại khám chữa bệnh</label><select className="modern-select"><option>Khám bệnh</option></select></div>
                  <div className="form-field"><label>Bác sĩ khám</label><select className="modern-select"><option>106 | Cao Thu Hằng</option></select></div>

                  <div className="form-field">
                    <label>Kết thúc khám</label>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <input type="date" className="modern-input" defaultValue="2026-03-23" style={{ flex: 1.2, minWidth: '0' }} />
                      <input type="time" className="modern-input" defaultValue="08:09" style={{ flex: 0.8, minWidth: '0' }} />
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Phương pháp khám bệnh</label>
                    <select className="modern-select"><option>Tây y</option><option>Đông y</option><option>Kết hợp</option></select>
                  </div>
                  <div className="form-field" style={{ gridColumn: 'span 2' }}>
                    <label>Ghi chú kết luận</label>
                    <input type="text" className="modern-input" placeholder="Nhập ghi chú cuối cùng..." />
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
                    <button className="btn btn-primary btn-sm" onClick={() => setShowServiceOrder(true)}><Plus size={16} /> Thêm chỉ định</button>
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
              <div className="card" style={{ padding: '1.5rem', border: 'none', background: '#fff' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#2563eb', marginBottom: '1.5rem' }}>Kê đơn thuốc</h3>
                <div style={{ padding: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '80px', height: '80px', background: '#f8fafc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Pill size={40} color="#cbd5e1" />
                  </div>
                  <p style={{ color: '#64748b' }}>Bệnh nhân chưa có đơn thuốc.</p>
                  <button className="btn btn-primary" style={{ padding: '0.75rem 2.5rem' }}><Pill size={18} /> Kê đơn</button>
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
                >
                  <Eye size={16} /> Xem tất cả lịch sử
                </button>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Bar */}
          <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            background: '#fff', borderTop: '1px solid #e2e8f0',
            padding: '12px 2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.08)', zIndex: 100
          }}>
            <button className="btn btn-outline" style={{ background: '#fff' }} onClick={() => setViewMode('list')}>Đóng</button>
            <button className="btn btn-outline" style={{ background: '#fff' }}>Xem hồ sơ khác</button>
            <button className="btn btn-outline" style={{ background: '#fff' }}>Tiếp đón mới (F10)</button>
            <button className="btn btn-primary" style={{ padding: '0 3rem', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)' }} onClick={() => setViewMode('list')}>Lưu (F11)</button>
          </div>
          <div style={{ height: '80px' }}></div>
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
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>
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
    </div>
  );
};

export default Examination;

