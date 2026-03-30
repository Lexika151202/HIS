import React, { useState } from 'react';
import { LogIn, ShieldCheck, User, Lock, ArrowRight, Syringe } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Mock login logic
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        onLogin('admin');
      } else if (username === 'staff' && password === 'staff') {
        onLogin('staff');
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không chính xác');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div className="animate-fade" style={{
        width: '100%',
        maxWidth: '420px',
        padding: '2rem'
      }}>
        {/* Logo/Brand Area */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            background: '#2563eb',
            color: '#fff',
            padding: '12px',
            borderRadius: '16px',
            marginBottom: '1rem',
            boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.25)'
          }}>
            <Syringe size={32} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Trạm Y Tế HIS</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem' }}>Hệ thống Quản lý Y tế điện tử Thông minh</p>
        </div>

        {/* Login Card */}
        <div style={{
          background: '#fff',
          padding: '2.5rem',
          borderRadius: '24px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
          border: '1px solid rgba(226, 232, 240, 0.8)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginBottom: '1.5rem', textAlign: 'center' }}>Đăng nhập hệ thống</h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-field">
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Tên đăng nhập</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  className="modern-input"
                  placeholder="Nhập username (admin/staff)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ width: '100%', paddingLeft: '40px', height: '48px', border: '1.5px solid #e2e8f0', background: '#f8fafc' }}
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Mật khẩu</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="password"
                  className="modern-input"
                  placeholder="Nhập password (admin/staff)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', paddingLeft: '40px', height: '48px', border: '1.5px solid #e2e8f0', background: '#f8fafc' }}
                  required
                />
              </div>
            </div>

            {error && (
              <div style={{
                color: '#ef4444',
                fontSize: '0.8rem',
                fontWeight: 600,
                textAlign: 'center',
                padding: '8px',
                background: '#fef2f2',
                borderRadius: '8px',
                border: '1px solid #fee2e2'
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className={`btn btn-primary ${loading ? 'opacity-50' : ''}`}
              disabled={loading}
              style={{
                height: '52px',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 700,
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.2s',
                boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
              }}
            >
              {loading ? 'Đang xác thực...' : (
                <>
                  Đăng nhập <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Phiên bản 2.5.0 Build 2026.03.26<br />
              &copy; 2026 MedTech Solutions. All rights reserved.
            </p>
          </div> */}
        </div>

        {/* Demo Hint */}
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <div style={{ fontSize: '0.7rem', color: '#94a3b8', background: '#fff', padding: '4px 10px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>Admin account: admin / admin</div>
          <div style={{ fontSize: '0.7rem', color: '#94a3b8', background: '#fff', padding: '4px 10px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>Staff account: staff / staff</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
