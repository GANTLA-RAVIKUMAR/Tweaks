import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './Icon';

const navItems = [
  { path: '/', icon: 'chat', label: 'Chats' },
  { path: '/status', icon: 'data_usage', label: 'Status' },
  { path: '/calls', icon: 'call', label: 'Calls' },
];

const BottomNav: React.FC = () => {
  const activeLinkStyle = {
    color: '#3b82f6', // blue-500
  };

  return (
    <nav className="flex justify-around items-center bg-slate-50 border-t border-slate-200 py-2">
      {navItems.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          end // 'end' prop ensures only exact path matches are considered active
          style={({ isActive }) => (isActive ? activeLinkStyle : {})}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-blue-500 transition-colors"
        >
          <Icon name={item.icon} />
          <span className="text-xs font-medium">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
