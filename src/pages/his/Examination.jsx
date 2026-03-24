import React, { useState } from 'react';
import {
  Search, Filter, List, User, Calendar, 
  ChevronRight, MoreVertical, ClipboardCheck, 
  Stethoscope, XCircle, Eye, Trash2, LayoutGrid,
  Clock, CheckCircle, AlertCircle, RefreshCcw,
  Activity, Printer, Save, Plus, LogIn, Pill, FileText
} from 'lucide-react';

const Examination = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'details'

  const mockPatients = [
    { stt: 2660, id: '0107822000811', name: 'Lê Thị Loan', gender: 'Nữ', yob: 1982, target: 'BHYT-L4', insurance: 'GD4010120972718', confirmed: true, date: '23/03/2026', room: '109 | Phòng khám Đông y' },
    { stt: 2661, id: '0107825001157', name: 'Trần Thị Chanh', gender: 'Nữ', yob: 1951, target: 'BHYT-L2', insurance: 'CT2383821506943', confirmed: true, date: '23/03/2026', room: '001.6 | Phòng khám Nội 1 - Nhi' },
    { stt: 2662, id: '0107820001392', name: 'Kim Trọng Tuệ', gender: 'Nam', yob: 1973, target: 'BHYT-L4', insurance: 'GD4010112068042', confirmed: true, date: '23/03/2026', room: '105 | Phòng khám Ngoại - Da liễu' },
    { stt: 2663, id: '0107822004777', name: 'Nguyễn Kim Dũng', gender: 'Nam', yob: 1957, target: 'BHYT-L4', insurance: 'GD4010121091710', confirmed: true, date: '23/03/2026', room: '001.6 | Phòng khám Nội 1 - Nhi' },
  ];

  return (
    <div className="animate-fade" style={{ background: '#f8fafc', minHeight: '100vh', padding: '1.5rem 2rem' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a' }}>
            {viewMode === 'list' ? 'Danh sách khám bệnh' : 'Chi tiết khám bệnh'}
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-primary" onClick={() => window.location.reload()}><RefreshCcw size={18} /> Làm mới</button>
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
                <button className="btn btn-primary" style={{ height: '44px', padding: '0 2rem' }}>
                  <Search size={18} /> <span style={{ marginLeft: '8px' }}>Tìm kiếm bệnh nhân</span>
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

                  {/* Clinical Indicators */}
                  <div className="form-field"><label>Loại tai nạn</label><select className="modern-select"><option>-- Chọn loại tai nạn --</option></select></div>
                  <div className="form-field"><label>Kết quả khám</label><select className="modern-select"><option>Không thay đổi</option><option>Khỏi</option><option>Đỡ/Giảm</option></select></div>
                  <div className="form-field"><label>Loại khám chữa bệnh</label><select className="modern-select"><option>Khám bệnh</option></select></div>
                  <div className="form-field"><label>Bác sĩ khám</label><select className="modern-select"><option>106 | Cao Thu Hằng</option></select></div>
                  
                  <div style={{ gridColumn: 'span 4', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div className="form-field">
                      <label>Kết thúc khám</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input type="date" className="modern-input" defaultValue="2026-03-23" style={{ flex: 1 }} />
                        <input type="time" className="modern-input" defaultValue="08:09" style={{ width: '120px' }} />
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Ghi chú kết luận</label>
                      <input type="text" className="modern-input" placeholder="Nhập ghi chú cuối cùng..." />
                    </div>
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
                    <button className="btn btn-primary btn-sm"><Plus size={16} /> Thêm chỉ định</button>
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
                        <td style={{ padding: '1rem', textAlign: 'center' }}>23/03/2026<br/>07:54</td>
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
              <div className="card" style={{ padding: '0', border: 'none', overflow: 'hidden' }}>
                 {/* Sidebar Tabs */}
                 <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', background: '#fff' }}>
                    {['Xử trí', 'Sổ sách', 'Lịch sử khám'].map((tab, i) => (
                      <div key={i} style={{ 
                        flex: 1, padding: '12px 4px', textAlign: 'center', fontSize: '0.8rem', fontWeight: 600, 
                        cursor: 'pointer', borderBottom: tab === 'Lịch sử khám' ? '2px solid #2563eb' : 'none',
                        color: tab === 'Lịch sử khám' ? '#2563eb' : '#64748b'
                      }}>
                        {tab}
                      </div>
                    ))}
                 </div>

                 {/* Tab Content: History List */}
                 <div style={{ padding: '1rem', background: '#fff' }}>
                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                       <button style={{ 
                         padding: '6px 16px', border: '1px solid #10b981', color: '#10b981', 
                         background: '#fff', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer' 
                       }}>Xem chi tiết</button>
                    </div>

                    {/* History Groups */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                      {[
                        { date: '23/03/2026 07:54', clinic: '109 - Phòng khám Đông y', doctor: 'Cao Thu Hằng', diag: 'M54 - Đau lưng' },
                        { date: '18/07/2024 08:08', clinic: '114 - Phòng khám Nội 1- Nhi', doctor: 'Nguyễn Thị Bình', diag: 'J20 - Viêm phế quản cấp' },
                        { date: '16/02/2022 09:34', clinic: '114 - Phòng khám Nội 1- Nhi', doctor: 'Trần Văn A', diag: 'I10 - Tăng huyết áp' }
                      ].map((item, i) => (
                        <div key={i}>
                          <div style={{ 
                            padding: '8px 12px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', 
                            display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' 
                          }}>
                            <ChevronRight size={14} color="#64748b" style={{ transform: 'rotate(90deg)' }} />
                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>{item.date}</span>
                          </div>
                          <div style={{ padding: '10px 12px', fontSize: '0.85rem', color: '#334155', borderBottom: '1px solid #e2e8f0', lineHeight: 1.6 }}>
                             <div>- Phòng khám: <span style={{ fontWeight: 700 }}>{item.clinic}</span></div>
                             <div>- Bác sĩ khám: <span style={{ fontWeight: 600 }}>{item.doctor}</span></div>
                             <div>- Chẩn đoán: <span style={{ fontWeight: 700 }}>{item.diag}</span></div>
                          </div>
                        </div>
                      ))}
                    </div>
                 </div>
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
      `}</style>
    </div>
  );
};

export default Examination;
