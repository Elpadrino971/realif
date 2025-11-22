import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, ColorKey } from '@/theme/colors';
import { spacing, borderRadius } from '@/theme/spacing';

interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
  color?: ColorKey;
  showNumbers?: boolean;
  icon?: React.ReactNode;
}

export const StatBar: React.FC<StatBarProps> = ({
  label,
  value,
  maxValue,
  color = 'primary',
  showNumbers = true,
  icon,
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const barColor = colors[color];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.labelContainer}>
          {icon}
          <Text style={styles.label}>{label}</Text>
        </View>
        {showNumbers && (
          <Text style={styles.value}>
            {Math.floor(value)}/{Math.floor(maxValue)}
          </Text>
        )}
      </View>
      <View style={styles.barBackground}>
        <LinearGradient
          colors={[barColor, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.barFill, { width: `${percentage}%` }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  value: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  barBackground: {
    height: 8,
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
});
