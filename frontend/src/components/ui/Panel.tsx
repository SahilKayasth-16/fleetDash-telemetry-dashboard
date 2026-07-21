import React from 'react';
import styles from './Panel.module.css';

interface PanelProps {
  title?: string;
  metaText?: string;
  glowTitle?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Panel: React.FC<PanelProps> = ({
  title,
  metaText,
  glowTitle = false,
  children,
  className = '',
}) => {
  const panelClasses = `${styles.panel} ${className}`.trim();
  const titleClasses = `${styles.title} ${glowTitle ? styles.titleGlow : ''}`.trim();

  return (
    <div className={panelClasses}>
      {(title || metaText) && (
        <div className={styles.titleBar}>
          {title && <span className={titleClasses}>{title}</span>}
          {metaText && <span className={styles.techMeta}>{metaText}</span>}
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Panel;
