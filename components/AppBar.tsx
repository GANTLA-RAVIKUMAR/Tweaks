
import React, { ReactNode } from 'react';
import Logo from './Logo';

export interface AppBarProps {
  leftActions?: ReactNode;
  rightActions?: ReactNode;
}

const AppBar: React.FC<AppBarProps> = ({ leftActions, rightActions }) => {
  return (
    <header className="grid grid-cols-3 items-center p-4 bg-blue-600 text-white shadow-md sticky top-0 z-10">
      <div className="flex justify-start">{leftActions}</div>
      <div className="flex justify-center">
        <Logo />
      </div>
      <div className="flex justify-end items-center gap-4">{rightActions}</div>
    </header>
  );
};

export default AppBar;