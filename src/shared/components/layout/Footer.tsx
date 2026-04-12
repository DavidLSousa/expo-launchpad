import React, { ReactNode, useEffect, useState } from 'react';
import { Keyboard, Platform, View } from 'react-native';
import { Spacing } from '../../constants';

export type FooterProps = {
  children: ReactNode;
};

export default function Footer({ children }: FooterProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setIsVisible(false),
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setIsVisible(true),
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <View
      style={[
        Platform.OS === 'ios'
          ? Spacing.absoluteBottomTabBarIOS
          : Spacing.absoluteBottomTabBarAndroid,
        {
          alignItems: 'center',
        },
      ]}
    >
      <View
        style={{
          width: '100%',
          maxWidth: Spacing.maxWidth,
          paddingHorizontal: Spacing.s8,
        }}
      >
        {children}
      </View>
    </View>
  );
}
