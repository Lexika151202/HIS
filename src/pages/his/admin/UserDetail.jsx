import React, { useState } from 'react';
import {
  User, ArrowLeft, Mail, Phone, MapPin, Calendar, ShieldCheck, CheckCircle2, MoreVertical, Trash2, Edit2, Save, ChevronRight, Key, Shield
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const UserDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('permissions');

  // Sample data for user details (2.2.1)
  const userProfile = {
    id: id || 'AD001',
    username: 'admin',
    fullname: 'Nguyễn Văn Admin',
    email: 'admin@his.vn',
    phone: '0987.654.321',
    address: 'Số 10, Yên Hòa, Cầu Giấy, Hà Nội',
    dob: '10/11/1985',
    dept: 'Ban Giám Đốc',
    status: 'Đang hoạt động',
    joinedDate: '01/01/2020'
  };

  // Sample data for permissions assigned to user (2.2.2)
  const userPermissions = [
    { code: 'ADM001', name: 'Quản trị hệ thống', assignedAt: '01/01/2020', desc: 'Toàn quyền thao tác trên các phân hệ' },
    { code: 'RCP001', name: 'Nhân viên Tiếp đón', assignedAt: '01/01/2020', desc: 'Quyền tiếp nhận và đăng ký khám' },
  ];

  return (
    <div className="animate-fade">
      {/* Header with Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button
            onClick={() => navigate('/admin/users')}
            className="btn"
            style={{ padding: '8px', borderRadius: '12px', background: '#fff', border: '1px solid #e2e8f0', display: 'flex' }}
          >
            <ArrowLeft size={20} color="#64748b" />
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.85rem', marginBottom: '4px' }}>
              <span>Quản trị Người dùng</span>
              <ChevronRight size={14} />
              <span>Hồ sơ chi tiết</span>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>{userProfile.fullname}</h1>
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Left Column: Profile Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{
              width: '100px',
              height: '100px',
              background: '#2563eb',
              color: '#fff',
              borderRadius: '50%',
              fontSize: '2.5rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              {userProfile.fullname.charAt(0)}
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', marginBottom: '4px' }}>{userProfile.fullname}</h2>
            <p style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.9rem', marginBottom: '1rem' }}>@{userProfile.username}</p>
            <span style={{ padding: '4px 12px', background: '#dcfce7', color: '#166534', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>{userProfile.status}</span>

            <div style={{ marginTop: '2rem', borderTop: '1px solid #f1f5f9', paddingTop: '2rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem' }}>
                <Mail size={16} color="#64748b" /> <span style={{ color: '#1e293b', fontWeight: 600 }}>{userProfile.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem' }}>
                <Phone size={16} color="#64748b" /> <span style={{ color: '#1e293b', fontWeight: 600 }}>{userProfile.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem' }}>
                <MapPin size={16} color="#64748b" /> <span style={{ color: '#1e293b', fontWeight: 600 }}>{userProfile.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem' }}>
                <Calendar size={16} color="#64748b" /> <span style={{ color: '#1e293b', fontWeight: 600 }}>{userProfile.dob}</span>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <ShieldCheck size={24} color="#2563eb" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b' }}>Hành động bảo mật</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button className="btn" style={{ width: '100%', background: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <Key size={16} /> Đổi mật khẩu
              </button>
              <button className="btn" style={{ width: '100%', background: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#ef4444' }}>
                <Trash2 size={16} /> Khóa tài khoản
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
              <button
                onClick={() => setActiveTab('permissions')}
                style={{ paddingBottom: '1rem', borderBottom: `2px solid ${activeTab === 'permissions' ? '#2563eb' : 'transparent'}`, background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', fontWeight: 700, fontSize: '0.9rem', color: activeTab === 'permissions' ? '#2563eb' : '#64748b', cursor: 'pointer' }}
              >
                Danh sách quyền
              </button>
              <button
                onClick={() => setActiveTab('info')}
                style={{ paddingBottom: '1rem', borderBottom: `2px solid ${activeTab === 'info' ? '#2563eb' : 'transparent'}`, background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', fontWeight: 700, fontSize: '0.9rem', color: activeTab === 'info' ? '#2563eb' : '#64748b', cursor: 'pointer' }}
              >
                Thông tin bổ sung
              </button>
            </div>

            {activeTab === 'permissions' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {userPermissions.map(perm => (
                  <div key={perm.code} style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                      <div style={{ background: '#fff', padding: '10px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <Shield size={20} color="#2563eb" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '1rem' }}>{perm.name}</div>
                        <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '4px' }}>{perm.desc}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Ngày gán</div>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{perm.assignedAt}</div>
                    </div>
                  </div>
                ))}
                <button
                  className="btn"
                  style={{ width: '100%', marginTop: '1rem', border: '1.5px dashed #2563eb', color: '#2563eb', background: '#eff6ff', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}
                >
                  <Plus size={18} /> Gán thêm quyền mới
                </button>
              </div>
            ) : (
              <div style={{ padding: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '6px', display: 'block' }}>Phòng khoa / Bộ phận</label>
                  <div style={{ fontWeight: 700 }}>{userProfile.dept}</div>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '6px', display: 'block' }}>Ngày tham gia</label>
                  <div style={{ fontWeight: 700 }}>{userProfile.joinedDate}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper components missing in snippet for clarity
const Plus = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default UserDetail;
