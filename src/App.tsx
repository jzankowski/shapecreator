import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello!</h1>
        <p>Welcome to the simple React app.</p>
      </header>
    </div>
  );
}

export default App;
  private static spacingTokens = [
    '0px',    // spacingNone
    '2px',    // spacingHorizontalXXS
    '4px',    // spacingHorizontalXS
    '6px',    // spacingHorizontalSNudge
    '8px',    // spacingHorizontalS
    '10px',   // spacingHorizontalMNudge
    '12px',   // spacingHorizontalM
    '16px',   // spacingHorizontalL
    '20px',   // spacingHorizontalXL
    '24px',   // spacingHorizontalXXL
    '32px'    // spacingHorizontalXXXL
  ];

  private static borderRadiusTokens = [
    '0px',    // borderRadiusNone
    '2px',    // borderRadiusSmall
    '4px',    // borderRadiusMedium
    '6px',    // borderRadiusLarge
    '8px',    // borderRadiusXLarge
    '10px',   // custom
    '12px',   // custom
    '16px',   // custom
    '20px',   // custom
    '9999px'  // borderRadiusCircular
  ];

  static getSpacingTokens() {
    return this.spacingTokens;
  }

  static getBorderRadiusTokens() {
    return this.borderRadiusTokens;
  }

  static calculateInnerRadius(containerRadiusIndex: number, containerPaddingIndex: number): string {
    const containerRadius = this.borderRadiusTokens[containerRadiusIndex];
    const containerPadding = this.spacingTokens[containerPaddingIndex];
    
    // Handle circular border radius
    if (containerRadius === '9999px') {
      return '9999px';
    }
    
    const radiusValue = parseFloat(containerRadius);
    const paddingValue = parseFloat(containerPadding);
    const innerRadius = Math.max(0, radiusValue - paddingValue);
    
    return `${innerRadius}px`;
  }

  static getTagStyle(borderRadiusIndex: number, paddingIndex: number) {
    // Tags use the container radius minus the container's padding
    const calculatedRadius = this.calculateInnerRadius();
    // Tags have fixed padding, independent of the padding slider
    const tagPadding = 6; // Fixed tag padding
    
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
      flexShrink: 0
    };
  }
  
  getInputContainerStyle(): React.CSSProperties {
    // Container uses the full radius
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
    // Input field has fixed padding, independent of the container padding slider
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

function App() {
  const [borderRadiusIndex, setBorderRadiusIndex] = useState(2); // Index into border radius tokens array
  const [paddingIndex, setPaddingIndex] = useState(4); // Index into spacing tokens array
  const [zoomLevel, setZoomLevel] = useState(100); // Zoom level as percentage (100% to 300%)
  const [activeTab, setActiveTab] = useState('primitives'); // Active tab state
  
  // Fluent UI border radius tokens (in pixels)
  const fluentBorderRadiusTokens = [
    { name: 'borderRadiusNone', value: 0 },
    { name: 'borderRadiusSmall', value: 2 },
    { name: 'borderRadiusMedium', value: 4 },
    { name: 'borderRadiusLarge', value: 6 },
    { name: 'borderRadiusXLarge', value: 8 },
    { name: 'borderRadiusXXLarge', value: 12 },
    { name: 'borderRadiusXXXLarge', value: 16 },
    { name: 'borderRadius4XLarge', value: 20 },
    { name: 'borderRadius5XLarge', value: 24 },
    { name: 'borderRadiusCircular', value: 10000 } // Very large number for circular
  ];
  
  // Fluent UI spacing tokens (in pixels)
  const fluentSpacingTokens = [
    { name: 'spacingHorizontalNone', value: 0 },
    { name: 'spacingHorizontalXXS', value: 2 },
    { name: 'spacingHorizontalXS', value: 4 },
    { name: 'spacingHorizontalSNudge', value: 6 },
    { name: 'spacingHorizontalS', value: 8 },
    { name: 'spacingHorizontalMNudge', value: 10 },
    { name: 'spacingHorizontalM', value: 12 },
    { name: 'spacingHorizontalL', value: 16 },
    { name: 'spacingHorizontalXL', value: 20 },
    { name: 'spacingHorizontalXXL', value: 24 },
    { name: 'spacingHorizontalXXXL', value: 32 }
  ];
  
  const currentBorderRadiusToken = fluentBorderRadiusTokens[borderRadiusIndex];
  const currentSpacingToken = fluentSpacingTokens[paddingIndex];
  const borderRadius = currentBorderRadiusToken.value;
  const padding = currentSpacingToken.value;
  
  // Create border radius controller instance
  const radiusController = new BorderRadiusController(borderRadius, padding);

  const handleRadiusChange = (value: number) => {
    setBorderRadiusIndex(value);
    const newBorderRadius = fluentBorderRadiusTokens[value].value;
    radiusController.setRadius(newBorderRadius);
  };

  const handlePaddingChange = (value: number) => {
    setPaddingIndex(value);
    const newPadding = fluentSpacingTokens[value].value;
    radiusController.setPadding(newPadding);
  };

  const handleZoomChange = (value: number) => {
    setZoomLevel(value);
  };

  const handleTabSelect = (event: any, data: any) => {
    setActiveTab(data.value);
  };

  return (
    <FluentProvider theme={webLightTheme}>
      <div className="App">
        {/* Left Column - Controls Panel */}
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
          
          {/* Border Radius Control Slider */}
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
                  {currentBorderRadiusToken.name} ({currentBorderRadiusToken.value === 10000 ? 'circular' : currentBorderRadiusToken.value + 'px'})
                </div>
              </div>
            }
            style={{ marginBottom: '24px', width: '100%' }}
          >
            <Slider
              min={0}
              max={fluentBorderRadiusTokens.length - 1}
              value={borderRadiusIndex}
              onChange={(_, data) => handleRadiusChange(data.value)}
              style={{ width: '100%' }}
            />
          </Field>
          
          {/* Padding Control Slider */}
          <Field 
            label={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Padding Control</span>
                <div style={{
                  padding: '4px 8px',
                  backgroundColor: tokens.colorNeutralBackground5,
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  {currentSpacingToken.name} ({currentSpacingToken.value}px)
                </div>
              </div>
            }
            style={{ marginBottom: '24px', width: '100%' }}
          >
              <Slider
                min={0}
                max={fluentSpacingTokens.length - 1}
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
                <span>Atom</span>
                <div style={{
                  padding: '4px 8px',
                  backgroundColor: tokens.colorNeutralBackground3,
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  {borderRadius >= 10000 ? 'circular' : Math.max(0, borderRadius - padding) + 'px'}
                </div>
              </div>
            }
            style={{ marginBottom: '20px' }}
          >
            
          </Field>
        </div>
        
        {/* Right Column - Interactive Demo */}
        <div style={{
          flex: '1',
          height: '100vh',
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
            <TabList selectedValue={activeTab} onTabSelect={handleTabSelect}>
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
                onChange={(_, data) => handleZoomChange(data.value)}
              />
            </Field>
          </div>
          </div>
        </div>
      </div>
    </FluentProvider>
  )
}

export default App
