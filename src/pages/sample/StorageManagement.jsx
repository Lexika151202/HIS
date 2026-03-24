import React from 'react';
import { Layers, Thermometer, ShieldAlert, Navigation, Settings, Layout, Search, Box } from 'lucide-react';

const StorageManagement = () => {
  const [tanks] = React.useState([
    { id: 1, name: 'Bình Ni-tơ 01', temp: -196.2, capacity: 5000, filled: 4230, status: 'Ổn định', level: 'Kho A (Tầng 2)' },
    { id: 2, name: 'Bình Ni-tơ 02', temp: -195.8, capacity: 5000, filled: 1200, status: 'Ổn định', level: 'Kho A (Tầng 2)' },
    { id: 3, name: 'Tủ Âm Sâu 03', temp: -80.5, capacity: 2000, filled: 1980, status: 'Cảnh báo lấp đầy', level: 'Phòng Lab 01' },
    { id: 4, name: 'Tủ Âm Sâu 04', temp: -79.2, capacity: 2000, filled: 1500, status: 'Ổn định', level: 'Phòng Lab 01' },
  ]);

  return (
    <div className="animate-fade">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Quản lý Hệ thống Lưu trữ</h1>
          <p className="text-muted">Quản lý sơ đồ 2D tủ lưu và giám sát điều kiện bảo quản mẫu</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline"><Settings size={18} /> Cấu hình tủ</button>
          <button className="btn btn-primary"><Box size={18} /> Quản lý xuất/nhập kho</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {tanks.map(t => (
          <div className="card" key={t.id} style={{ borderLeft: `4px solid ${t.temp < -100 ? 'var(--primary)' : 'var(--warning)'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{t.name}</h4>
                <p className="text-muted" style={{ fontSize: '0.8rem' }}>{t.level}</p>
              </div>
              <span className={`badge ${t.status === 'Ổn định' ? 'badge-success' : 'badge-warning'}`}>{t.status === 'Ổn định' ? 'Safe' : 'Full'}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ background: 'var(--bg-main)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center' }}>
                <Thermometer size={14} color="var(--primary)" />
                <p style={{ fontSize: '0.75rem', fontWeight: 600 }}>{t.temp}°C</p>
              </div>
              <div style={{ background: 'var(--bg-main)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center' }}>
                <Layers size={14} color="var(--primary)" />
                <p style={{ fontSize: '0.75rem', fontWeight: 600 }}>{Math.round((t.filled / t.capacity) * 100)}%</p>
              </div>
            </div>
            <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ 
                width: `${(t.filled / t.capacity) * 100}%`, 
                height: '100%', 
                background: (t.filled / t.capacity) > 0.9 ? 'var(--danger)' : 'var(--primary)',
                transition: 'width 0.5s ease'
              }} />
            </div>
            <p style={{ fontSize: '0.75rem', marginTop: '0.3rem', color: 'var(--text-muted)', textAlign: 'right' }}>
              {t.filled} / {t.capacity} positions
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Tank Grid View */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>Chi tiết Bình Ni-tơ 01 (Sơ đồ 2D)</h3>
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <div style={{ width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '2px' }} /> Đã dùng
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <div style={{ width: '12px', height: '12px', background: '#fff', border: '1px solid var(--border)', borderRadius: '2px' }} /> Trống
              </div>
            </div>
          </div>
          
          {/* Virtual Grid based on "tủ > ngăn > khay > hộp > vị trí" from WBS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {[1, 2].map(shelf => (
              <div key={shelf}>
                <h4 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.8rem', textTransform: 'uppercase' }}>Ngăn #{shelf}</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem' }}>
                  {[1, 2, 3, 4, 5].map(box => (
                    <div key={box} style={{ background: '#f1f5f9', padding: '10px', borderRadius: '8px' }}>
                      <p style={{ fontSize: '0.7rem', fontWeight: 600, textAlign: 'center', marginBottom: '5px' }}>Hộp {box}</p>
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(4, 1fr)', 
                        gap: '3px'
                      }}>
                        {Array.from({length: 16}).map((_, idx) => {
                          const status = Math.random() > 0.4;
                          return (
                            <div key={idx} 
                              style={{ 
                                aspectRatio: '1/1', 
                                background: status ? 'var(--primary)' : '#fff',
                                borderRadius: '2px',
                                border: '1px solid #cbd5e1',
                                cursor: 'pointer'
                              }}
                              title={status ? 'Mẫu: HS20240' + (shelf*100 + box*10 + idx) : 'Trống'}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h3>Tìm nhanh vị trí</h3>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <input type="text" placeholder="Nhập Mã Mẫu..." className="btn btn-outline" style={{ flex: 1, padding: '0.5rem', textAlign: 'left' }} />
              <button className="btn btn-primary" style={{ padding: '0.5rem' }}><Search size={16} /></button>
            </div>
          </div>
          <div className="card" style={{ background: 'var(--text-main)', color: '#fff' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldAlert size={18} color="var(--warning)" /> Cảnh báo quan trọng</h4>
            <div style={{ marginTop: '1rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p>• Hộp lưu trữ <strong>#04 (Bình 03)</strong> vượt ngưỡng 90% lấp đầy.</p>
              <p>• <strong>3 mẫu</strong> tại Bình 02 đã quá hạn gia hạn hợp đồng (CTR084, CTR122...).</p>
              <p style={{ marginTop: '1rem' }}><button className="btn btn-outline" style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.3)', width: '100%' }}>Xem danh sách ưu tiên</button></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageManagement;
