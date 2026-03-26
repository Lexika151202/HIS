import React, { useState } from 'react';
import { 
  Shield, Plus, Search, MoreVertical, Eye, Edit2, Trash2, ChevronDown, Filter 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PermissionList = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(null);

  const permissions = [
    { id: 'ADM001', name: 'Quản trị hệ thống', desc: 'Toàn quyền trên các phân hệ', count: 5, status: 'Hoạt động' },
    { id: 'RCP001', name: 'Nhân viên Tiếp đón', desc: 'Quyền tiếp nhận và đăng ký khám', count: 12, status: 'Hoạt động' },
    { id: 'DOC001', name: 'Bác sĩ chuyên khoa', desc: 'Khám bệnh, chỉ định và kê đơn', count: 25, status: 'Hoạt động' },
    { id: 'NUR001', name: 'Điều dưỡng', desc: 'Theo dõi bệnh án và tiêm chủng', count: 18, status: 'Hoạt động' },
  ];

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
          width: '180px', 
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
            <Trash2 size={14} /> Xóa quyền (Delete)
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="animate-fade">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b', marginBottom: '4px' }}>Quản lý Phân quyền</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Thiết lập và quản lý các nhóm quyền truy cập hệ thống</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '12px' }}>
          <Plus size={18} /> Thêm quyền mới
        </button>
      </div>

      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', background: '#fff', display: 'flex', gap: '0.75rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input 
              type="text" 
              className="modern-input" 
              placeholder="Tìm kiếm theo mã hoặc tên quyền..." 
              style={{ paddingLeft: '44px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#f8fafc' }}
            />
          </div>
          <button className="btn btn-primary" style={{ height: '44px', padding: '0 1.5rem', borderRadius: '12px', gap: '8px', fontSize: '0.9rem' }}>
            <Search size={18} /> Tìm kiếm
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
              <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>Mã quyền</th>
              <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>Tên quyền</th>
              <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>Mô tả</th>
              <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>Số User</th>
              <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>Trạng thái</th>
              <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((p, idx) => (
              <tr 
                key={p.id} 
                style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s', cursor: 'pointer' }} 
                className="hover-bg-light"
                onClick={() => navigate(`/admin/permissions/detail/${p.id}`)}
              >
                <td style={{ padding: '16px 20px', fontWeight: 700, color: '#2563eb' }}>{p.id}</td>
                <td style={{ padding: '16px 20px', fontWeight: 600 }}>{p.name}</td>
                <td style={{ padding: '16px 20px', color: '#64748b', fontSize: '0.85rem' }}>{p.desc}</td>
                <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                  <span style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>{p.count}</span>
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '20px', background: '#dcfce7', color: '#166534', fontSize: '0.75rem', fontWeight: 700 }}>{p.status}</span>
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                  <ActionMenu id={p.id} index={idx} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionList;
