import React, { useState } from 'react';
import {
  Shield, ArrowLeft, Save, UserPlus, CheckCircle2, ChevronRight, LayoutGrid, Trash2, Edit2, Search, Plus
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const PermissionDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('functions');

  // Sample data for functions under this permission (1.2.2)
  const roleFunctions = [
    { module: 'Tiếp đón', functions: ['Xem danh sách đăng ký', 'Tiếp đón bệnh nhân mới', 'Chỉnh sửa thông tin hành chính'] },
    { module: 'Khám bệnh', functions: ['Kê đơn thuốc', 'Chỉ định cận lâm sàng', 'Kết luận bệnh án', 'Hủy xác nhận chi phí'] },
    { module: 'Báo cáo', functions: ['Báo cáo doanh thu ngày', 'Thống kê lượng bệnh nhân'] },
  ];

  // Sample data for user assignment (1.2.3)
  const usersToAssign = [
    { id: 'AD001', name: 'Nguyễn Văn Admin', role: 'Quản trị viên', checked: true },
    { id: 'ST001', name: 'Trần Thị Tiếp Đón', role: 'Nhân viên Tiếp đón', checked: false },
    { id: 'BS001', name: 'Nguyễn Thị Bác Sĩ', role: 'Bác sĩ chuyên khoa', checked: true },
    { id: 'ST002', name: 'Lê Văn Staff', role: 'Nhân viên hành chính', checked: false },
  ];

  return (
    <div className="animate-fade">
      {/* Header with Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button
            onClick={() => navigate('/admin/permissions')}
            className="btn"
            style={{ padding: '8px', borderRadius: '12px', background: '#fff', border: '1px solid #e2e8f0', display: 'flex' }}
          >
            <ArrowLeft size={20} color="#64748b" />
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.85rem', marginBottom: '4px' }}>
              <span>Quản lý Phân quyền</span>
              <ChevronRight size={14} />
              <span>Chi tiết quyền</span>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>Quyền: {id || 'ADM001'}</h1>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn" style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fee2e2', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Trash2 size={18} /> Xóa
          </button>
          <button className="btn" style={{ background: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Edit2 size={18} /> Chỉnh sửa
          </button>
          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Save size={18} /> Lưu
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}>
        {/* Left Column: Basic Info & User Assignment */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Shield size={18} color="#2563eb" /> Thông tin chung
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.25rem' }}>
              <div className="form-field">
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px', display: 'block' }}>Mã quyền hệ thống</label>
                <input type="text" className="modern-input" value={id || 'ADM001'} disabled />
              </div>
              <div className="form-field">
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px', display: 'block' }}>Tên nhóm quyền</label>
                <input type="text" className="modern-input" defaultValue="Quản trị hệ thống" />
              </div>
            </div>

            <div className="form-field">
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px', display: 'block' }}>Mô tả chi tiết</label>
              <textarea className="modern-input" style={{ minHeight: '100px', resize: 'none' }} defaultValue="Toàn quyền thao tác trên các phân hệ lâm sàng và quản trị hệ thống." />
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <UserPlus size={18} color="#2563eb" /> Gán quyền cho User
              </h3>
            </div>

            {/* Search User in Permission */}
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Tìm user trong danh sách..."
                style={{ width: '100%', padding: '8px 10px 8px 32px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.8rem' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {usersToAssign.filter(u => u.checked).map(user => (
                <div
                  key={user.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 12px',
                    background: '#fff',
                    borderRadius: '10px',
                    border: '1px solid #f1f5f9'
                  }}
                >
                  <div style={{ width: '32px', height: '32px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                    {user.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{user.name}</div>
                    <div style={{ color: '#64748b', fontSize: '0.7rem' }}>{user.role}</div>
                  </div>
                  <button
                    title="Gỡ quyền"
                    style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#ef4444'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                className="btn"
                style={{ width: '100%', marginTop: '0.5rem', border: '1px dashed #2563eb', color: '#2563eb', background: '#eff6ff', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', fontSize: '0.85rem' }}
              >
                <Plus size={16} /> Thêm nhân viên vào nhóm
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Function Management */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
            <button
              onClick={() => setActiveTab('functions')}
              style={{ paddingBottom: '1rem', borderBottom: `2px solid ${activeTab === 'functions' ? '#2563eb' : 'transparent'}`, background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', fontWeight: 700, fontSize: '0.9rem', color: activeTab === 'functions' ? '#2563eb' : '#64748b', cursor: 'pointer' }}
            >
              Chức năng thuộc quyền
            </button>
            <button
              onClick={() => setActiveTab('history')}
              style={{ paddingBottom: '1rem', borderBottom: `2px solid ${activeTab === 'history' ? '#2563eb' : 'transparent'}`, background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', fontWeight: 700, fontSize: '0.9rem', color: activeTab === 'history' ? '#2563eb' : '#64748b', cursor: 'pointer' }}
            >
              Lịch sử thay đổi
            </button>
          </div>

          {activeTab === 'functions' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {roleFunctions.map(module => (
                <div key={module.module} style={{ border: '1px solid #f1f5f9', borderRadius: '16px', overflow: 'hidden' }}>
                  <div style={{ background: '#f8fafc', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <LayoutGrid size={16} color="#64748b" />
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>Phân hệ: {module.module}</span>
                  </div>
                  <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {module.functions.map(fn => (
                      <div key={fn} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '0.85rem' }}>
                        <CheckCircle2 size={16} color="#10b981" />
                        {fn}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>Chưa có thay đổi nào gần đây.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PermissionDetail;
