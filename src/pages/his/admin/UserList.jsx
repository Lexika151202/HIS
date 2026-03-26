import React, { useState } from 'react';
import {
  Users, UserPlus, Search, MoreVertical, Eye, Edit2, Trash2, ChevronDown, Filter, ShieldCheck, Mail, Phone, Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    { id: 'AD001', username: 'admin', fullname: 'Nguyễn Văn Admin', email: 'admin@his.vn', role: 'Quản trị hệ thống', status: 'Đang hoạt động', lastActive: '2 phút trước' },
    { id: 'ST001', username: 'reception_ha', fullname: 'Trần Thu Hà', email: 'ha.tt@his.vn', role: 'Nhân viên Tiếp đón', status: 'Đang hoạt động', lastActive: '1 giờ trước' },
    { id: 'BS001', username: 'doctor_binh', fullname: 'Nguyễn Thị Bình', email: 'binh.nt@his.vn', role: 'Bác sĩ chuyên khoa', status: 'Đang hoạt động', lastActive: 'Hôm qua' },
    { id: 'ST002', username: 'nurse_linh', fullname: 'Phạm Phương Linh', email: 'linh.pp@his.vn', role: 'Điều dưỡng', status: 'Đã khóa', lastActive: '3 ngày trước' },
  ];

  const filteredUsers = users.filter(user =>
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ActionMenu = ({ id, index }) => (
    <div style={{ position: 'relative' }}>
      <button
        className="btn"
        onClick={(e) => {
          e.stopPropagation();
          setShowDropdown(showDropdown === index ? null : index);
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '6px 12px',
          background: showDropdown === index ? '#eff6ff' : '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: '#2563eb'
        }}
      >
        Thao tác <ChevronDown size={14} />
      </button>

      {showDropdown === index && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: '110%',
          width: '200px',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          border: '1px solid #e2e8f0',
          zIndex: 100,
          overflow: 'hidden'
        }}>
          <button
            style={{ width: '100%', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.85rem' }}
            className="hover-bg"
          >
            <Edit2 size={14} color="#64748b" /> Chỉnh sửa (Update)
          </button>
          <button
            style={{ width: '100%', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.85rem' }}
            className="hover-bg"
          >
            <Edit2 size={14} color="#64748b" /> Chỉnh sửa (Update)
          </button>
          <button
            style={{ width: '100%', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.85rem', color: '#ef4444' }}
            className="hover-bg"
          >
            <Trash2 size={14} /> Xóa người dùng (Delete)
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="animate-fade">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b', marginBottom: '4px' }}>Quản lý Người dùng</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Quản lý tài khoản, thông tin cá nhân và tài sản nhân sự</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '12px' }}>
          <UserPlus size={18} /> Thêm người dùng
        </button>
      </div>

      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', background: '#fff', display: 'flex', gap: '0.75rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input
              type="text"
              className="modern-input"
              placeholder="Tìm kiếm theo mã, họ tên hoặc tên đăng nhập"
              style={{ paddingLeft: '44px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#f8fafc' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" style={{ height: '44px', padding: '0 1.5rem', borderRadius: '12px', gap: '8px', fontSize: '0.9rem' }}>
            <Search size={18} /> Tìm kiếm
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
              <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>Họ tên & Username</th>
              <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>Liên hệ</th>
              <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>Quyền hạn</th>
              <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>Trạng thái</th>
              <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>Hoạt động cuối</th>
              <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, idx) => (
              <tr
                key={user.id}
                onClick={() => navigate(`/admin/users/detail/${user.id}`)}
                style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s', cursor: 'pointer' }}
                className="hover-bg-light"
              >
                <td style={{ padding: '12px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#475569' }}>
                      {user.fullname.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user.fullname}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', background: '#f8fafc', padding: '2px 6px', borderRadius: '4px', display: 'inline-block' }}>@{user.username}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#64748b', marginBottom: '4px' }}>
                    <Mail size={12} /> {user.email}
                  </div>
                </td>
                <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 600, color: '#2563eb' }}>
                    <ShieldCheck size={14} /> {user.role}
                  </div>
                </td>
                <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '20px',
                    background: user.status === 'Đang hoạt động' ? '#dcfce7' : '#fee2e2',
                    color: user.status === 'Đang hoạt động' ? '#166534' : '#ef4444',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}>
                    {user.status}
                  </span>
                </td>
                <td style={{ padding: '12px 20px', textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>
                  {user.lastActive}
                </td>
                <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                  <ActionMenu id={user.id} index={idx} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
