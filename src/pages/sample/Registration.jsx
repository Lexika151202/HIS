import React, { useState } from 'react';
import { PackageOpen, FileText, Calendar, Plus, Search, ShieldCheck, CreditCard } from 'lucide-react';

const SampleRegistration = () => {
  const [contracts] = useState([
    { id: 'CTR001', client: 'Phạm Minh Long', type: 'Máu dây rốn', pack: 'Gói 10 năm', status: 'Còn hạn', date: '12/03/2024' },
    { id: 'CTR002', client: 'Lê Thị Mỹ', type: 'Máu ngoại vi', pack: 'Gói 3 năm', status: 'Sắp hết hạn', date: '10/01/2024' },
    { id: 'CTR003', client: 'Nguyễn Văn Minh', type: 'Dịch vụ', pack: 'Gói 1 năm', status: 'Hết hạn', date: '20/09/2023' },
  ]);

  return (
    <div className="animate-fade">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Đăng ký & Hợp đồng Lưu Mẫu</h1>
          <p className="text-muted">Quản lý vòng đời lưu trữ tế bào gốc và mẫu máu</p>
        </div>
        <button className="btn btn-primary"><PackageOpen size={18} /> Đăng ký mới</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <p className="text-muted">Hợp đồng đang chờ duyệt</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '2rem' }}>14</h2>
            <FileText color="var(--primary)" size={32} />
          </div>
        </div>
        <div className="card">
          <p className="text-muted">Mẫu sắp hết hạn (30 ngày)</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--warning)' }}>08</h2>
            <Calendar color="var(--warning)" size={32} />
          </div>
        </div>
        <div className="card">
          <p className="text-muted">Đã thanh lý / Kết thúc</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '2rem' }}>242</h2>
            <ShieldCheck color="var(--success)" size={32} />
          </div>
        </div>
        <div className="card">
          <p className="text-muted">Doanh thu phí gia hạn</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '2rem' }}>85.4M</h2>
            <CreditCard color="var(--primary)" size={32} />
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input type="text" placeholder="Tìm theo Mã HĐ, Tên KH, Mã Mẫu..." className="btn btn-outline" style={{ width: '100%', paddingLeft: '40px', textAlign: 'left' }} />
          </div>
          <button className="btn btn-outline">Tất cả trạng thái</button>
          <button className="btn btn-outline">Phân loại mẫu</button>
          <button className="btn btn-primary">Tìm kiếm</button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Mã Hợp đồng</th>
              <th>Khách hàng / Bé</th>
              <th>Loại mẫu</th>
              <th>Gói lưu trữ</th>
              <th>Ngày đăng ký</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map(c => (
              <tr key={c.id}>
                <td><strong>{c.id}</strong></td>
                <td>{c.client}</td>
                <td>{c.type}</td>
                <td>{c.pack}</td>
                <td>{c.date}</td>
                <td><span className={`badge ${c.status === 'Còn hạn' ? 'badge-success' : c.status === 'Hợp lệ' ? 'badge-success' : c.status === 'Sắp hết hạn' ? 'badge-warning' : 'badge-danger'}`}>{c.status}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-outline" style={{ padding: '0.4rem', fontSize: '0.85rem' }}>Gia hạn</button>
                    <button className="btn btn-outline" style={{ padding: '0.4rem', fontSize: '0.85rem' }}>Chi tiết</button>
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

export default SampleRegistration;
