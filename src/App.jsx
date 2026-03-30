import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import {
  Users, Syringe, ClipboardList, ArrowLeftRight, ShieldCheck, Stethoscope, Plus,
  FileText, Activity, Settings, Pencil, Trash2, Calendar, ChevronRight, ChevronDown, Save, RotateCcw, Printer
} from 'lucide-react';

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

// --- Components ---

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
          <div className="nav-group">
            <NavLink to="/his/reception" icon={Users} label="Tiếp đón" />
            <NavLink to="/his/registration-list" icon={ClipboardList} label="Danh sách đăng ký" />
            <NavLink to="/his/exam" icon={Stethoscope} label="Khám bệnh ngoại trú" />
          </div>
        )}

        {role === 'admin' && (
          <>
            <NavLink to="/admin/permissions" icon={ShieldCheck} label="Phân quyền" />
            <NavLink to="/admin/users" icon={Users} label="Người dùng" />
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
            <Route path="/" element={<Navigate to={userRole === 'admin' ? '/admin/permissions' : '/his/reception'} replace />} />

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
          <Route path="/admin/permissions/new" element={<PermissionDetail />} />
          <Route path="/admin/permissions/detail/:id" element={<PermissionDetail />} />
          
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/users/new" element={<UserDetail />} />
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
