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
  tokens
} from '@fluentui/react-components';
import './App.css';

// BorderRadiusController class for managing border radius calculations
class BorderRadiusController {
  // Instance properties
  public radius: number;
  public padding: number;

  // Design system tokens (official Fluent spacing values)
  private static spacingTokens = [
    { name: 'spacingHorizontalNone', value: '0px' },
    { name: 'spacingHorizontalXXS', value: '2px' },
    { name: 'spacingHorizontalXS', value: '4px' },
    { name: 'spacingHorizontalSNudge', value: '6px' },
    { name: 'spacingHorizontalS', value: '8px' },
    { name: 'spacingHorizontalMNudge', value: '10px' },
    { name: 'spacingHorizontalM', value: '12px' },
    { name: 'spacingHorizontalL', value: '16px' },
    { name: 'spacingHorizontalXL', value: '20px' },
    { name: 'spacingHorizontalXXL', value: '24px' },
    { name: 'spacingHorizontalXXXL', value: '32px' }
  ];

  // Border radius tokens (including circular)
  private static borderRadiusTokens = [
    { name: 'borderRadiusNone', value: '0px' },
    { name: 'borderRadiusSmall', value: '2px' },
    { name: 'borderRadiusMedium', value: '4px' },
    { name: 'borderRadiusLarge', value: '6px' },
    { name: 'borderRadiusXLarge', value: '8px' },
    { name: 'custom', value: '10px' },
    { name: 'custom', value: '12px' },
    { name: 'custom', value: '16px' },
    { name: 'custom', value: '20px' },
    { name: 'borderRadiusCircular', value: '9999px' }
  ];

  constructor(radius: number, padding: number) {
    this.radius = radius;
    this.padding = padding;
  }

  setRadius(radius: number) {
    this.radius = radius;
  }

  setPadding(padding: number) {
    this.padding = padding;
  }

  static getSpacingTokens() {
    return this.spacingTokens;
  }

  static getBorderRadiusTokens() {
    return this.borderRadiusTokens;
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

  // Style generators using instance properties
  getTagStyle(): React.CSSProperties {
    const calculatedRadius = this.calculateInnerRadius();
    const tagPadding = 6; // Fixed tag padding, independent of the padding slider
    
    return {
      borderRadius: `${calculatedRadius}px`,
      padding: `${tagPadding}px ${tagPadding * 1.5}px`, // Fixed padding for tags
      display: 'inline-flex',
      alignItems: 'center',
      minHeight: 'auto',
      height: 'auto',
      fontSize: 'inherit',
      lineHeight: '1.2',
      whiteSpace: 'nowrap',
      flexShrink: 0,
      backgroundColor: tokens.colorBrandBackground2,
      color: tokens.colorBrandForeground2,
      border: `1px solid ${tokens.colorBrandStroke1}`
    };
  }

  getInputContainerStyle(): React.CSSProperties {
    const containerHeight = Math.max(32, this.padding * 4);
    
    return {
      border: '1px solid #ccc',
      borderRadius: `${this.radius}px`,
      padding: `${this.padding}px`,
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      alignItems: 'center',
      minHeight: `${containerHeight}px`,
      width: '100%',
      boxSizing: 'border-box'
    };
  }

  getButtonStyle(): React.CSSProperties {
    // Button uses the full radius (it's not inside another container)
    return {
      borderRadius: `${this.radius}px`,
      padding: `${this.padding}px ${this.padding * 2}px`,
      marginTop: '16px'
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
}

const App: React.FC = () => {
  // State management
  const [borderRadiusIndex, setBorderRadiusIndex] = useState(4);
  const [paddingIndex, setPaddingIndex] = useState(4);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [activeTab, setActiveTab] = useState<string>('primitives');

  const spacingTokens = BorderRadiusController.getSpacingTokens();
  const borderRadiusTokens = BorderRadiusController.getBorderRadiusTokens();

  // Get current values for the controller
  const currentBorderRadius = parseFloat(borderRadiusTokens[borderRadiusIndex].value);
  const currentPadding = parseFloat(spacingTokens[paddingIndex].value);

  // Create border radius controller instance
  const radiusController = new BorderRadiusController(currentBorderRadius, currentPadding);

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

  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ 
        display: 'flex', 
        height: '100vh',
        width: '100vw',
        fontFamily: tokens.fontFamilyBase 
      }}>
        {/* Left Panel - Controls (300px fixed width) */}
        <div style={{ 
          width: '284px',
          minHeight: '100vh',
          padding: '24px',
          backgroundColor: tokens.colorNeutralBackground4,
          overflow: 'auto'
        }}>
          <div style={{ textAlign: 'left', marginTop: '30px', marginBottom: '30px' }}>
            <Body1Stronger>Border controls</Body1Stronger>
          </div>
          
          {/* Border Radius Slider */}
          <Field 
            label={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Border Radius</span>
                <div style={{
                  padding: '4px 8px',
                  backgroundColor: tokens.colorNeutralBackground5,
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {borderRadiusTokens[borderRadiusIndex].name} ({borderRadiusTokens[borderRadiusIndex].value === '9999px' ? 'circular' : borderRadiusTokens[borderRadiusIndex].value})
                </div>
              </div>
            }
            style={{ marginBottom: '24px', width: '100%' }}
          >
            <Slider
              min={0}
              max={borderRadiusTokens.length - 1}
              step={1}
              value={borderRadiusIndex}
              onChange={(_, data) => handleRadiusChange(data.value)}
              style={{ width: '100%' }}
            />
          </Field>

          {/* Padding Slider */}
          <Field 
            label={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Padding Control</span>
                <div style={{
                  padding: '4px 8px',
                  backgroundColor: tokens.colorNeutralBackground5,
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {spacingTokens[paddingIndex].name} ({spacingTokens[paddingIndex].value})
                </div>
              </div>
            }
            style={{ marginBottom: '24px', width: '100%' }}
          >
            <Slider
              min={0}
              max={spacingTokens.length - 1}
              step={1}
              value={paddingIndex}
              onChange={(_, data) => handlePaddingChange(data.value)}
              style={{ width: '100%' }}
            />
          </Field>

          {/* Divider */}
          <div style={{
            height: '1px',
            backgroundColor: '#e1dfdd',
            margin: '24px 0'
          }}></div>

          {/* Child Radius Display */}
          <Field 
            label={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Atom (Child Radius)</span>
                <div style={{
                  padding: '4px 8px',
                  backgroundColor: tokens.colorNeutralBackground3,
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {radiusController.calculateInnerRadius()}px
                </div>
              </div>
            }
            style={{ marginBottom: '20px' }}
          >
          </Field>

          {/* Mathematical Formula Display */}
          <div style={{
            padding: '12px',
            backgroundColor: tokens.colorNeutralBackground3,
            borderRadius: '4px',
            fontSize: '11px',
            fontFamily: tokens.fontFamilyMonospace
          }}>
            <div style={{ marginBottom: '8px', fontWeight: '600' }}>Formula:</div>
            <div>child_radius = max(0, parent_radius - parent_padding)</div>
            <div style={{ marginTop: '8px', color: tokens.colorNeutralForeground2 }}>
              {`${radiusController.calculateInnerRadius()}px = max(0, ${radiusController.radius}px - ${radiusController.padding}px)`}
            </div>
          </div>
        </div>

        {/* Right Panel - Demo (flexible width) */}
        <div style={{
          flex: '1',
          height: '100vh',
          width: 'calc(100vw - 284px)',
          backgroundColor: tokens.colorNeutralBackground2,
          display: 'flex',
          flexDirection: 'column',
          padding: '40px',
          overflow: 'hidden',
          boxSizing: 'border-box'
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
              <Tab value="ui-example">UI Example</Tab>
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
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'center center',
              transition: 'transform 0.2s ease-in-out'
            }}>
              {activeTab === 'primitives' ? (
                /* Primitives View - Current Container Demo */
                <div style={{
                  ...radiusController.getInputContainerStyle(),
                  width: '300px',
                  height: 'auto',
                  margin: '0 auto'
                }}>
                  {/* Child Container - Tag Style */}
                  <div style={{
                    ...radiusController.getTagStyle(),
                    flex: '1',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: tokens.colorNeutralBackground3
                  }}>
                    <Body2>Atom</Body2>
                  </div>
                </div>
              ) : (
                /* UI Example View - Button Demo */
                <Button 
                  appearance="primary" 
                  style={radiusController.getButtonStyle()}
                >
                  Example Button
                </Button>
              )}
            </div>
          </div>
          
          {/* Zoom Control at Bottom */}
          <div style={{
            flexShrink: 0,
            borderTop: '1px solid #e1dfdd',
            paddingTop: '20px',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            <Field 
              label={`Zoom Level: ${zoomLevel}%`}
              style={{ margin: 0 }}
            >
              <Slider
                min={100}
                max={300}
                value={zoomLevel}
                onChange={(_, data) => setZoomLevel(data.value)}
              />
            </Field>
          </div>
        </div>
      </div>
    </FluentProvider>
  );
};

export default App;
