import React, { useState } from 'react';
import {
  FluentProvider,
  webLightTheme,
  Slider,
  Button,
  TabList,
  Tab,
  Field,
  Body1Stronger,
  Body2,
  Tooltip,
  Tag,
  Avatar,
  tokens
} from '@fluentui/react-components';
import './App.css';

// BorderRadiusController class for managing border radius calculations
class BorderRadiusController {
  // Instance properties
  public radius: number;
  public padding: number;
  public childPadding: number;
  public outerPadding: number;
  public size: number;

  // Design system tokens (official Fluent spacing values)
  private static spacingTokens = [
    { name: 'spacingNone', value: '0px' },
    { name: 'spacingXXS', value: '2px' },
    { name: 'spacingXS', value: '4px' },
    { name: 'spacingSNudge', value: '6px' },
    { name: 'spacingS', value: '8px' },
    { name: 'spacingMNudge', value: '10px' },
    { name: 'spacingM', value: '12px' },
    { name: 'spacingL', value: '16px' },
    { name: 'spacingXL', value: '20px' },
    { name: 'spacingXXL', value: '24px' },
    { name: 'spacingXXXL', value: '32px' }
  ];

  // Custom brand scale (purple gradient)
  private static brandScaleTokens = [
    { name: 'brand100', value: '#0e0035' },
    { name: 'brand200', value: '#190050' },
    { name: 'brand300', value: '#25006b' },
    { name: 'brand400', value: '#320088' },
    { name: 'brand500', value: '#3f00a6' },
    { name: 'brand600', value: '#4b00c0' },
    { name: 'brand700', value: '#571bd1' },
    { name: 'brand800', value: '#6333e3' },
    { name: 'brand900', value: '#7149f7' },
    { name: 'brand1000', value: '#805dff' },
    { name: 'brand1100', value: '#8f79ff' },
    { name: 'brand1200', value: '#9f92ff' },
    { name: 'brand1300', value: '#b1a9ff' },
    { name: 'brand1400', value: '#c4c0ff' },
    { name: 'brand1500', value: '#d7d5ff' },
    { name: 'brand1600', value: '#ebebff' }
  ];

  // Border radius tokens (including circular)
  private static borderRadiusTokens = [
    { name: 'radiusNone', value: '0px' },
    { name: 'radiusSmall', value: '2px' },
    { name: 'radiusMedium', value: '4px' },
    { name: 'radiusLarge', value: '6px' },
    { name: 'radiusXLarge', value: '8px' },
    { name: 'custom', value: '10px' },
    { name: 'custom', value: '12px' },
    { name: 'custom', value: '16px' },
    { name: 'custom', value: '20px' },
    { name: 'custom', value: '24px' },
    { name: 'custom', value: '28px' },
    { name: 'custom', value: '32px' },
    { name: 'custom', value: '36px' },
    { name: 'custom', value: '40px' },
    { name: 'radiusCircular', value: '9999px' }
  ];

  constructor(radius: number, padding: number, childPadding: number = 6, outerPadding: number = 12, size: number = 40) {
    this.radius = radius;
    this.padding = padding;
    this.childPadding = childPadding;
    this.outerPadding = outerPadding;
    this.size = size;
  }

  setRadius(radius: number) {
    this.radius = radius;
  }

  setPadding(padding: number) {
    this.padding = padding;
  }

  setChildPadding(childPadding: number) {
    this.childPadding = childPadding;
  }

  setOuterPadding(outerPadding: number) {
    this.outerPadding = outerPadding;
  }

  setSize(size: number) {
    this.size = size;
  }

  static getSpacingTokens() {
    return this.spacingTokens;
  }

  static getBorderRadiusTokens() {
    return this.borderRadiusTokens;
  }

  static getBrandScaleTokens() {
    return this.brandScaleTokens;
  }

  // Instance method for calculating inner radius using current radius and padding
  calculateInnerRadius(): number {
    // Handle circular border radius (special case)
    if (this.radius >= 9999) {
      return 9999;
    }
    
    // Apply formula: child_radius = max(0, parent_radius - parent_padding)
    return Math.max(0, this.radius - this.padding);
  }

  // Calculate the inner container radius (grandchild)
  calculateInnerContainerRadius(): number {
    const childRadius = this.calculateInnerRadius();
    // Handle circular border radius (special case)
    if (childRadius >= 9999) {
      return 9999;
    }
    
    // Apply formula: inner_radius = max(0, child_radius - child_padding)
    return Math.max(0, childRadius - this.childPadding);
  }

  // Calculate the outer container radius (level 4)
  calculateOuterRadius(): number {
    // Handle circular border radius (special case)
    if (this.radius >= 9999) {
      return 9999;
    }
    
    // Apply formula: outer_radius = parent_radius + outer_padding
    return this.radius + this.outerPadding;
  }

  // Style generators using instance properties
  getTagStyle(): React.CSSProperties {
    const calculatedRadius = this.calculateInnerRadius();
    
    return {
      borderRadius: `${calculatedRadius}px`,
      padding: `${this.childPadding}px`,
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      fontSize: 'inherit',
      lineHeight: '1.2',
      flexShrink: 0,
      backgroundColor: '#b1a9ff', // brand1300 from custom brand scale
      boxSizing: 'border-box'
    };
  }

  getInputContainerStyle(): React.CSSProperties {
    return {
      borderRadius: `${this.radius}px`,
      padding: `${this.padding}px`,
      backgroundColor: '#d7d5ff', // brand1500 from custom brand scale
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      alignItems: 'stretch',
      height: `${this.size}px`,
      width: '100%',
      boxSizing: 'border-box'
    };
  }

  getButtonStyle(): React.CSSProperties {
    // Button reflects Level 3 primitive settings:
    // - radius: Level 3 border radius
    // - padding: Level 3 padding for vertical spacing
    // - size: Level 3 size for button height
    return {
      borderRadius: `${this.radius}px`,
      paddingTop: `${this.padding}px`,
      paddingBottom: `${this.padding}px`,
      paddingLeft: `${this.padding * 2}px`, // Keep horizontal padding proportional
      paddingRight: `${this.padding * 2}px`,
      height: `${this.size}px`,
      minHeight: `${this.size}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '16px',
      backgroundColor: '#6333e3' // brand800 from custom brand scale
    };
  }

  getInputStyle(): React.CSSProperties {
    // Input field inside container uses radius minus container padding
    const calculatedRadius = this.calculateInnerRadius();
    const inputPadding = 8; // Fixed input field padding
    
    return {
      border: 'none',
      outline: 'none',
      flex: 1,
      minWidth: '120px',
      borderRadius: `${calculatedRadius}px`,
      padding: `${inputPadding}px` // Fixed padding for input field
    };
  }

  getInnerContainerStyle(): React.CSSProperties {
    // Inner container uses the child's calculated radius and spacing
    const childRadius = this.calculateInnerRadius();
    const innerRadius = Math.max(0, childRadius - this.childPadding);
    
    return {
      borderRadius: `${innerRadius}px`,
      padding: `${this.childPadding}px`,
      backgroundColor: '#8f79ff', // brand1100 from custom brand scale
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box'
    };
  }

  getOuterContainerStyle(): React.CSSProperties {
    // Outer container uses its own calculated radius and spacing
    const outerRadius = this.calculateOuterRadius();
    
    return {
      borderRadius: `${outerRadius}px`,
      padding: `${this.outerPadding}px`,
      backgroundColor: '#ebebff', // brand1600 from custom brand scale
      width: '100%',
      height: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box'
    };
  }
}

const App: React.FC = () => {
  // State management
  const [borderRadiusIndex, setBorderRadiusIndex] = useState(6); // Start with 12px (custom radius)
  const [paddingIndex, setPaddingIndex] = useState(2); // Start with spacingXS (4px)
  const [childPaddingIndex, setChildPaddingIndex] = useState(1); // Start with spacingXXS (2px) for child
  const [outerPaddingIndex, setOuterPaddingIndex] = useState(8); // Start with spacingXL (20px) for outer
  const [size, setSize] = useState(48); // Default size of 48px
  const [zoomLevel, setZoomLevel] = useState(200);
  const [activeTab, setActiveTab] = useState('primitives');

  const spacingTokens = BorderRadiusController.getSpacingTokens();
  const borderRadiusTokens = BorderRadiusController.getBorderRadiusTokens();

  // Get current values for the controller
  const currentBorderRadius = parseFloat(borderRadiusTokens[borderRadiusIndex].value);
  const currentPadding = parseFloat(spacingTokens[paddingIndex].value);
  const currentChildPadding = parseFloat(spacingTokens[childPaddingIndex].value);
  const currentOuterPadding = parseFloat(spacingTokens[outerPaddingIndex].value);

  // Create border radius controller instance
  const radiusController = new BorderRadiusController(currentBorderRadius, currentPadding, currentChildPadding, currentOuterPadding, size);

  // Handle slider changes
  const handleRadiusChange = (value: number) => {
    setBorderRadiusIndex(value);
    const newBorderRadius = parseFloat(borderRadiusTokens[value].value);
    radiusController.setRadius(newBorderRadius);
  };

  const handlePaddingChange = (value: number) => {
    setPaddingIndex(value);
    const newPadding = parseFloat(spacingTokens[value].value);
    radiusController.setPadding(newPadding);
  };

  const handleChildPaddingChange = (value: number) => {
    setChildPaddingIndex(value);
    const newChildPadding = parseFloat(spacingTokens[value].value);
    radiusController.setChildPadding(newChildPadding);
  };

  const handleOuterPaddingChange = (value: number) => {
    setOuterPaddingIndex(value);
    const newOuterPadding = parseFloat(spacingTokens[value].value);
    radiusController.setOuterPadding(newOuterPadding);
  };

  const handleSizeChange = (value: number) => {
    setSize(value);
    
    // Auto-adjust Level 2 padding if Level 3 size is too small
    const currentLevel3Padding = parseFloat(spacingTokens[paddingIndex].value);
    const currentLevel2Padding = parseFloat(spacingTokens[childPaddingIndex].value);
    
    // Calculate minimum required space for Level 2 (padding on top + bottom + minimum content height)
    const minRequiredSpace = (currentLevel3Padding * 2) + (currentLevel2Padding * 2) + 8; // 8px minimum content
    
    if (value < minRequiredSpace) {
      // Find the largest Level 2 padding that fits
      const availableSpaceForLevel2 = value - (currentLevel3Padding * 2) - 8; // Space after Level 3 padding and min content
      const maxLevel2Padding = Math.floor(availableSpaceForLevel2 / 2); // Divide by 2 for top + bottom padding
      
      // Find the closest spacing token that fits
      let newChildPaddingIndex = 0;
      for (let i = spacingTokens.length - 1; i >= 0; i--) {
        if (parseFloat(spacingTokens[i].value) <= maxLevel2Padding) {
          newChildPaddingIndex = i;
          break;
        }
      }
      
      // Only adjust if we need to make it smaller
      if (newChildPaddingIndex < childPaddingIndex) {
        setChildPaddingIndex(newChildPaddingIndex);
      }
    }
  };

  const handleExportToJSON = () => {
    const exportData = {
      configuration: {
        timestamp: new Date().toISOString(),
        version: "1.0.0"
      },
      level4: {
        padding: {
          name: spacingTokens[outerPaddingIndex].name,
          value: spacingTokens[outerPaddingIndex].value
        },
        calculatedBorderRadius: radiusController.calculateOuterRadius() + "px"
      },
      level3: {
        borderRadius: {
          name: borderRadiusTokens[borderRadiusIndex].name,
          value: borderRadiusTokens[borderRadiusIndex].value
        },
        padding: {
          name: spacingTokens[paddingIndex].name,
          value: spacingTokens[paddingIndex].value
        },
        size: size + "px",
        calculatedBorderRadius: radiusController.radius + "px"
      },
      level2: {
        padding: {
          name: spacingTokens[childPaddingIndex].name,
          value: spacingTokens[childPaddingIndex].value
        },
        calculatedBorderRadius: radiusController.calculateInnerRadius() + "px"
      },
      level1: {
        calculatedBorderRadius: radiusController.calculateInnerContainerRadius() + "px"
      }
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    
    // Create a blob and download it
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `border-radius-config-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ 
        display: 'flex', 
        height: '100vh',
        width: '100vw',
        fontFamily: '"Segoe Sans", "Segoe UI", sans-serif',
        overflow: 'hidden'
      }}>
        {/* Left Panel - Controls (content-hugging width) */}
        <div style={{ 
          width: 'fit-content',
          minWidth: '360px',
          minHeight: '100vh',
          backgroundColor: tokens.colorNeutralBackground4,
          overflow: 'hidden'
        }}>
          <div style={{ 
            textAlign: 'left',
            marginTop: '24px', 
            marginBottom: '24px',
            paddingLeft: '24px',
            paddingRight: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            {/* Microsoft SVG Icon */}
            <img 
              src="/Microsoft.svg"
              width="24" 
              height="24" 
              alt="Microsoft Logo"
              style={{ flexShrink: 0 }}
            />
            <Body1Stronger>Shape Creator</Body1Stronger>
          </div>
          
          {/* Level 4 Title */}
          <div style={{ 
            marginTop: '24px', 
            marginBottom: '16px',
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '24px',
            borderTop: `1px solid ${tokens.colorNeutralStroke2}`
          }}>
            <Body1Stronger style={{ 
              color: tokens.colorNeutralForeground1,
              fontSize: '14px'
            }}>
              Level 4 - Molecular container
            </Body1Stronger>
          </div>

          {/* Outer Container Radius Display */}
          <Field 
            label={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Radius</span>
                <div style={{
                  padding: '4px 8px',
                  backgroundColor: tokens.colorNeutralBackground6,
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {radiusController.calculateOuterRadius()}px
                </div>
              </div>
            }
            style={{ marginBottom: '20px', paddingLeft: '24px', paddingRight: '24px' }}
          >
          </Field>

          {/* Outer Padding Slider */}
          <Field 
            label={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <span style={{ flex: '0 1 auto', minWidth: '0' }}>Padding</span>
                <div style={{
                  padding: '4px 8px',
                  backgroundColor: tokens.colorNeutralBackground5,
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600',
                  flexShrink: 0,
                  maxWidth: '140px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {spacingTokens[outerPaddingIndex].name} ({spacingTokens[outerPaddingIndex].value})
                </div>
              </div>
            }
            style={{ marginBottom: '24px', paddingLeft: '24px', paddingRight: '24px' }}
          >
            <Slider
              min={0}
              max={spacingTokens.length - 1}
              step={0}
              value={outerPaddingIndex}
              onChange={(_, data) => handleOuterPaddingChange(data.value)}
            />
          </Field>
          
          {/* Level 3 Title */}
          <div style={{ 
            marginTop: '24px', 
            marginBottom: '16px',
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '24px',
            borderTop: `1px solid ${tokens.colorNeutralStroke2}`
          }}>
            <Body1Stronger style={{ 
              color: tokens.colorNeutralForeground1,
              fontSize: '14px'
            }}>
              Level 3 - Primary interactive controls
            </Body1Stronger>
          </div>
          
          {/* Border Radius Slider */}
          <Field 
            label={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <span style={{ flex: '0 1 auto', minWidth: '0' }}>Radius</span>
                <div style={{
                  padding: '4px 8px',
                  backgroundColor: tokens.colorNeutralBackground5,
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600',
                  flexShrink: 0,
                  maxWidth: '140px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {borderRadiusTokens[borderRadiusIndex].name} ({borderRadiusTokens[borderRadiusIndex].value === '9999px' ? 'circular' : borderRadiusTokens[borderRadiusIndex].value})
                </div>
              </div>
            }
            style={{ marginBottom: '24px', paddingLeft: '24px', paddingRight: '24px' }}
          >
            <Slider
              min={0}
              max={borderRadiusTokens.length - 1}
              step={0}
              value={borderRadiusIndex}
              onChange={(_, data) => handleRadiusChange(data.value)}
            />
          </Field>

          {/* Padding Slider */}
          <Field 
            label={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <span style={{ flex: '0 1 auto', minWidth: '0' }}>Padding</span>
                <div style={{
                  padding: '4px 8px',
                  backgroundColor: tokens.colorNeutralBackground5,
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600',
                  flexShrink: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {spacingTokens[paddingIndex].name} ({spacingTokens[paddingIndex].value})
                </div>
              </div>
            }
            style={{ marginBottom: '24px', paddingLeft: '24px', paddingRight: '24px' }}
          >
            <Slider
              min={0}
              max={spacingTokens.length - 1}
              step={0}
              value={paddingIndex}
              onChange={(_, data) => handlePaddingChange(data.value)}
            />
          </Field>

          {/* Size Slider */}
          <Field 
            label={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <span style={{ flex: '0 1 auto', minWidth: '0' }}>Height</span>
                <div style={{
                  padding: '4px 8px',
                  backgroundColor: tokens.colorNeutralBackground5,
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600',
                  flexShrink: 0
                }}>
                  {size}px
                </div>
              </div>
            }
            style={{ marginBottom: '24px', paddingLeft: '24px', paddingRight: '24px' }}
          >
            <Slider
              min={20}
              max={120}
              step={0}
              value={size}
              onChange={(_, data) => handleSizeChange(data.value)}
            />
          </Field>


          {/* Level 2 Title */}
          <div style={{ 
            marginTop: '24px', 
            marginBottom: '16px',
            paddingTop: '24px',
            paddingLeft: '24px',
            paddingRight: '24px',
            borderTop: `1px solid ${tokens.colorNeutralStroke2}`
          }}>
            <Body1Stronger style={{ 
              color: tokens.colorNeutralForeground1,
              fontSize: '14px'
            }}>
              Level 2 - Small Interactive primitive
            </Body1Stronger>
          </div>

          {/* Child Radius Display */}
          <Field 
            label={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Radius</span>
                <div style={{
                  padding: '4px 8px',
                  backgroundColor: tokens.colorNeutralBackground6,
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {radiusController.calculateInnerRadius()}px
                </div>
              </div>
            }
            style={{ marginBottom: '20px', paddingLeft: '24px', paddingRight: '24px' }}
          >
          </Field>

          {/* Child Padding Slider */}
          <Field 
            label={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <span style={{ flex: '0 1 auto', minWidth: '0' }}>Padding</span>
                <div style={{
                  padding: '4px 8px',
                  backgroundColor: tokens.colorNeutralBackground5,
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600',
                  flexShrink: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {spacingTokens[childPaddingIndex].name} ({spacingTokens[childPaddingIndex].value})
                </div>
              </div>
            }
            style={{ marginBottom: '24px', paddingLeft: '24px', paddingRight: '24px' }}
          >
            <Slider
              min={0}
              max={spacingTokens.length - 1}
              step={0}
              value={childPaddingIndex}
              onChange={(_, data) => handleChildPaddingChange(data.value)}
            />
          </Field>

          {/* Level 1 Title */}
          <div style={{ 
            marginTop: '24px', 
            marginBottom: '16px',
            paddingTop: '24px',
            paddingLeft: '24px',
            paddingRight: '24px',
            borderTop: `1px solid ${tokens.colorNeutralStroke2}`
          }}>
            <Body1Stronger style={{ 
              color: tokens.colorNeutralForeground1,
              fontSize: '14px'
            }}>
              Level 1 - Atomic element
            </Body1Stronger>
          </div>

          {/* Inner Container Radius Display */}
          <Field 
            label={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Radius</span>
                <div style={{
                  padding: '4px 8px',
                  backgroundColor: tokens.colorNeutralBackground6,
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {radiusController.calculateInnerContainerRadius()}px
                </div>
              </div>
            }
            style={{ marginBottom: '20px', paddingLeft: '24px', paddingRight: '24px' }}
          >
          </Field>

          {/* Export Button */}
          <div style={{ 
            marginTop: '24px', 
            paddingTop: '24px',
            paddingLeft: '24px',
            paddingRight: '24px',
            borderTop: `1px solid ${tokens.colorNeutralStroke2}`
          }}>
            <Button 
              appearance="primary" 
              size="large"
              style={{ width: '100%' }}
              onClick={handleExportToJSON}
            >
              Export to JSON
            </Button>
          </div>

        </div>

        {/* Right Panel - Demo (flexible width) */}
        <div style={{
          flex: '1',
          height: '100vh',
          backgroundColor: tokens.colorNeutralBackground2,
          display: 'flex',
          flexDirection: 'column',
          padding: '40px',
          overflow: 'hidden',
          boxSizing: 'border-box',
          position: 'relative'
        }}>
          {/* Tab Navigation */}
          <div style={{ 
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <TabList
              selectedValue={activeTab}
              onTabSelect={(_, data) => setActiveTab(data.value as string)}
            >
              <Tab value="primitives">Primitives</Tab>
              <Tab value="ui-example">UI Preview</Tab>
            </TabList>
          </div>

          {/* Demo Content Area */}
          <div style={{
            flex: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
            minHeight: 0
          }}>
            <div style={{
              maxWidth: '600px',
              width: '100%',
              textAlign: 'center',
              transform: activeTab === 'primitives' ? `scale(${zoomLevel / 100})` : 'none',
              transformOrigin: 'center center',
              transition: activeTab === 'primitives' ? 'transform 0.2s ease-in-out' : 'none'
            }}>
              <div 
                key={activeTab}
                style={{
                  animation: activeTab === 'ui-example' ? 'fadeSlideUp 0.3s ease-in-out' : 'none',
                }}
              >
                {activeTab === 'primitives' ? (
                  /* Primitives View - Current Container Demo */
                  <Tooltip content="Level 4 - Molecular container" relationship="label" positioning="below">
                    <div style={{
                      ...radiusController.getOuterContainerStyle(),
                    width: '360px',
                    height: 'auto',
                    margin: '0 auto'
                  }}>
                    {/* Level 3 Container */}
                    <Tooltip content="Level 3 - Primary interactive control" relationship="label" positioning="below">
                      <div style={{
                        ...radiusController.getInputContainerStyle(),
                        width: '100%'
                      }}>
                        {/* Child Container - Tag Style */}
                        <Tooltip content="Level 2 - Small interactive primitive" relationship="label" positioning="below">
                          <div style={{
                            ...radiusController.getTagStyle(),
                            flex: '1',
                            justifyContent: 'center'
                          }}>
                            {/* Inner Container - Nested inside child */}
                            <Tooltip content="Level 1 - Atomic element" relationship="label" positioning="below">
                              <div style={radiusController.getInnerContainerStyle()}>
                                <div style={{
                                  fontSize: '10px',
                                  color: tokens.colorNeutralBackground2,
                                  fontWeight: '600'
                                }}>
                                  
                                </div>
                              </div>
                            </Tooltip>
                          </div>
                        </Tooltip>
                      </div>
                    </Tooltip>
                  </div>
                </Tooltip>
              ) : (
                /* UI Example View - Button Demo */
                <div style={{
                  display: 'flex',
                  padding: `${radiusController.outerPadding}px`,
                  boxShadow: tokens.shadow2,
                  backgroundColor: tokens.colorNeutralBackground1,
                  borderRadius: `${radiusController.calculateOuterRadius()}px`,
                  flexDirection: 'column',
                  gap: '16px',
                  width: 'fit-content',
                  margin: '0 auto'
                }}>
                  {/* Container around Tag with Level 3 styling */}
                  <div style={{
                    paddingLeft: `${radiusController.padding * 2}px`,
                    paddingRight: `${radiusController.padding * 2}px`,
                    height: `${radiusController.size}px`,
                    minHeight: `${radiusController.size}px`,
                    borderRadius: `${radiusController.radius}px`,
                    border: `1px solid ${tokens.colorNeutralStroke2}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                    boxSizing: 'border-box',
                    width: '360px',
                    gap: '8px'
                  }}>
                    {/* Tag with Avatar */}
                    <Tag 
                      style={{
                        paddingTop: `${radiusController.childPadding}px`,
                        paddingBottom: `${radiusController.childPadding}px`,
                        paddingLeft: `${radiusController.childPadding * 2}px`,
                        paddingRight: `${radiusController.childPadding * 4}px`,
                        borderRadius: `${radiusController.calculateInnerRadius()}px`,
                        fontSize: '16px',
                        minHeight: '32px',
                      }}
                    >
                      <Avatar 
                        size={20}
                        name="Jalen Hurts"
                        style={{
                          borderRadius: `${radiusController.calculateInnerContainerRadius()}px`
                        }}
                      />
                      <span style={{ paddingLeft: '8px' }}>Jalen Hurts</span>
                    </Tag>
                    
                    {/* Second Tag */}
                    <Tag 
                      style={{
                        paddingTop: `${radiusController.childPadding}px`,
                        paddingBottom: `${radiusController.childPadding}px`,
                        paddingLeft: `${radiusController.childPadding * 2}px`,
                        paddingRight: `${radiusController.childPadding * 4}px`,
                        borderRadius: `${radiusController.calculateInnerRadius()}px`,
                        fontSize: '16px',
                        minHeight: '32px',
                      }}
                    >
                      <Avatar 
                        size={20}
                        name="AJ Brown"
                        style={{
                          borderRadius: `${radiusController.calculateInnerContainerRadius()}px`
                        }}
                      />
                      <span style={{ paddingLeft: '8px' }}>AJ Brown</span>
                    </Tag>
                  </div>
                  
                  <Button 
                    appearance="primary" 
                    className="custom-brand-button"
                    style={radiusController.getButtonStyle()}
                  >
                    Example Button
                  </Button>
                </div>
              )}
              </div>
            </div>
          </div>
          
          {/* Zoom Control - Bottom right corner for primitives tab */}
          {activeTab === 'primitives' && (
            <div style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              zIndex: 10,
              animation: 'fadeSlideUp 0.3s ease-in-out'
            }}>
              <div style={{
                backgroundColor: tokens.colorNeutralBackground1,
                borderRadius: '16px',
                padding: '16px',
                minWidth: '200px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    whiteSpace: 'nowrap'
                  }}>
                    Zoom: {zoomLevel}%
                  </span>
                  <Slider
                    min={100}
                    max={300}
                    value={zoomLevel}
                    onChange={(_, data) => setZoomLevel(data.value)}
                    style={{ flex: 1 }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </FluentProvider>
  );
};

export default App;
