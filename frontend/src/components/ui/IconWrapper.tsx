import React from 'react';
import styles from './IconWrapper.module.css';

interface IconWrapperProps {
  theme?: 'cyan' | 'purple' | 'blue' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({
  theme = 'cyan',
  size = 'md',
  children,
  className = '',
  style,
}) => {
  const classes = [
    styles.wrapper,
    styles[size],
    styles[theme],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};

export default IconWrapper;
