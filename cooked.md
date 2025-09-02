# Border Radius Control App - Complete Build Instructions

## Overview
This app demonstrates the mathematical relationship between container border radius and child element border radius using the formula: `child_radius = max(0, parent_radius - parent_padding)`. It provides interactive controls for exploring Fluent UI design tokens and their visual effects.

## Prerequisites
- Node.js (v16+)
- npm or yarn
- VS Code (recommended)

## Step 1: Project Setup

### Initialize React + TypeScript + Vite Project
```bash
npm create vite@latest visual-test -- --template react-ts
cd visual-test
npm install
```

### Install Fluent UI Dependencies
```bash
npm install @fluentui/react-components @fluentui/react-icons
```

### Verify package.json Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@fluentui/react-components": "^9.69.0",
    "@fluentui/react-icons": "^2.0.308"
  }
}
```

## Step 2: Core Architecture

### BorderRadiusController Class
Create a utility class to manage border radius calculations and design tokens:

```typescript
class BorderRadiusController {
  // Design system tokens (official Fluent spacing values)
  private static spacingTokens = [
    '0px', '2px', '4px', '6px', '8px', '10px', '12px', '16px', '20px', '24px', '32px'
  ];

  // Border radius tokens (including circular)
  private static borderRadiusTokens = [
    '0px', '2px', '4px', '6px', '8px', '10px', '12px', '16px', '20px', '9999px'
  ];

  // Mathematical formula implementation
  static calculateInnerRadius(containerRadiusIndex: number, containerPaddingIndex: number): string {
    const containerRadius = this.borderRadiusTokens[containerRadiusIndex];
    const containerPadding = this.spacingTokens[containerPaddingIndex];
    
    // Handle circular border radius (special case)
    if (containerRadius === '9999px') {
      return '9999px';
    }
    
    // Apply formula: child = max(0, parent - padding)
    const radiusValue = parseFloat(containerRadius);
    const paddingValue = parseFloat(containerPadding);
    const innerRadius = Math.max(0, radiusValue - paddingValue);
    
    return `${innerRadius}px`;
  }

  // Style generators for different UI elements
  static getTagStyle(borderRadiusIndex: number, paddingIndex: number) {
    return {
      borderRadius: this.calculateInnerRadius(borderRadiusIndex, paddingIndex),
      margin: '4px',
      padding: '4px 8px',
      backgroundColor: tokens.colorBrandBackground2,
      color: tokens.colorBrandForeground2,
      border: `1px solid ${tokens.colorBrandStroke1}`
    };
  }

  static getInputContainerStyle(borderRadiusIndex: number, paddingIndex: number) {
    return {
      borderRadius: this.borderRadiusTokens[borderRadiusIndex],
      padding: this.spacingTokens[paddingIndex],
      border: `1px solid ${tokens.colorNeutralStroke1}`,
      backgroundColor: tokens.colorNeutralBackground1,
      display: 'flex',
      flexWrap: 'wrap' as const,
      alignItems: 'center',
      gap: '8px',
      minHeight: '40px',
      width: '100%'
    };
  }

  static getButtonStyle(borderRadiusIndex: number, paddingIndex: number) {
    return {
      borderRadius: this.calculateInnerRadius(borderRadiusIndex, paddingIndex),
      marginTop: '12px'
    };
  }
}
```

## Step 3: React Component Structure

### State Management
```typescript
const App: React.FC = () => {
  const [borderRadiusIndex, setBorderRadiusIndex] = useState(4);
  const [paddingIndex, setPaddingIndex] = useState(4);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [activeTab, setActiveTab] = useState<string>('primitives');

  const spacingTokens = BorderRadiusController.getSpacingTokens();
  const borderRadiusTokens = BorderRadiusController.getBorderRadiusTokens();
```

### Key Features to Implement

#### 1. Two-Column Layout
- **Left Panel**: Controls (300px fixed width)
- **Right Panel**: Demo area (flexible width)

#### 2. Interactive Controls
- **Border Radius Slider**: 0-9 range (maps to token array)
- **Padding Slider**: 0-10 range (maps to spacing tokens)
- **Real-time Value Display**: Show current token values

#### 3. Tabbed Interface
```typescript
<TabList
  selectedValue={activeTab}
  onTabSelect={(_, data) => setActiveTab(data.value as string)}
>
  <Tab value="primitives">Primitives</Tab>
  <Tab value="ui-example">UI Example</Tab>
</TabList>
```

#### 4. Zoom Functionality
```typescript
<div style={{ 
  transform: `scale(${zoomLevel / 100})`,
  transformOrigin: 'top center'
}}>
  {/* Demo content */}
</div>

<Slider
  min={100}
  max={300}
  step={25}
  value={zoomLevel}
  onChange={(_, data) => setZoomLevel(data.value)}
/>
```

## Step 4: Demo Views Implementation

### Primitives View
Shows basic UI elements demonstrating the mathematical relationship:

```typescript
const renderPrimitivesView = () => (
  <div style={{ width: '100%' }}>
    {/* Input Container with Tags */}
    <div style={BorderRadiusController.getInputContainerStyle(borderRadiusIndex, paddingIndex)}>
      <Tag style={BorderRadiusController.getTagStyle(borderRadiusIndex, paddingIndex)}>
        Design System
      </Tag>
      <Input placeholder="Add a tag..." />
    </div>

    {/* Button Example */}
    <Button 
      appearance="primary" 
      style={BorderRadiusController.getButtonStyle(borderRadiusIndex, paddingIndex)}
    >
      Primary Button
    </Button>

    {/* Live Calculations Display */}
    <div>
      <Text>Container Radius: {borderRadiusTokens[borderRadiusIndex]}</Text>
      <Text>Container Padding: {spacingTokens[paddingIndex]}</Text>
      <Text>Child Radius: {BorderRadiusController.calculateInnerRadius(borderRadiusIndex, paddingIndex)}</Text>
    </div>
  </div>
);
```

### UI Example View
Shows a realistic search interface:

```typescript
const renderUIExampleView = () => (
  <div style={{ 
    padding: '24px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: '8px'
  }}>
    <Text as="h3">Search and Filter</Text>
    
    <div style={BorderRadiusController.getInputContainerStyle(borderRadiusIndex, paddingIndex)}>
      <Tag style={BorderRadiusController.getTagStyle(borderRadiusIndex, paddingIndex)}>
        Active Filter
      </Tag>
      <Input placeholder="Search for items..." />
    </div>
    
    <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
      <Button appearance="primary" style={BorderRadiusController.getButtonStyle(borderRadiusIndex, paddingIndex)}>
        Search
      </Button>
      <Button appearance="secondary" style={BorderRadiusController.getButtonStyle(borderRadiusIndex, paddingIndex)}>
        Clear Filters
      </Button>
    </div>
  </div>
);
```

## Step 5: Fluent UI Integration

### Required Imports
```typescript
import {
  FluentProvider,
  webLightTheme,
  Slider,
  Text,
  Input,
  Button,
  Tag,
  TabList,
  Tab,
  Divider,
  tokens
} from '@fluentui/react-components';
```

### Theme Provider Setup
```typescript
return (
  <FluentProvider theme={webLightTheme}>
    {/* App content */}
  </FluentProvider>
);
```

### Using Design Tokens
```typescript
// Colors
backgroundColor: tokens.colorNeutralBackground2
color: tokens.colorBrandForeground2
border: `1px solid ${tokens.colorNeutralStroke1}`

// Typography
fontFamily: tokens.fontFamilyBase
fontFamily: tokens.fontFamilyMonospace

// Spacing (use the controller's spacing tokens)
padding: spacingTokens[paddingIndex]
```

## Step 6: Mathematical Formula Implementation

### Core Logic
```typescript
static calculateInnerRadius(containerRadiusIndex: number, containerPaddingIndex: number): string {
  const containerRadius = this.borderRadiusTokens[containerRadiusIndex];
  const containerPadding = this.spacingTokens[containerPaddingIndex];
  
  // Special case: circular stays circular
  if (containerRadius === '9999px') {
    return '9999px';
  }
  
  // Apply mathematical relationship
  const radiusValue = parseFloat(containerRadius);
  const paddingValue = parseFloat(containerPadding);
  const innerRadius = Math.max(0, radiusValue - paddingValue);
  
  return `${innerRadius}px`;
}
```

### Why This Formula Works
1. **Container** has border radius + padding
2. **Child elements** sit inside the container
3. **Child radius** = Container radius - Container padding
4. **Minimum value** = 0 (never negative)
5. **Circular case** = Special handling for 9999px

## Step 7: Layout Implementation

### CSS Grid/Flexbox Structure
```typescript
// Main container
<div style={{ 
  display: 'flex', 
  height: '100vh', 
  fontFamily: tokens.fontFamilyBase 
}}>
  {/* Left panel */}
  <div style={{ 
    width: '300px', 
    padding: '24px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  }}>
    {/* Controls */}
  </div>

  {/* Right panel */}
  <div style={{ 
    flex: 1, 
    padding: '24px',
    display: 'flex',
    flexDirection: 'column'
  }}>
    {/* Demo area */}
  </div>
</div>
```

## Step 8: Interactive Features

### Slider Configuration
```typescript
<Slider
  min={0}
  max={borderRadiusTokens.length - 1}
  step={1}
  value={borderRadiusIndex}
  onChange={(_, data) => setBorderRadiusIndex(data.value)}
  style={{ width: '100%' }}
/>
```

### Real-time Updates
- State changes trigger immediate re-render
- All UI elements update simultaneously
- Mathematical calculations shown live

### Tab Switching
```typescript
onTabSelect={(_, data) => setActiveTab(data.value as string)}
```

## Step 9: Design System Best Practices

### Token Usage
- Always use official Fluent tokens
- Map slider values to token arrays
- Display token names alongside values

### Accessibility
- Proper semantic HTML
- ARIA labels for controls
- Keyboard navigation support

### Visual Hierarchy
- Clear section separation
- Consistent spacing
- Proper typography scales

## Step 10: Common Pitfalls & Solutions

### JSX Structure Issues
```typescript
// ❌ Wrong: Mismatched closing tags
<FluentProvider>
  <div>
    <div>
  </div>
</FluentProvider>

// ✅ Correct: Properly balanced
<FluentProvider>
  <div>
    <div>
    </div>
  </div>
</FluentProvider>
```

### State Management
```typescript
// ❌ Wrong: Direct token manipulation
const [borderRadius, setBorderRadius] = useState('4px');

// ✅ Correct: Index-based approach
const [borderRadiusIndex, setBorderRadiusIndex] = useState(4);
const currentRadius = borderRadiusTokens[borderRadiusIndex];
```

### TypeScript Types
```typescript
// ✅ Proper typing
const [activeTab, setActiveTab] = useState<string>('primitives');
const App: React.FC = () => {
```

## Step 11: Testing & Validation

### Manual Testing Checklist
- [ ] Border radius slider changes container radius
- [ ] Padding slider affects child element radius
- [ ] Mathematical relationship is visually correct
- [ ] Circular radius (9999px) works properly
- [ ] Tab switching functions
- [ ] Zoom controls work (100%-300%)
- [ ] All token values display correctly
- [ ] Responsive layout works

### Edge Cases
- Zero radius (0px)
- Maximum radius (circular)
- Large padding vs small radius
- All combinations of sliders

## Step 12: Enhancement Ideas

### Additional Features
1. **Export functionality**: Save current settings as JSON
2. **Preset configurations**: Common design patterns
3. **Animation transitions**: Smooth value changes
4. **Color theming**: Light/dark mode toggle
5. **Code generation**: Export CSS/SCSS
6. **Comparison mode**: Side-by-side configurations

### Advanced Mathematics
1. **Bezier curves**: Custom border radius shapes
2. **Gradient borders**: Complex visual effects
3. **Multiple radii**: Per-corner control

## Conclusion

This app demonstrates:
- **Design system integration** with Fluent UI
- **Mathematical relationships** in UI design
- **Interactive exploration** of design tokens
- **Professional component architecture**
- **Real-time visual feedback**

The core insight is that border radius isn't just aesthetic - it follows mathematical rules that create harmonious, predictable designs when applied systematically.

## File Structure
```
src/
├── App.tsx           # Main component with BorderRadiusController
├── App.css           # Minimal custom styles (if needed)
├── main.tsx          # React entry point
└── index.css         # Global styles (minimal)
```

## Final Notes
- Keep the mathematical formula visible in the UI
- Use design tokens consistently
- Test edge cases thoroughly
- Document the relationship between container and child elements
- Make the educational aspect clear for users
