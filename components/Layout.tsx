import React, { ReactNode } from 'react';
import AppBar, { AppBarProps } from './AppBar';
import BottomNav from './BottomNav';

interface LayoutProps extends AppBarProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, leftActions, rightActions }) => {
  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-white shadow-2xl">
      <AppBar leftActions={leftActions} rightActions={rightActions} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
