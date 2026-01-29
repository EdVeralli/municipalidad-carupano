import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Settings, List, ArrowLeft } from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = () => {
  const menuItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard', end: true },
    { path: '/admin/reglas', icon: <List size={20} />, label: 'Reglas' },
    { path: '/admin/conversaciones', icon: <MessageSquare size={20} />, label: 'Conversaciones' },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Panel Admin</h2>
          <span>Chatbot Municipal</span>
        </div>

        <nav className="admin-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <NavLink to="/" className="admin-nav-item back-link">
            <ArrowLeft size={20} />
            <span>Volver al sitio</span>
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
