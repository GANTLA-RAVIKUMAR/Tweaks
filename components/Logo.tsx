
import React from 'react';
import Icon from './Icon';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2 text-white">
      <Icon name="flutter_dash" className="text-3xl" />
      <span className="text-2xl font-bold">Tweaks</span>
    </div>
  );
};

export default Logo;