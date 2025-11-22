import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/theme/colors';
import { spacing, borderRadius, shadows } from '@/theme/spacing';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'gradient';
  style?: ViewStyle;
  padding?: keyof typeof spacing;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  style,
  padding = 'md',
}) => {
  if (variant === 'glass') {
    return (
      <View style={[styles.base, styles.glass, { padding: spacing[padding] }, style]}>
        {children}
      </View>
    );
  }

  if (variant === 'gradient') {
    return (
      <LinearGradient
        colors={[colors.surface, colors.surfaceLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.base, { padding: spacing[padding] }, style]}
      >
        {children}
      </LinearGradient>
    );
  }

  return (
    <View style={[styles.base, styles.default, { padding: spacing[padding] }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  default: {
    backgroundColor: colors.surface,
    ...shadows.medium,
  },
  glass: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    ...shadows.small,
  },
});
