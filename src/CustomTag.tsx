import React from 'react';
import { tokens } from '@fluentui/react-components';

interface CustomTagProps {
  avatarName: string;
  text: string;
  containerHeight?: number; // The parent container height
  parentPadding?: number;   // The parent container's vertical padding
  basePadding?: number;     // Base padding for left, top, bottom (right will be 2x this)
  style?: React.CSSProperties;
  avatarStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

export const CustomTag: React.FC<CustomTagProps> = ({ 
  avatarName, 
  text, 
  containerHeight,
  parentPadding = 0,
  basePadding = 8,
  style = {}, 
  avatarStyle = {}, 
  textStyle = {} 
}) => {
  // Generate initials from the name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Calculate tag height based on container height minus parent's vertical padding
  const tagVerticalPadding = basePadding; // top + bottom padding
  const calculatedHeight = containerHeight 
    ? containerHeight - (parentPadding * 2) 
    : undefined;
  
  // Calculate available space for avatar (tag height minus tag's internal padding)
  const avatarSize = calculatedHeight 
    ? Math.max(20, calculatedHeight - (tagVerticalPadding * 2))
    : 24;

  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f3f2f1',
        borderRadius: '4px',
        paddingTop: `${basePadding}px`,
        paddingBottom: `${basePadding}px`,
        paddingLeft: `${basePadding}px`,
        paddingRight: `${basePadding * 4}px`,
        gap: '8px',
        height: calculatedHeight ? `${calculatedHeight}px` : 'auto',
        boxSizing: 'border-box',
        ...style
      }}
    >
      {/* Avatar container */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: tokens.colorNeutralBackground6,
          color: tokens.colorNeutralForeground1,
          borderRadius: '50%',
          fontSize: '12px',
          fontWeight: 'bold',
          width: `${avatarSize}px`,
          height: `${avatarSize}px`,
          flexShrink: 0,
          ...avatarStyle
        }}
      >
        {getInitials(avatarName)}
      </div>
      
      {/* Text */}
      <span 
        style={{
          fontSize: '14px',
          color: '#323130',
          whiteSpace: 'nowrap',
          ...textStyle
        }}
      >
        {text}
      </span>
    </div>
  );
};