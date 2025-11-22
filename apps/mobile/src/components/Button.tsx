import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/theme/colors';
import { spacing, borderRadius, shadows } from '@/theme/spacing';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  icon,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.base,
      ...styles[size],
    };

    if (fullWidth) {
      baseStyle.width = '100%';
    }

    return baseStyle;
  };

  const isDisabled = disabled || loading;

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        style={[getButtonStyle(), isDisabled && styles.disabled, style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {loading ? (
            <ActivityIndicator color={colors.text} />
          ) : (
            <>
              {icon}
              <Text style={[styles.text, styles[`text_${size}`], textStyle]}>{title}</Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'secondary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        style={[
          getButtonStyle(),
          styles.secondary,
          isDisabled && styles.disabled,
          style,
        ]}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color={colors.text} />
        ) : (
          <>
            {icon}
            <Text style={[styles.text, styles[`text_${size}`], textStyle]}>{title}</Text>
          </>
        )}
      </TouchableOpacity>
    );
  }

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        style={[
          getButtonStyle(),
          styles.outline,
          isDisabled && styles.disabled,
          style,
        ]}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <>
            {icon}
            <Text
              style={[
                styles.text,
                styles[`text_${size}`],
                styles.outlineText,
                textStyle,
              ]}
            >
              {title}
            </Text>
          </>
        )}
      </TouchableOpacity>
    );
  }

  // Ghost variant
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[getButtonStyle(), isDisabled && styles.disabled, style]}
      activeOpacity={0.6}
    >
      {loading ? (
        <ActivityIndicator color={colors.text} />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, styles[`text_${size}`], textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  small: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  medium: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  large: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  gradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    gap: spacing.sm,
    ...shadows.medium,
  },
  secondary: {
    backgroundColor: colors.surface,
    ...shadows.small,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: colors.text,
    fontWeight: '600',
  },
  text_small: {
    fontSize: 14,
  },
  text_medium: {
    fontSize: 16,
  },
  text_large: {
    fontSize: 18,
  },
  outlineText: {
    color: colors.primary,
  },
});
