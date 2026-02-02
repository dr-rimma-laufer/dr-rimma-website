import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Scissors,
  Stethoscope,
  BookOpen,
  HelpCircle,
  Image,
  MessageSquare,
  Navigation,
  Settings,
  FolderOpen,
  LogOut,
  User,
} from 'lucide-react';
import useAuthStore from '../store/auth';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { name: 'לוח בקרה', path: '/', icon: <LayoutDashboard size={20} /> },
  { name: 'עמודים', path: '/pages', icon: <FileText size={20} /> },
  { name: 'טיפולים', path: '/treatments', icon: <Scissors size={20} /> },
  { name: 'מצבים רפואיים', path: '/conditions', icon: <Stethoscope size={20} /> },
  { name: 'בלוג', path: '/blog', icon: <BookOpen size={20} /> },
  { name: 'שאלות נפוצות', path: '/faq', icon: <HelpCircle size={20} /> },
  { name: 'גלריה', path: '/gallery', icon: <Image size={20} /> },
  { name: 'המלצות', path: '/testimonials', icon: <MessageSquare size={20} /> },
  { name: 'ניווט', path: '/navigation', icon: <Navigation size={20} /> },
  { name: 'מדיה', path: '/media', icon: <FolderOpen size={20} /> },
  { name: 'הגדרות', path: '/settings', icon: <Settings size={20} /> },
];

const Sidebar: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <aside className="w-64 bg-white border-l border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-primary-700">Dr. Rimma</h1>
        <p className="text-sm text-gray-500">ניהול תוכן</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
                end={item.path === '/'}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <User size={20} className="text-primary-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name || 'Admin'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || 'admin@example.com'}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="sidebar-link w-full text-red-600 hover:bg-red-50"
        >
          <LogOut size={20} />
          <span>התנתק</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
