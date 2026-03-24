import React, { useState } from 'react';
import {
  Search, UserPlus, QrCode, Clipboard, Trash2, Edit, Save,
  User, MapPin, Activity, Clock, LogIn, ChevronRight,
  FileText, CreditCard, Heart, ArrowRight, X, RotateCcw,
  IdCard, Phone, Briefcase, Building, ChevronDown, Maximize2, RefreshCw
} from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
      <div className="card shadow-2xl animate-fade" style={{ width: '1100px', maxWidth: '95vw', maxHeight: '90vh', background: '#fff', display: 'flex', flexDirection: 'column', padding: 0 }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2563eb' }}>{title}</h3>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
        </div>
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

const Reception = () => {
  const [showRegPopup, setShowRegPopup] = useState(false);
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);

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
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}><td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>Chưa có dữ liệu</td></tr>
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

      {/* Top Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>Tiếp đón Bệnh nhân</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Hệ thống Quản lý Tiếp nhận & Hồ sơ Bệnh án điện tử</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-outline" style={{ background: '#fff' }}><RotateCcw size={18} /> Làm mới (F5)</button>
          <button className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}><Save size={18} /> Lưu & Tiếp đón (F11)</button>
        </div>
      </div>

      {/* I. Search Area Area */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem', border: 'none', background: 'linear-gradient(90deg, #fff 0%, #f1f5f9 100%)' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Tìm kiếm nhanh: Nhập Mã BN, Họ tên, CMND hoặc Quét thẻ BHYT..."
              style={{
                width: '100%', padding: '1rem 1rem 1rem 3rem',
                borderRadius: '12px', border: '1px solid #e2e8f0',
                fontSize: '1rem', outline: 'none', transition: 'all 0.2s',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
              }}
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

        {/* Main Content Area */}
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
                <input type="text" className="modern-input" placeholder="____-____-____-____" />
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
               <div className="form-field"><label>Mã bệnh nhân</label><input type="text" className="modern-input" value="BN20240001" readOnly style={{ background: '#f1f5f9' }} /></div>
               <div className="form-field" style={{ gridColumn: 'span 2' }}><label style={{ color: '#2563eb' }}>Họ và tên bệnh nhân*</label><input type="text" className="modern-input" placeholder="NGUYỄN VĂN A" /></div>
               <div className="form-field"><label>Giới tính</label><select className="modern-select"><option>Nam</option><option>Nữ</option></select></div>
               <div className="form-field"><label>Ngày sinh</label><input type="text" className="modern-input" placeholder="dd/mm/yyyy" /></div>
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
              <div className="form-field"><label>Số tiếp nhận</label><input type="text" className="modern-input" readOnly value="SN20240324" /></div>
              <div className="form-field"><label>Số thứ tự</label><input type="text" className="modern-input" readOnly value="14" style={{ background: '#2563eb', color: '#fff' }} /></div>
              <div className="form-field" style={{ gridColumn: 'span 2' }}><label>Dịch vụ chỉ định</label><select className="modern-select"><option>Khám nội chung</option></select></div>
              <div className="form-field"><label>Phòng khám</label><select className="modern-select"><option>Phòng 101</option></select></div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'sticky', top: '1.5rem' }}>
          
          <div className="card" style={{ padding: '1.25rem', border: 'none' }}>
            <h4 style={{ fontSize: '0.9rem', color: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Activity size={16} color="#2563eb" /> Thông tin tiếp đón
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', padding: '0 0.75rem 0.5rem', borderBottom: '1px solid #f1f5f9', fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
                <span style={{ flex: 1.5 }}>Phòng khám</span>
                <span style={{ flex: 1, textAlign: 'center' }}>Tổng BN</span>
                <span style={{ flex: 1, textAlign: 'center' }}>Đang chờ</span>
              </div>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2563eb' }}>Các lần đăng ký khám bệnh</h4>
              <button 
                onClick={() => setShowRegPopup(true)}
                style={{ border: '1px solid #e2e8f0', background: '#fff', padding: '4px', borderRadius: '4px', cursor: 'pointer', color: '#64748b' }}
              >
                <Maximize2 size={14} />
              </button>
            </div>
            <div style={{ border: '1px solid #f1f5f9', borderLeft: '3px solid #cbd5e1', borderRadius: '4px', padding: '12px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Chưa chọn bệnh nhân</p>
            </div>
          </div>

          <div className="card shadow-sm" style={{ padding: '1rem', border: 'none', background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2563eb' }}>Lịch sử khám bệnh</h4>
              <button 
                onClick={() => setShowHistoryPopup(true)}
                style={{ border: '1px solid #e2e8f0', background: '#fff', padding: '4px', borderRadius: '4px', cursor: 'pointer', color: '#64748b' }}
              >
                <Maximize2 size={14} />
              </button>
            </div>
            <div style={{ border: '1px solid #f1f5f9', borderLeft: '3px solid #cbd5e1', borderRadius: '4px', padding: '12px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Chưa chọn bệnh nhân</p>
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
};

export default Reception;
