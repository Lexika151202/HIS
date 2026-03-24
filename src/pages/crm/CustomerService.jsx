import React, { useState } from 'react';
import { Search, UserCheck, MessageSquare, Phone, Mail, Calendar, Filter, Plus, Edit } from 'lucide-react';

const CustomerService = () => {
  const [customers] = useState([
    { id: 'KH001', name: 'Nguyễn Thị Minh An', phone: '0912345678', email: 'an.minh@gmail.com', status: 'Đang tư vấn', lastInteract: 'Hôm qua' },
    { id: 'KH002', name: 'Trần Văn Bách', phone: '0987654321', email: 'bach.tv@gmail.com', status: 'Chốt hợp đồng', lastInteract: '3 ngày trước' },
    { id: 'KH003', name: 'Lê Thị Diệu Hiền', phone: '0933445566', email: 'hien.ld@gmail.com', status: 'Khách tiềm năng', lastInteract: 'Tuần trước' },
  ]);

  return (
    <div className="animate-fade">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Chăm sóc Khách hàng (CRM)</h1>
          <p className="text-muted">Quản lý quan hệ khách hàng và lịch sử tương tác</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline"><MessageSquare size={18} /> Gửi tin nhắn loạt</button>
          <button className="btn btn-primary"><UserCheck size={18} /> Thêm khách hàng</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <p className="text-muted" style={{ fontSize: '0.85rem' }}>Khách hàng tiềm năng</p>
          <h2 style={{ fontSize: '1.75rem' }}>1,240</h2>
        </div>
        <div className="card">
          <p className="text-muted" style={{ fontSize: '0.85rem' }}>Cuộc gọi hôm nay</p>
          <h2 style={{ fontSize: '1.75rem' }}>45</h2>
        </div>
        <div className="card">
          <p className="text-muted" style={{ fontSize: '0.85rem' }}>Template tin nhắn</p>
          <h2 style={{ fontSize: '1.75rem' }}>12</h2>
        </div>
        <div className="card">
          <p className="text-muted" style={{ fontSize: '0.85rem' }}>Tỉ lệ chuyển đổi</p>
          <h2 style={{ fontSize: '1.75rem' }}>8.4%</h2>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input type="text" placeholder="Tìm theo Tên, SĐT, Email..." className="btn btn-outline" style={{ width: '100%', paddingLeft: '40px', textAlign: 'left' }} />
          </div>
          <button className="btn btn-outline"><Filter size={18} /> Lọc trạng thái</button>
          <button className="btn btn-primary">Tìm kiếm</button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Mã KH</th>
              <th>Họ Tên</th>
              <th>Liên hệ</th>
              <th>Trạng thái chăm sóc</th>
              <th>Lần tương tác cuối</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id}>
                <td><strong>{c.id}</strong></td>
                <td>{c.name}</td>
                <td>
                  <div style={{ fontSize: '0.85rem' }}>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Phone size={12} /> {c.phone}</p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Mail size={12} /> {c.email}</p>
                  </div>
                </td>
                <td><span className={`badge ${c.status === 'Chốt hợp đồng' ? 'badge-success' : c.status === 'Đang tư vấn' ? 'badge-warning' : 'badge-danger'}`}>{c.status}</span></td>
                <td>{c.lastInteract}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-outline" style={{ padding: '0.3rem' }} title="Tạo Interaction"><Calendar size={14} /></button>
                    <button className="btn btn-outline" style={{ padding: '0.3rem' }} title="Hủy"><Edit size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerService;
