import React, { useState } from 'react';
import {
  UserPlus, Search, Pencil, Trash2, MoreHorizontal, ShieldCheck,
  X, Save, User, Mail, Lock, Eye, EyeOff, Shield, Unlock, Key
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../../components/ConfirmationModal';

// --- Add User Modal ---
const AddUserModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    fullname: '', username: '', email: '', phone: '',
    role: '', password: '', confirmPassword: '', status: 'Đang hoạt động'
  });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const roles = ['Quản trị hệ thống', 'Nhân viên Tiếp đón', 'Bác sĩ chuyên khoa', 'Điều dưỡng'];

  const validate = () => {
    const e = {};
    if (!form.fullname.trim()) e.fullname = 'Họ tên không được để trống';
    if (!form.username.trim()) e.username = 'Tên đăng nhập không được để trống';
    else if (!/^[a-z0-9_]+$/.test(form.username)) e.username = 'Chỉ dùng chữ thường, số và dấu _';
    if (!form.email.trim()) e.email = 'Email không được để trống';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email không hợp lệ';
    if (!form.role) e.role = 'Vui lòng chọn vai trò';
    if (!form.password) e.password = 'Mật khẩu không được để trống';
    else if (form.password.length < 6) e.password = 'Mật khẩu tối thiểu 6 ký tự';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Mật khẩu xác nhận không khớp';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onSave(form);
  };

  const inputStyle = (field) => ({ borderColor: errors[field] ? '#ef4444' : '' });
  const set = (field, val) => { setForm({ ...form, [field]: val }); setErrors({ ...errors, [field]: '' }); };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: '20px', width: '620px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #065f46, #059669)', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '8px', borderRadius: '10px' }}>
              <UserPlus size={22} color="#fff" />
            </div>
            <div>
              <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', margin: 0 }}>Thêm người dùng mới</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', margin: 0 }}>Tạo tài khoản và cấp quyền truy cập cho nhân viên</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '8px', padding: '6px', cursor: 'pointer', color: '#fff', display: 'flex' }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Section: Personal Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <div style={{ width: '28px', height: '28px', background: '#ecfdf5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={14} color="#059669" />
              </div>
              <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>Thông tin cá nhân</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Họ và tên <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="text" className="modern-input" placeholder="Nguyễn Văn A" value={form.fullname} onChange={e => set('fullname', e.target.value)} style={inputStyle('fullname')} />
                {errors.fullname && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.fullname}</p>}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Số điện thoại</label>
                <input type="tel" className="modern-input" placeholder="09xx xxx xxx" value={form.phone} onChange={e => set('phone', e.target.value)} />
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                <Mail size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                Email <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input type="email" className="modern-input" placeholder="nhanvien@his.vn" value={form.email} onChange={e => set('email', e.target.value)} style={inputStyle('email')} />
              {errors.email && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.email}</p>}
            </div>
          </div>

          {/* Section: Account */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <div style={{ width: '28px', height: '28px', background: '#eff6ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Lock size={14} color="#2563eb" />
              </div>
              <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>Thông tin tài khoản</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Tên đăng nhập <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="text" className="modern-input" placeholder="vd: nguyen_van_a" value={form.username} onChange={e => set('username', e.target.value.toLowerCase())} style={inputStyle('username')} />
                {errors.username && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.username}</p>}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                  <Shield size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                  Vai trò / Nhóm quyền <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select className="modern-input" value={form.role} onChange={e => set('role', e.target.value)} style={{ ...inputStyle('role'), cursor: 'pointer' }}>
                  <option value="">-- Chọn vai trò --</option>
                  {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                {errors.role && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.role}</p>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Mật khẩu ban đầu <span style={{ color: '#ef4444' }}>*</span></label>
                <div style={{ position: 'relative' }}>
                  <input type={showPass ? 'text' : 'password'} className="modern-input" placeholder="Tối thiểu 6 ký tự" value={form.password} onChange={e => set('password', e.target.value)} style={{ ...inputStyle('password'), paddingRight: '42px' }} />
                  <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.password}</p>}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Xác nhận mật khẩu <span style={{ color: '#ef4444' }}>*</span></label>
                <div style={{ position: 'relative' }}>
                  <input type={showConfirm ? 'text' : 'password'} className="modern-input" placeholder="Nhập lại mật khẩu" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} style={{ ...inputStyle('confirmPassword'), paddingRight: '42px' }} />
                  <button onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}>
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          {/* Status toggle */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Trạng thái tài khoản</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['Đang hoạt động', 'Đã khóa'].map(s => (
                <label key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '10px 16px', borderRadius: '10px', border: `1.5px solid ${form.status === s ? '#059669' : '#e2e8f0'}`, background: form.status === s ? '#ecfdf5' : '#fff', flex: 1, fontWeight: 600, fontSize: '0.85rem', color: form.status === s ? '#059669' : '#64748b' }}>
                  <input type="radio" name="userStatus" checked={form.status === s} onChange={() => setForm({ ...form, status: s })} style={{ display: 'none' }} />
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: `2px solid ${form.status === s ? '#059669' : '#cbd5e1'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {form.status === s && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669' }} />}
                  </div>
                  {s}
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button className="btn" onClick={onClose} style={{ border: '1px solid #e2e8f0', color: '#64748b' }}>Hủy bỏ</button>
            <button className="btn btn-primary" onClick={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #065f46, #059669)', border: 'none' }}>
              <Save size={16} /> Tạo người dùng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Change Password Modal ---
const ChangePasswordModal = ({ onClose, onConfirm }) => {
  const [oldPass, setOldPass] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [showO, setShowO] = useState(false);
  const [showP, setShowP] = useState(false);
  const [showC, setShowC] = useState(false);

  const handleConfirm = () => {
    if (!oldPass) { setError('Vui lòng nhập mật khẩu cũ'); return; }
    if (pass.length < 6) { setError('Mật khẩu tối thiểu 6 ký tự'); return; }
    if (pass !== confirm) { setError('Mật khẩu xác nhận không khớp'); return; }
    onConfirm(pass);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(4px)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: '24px', width: '420px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#eff6ff', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Key size={22} color="#2563eb" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>Đổi mật khẩu</h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Cập nhật lại thông tin bảo mật</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}><X size={20} /></button>
        </div>

        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Mật khẩu cũ <span style={{ color: '#ef4444' }}>*</span></label>
            <div style={{ position: 'relative' }}>
              <input type={showO ? 'text' : 'password'} className="modern-input" placeholder="Nhập lại mật khẩu hiện tại" value={oldPass} onChange={e => { setOldPass(e.target.value); setError(''); }} />
              <button type="button" onClick={() => setShowO(!showO)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}>
                {showO ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={{ borderTop: '1px dashed #e2e8f0', paddingTop: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Mật khẩu mới <span style={{ color: '#ef4444' }}>*</span></label>
            <div style={{ position: 'relative' }}>
              <input type={showP ? 'text' : 'password'} className="modern-input" placeholder="Mật khẩu từ 6 ký tự" value={pass} onChange={e => { setPass(e.target.value); setError(''); }} />
              <button type="button" onClick={() => setShowP(!showP)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}>
                {showP ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Xác nhận mật khẩu mới <span style={{ color: '#ef4444' }}>*</span></label>
            <div style={{ position: 'relative' }}>
              <input type={showC ? 'text' : 'password'} className="modern-input" placeholder="Nhập lại mật khẩu mới" value={confirm} onChange={e => { setConfirm(e.target.value); setError(''); }} />
              <button type="button" onClick={() => setShowC(!showC)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}>
                {showC ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '10px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={14} /> {error}
            </p>}
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '1rem' }}>
            <button className="btn" onClick={onClose} style={{ flex: 1, border: '1px solid #e2e8f0', color: '#64748b' }}>Hủy bỏ</button>
            <button className="btn btn-primary" onClick={handleConfirm} style={{ flex: 1, background: 'linear-gradient(135deg, #1e40af, #2563eb)', border: 'none' }}>Xác nhận đổi</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- UserList Page ---
const UserList = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showChangePassModal, setShowChangePassModal] = useState({ isOpen: false, userId: null });
  const [modalState, setModalState] = useState({ isOpen: false, type: 'delete', targetId: null, title: '', message: '' });

  const [users, setUsers] = useState([
    { id: 'AD001', username: 'admin', fullname: 'Nguyễn Văn Admin', email: 'admin@his.vn', role: 'Quản trị hệ thống', status: 'Đang hoạt động' },
    { id: 'ST001', username: 'reception_ha', fullname: 'Trần Thu Hà', email: 'ha.tt@his.vn', role: 'Nhân viên Tiếp đón', status: 'Đang hoạt động' },
    { id: 'BS001', username: 'doctor_binh', fullname: 'Nguyễn Thị Bình', email: 'binh.nt@his.vn', role: 'Bác sĩ chuyên khoa', status: 'Đang hoạt động' },
    { id: 'ST002', username: 'nurse_linh', fullname: 'Phạm Phương Linh', email: 'linh.pp@his.vn', role: 'Điều dưỡng', status: 'Đã khóa' },
  ]);

  const filteredUsers = users.filter(u =>
    u.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveUser = (form) => {
    const newUser = {
      id: `US${String(users.length + 1).padStart(3, '0')}`,
      username: form.username, fullname: form.fullname,
      email: form.email, role: form.role, status: form.status
    };
    setUsers([...users, newUser]);
    setShowAddModal(false);
  };

  const toggleLock = (user) => {
    const isLocked = user.status === 'Đã khóa';
    setModalState({
      isOpen: true,
      type: isLocked ? 'success' : 'danger',
      targetId: user.id,
      title: isLocked ? 'Mở khóa tài khoản' : 'Khóa tài khoản',
      message: isLocked ? `Bạn có chắc muốn mở khóa cho tài khoản ${user.username}?` : `Bạn có chắc muốn khóa tài khoản ${user.username}? Người dùng này sẽ không thể đăng nhập vào hệ thống.`,
      action: 'toggleLock'
    });
    setShowDropdown(null);
  };

  const confirmAction = () => {
    if (modalState.action === 'toggleLock') {
      setUsers(users.map(u =>
        u.id === modalState.targetId ? { ...u, status: u.status === 'Đã khóa' ? 'Đang hoạt động' : 'Đã khóa' } : u
      ));
    } else if (modalState.type === 'delete') {
      setUsers(users.filter(u => u.id !== modalState.targetId));
    }
    setModalState({ ...modalState, isOpen: false });
  };

  const ActionMenu = ({ user, index }) => (
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
        <div style={{ position: 'absolute', left: 0, top: '100%', marginTop: '6px', width: '220px', background: '#fff', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', zIndex: 100, overflow: 'hidden' }}>
          <button onClick={() => navigate(`/admin/users/detail/${user.id}`)} style={{ width: '100%', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }} className="hover-bg-light">
            <Pencil size={14} color="#64748b" /> Chỉnh sửa thông tin
          </button>

          <button
            style={{ width: '100%', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.85rem' }}
            className="hover-bg"
            onClick={(e) => { e.stopPropagation(); setShowChangePassModal({ isOpen: true, userId: user.id }); setShowDropdown(null); }}
          >
            <Key size={14} color="#64748b" /> Đổi mật khẩu
          </button>

          <button
            style={{ width: '100%', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.85rem' }}
            className="hover-bg"
            onClick={(e) => { e.stopPropagation(); toggleLock(user); }}
          >
            {user.status === 'Đã khóa' ? (
              <><Unlock size={14} color="#059669" /> <span style={{ color: '#059669' }}>Mở khóa tài khoản</span></>
            ) : (
              <><Lock size={14} color="#f59e0b" /> <span style={{ color: '#f59e0b' }}>Khóa tài khoản</span></>
            )}
          </button>

          <div style={{ borderTop: '1px solid #f1f5f9', margin: '4px 0' }}></div>

          <button
            style={{ width: '100%', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.85rem', color: '#ef4444' }}
            className="hover-bg"
            onClick={(e) => { e.stopPropagation(); setModalState({ isOpen: true, type: 'delete', targetId: user.id, title: 'Xác nhận xóa', message: 'Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác.' }); setShowDropdown(null); }}
          >
            <Trash2 size={14} /> Xóa người dùng
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="animate-fade" onClick={() => setShowDropdown(null)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b', marginBottom: '4px' }}>Danh sách người dùng</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Quản lý tài khoản, thông tin cá nhân và vai trò nhân sự</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/admin/users/new')} style={{ display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '12px' }}>
          <UserPlus size={18} /> Thêm người dùng
        </button>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', background: '#fff', display: 'flex', gap: '0.75rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input type="text" className="modern-input" placeholder="Tìm kiếm theo tên hoặc tên đăng nhập"
              style={{ paddingLeft: '44px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#f8fafc' }}
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className="btn btn-primary" style={{ height: '44px', padding: '0 1.5rem', borderRadius: '12px', gap: '8px', fontSize: '0.9rem' }}>
            <Search size={18} /> Tìm kiếm
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '0.8rem', color: '#475569', textTransform: 'uppercase', width: '10%' }}>Hành động</th>
              <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.8rem', color: '#475569', textTransform: 'uppercase', width: '20%' }}>Họ tên</th>
              <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.8rem', color: '#475569', textTransform: 'uppercase' }}>Tên đăng nhập</th>
              <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '0.8rem', color: '#475569', textTransform: 'uppercase', width: '18%' }}>Quyền hạn</th>
              <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '0.8rem', color: '#475569', textTransform: 'uppercase', width: '17%' }}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, idx) => (
              <tr key={user.id} onClick={() => navigate(`/admin/users/detail/${user.id}`)}
                style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s', cursor: 'pointer' }} className="hover-bg-light">
                <td style={{ padding: '8px 16px', textAlign: 'center' }}>
                  <ActionMenu user={user} index={idx} />
                </td>
                <td style={{ padding: '12px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#475569', flexShrink: 0 }}>
                      {user.fullname.charAt(0)}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user.fullname}</div>
                  </div>
                </td>
                <td style={{ padding: '12px 20px' }}>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', background: '#f8fafc', padding: '4px 10px', borderRadius: '8px', display: 'inline-block', fontWeight: 600 }}>@{user.username}</div>
                </td>
                <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 600, color: '#2563eb' }}>
                    <ShieldCheck size={14} /> {user.role}
                  </div>
                </td>
                <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '20px', background: user.status === 'Đang hoạt động' ? '#dcfce7' : '#fee2e2', color: user.status === 'Đang hoạt động' ? '#166534' : '#ef4444', fontSize: '0.75rem', fontWeight: 700 }}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        onConfirm={confirmAction}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />

      {showChangePassModal.isOpen && (
        <ChangePasswordModal
          onClose={() => setShowChangePassModal({ isOpen: false, userId: null })}
          onConfirm={(pass) => {
            console.log('Change password for', showChangePassModal.userId, 'to', pass);
            setShowChangePassModal({ isOpen: false, userId: null });
          }}
        />
      )}
    </div>
  );
};

export default UserList;
