import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Font from '@/constants/Font';
import Spacing from '@/constants/Spacing';
import AppText from '@/components/AppText/AppText';
import Colors from '@/constants/Colors';
import { Plan as PlanType } from '@/data';

interface Props {
  plan: PlanType;
  onPress?: () => void;
}

const WorkoutPlan: React.FC<Props> = ({ plan, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: Colors.primary,
        marginRight: Spacing.margin.lg,
        borderRadius: Spacing.borderRadius.base,
        overflow: 'hidden',
      }}
    >
      <Image
        source={plan.image}
        style={{
          width: 270,
          height: 200,
        }}
      />
      <View
        style={{
          padding: Spacing.padding.base,
        }}
      >
        <View
          style={{
            marginBottom: Spacing.margin.base,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <AppText
            style={{
              fontFamily: Font['Poppins_SemiBold'],
            }}
          >
            {plan.name}
          </AppText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons name="star" color={Colors.yellow} size={24} />
            <AppText style={{ marginLeft: Spacing.margin.sm }}>
              {plan.rating}
            </AppText>
          </View>
        </View>
        <AppText>{plan.location}</AppText>
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutPlan;

const styles = StyleSheet.create({});
