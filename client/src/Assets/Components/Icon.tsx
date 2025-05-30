import React from 'react';
import { ReactComponent as Bars } from 'Assets/Icons/Bars.svg';
import { ReactComponent as UserIcon } from '../assets/icons/user.svg';
import { ReactComponent as SettingsIcon } from '../assets/icons/settings.svg';

type Props = {
  name: string;
  size?: number;
  className?: string;
};

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  bars: Bars
};

export const Icon = ({ name, size = 20, className = '' }: Props) => {
  const SvgIcon = iconMap[name];
  return <SvgIcon width={size} height={size} className={className} />;
};
