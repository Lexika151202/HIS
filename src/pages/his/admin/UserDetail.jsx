import React, { useState } from 'react';
import {
  User, ArrowLeft, Mail, Phone, ShieldCheck, Trash2, Save, ChevronRight, Key, Shield, Plus, X, Activity, Pencil, Lock, Tag, IdCard, Unlock, Eye, EyeOff, AlertCircle, Search, Check
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmationModal from '../../../components/ConfirmationModal';

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
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={20} /></button>
        </div>
        
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Mật khẩu cũ <span style={{ color: '#ef4444' }}>*</span></label>
            <div style={{ position: 'relative' }}>
              <input type={showO ? 'text' : 'password'} className="modern-input" placeholder="Nhập lại mật khẩu hiện tại" value={oldPass} onChange={e => { setOldPass(e.target.value); setError(''); }} />
              <button type="button" onClick={() => setShowO(!showO)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                {showO ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={{ borderTop: '1px dashed #e2e8f0', paddingTop: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Mật khẩu mới <span style={{ color: '#ef4444' }}>*</span></label>
            <div style={{ position: 'relative' }}>
              <input type={showP ? 'text' : 'password'} className="modern-input" placeholder="Mật khẩu từ 6 ký tự" value={pass} onChange={e => { setPass(e.target.value); setError(''); }} />
              <button type="button" onClick={() => setShowP(!showP)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                {showP ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Xác nhận mật khẩu mới <span style={{ color: '#ef4444' }}>*</span></label>
            <div style={{ position: 'relative' }}>
              <input type={showC ? 'text' : 'password'} className="modern-input" placeholder="Nhập lại mật khẩu mới" value={confirm} onChange={e => { setConfirm(e.target.value); setError(''); }} />
              <button type="button" onClick={() => setShowC(!showC)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
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

// --- Assign Permission Modal ---
const AssignPermissionModal = ({ currentPermissions, onClose, onAdd }) => {
  const [search, setSearch] = useState('');
  const availableOptions = [
    { code: 'PHA001', name: 'Nhân viên Dược', desc: 'Quản lý kho thuốc và cấp phát' },
    { code: 'LAB001', name: 'Kỹ thuật viên Xét nghiệm', desc: 'Thực hiện và nhập kết quả xét nghiệm' },
    { code: 'ACC001', name: 'Kế toán', desc: 'Quản lý thu chi và hóa đơn' },
    { code: 'REP001', name: 'Báo cáo Thống kê', desc: 'Xem và xuất các báo cáo tổng hợp' },
    { code: 'IMG001', name: 'Chẩn đoán hình ảnh', desc: 'Sử dụng các thiết bị X-Ray, CT, MRI' },
  ].filter(opt => !currentPermissions.some(cp => cp.code === opt.code));

  const filtered = availableOptions.filter(opt => 
    opt.name.toLowerCase().includes(search.toLowerCase()) || 
    opt.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(4px)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: '24px', width: '500px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#eff6ff', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={22} color="#2563eb" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>Gán thêm nhóm quyền</h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Chọn nhóm quyền để gán cho nhân sự</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={20} /></button>
        </div>

        <div style={{ padding: '1.5rem 2rem' }}>
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              className="modern-input" 
              style={{ paddingLeft: '42px' }} 
              placeholder="Tìm kiếm nhóm quyền..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div style={{ maxHeight: '350px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
            {filtered.length > 0 ? filtered.map(opt => (
              <div 
                key={opt.code} 
                onClick={() => onAdd(opt)}
                className="hover-bg"
                style={{ 
                  padding: '1rem', 
                  borderRadius: '16px', 
                  border: '1px solid #f1f5f9', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.9rem' }}>{opt.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>{opt.desc}</div>
                </div>
                <div style={{ background: '#eff6ff', padding: '6px', borderRadius: '8px', color: '#2563eb' }}>
                  <Plus size={16} />
                </div>
              </div>
            )) : (
              <div style={{ padding: '3rem 1rem', textAlign: 'center', color: '#94a3b8' }}>
                <Activity size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
                <p style={{ fontSize: '0.9rem' }}>Không tìm thấy nhóm quyền phù hợp</p>
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: '1.25rem 2rem', borderTop: '1px solid #f1f5f9', background: '#f8fafc', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn" onClick={onClose} style={{ background: '#fff', border: '1px solid #e2e8f0', color: '#64748b' }}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

const UserDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = !id || id === 'new';
  const [isEdit, setIsEdit] = useState(isNew);
  
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showChangePassModal, setShowChangePassModal] = useState(false);
  const [showLockConfirm, setShowLockConfirm] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const [userProfile, setUserProfile] = useState({
    baseCode: 'HIS_HN_01', // System generated
    userCode: isNew ? '' : (id || 'AD001'),
    password: '',
    fullname: isNew ? '' : 'Nguyễn Văn Admin',
    staffType: isNew ? '' : 'Bác sĩ',
    email: isNew ? '' : 'admin@his.vn',
    phone: isNew ? '' : '0987.654.321',
    status: 'Đang hoạt động',
    joinedDate: '2020-01-01'
  });

  const [userPermissions, setUserPermissions] = useState(isNew ? [] : [
    { code: 'ADM001', name: 'Quản trị hệ thống', assignedAt: '01/01/2020', desc: 'Toàn quyền thao tác trên các phân hệ' },
    { code: 'RCP001', name: 'Nhân viên Tiếp đón', assignedAt: '01/01/2020', desc: 'Quyền tiếp nhận và đăng ký khám' },
  ]);

  const set = (field, val) => setUserProfile({ ...userProfile, [field]: val });

  const handleSave = () => {
    setIsEdit(false);
    if (isNew) navigate('/admin/users');
  };

  const handleDelete = () => {
    navigate('/admin/users');
  };

  const toggleLock = () => {
    setUserProfile({ ...userProfile, status: userProfile.status === 'Đã khóa' ? 'Đang hoạt động' : 'Đã khóa' });
    setShowLockConfirm(false);
  };

  const addPermission = (p) => {
    setUserPermissions([...userPermissions, { ...p, assignedAt: new Date().toLocaleDateString() }]);
    setShowAssignModal(false);
  };

  const removePermission = (code) => {
    setUserPermissions(userPermissions.filter(p => p.code !== code));
  };

  return (
    <div className="animate-fade">
      <ConfirmationModal 
        isOpen={showSaveConfirm}
        onClose={() => setShowSaveConfirm(false)}
        onConfirm={handleSave}
        title={isNew ? "Tạo người dùng" : "Lưu thay đổi"}
        message={isNew ? "Bạn có chắc chắn muốn tạo người dùng mới này không?" : "Bạn có chắc chắn muốn lưu các thay đổi này không?"}
        type="success"
        confirmText={isNew ? "Tạo ngay" : "Lưu ngay"}
      />

      <ConfirmationModal 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Xóa người dùng"
        message="Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa người dùng này khỏi hệ thống?"
        type="danger"
        confirmText="Xác nhận xóa"
      />

      <ConfirmationModal 
        isOpen={showLockConfirm}
        onClose={() => setShowLockConfirm(false)}
        onConfirm={toggleLock}
        title={userProfile.status === 'Đã khóa' ? "Mở khóa tài khoản" : "Khóa tài khoản"}
        message={userProfile.status === 'Đã khóa' ? "Bạn có chắc muốn mở khóa cho tài khoản này?" : "Người dùng này sẽ không thể đăng nhập vào hệ thống. Bạn có chắc muốn khóa tài khoản?"}
        type={userProfile.status === 'Đã khóa' ? "success" : "danger"}
      />

      {showChangePassModal && (
        <ChangePasswordModal 
          onClose={() => setShowChangePassModal(false)}
          onConfirm={(p) => {
            console.log('New pass:', p);
            setShowChangePassModal(false);
          }}
        />
      )}

      {showAssignModal && (
        <AssignPermissionModal 
          currentPermissions={userPermissions}
          onClose={() => setShowAssignModal(false)}
          onAdd={addPermission}
        />
      )}

      {/* Header with Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button onClick={() => navigate('/admin/users')} className="btn" style={{ padding: '8px', borderRadius: '12px', background: '#fff', border: '1px solid #e2e8f0', display: 'flex' }}>
            <ArrowLeft size={20} color="#64748b" />
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.85rem', marginBottom: '4px' }}>
              <span>Quản trị Người dùng</span>
              <ChevronRight size={14} />
              <span>{isNew ? 'Thêm người dùng mới' : 'Hồ sơ người dùng'}</span>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
              {isNew ? 'Tạo nhân sự mới' : userProfile.fullname}
            </h1>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {!isNew && !isEdit && (
            <>
              <button 
                className="btn" 
                onClick={() => setShowChangePassModal(true)} 
                style={{ background: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Key size={18} color="#64748b" /> Đổi mật khẩu
              </button>
              <button 
                className="btn" 
                onClick={() => setShowLockConfirm(true)} 
                style={{ 
                  background: userProfile.status === 'Đã khóa' ? '#ecfdf5' : '#fff', 
                  color: userProfile.status === 'Đã khóa' ? '#059669' : '#f59e0b',
                  border: `1px solid ${userProfile.status === 'Đã khóa' ? '#059669' : '#e2e8f0'}`,
                  display: 'flex', alignItems: 'center', gap: '8px' 
                }}
              >
                {userProfile.status === 'Đã khóa' ? <><Unlock size={18} /> Mở khóa</> : <><Lock size={18} /> Khóa tài khoản</>}
              </button>
              <button className="btn" onClick={() => setShowDeleteConfirm(true)} style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fee2e2', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Trash2 size={18} /> Xóa
              </button>
            </>
          )}
          {!isEdit ? (
            <button className="btn" onClick={() => setIsEdit(true)} style={{ background: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Pencil size={18} /> Chỉnh sửa
            </button>
          ) : (
            <>
              <button 
                className="btn btn-outline" 
                onClick={() => isNew ? navigate('/admin/users') : setIsEdit(false)} 
                style={{ background: '#fff', border: '1px solid #e2e8f0', fontWeight: 600 }}
              >
                Hủy
              </button>
              <button className="btn btn-primary" onClick={() => setShowSaveConfirm(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Save size={18} /> {isNew ? 'Tạo tài khoản' : 'Lưu thay đổi'}
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
        {/* Left Column: Personnel Information */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', background: '#eff6ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={24} color="#2563eb" />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>Thông tin nhân sự</h3>
              </div>
              {isEdit && <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 700 }}>* Trường bắt buộc</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-field">
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px', display: 'block' }}>Mã cơ sở</label>
                <div style={{ position: 'relative' }}>
                  <Tag size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input type="text" className="modern-input" style={{ paddingLeft: '36px', background: '#f8fafc' }} value={userProfile.baseCode} disabled />
                </div>
                <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>(Tự động tạo bởi hệ thống)</p>
              </div>

              <div className="form-field">
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px', display: 'block' }}>Mã user <span style={{ color: '#ef4444' }}>*</span></label>
                <div style={{ position: 'relative' }}>
                  <IdCard size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input type="text" className="modern-input" style={{ paddingLeft: '36px', background: (!isNew && isEdit) ? '#f8fafc' : '' }} value={userProfile.userCode} onChange={e => set('userCode', e.target.value)} placeholder="VD: AD001" disabled={!isEdit || !isNew} />
                </div>
              </div>

              <div className="form-field">
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px', display: 'block' }}>Mật khẩu <span style={{ color: '#ef4444' }}>*</span></label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input type="password" title="Nhập mật khẩu" className="modern-input" style={{ paddingLeft: '36px', background: !isNew ? '#f8fafc' : '' }} value={userProfile.password} onChange={e => set('password', e.target.value)} placeholder={isNew ? "Nhập mật khẩu" : "••••••••"} disabled={!isEdit || !isNew} />
                </div>
                {!isNew && isEdit && <p style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '4px' }}>Dùng tính năng "Đổi mật khẩu" ở trên</p>}
              </div>

              <div className="form-field">
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px', display: 'block' }}>Họ tên <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="text" className="modern-input" value={userProfile.fullname} onChange={e => set('fullname', e.target.value)} placeholder="Nguyễn Văn A" disabled={!isEdit} />
              </div>

              <div className="form-field">
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px', display: 'block' }}>Nhân viên</label>
                <select className="modern-input" value={userProfile.staffType} onChange={e => set('staffType', e.target.value)} disabled={!isEdit}>
                  <option value="">-- Chọn nhân viên --</option>
                  <option value="Bác sĩ">Bác sĩ</option>
                  <option value="Điều dưỡng">Điều dưỡng</option>
                  <option value="Dược sĩ">Dược sĩ</option>
                  <option value="Kỹ thuật viên">Kỹ thuật viên</option>
                </select>
              </div>

              <div className="form-field">
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px', display: 'block' }}>Điện thoại</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input type="text" className="modern-input" style={{ paddingLeft: '36px' }} value={userProfile.phone} onChange={e => set('phone', e.target.value)} placeholder="09xx..." disabled={!isEdit} />
                </div>
              </div>

              <div className="form-field" style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px', display: 'block' }}>Email</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input type="email" className="modern-input" style={{ paddingLeft: '36px' }} value={userProfile.email} onChange={e => set('email', e.target.value)} placeholder="email@his.vn" disabled={!isEdit} />
                </div>
              </div>

              <div className="form-field">
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px', display: 'block' }}>Trạng thái</label>
                <span style={{ 
                  display: 'inline-block', 
                  padding: '6px 14px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  fontWeight: 800,
                  background: userProfile.status === 'Đang hoạt động' ? '#dcfce7' : '#fee2e2',
                  color: userProfile.status === 'Đang hoạt động' ? '#166534' : '#ef4444'
                }}>
                  {userProfile.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Permissions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Shield size={20} color="#2563eb" />
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>Nhóm quyền truy cập</h3>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {userPermissions.map(perm => (
                <div key={perm.code} style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ background: '#fff', padding: '8px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <Shield size={18} color="#2563eb" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.9rem' }}>{perm.name}</div>
                      <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '2px' }}>Mã: {perm.code}</div>
                    </div>
                  </div>
                  {isEdit && <button onClick={() => removePermission(perm.code)} style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>}
                </div>
              ))}

              {isEdit && (
                <button 
                  className="btn" 
                  onClick={() => setShowAssignModal(true)}
                  style={{ width: '100%', marginTop: '0.5rem', border: '1.5px dashed #2563eb', color: '#2563eb', background: '#eff6ff', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', fontWeight: 700 }}
                >
                  <Plus size={18} /> Gán thêm nhóm quyền
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
