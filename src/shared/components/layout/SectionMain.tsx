import React, { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewProps,
  View,
  ViewProps,
} from 'react-native';
import { Spacing } from '../../constants';

export type SectionMainProps = {
  children: ReactNode;
  scrollable?: boolean;
  contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
  withTopInset?: boolean;
  withoutFooter?: boolean;
  style?: ViewProps['style'];
};

export default function SectionMain({
  children,
  scrollable = false,
  contentContainerStyle,
  withTopInset = false,
  withoutFooter = false,
  style,
}: SectionMainProps) {
  const content = scrollable ? (
    <ScrollView
      style={[{ flex: 1 }, style]}
      contentContainerStyle={[
        {
          paddingHorizontal: Spacing.s8,
          flexGrow: 1,
          paddingBottom: withoutFooter ? 200 : Spacing.footer,
          paddingTop: withTopInset ? Spacing.s80 : 0,
        },
        contentContainerStyle,
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View
      style={[
        {
          flex: 1,
          paddingHorizontal: Spacing.s8,
          paddingTop: withTopInset ? Spacing.s80 : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : Spacing.s24}
    >
      {content}
    </KeyboardAvoidingView>
  );
}
