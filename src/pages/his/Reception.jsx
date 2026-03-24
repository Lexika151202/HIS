import React, { useState } from 'react';
import {
  Search, UserPlus, QrCode, Clipboard, Trash2, Edit, Save,
  User, MapPin, Activity, Clock, LogIn, ChevronRight,
  FileText, CreditCard, Heart, ArrowRight, X, RotateCcw,
  IdCard, Phone, Briefcase, Building
} from 'lucide-react';

const Reception = () => {
  return (
    <div className="animate-fade" style={{ background: '#f8fafc', minHeight: '100vh', padding: '1.5rem 2rem' }}>

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

      {/* I. Search Area with Modern Scan Buttons */}
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' }}>

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

              <div className="form-field">
                <label>Thời gian hiệu lực (Từ ngày)</label>
                <input type="date" className="modern-input" />
              </div>
              <div className="form-field">
                <label>Đến ngày</label>
                <input type="date" className="modern-input" />
              </div>
              <div className="form-field">
                <label>Đủ 5 năm</label>
                <input type="date" className="modern-input" />
              </div>
              <div className="form-field" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label>Loại tuyến</label>
                  <select className="modern-select"><option>Đúng tuyến</option><option>Cấp cứu</option><option>Thông tuyến</option></select>
                </div>
                <div>
                  <label>Khu vực</label>
                  <select className="modern-select"><option>Bình thường</option><option>K1</option><option>K2</option><option>K3</option></select>
                </div>
              </div>

              <div className="form-field">
                <label>Ngày miễn cùng chi trả</label>
                <input type="date" className="modern-input" />
              </div>
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
                <input type="text" className="modern-input" value="BN20240001" readOnly style={{ background: '#f1f5f9', color: '#64748b' }} />
              </div>
              <div className="form-field" style={{ gridColumn: 'span 2' }}>
                <label style={{ color: '#2563eb' }}>Họ và tên bệnh nhân*</label>
                <input type="text" className="modern-input" placeholder="VD: NGUYỄN VĂN A" style={{ fontWeight: 600 }} />
              </div>
              <div className="form-field">
                <label>Giới tính</label>
                <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
                  <button style={{ flex: 1, padding: '6px', border: 'none', borderRadius: '6px', background: '#fff', fontSize: '0.8rem', fontWeight: 600, color: '#2563eb' }}>Nam</button>
                  <button style={{ flex: 1, padding: '6px', border: 'none', borderRadius: '6px', background: 'transparent', fontSize: '0.8rem', fontWeight: 500, color: '#64748b' }}>Nữ</button>
                  <button style={{ flex: 1, padding: '6px', border: 'none', borderRadius: '6px', background: 'transparent', fontSize: '0.8rem', fontWeight: 500, color: '#64748b' }}>Khác</button>
                </div>
              </div>
              <div className="form-field">
                <label>Ngày sinh / Tháng / Năm</label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <input type="text" className="modern-input" placeholder="Ngày/Tháng/Năm" style={{ flex: 1 }} />
                  <input type="text" className="modern-input" placeholder="Tuổi" style={{ width: '60px' }} />
                </div>
              </div>

              <div className="form-field" style={{ gridColumn: 'span 2' }}>
                <label>Địa chỉ thường trú</label>
                <input type="text" className="modern-input" placeholder="Số nhà, tên đường..." />
              </div>
              <div className="form-field"><label>Tỉnh / Thành phố</label><select className="modern-select"><option>Thành phố Hà Nội</option></select></div>
              <div className="form-field"><label>Phường / Xã</label><select className="modern-select"><option>Phường Yên Hoà</option></select></div>
              <div className="form-field"><label>Thôn / Xóm</label><input type="text" className="modern-input" /></div>

              <div className="form-field">
                <label>Số điện thoại</label>
                <input type="text" className="modern-input" placeholder="0xxx..." />
              </div>
              <div className="form-field" style={{ gridColumn: 'span 2' }}>
                <label>Nghề nghiệp</label>
                <select className="modern-select"><option>00000 - Khác, không xác định</option></select>
              </div>
              <div className="form-field"><label>Dân tộc</label><select className="modern-select"><option>Kinh</option></select></div>
              <div className="form-field"><label>Quốc tịch</label><select className="modern-select"><option>Việt Nam</option></select></div>

              <div className="form-field">
                <label>Số thẻ CCCD/Hộ chiếu</label>
                <input type="text" className="modern-input" />
              </div>
              <div className="form-field">
                <label>Ngày cấp căn cước</label>
                <input type="date" className="modern-input" />
              </div>
              <div className="form-field" style={{ gridColumn: 'span 3' }}>
                <label>Nơi cấp CMND/CCCD</label>
                <select className="modern-select"><option>Cục Cảnh sát QLHC về trật tự xã hội</option></select>
              </div>

              <div className="form-field">
                <label>Người thân</label>
                <input type="text" className="modern-input" />
              </div>
              <div className="form-field">
                <label>Quan hệ</label>
                <select className="modern-select"><option>Bố</option><option>Mẹ</option></select>
              </div>
              <div className="form-field">
                <label>CMT/CCCD người thân</label>
                <input type="text" className="modern-input" />
              </div>
              <div className="form-field">
                <label>Điện thoại liên hệ</label>
                <input type="text" className="modern-input" />
              </div>
              <div className="form-field">
                <label>Nơi làm việc</label>
                <input type="text" className="modern-input" />
              </div>

              <div className="form-field" style={{ gridColumn: 'span 2' }}>
                <label>Số thẻ lao động</label>
                <input type="text" className="modern-input" />
              </div>
              <div className="form-field" style={{ gridColumn: 'span 3' }}>
                <label>Khoa / phòng bệnh nhân</label>
                <select className="modern-select"><option>Khoa Nhi - Phòng 101</option></select>
              </div>
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
              <div className="form-field">
                <label>Số tiếp nhận</label>
                <input type="text" className="modern-input" readOnly value="SN20240323" style={{ background: '#f1f5f9' }} />
              </div>
              <div className="form-field">
                <label>Số thứ tự khám</label>
                <input type="text" className="modern-input" readOnly value="14" style={{ background: '#f1f5f9', fontWeight: 700 }} />
              </div>
              <div className="form-field">
                <label>Ngày vào viện</label>
                <input type="date" className="modern-input" defaultValue="2026-03-23" />
              </div>
              <div className="form-field">
                <label>Giờ vào viện (24h)</label>
                <input type="time" className="modern-input" defaultValue="22:14" />
              </div>
              <div className="form-field">
                <label>Thời gian y lệnh (24h)</label>
                <input type="time" className="modern-input" defaultValue="22:17" />
              </div>

              <div className="form-field" style={{ gridColumn: 'span 2' }}>
                <label>Dịch vụ chỉ định</label>
                <select className="modern-select" style={{ height: '48px', fontWeight: 600, color: '#2563eb' }}>
                  <option>Công khám nội chung</option>
                </select>
              </div>
              <div className="form-field" style={{ gridColumn: 'span 3' }}>
                <label>Phòng khám tiếp nhận</label>
                <select className="modern-select" style={{ height: '48px' }}>
                  <option>Phòng 101 - BS Nguyễn Nam</option>
                </select>
              </div>
              <div className="form-field" style={{ gridColumn: 'span 5' }}>
                <label>Ghi chú</label>
                <textarea className="modern-input" rows="2" style={{ resize: 'none' }} placeholder="Nhập ghi chú hoặc triệu chứng ban đầu..."></textarea>
              </div>
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
                { room: 'Tổng', total: 116, wait: 13, isTotal: true },
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
          <div className="card" style={{ padding: '1.25rem', border: 'none' }}>
            <h4 style={{ fontSize: '0.9rem', color: '#1e293b', marginBottom: '1rem' }}>Lịch sử đăng ký gần đây</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', padding: '1rem' }}>Chưa chọn bệnh nhân</p>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .form-field { display: flex; flex-direction: column; gap: 6px; }
        .form-field label { font-size: 0.8rem; font-weight: 600; color: #475569; }
        .modern-input, .modern-select { 
          padding: 8px 12px; border-radius: 10px; border: 1px solid #e2e8f0; 
          background: #fff; font-size: 0.85rem; outline: none; transition: all 0.2s;
        }
        .modern-input:focus, .modern-select:focus { border-color: #2563eb; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1); }
        .modern-checkbox { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 500; color: #334155; cursor: pointer; }
        .modern-checkbox input { width: 16px; height: 16px; accent-color: #2563eb; }
      `}</style>
    </div>
  );
};

export default Reception;
