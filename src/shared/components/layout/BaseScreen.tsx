import { Colors } from '@/src/shared/constants';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewProps,
  View,
  ViewProps,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeContext } from '../../context/useThemeContext';

interface BaseScreenProps extends ViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
  contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
  /** Space buffer usually needed when using an absolute bottom tab bar. Default is padding based on safe area. */
  withBottomInset?: boolean;
  spacingBottom?: number;
  /** Space buffer needed for absolute headers. Disables the 'top' Safe Area edge. */
  withTopInset?: boolean;
  absoluteHeader?: boolean;
}

export default function BaseScreen({
  children,
  scrollable = false,
  contentContainerStyle,
  withBottomInset = false,
  spacingBottom = 85,
  withTopInset = false,
  absoluteHeader = false,
  style,
  ...props
}: BaseScreenProps) {
  const { theme } = useThemeContext();
  const colors = Colors[theme];
  const insets = useSafeAreaInsets();

  const innerContent = (
    <View
      style={[
        {
          flexDirection: 'column',
          flex: 1,
          paddingBottom: withBottomInset ? insets.bottom + spacingBottom : 0,
          paddingTop: withTopInset ? 80 : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: colors.background }, style]}
      edges={absoluteHeader ? ['left', 'right'] : ['top', 'left', 'right']}
    >
      {innerContent}
    </SafeAreaView>
  );
}
