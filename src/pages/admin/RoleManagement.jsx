import React, { useState } from 'react';
import { Shield, User, Search, Settings, Edit, Trash2, Key, CheckSquare } from 'lucide-react';

const RoleManagement = () => {
  const [selectedRole, setSelectedRole] = useState('Bác sĩ Khám bệnh');
  const roles = ['Admin', 'Bác sĩ Khám bệnh', 'Thủ kho Lưu mẫu', 'Nhân viên Tiếp đón', 'Kế toán'];

  const [permissions] = useState([
    { module: 'Tiếp đón HIS', actions: ['Xem', 'Thêm', 'Sửa', 'Xóa', 'In phiếu'] },
    { module: 'Khám bệnh Nội trú', actions: ['Xem', 'Chẩn đoán', 'Kê đơn', 'In hồ sơ'] },
    { module: 'Quản lý Lưu mẫu', actions: ['Xem', 'Đăng ký mới', 'Phê duyệt', 'Vận chuyển', 'Xác nhận hủy'] },
    { module: 'Quản lý Hệ thống', actions: ['Phân quyền', 'Quản lý User', 'Cấu hình lấp đầy'] },
  ]);

  return (
    <div className="animate-fade">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Phân quyền & Tài khoản hệ thống</h1>
          <p className="text-muted">Mã hóa vai trò và giới hạn truy cập chức năng (RBAC)</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline"><User size={18} /> Thêm người dùng</button>
          <button className="btn btn-primary"><Shield size={18} /> Thêm vai trò mới</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.5rem' }}>
        {/* Left: Role List */}
        <div className="card" style={{ padding: '1rem' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Danh sách Vai trò</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {roles.map(role => (
              <button 
                key={role} 
                className={`btn ${selectedRole === role ? 'btn-primary' : 'btn-outline'}`}
                style={{ justifyContent: 'flex-start', width: '100%', fontSize: '0.9rem' }}
                onClick={() => setSelectedRole(role)}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Permission Matrix */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
              <h3>Phân quyền chức năng cho: {selectedRole}</h3>
              <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Lưu thay đổi</button>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: '250px' }}>Phân hệ / Chức năng</th>
                    <th>Quyền thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((p, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 600 }}>{p.module}</td>
                      <td>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem' }}>
                          {p.actions.map((action, aidx) => (
                            <label key={aidx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                              <input type="checkbox" defaultChecked={Math.random() > 0.3} style={{ width: '16px', height: '16px' }} />
                              {action}
                            </label>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User List in Role */}
          <div className="card">
            <h3>Người dùng thuộc nhóm vai trò này</h3>
            <div className="table-container" style={{ marginTop: '1rem' }}>
              <table style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Mã User</th>
                    <th>Họ Tên</th>
                    <th>Email / Tài khoản</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2].map(i => (
                    <tr key={i}>
                      <td>USR100{i}</td>
                      <td>Nguyễn Văn {i === 1 ? 'Admin' : 'Bác Sĩ'}</td>
                      <td>{i === 1 ? 'admin@his.vn' : 'doctor.nam@his.vn'}</td>
                      <td><span className="badge badge-success">Đang hoạt động</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn btn-outline" style={{ padding: '0.4rem' }}><Edit size={14} /></button>
                          <button className="btn btn-outline" style={{ padding: '0.4rem' }}><Key size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;
