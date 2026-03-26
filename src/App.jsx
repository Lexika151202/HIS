import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home, Users, Syringe, Database, Bell, CreditCard, Settings, Layout, Calendar,
  Package, ClipboardList, ArrowLeftRight, Layers, MessageSquare, ShieldCheck, Stethoscope, Plus,
  FileText, Activity
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

// --- Page Imports ---
import Reception from './pages/his/Reception';
import Examination from './pages/his/Examination';
import RegistrationList from './pages/his/RegistrationList';
import Login from './pages/his/Login';

// --- Admin Pages ---
import PermissionList from './pages/his/admin/PermissionList';
import PermissionDetail from './pages/his/admin/PermissionDetail';
import UserList from './pages/his/admin/UserList';
import UserDetail from './pages/his/admin/UserDetail';

// --- Mock Data for Dashboard ---
const patientStats = [
  { name: 'T2', count: 45, samples: 12 },
  { name: 'T3', count: 52, samples: 15 },
  { name: 'T4', count: 38, samples: 8 },
  { name: 'T5', count: 65, samples: 22 },
  { name: 'T6', count: 48, samples: 18 },
  { name: 'T7', count: 72, samples: 25 },
  { name: 'CN', count: 30, samples: 10 },
];

const sampleDistribution = [
  { name: 'Máu dây rốn', value: 400, color: '#f43f5e' },
  { name: 'Dịch vụ', value: 300, color: '#2563eb' },
  { name: 'Máu ngoại vi', value: 200, color: '#10b981' },
  { name: 'Khối bạch cầu', value: 100, color: '#f59e0b' },
];

// --- Sidebar Component ---

const NavLink = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
  
  return (
    <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = ({ role, onLogout }) => {
  return (
    <div className="sidebar" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="logo">
        <Syringe size={32} />
        <span>Trạm Y Tế HIS</span>
      </div>

      <div style={{ flex: 1 }}>
        {role === 'staff' && (
          <>
            <div className="nav-group">
              <p className="nav-label">Chính</p>
              <NavLink to="/" icon={Home} label="Tổng quan" />
            </div>

            <div className="nav-group">
              <p className="nav-label">Quản lý HIS</p>
              <NavLink to="/his/reception" icon={Users} label="Tiếp đón" />
              <NavLink to="/his/registration-list" icon={ClipboardList} label="Danh sách đăng ký" />
              <NavLink to="/his/exam" icon={Stethoscope} label="Khám bệnh ngoại trú" />
            </div>
          </>
        )}

        {role === 'admin' && (
          <>
            <div className="nav-group">
              <p className="nav-label">Phân quyền</p>
              <NavLink to="/admin/permissions" icon={ShieldCheck} label="D.Sách Phân quyền" />
            </div>

            <div className="nav-group">
              <p className="nav-label">Người dùng</p>
              <NavLink to="/admin/users" icon={Users} label="D.Sách Người dùng" />
            </div>
          </>
        )}
      </div>

      <div className="nav-group" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '1rem' }}>
        <button 
          onClick={onLogout}
          style={{ width: '100%', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600 }}
        >
          <ArrowLeftRight size={18} /> Đăng xuất
        </button>
      </div>
    </div>
  );
};

// --- Dashboard Component ---

const Dashboard = () => (
  <div className="animate-fade">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
      <h1>Hệ thống Quản lý Y tế Tổng hợp</h1>
      <div style={{ padding: '0.5rem 1rem', background: '#fff', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '0.85rem' }}>
        <Calendar size={14} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> {new Date().toLocaleDateString('vi-VN')}
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
      <div className="card">
        <p className="text-muted">Bệnh nhân hôm nay</p>
        <h2 style={{ fontSize: '2rem' }}>1,284</h2>
        <p className="badge badge-success" style={{ marginTop: '0.5rem' }}>+12% vs hôm qua</p>
      </div>
      <div className="card">
        <p className="text-muted">Mẫu mới thu thập</p>
        <h2 style={{ fontSize: '2rem' }}>45</h2>
        <p className="badge badge-warning" style={{ marginTop: '0.5rem' }}>Đợi tiếp nhận</p>
      </div>
      <div className="card">
        <p className="text-muted">Tỉ lệ lấp đầy kho</p>
        <h2 style={{ fontSize: '2rem' }}>68%</h2>
        <p className="badge badge-danger" style={{ marginTop: '0.5rem' }}>Gần đầy (Tủ #04)</p>
      </div>
      <div className="card">
        <p className="text-muted">Doanh thu phí dịch vụ</p>
        <h2 style={{ fontSize: '2rem' }}>450.2M</h2>
        <p className="badge badge-success" style={{ marginTop: '0.5rem' }}>+5.4%</p>
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr', gap: '1.5rem' }}>
      <div className="card">
        <h3>Lưu lượng Bệnh nhân & Mẫu (7 ngày qua)</h3>
        <div style={{ height: '350px', marginTop: '1.5rem' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={patientStats}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="var(--primary)" name="Bệnh nhân" radius={[4, 4, 0, 0]} />
              <Bar dataKey="samples" fill="var(--accent)" name="Mẫu máu/Mô" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card">
        <h3>Phân loại Mẫu lưu trữ</h3>
        <div style={{ height: '350px', marginTop: '1.5rem' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sampleDistribution}
                innerRadius={70}
                outerRadius={100}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {sampleDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App ---

function App() {
  const [userRole, setUserRole] = React.useState(null); // null, 'staff' or 'admin'

  const handleLogin = (role) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  if (!userRole) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="app-container" style={{ display: 'flex' }}>
        <Sidebar role={userRole} onLogout={handleLogout} />
        <main className="main-content" style={{ flex: 1, padding: '2rem', background: '#f8fafc', overflowY: 'auto' }}>
          <Routes>
            {/* Common Route */}
            <Route path="/" element={<Dashboard />} />
            
            {/* Staff Routes */}
            {userRole === 'staff' && (
              <>
                <Route path="/his/reception" element={<Reception />} />
                <Route path="/his/registration-list" element={<RegistrationList />} />
                <Route path="/his/exam" element={<Examination />} />
              </>
            )}

            {/* Admin Routes */}
            {userRole === 'admin' && (
              <>
                <Route path="/admin/permissions" element={<PermissionList />} />
                <Route path="/admin/permissions/detail/:id" element={<PermissionDetail />} />
                <Route path="/admin/users" element={<UserList />} />
                <Route path="/admin/users/detail/:id" element={<UserDetail />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
