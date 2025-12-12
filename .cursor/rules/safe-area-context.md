<!-- @format -->

# Safe Area Context Usage Guide

This guide provides comprehensive examples and best practices for using `react-native-safe-area-context` in Expo mobile applications.

## Setup

Ensure `SafeAreaProvider` wraps your root layout in `app/_layout.tsx`:

```tsx
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* Your app content */}
    </SafeAreaProvider>
  );
}
```

## Component: SafeAreaView

Use `SafeAreaView` for full-screen layouts that need automatic safe area handling.

### Basic Usage

```tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';

export default function Screen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 p-4">
        <Text>Your content here</Text>
      </View>
    </SafeAreaView>
  );
}
```

### With Specific Edges

Control which edges apply safe area insets:

```tsx
<SafeAreaView 
  className="flex-1 bg-background"
  edges={['top', 'bottom']} // Only top and bottom
>
  {/* Content */}
</SafeAreaView>
```

Available edge options: `'top' | 'right' | 'bottom' | 'left'`

### With Different Background Colors

```tsx
<SafeAreaView 
  className="flex-1"
  edges={['top']}
  style={{ backgroundColor: '#fff' }}
>
  <View className="flex-1 bg-background">
    {/* Content */}
  </View>
</SafeAreaView>
```

## Hook: useSafeAreaInsets

Use `useSafeAreaInsets` for custom spacing and positioning.

### Basic Usage

```tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';

export default function Screen() {
  const insets = useSafeAreaInsets();
  
  return (
    <View 
      className="flex-1 bg-background"
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Text>Your content here</Text>
    </View>
  );
}
```

### Custom Header with Safe Area

```tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';

export default function CustomHeader() {
  const insets = useSafeAreaInsets();
  
  return (
    <View 
      className="bg-primary"
      style={{ paddingTop: insets.top }}
    >
      <View className="h-16 items-center justify-center">
        <Text className="text-white text-lg font-bold">Header</Text>
      </View>
    </View>
  );
}
```

### Floating Action Button

```tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Pressable } from 'react-native';

export default function FloatingButton() {
  const insets = useSafeAreaInsets();
  
  return (
    <Pressable
      className="absolute bg-primary rounded-full w-16 h-16 items-center justify-center"
      style={{
        bottom: insets.bottom + 16,
        right: 16,
      }}
    >
      {/* Button content */}
    </Pressable>
  );
}
```

### ScrollView with Safe Area Padding

```tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, View } from 'react-native';

export default function ScrollableScreen() {
  const insets = useSafeAreaInsets();
  
  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingHorizontal: 16,
        }}
      >
        {/* Scrollable content */}
      </ScrollView>
    </View>
  );
}
```

## Common Patterns

### Full Screen Modal

```tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal, View } from 'react-native';

export default function FullScreenModal({ visible, onClose }) {
  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView className="flex-1 bg-background">
        {/* Modal content */}
      </SafeAreaView>
    </Modal>
  );
}
```

### Tab Screen with Custom Header

```tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, ScrollView } from 'react-native';

export default function TabScreen() {
  const insets = useSafeAreaInsets();
  
  return (
    <View className="flex-1 bg-background">
      {/* Custom header */}
      <View style={{ paddingTop: insets.top }}>
        {/* Header content */}
      </View>
      
      {/* Scrollable content */}
      <ScrollView className="flex-1">
        {/* Content */}
      </ScrollView>
    </View>
  );
}
```

### Bottom Sheet with Safe Area

```tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';

export default function BottomSheet() {
  const insets = useSafeAreaInsets();
  
  return (
    <View 
      className="bg-white rounded-t-3xl"
      style={{ paddingBottom: insets.bottom }}
    >
      {/* Bottom sheet content */}
    </View>
  );
}
```

## Best Practices

1. **Always wrap root layout** with `SafeAreaProvider` in `app/_layout.tsx`
2. **Use SafeAreaView** for full-screen screens/pages
3. **Use useSafeAreaInsets** for custom spacing and positioning
4. **Apply safe area to containers**, not ScrollView/FlatList directly
5. **Consider all edges** - not just top (bottom for home indicators, left/right for landscape)
6. **Test on different devices** - especially devices with notches and home indicators
7. **Expo Router tabs** handle safe areas automatically, but custom headers need manual handling

## When NOT to Use

- **Tab bars**: Expo Router handles this automatically
- **Status bar only**: Use `expo-status-bar` for status bar styling
- **Nested safe areas**: Don't nest `SafeAreaView` components unnecessarily

## Platform Considerations

- **iOS**: Handles notches, status bar, and home indicator
- **Android**: Handles status bar and navigation bar (especially with edge-to-edge enabled)
- **Web**: Safe area insets are typically 0, but the code will still work

## Troubleshooting

- **Content hidden behind notch**: Ensure `SafeAreaProvider` wraps root layout
- **Double padding**: Check if parent component already applies safe area insets
- **Tab bar issues**: Expo Router tabs handle safe areas automatically - don't add extra padding

