import React, { useState } from 'react';
import {
  Shield, Plus, Search, Pencil, Trash2, MoreHorizontal, X, Save, ShieldCheck, ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../../components/ConfirmationModal';

// --- Add Permission Modal ---
const AddPermissionModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({ code: '', name: '', description: '', status: 'Hoạt động' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.code.trim()) e.code = 'Mã quyền không được để trống';
    if (!form.name.trim()) e.name = 'Tên quyền không được để trống';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onSave(form);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: '20px', width: '560px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden' }}
        onClick={e => e.stopPropagation()}>

        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#eff6ff', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={22} color="#2563eb" />
            </div>
            <div>
              <h2 style={{ color: '#1e293b', fontWeight: 800, fontSize: '1.1rem', margin: 0 }}>Thêm nhóm quyền mới</h2>
              <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>Thiết lập thông tin cơ bản cho nhóm quyền</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Code + Name row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                Mã quyền hệ thống <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                className="modern-input"
                placeholder="VD: DOC002"
                value={form.code}
                onChange={e => { setForm({ ...form, code: e.target.value.toUpperCase() }); setErrors({ ...errors, code: '' }); }}
                style={{ borderColor: errors.code ? '#ef4444' : '' }}
              />
              {errors.code && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.code}</p>}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                Tên nhóm quyền <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                className="modern-input"
                placeholder="VD: Bác sĩ nội khoa"
                value={form.name}
                onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                style={{ borderColor: errors.name ? '#ef4444' : '' }}
              />
              {errors.name && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.name}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Mô tả chi tiết</label>
            <textarea
              className="modern-input"
              placeholder="Mô tả phạm vi và mục đích sử dụng của nhóm quyền này..."
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              style={{ minHeight: '90px', resize: 'none' }}
            />
          </div>

          {/* Status */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Trạng thái</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['Hoạt động', 'Tạm khóa'].map(s => (
                <label key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '10px 16px', borderRadius: '10px', border: `1.5px solid ${form.status === s ? '#2563eb' : '#e2e8f0'}`, background: form.status === s ? '#eff6ff' : '#fff', flex: 1, fontWeight: 600, fontSize: '0.85rem', color: form.status === s ? '#2563eb' : '#64748b' }}>
                  <input type="radio" name="status" checked={form.status === s} onChange={() => setForm({ ...form, status: s })} style={{ display: 'none' }} />
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: `2px solid ${form.status === s ? '#2563eb' : '#cbd5e1'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {form.status === s && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb' }} />}
                  </div>
                  {s}
                </label>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button className="btn" onClick={onClose} style={{ border: '1px solid #e2e8f0', color: '#64748b' }}>Hủy bỏ</button>
            <button className="btn btn-primary" onClick={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Save size={16} /> Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PermissionList = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, type: 'delete', targetId: null });

  const [permissions, setPermissions] = useState([
    { id: 'ADM001', name: 'Quản trị hệ thống', desc: 'Toàn quyền trên các phân hệ', count: 5, status: 'Hoạt động' },
    { id: 'RCP001', name: 'Nhân viên Tiếp đón', desc: 'Quyền tiếp nhận và đăng ký khám', count: 12, status: 'Hoạt động' },
    { id: 'DOC001', name: 'Bác sĩ chuyên khoa', desc: 'Khám bệnh, chỉ định và kê đơn', count: 25, status: 'Hoạt động' },
    { id: 'NUR001', name: 'Điều dưỡng', desc: 'Theo dõi bệnh án và tiêm chủng', count: 18, status: 'Hoạt động' },
  ]);

  const handleSavePermission = (form) => {
    const newPerm = { id: form.code, name: form.name, desc: form.description, count: 0, status: form.status };
    setPermissions([...permissions, newPerm]);
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    setModalState({ isOpen: true, type: 'delete', targetId: id });
    setShowDropdown(null);
  };

  const confirmDelete = () => {
    setPermissions(permissions.filter(p => p.id !== modalState.targetId));
    setModalState({ ...modalState, isOpen: false });
  };

  const ActionMenu = ({ id, index }) => (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <button onClick={(e) => { e.stopPropagation(); setShowDropdown(showDropdown === index ? null : index); }}
        style={{ 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          width: '25px', height: '25px', 
          background: showDropdown === index ? '#eff6ff' : '#fff', 
          border: '1px solid #e2e8f0', borderRadius: '50%', 
          color: '#64748b', transition: 'all 0.2s', 
          cursor: 'pointer', padding: 0, outline: 'none'
        }}>
        <MoreHorizontal size={14} strokeWidth={2.5} />
      </button>
      {showDropdown === index && (
        <div style={{ position: 'absolute', left: 0, top: '110%', width: '180px', background: '#fff', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', zIndex: 100, overflow: 'hidden' }}>
          <button style={{ width: '100%', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }} className="hover-bg-light">
            <Pencil size={14} color="#64748b" /> Chỉnh sửa
          </button>
          <button
            style={{ width: '100%', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.85rem', color: '#ef4444' }}
            className="hover-bg"
            onClick={(e) => { e.stopPropagation(); handleDelete(id); }}
          >
            <Trash2 size={14} /> Xóa
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="animate-fade" onClick={() => setShowDropdown(null)}>
      {showAddModal && <AddPermissionModal onClose={() => setShowAddModal(false)} onSave={handleSavePermission} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b', marginBottom: '4px' }}>Danh sách phân quyền</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Thiết lập và quản lý các nhóm quyền truy cập hệ thống</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/admin/permissions/new')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '12px' }}
        >
          <Shield size={18} /> Thêm quyền mới
        </button>
      </div>

      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', background: '#fff', display: 'flex', gap: '0.75rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input type="text" className="modern-input" placeholder="Tìm kiếm theo mã hoặc tên quyền..." style={{ paddingLeft: '44px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#f8fafc' }} />
          </div>
          <button className="btn btn-primary" style={{ height: '44px', padding: '0 1.5rem', borderRadius: '12px', gap: '8px', fontSize: '0.9rem' }}>
            <Search size={18} /> Tìm kiếm
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', width: '12%' }}>Hành động</th>
              <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', width: '20%' }}>Mã quyền</th>
              <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>Tên quyền</th>
              <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', width: '15%' }}>Số User</th>
              <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', width: '18%' }}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((p, idx) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s', cursor: 'pointer' }} className="hover-bg-light" onClick={() => navigate(`/admin/permissions/detail/${p.id}`)}>
                <td style={{ padding: '8px 16px', textAlign: 'center' }}>
                  <ActionMenu id={p.id} index={idx} />
                </td>
                <td style={{ padding: '16px 20px', fontWeight: 700, color: '#2563eb' }}>{p.id}</td>
                <td style={{ padding: '16px 20px', fontWeight: 600 }}>{p.name}</td>
                <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                  <span style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>{p.count}</span>
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '20px', background: p.status === 'Hoạt động' ? '#dcfce7' : '#fee2e2', color: p.status === 'Hoạt động' ? '#166534' : '#ef4444', fontSize: '0.75rem', fontWeight: 700 }}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        onConfirm={confirmDelete}
        title="Xác nhận xóa"
        message="Bạn có chắc chắn muốn xóa nhóm quyền này? Hành động này không thể hoàn tác."
        type="danger"
      />
    </div>
  );
};

export default PermissionList;

