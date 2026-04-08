import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronDown, ChevronLeft } from 'lucide-react-native';
import React, { ReactNode, useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { Spacing } from '../../constants/Spacing';
import { Typography } from '../../constants/Typography';
import { useI18nContext, useThemeContext } from '@/src/shared/context';
import Logo from '../icons/Logo';

export type HeaderProps = {
  title?: string;
  showBackButton?: boolean;
  showLogo?: boolean;
  showLanguageSelector?: boolean;
  flexStart?: boolean;
  onBackPress?: () => void;
  rightElement?: ReactNode;
  transparent?: boolean;
  absolute?: boolean;
};

export default function Header({
  title,
  showBackButton,
  showLogo = false,
  showLanguageSelector = false,
  flexStart = false,
  onBackPress,
  rightElement,
  transparent = true,
  absolute = false,
}: HeaderProps) {
  const { locale } = useI18nContext();
  const insets = useSafeAreaInsets();
  const { theme } = useThemeContext();
  const colors = Colors[theme];

  const topPadding = absolute ? insets.top : Spacing.s8;
  const headerBg = transparent ? 'transparent' : colors.background;

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        translucent={transparent}
        backgroundColor={transparent ? 'transparent' : colors.background}
      />
      <View
        style={[styles.wrapper, { backgroundColor: headerBg }, absolute && styles.wrapperAbsolute]}
      >
        <View
          style={[
            styles.container,
            {
              paddingTop: topPadding + Spacing.s8,
              paddingLeft: insets.left + Spacing.s16,
              paddingRight: insets.right + Spacing.s16,
              backgroundColor: 'transparent',
            },
          ]}
        >
          <View style={[styles.sideContainer, flexStart && { flex: 5 }]}>
            {showBackButton && (
              <TouchableOpacity
                onPress={handleBack}
                hitSlop={{
                  top: Spacing.s12,
                  bottom: Spacing.s12,
                  left: Spacing.s12,
                  right: Spacing.s12,
                }}
                style={styles.backButton}
              >
                <ChevronLeft size={28} color={colors.text} />
              </TouchableOpacity>
            )}
            {showLogo && flexStart && (
              <View style={{ marginTop: Spacing.s24 }}>
                <Logo />
              </View>
            )}
          </View>

          {!flexStart && (
            <View style={styles.centerContainer}>
              {showLogo ? (
                <View style={{ marginTop: Spacing.s24 }}>
                  <Logo />
                </View>
              ) : title ? (
                <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
                  {title}
                </Text>
              ) : null}
            </View>
          )}

          <View style={styles.rightContainer}>{rightElement}</View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    zIndex: 100,
  },
  wrapperAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: Spacing.maxWidth,
    paddingBottom: Spacing.s12,
  },
  sideContainer: {
    flex: 1,
    justifyContent: 'center',
    minWidth: 50,
    marginRight: Spacing.s12,
  },
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    minWidth: 72,
    marginLeft: Spacing.s8,
  },
  centerContainer: {
    flex: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: Typography.h6,
    fontWeight: '600',
    textAlign: 'center',
  },
});
