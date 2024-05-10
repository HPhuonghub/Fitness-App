import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Screen from '@/components/Screen/Screen';
import Spacing from '@/constants/Spacing';
import { Category, user, workoutPlans, workouts } from '@/data';
import AppText from '@/components/AppText/AppText';
import Font from '@/constants/Font';
import IconButton from '@/components/IconButton/IconButton';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import FontSize from '@/constants/FontSize';
import CategoryList from '@/components/CategoryList/CategoryList';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import Workout from '@/components/Workout/Workout';
import Rating from 'react-native-easy-rating';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

export function Discover() {
  const navigation = useNavigation();

  // Start Group
  interface GroupedWorkouts {
    [key: string]: any[];
  }

  const groupedWorkouts: GroupedWorkouts = {};

  workouts.forEach(plan => {
    if (!groupedWorkouts[plan.type]) {
      groupedWorkouts[plan.type] = [];
    }
    groupedWorkouts[plan.type].push(plan);
  });
  // End Group

  // Start Category
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category.name);
  };


  //EndCategory

  return (
    <Screen>
      <ScrollView
        style={{
          paddingHorizontal: Spacing.padding.base,
        }}
      >
        <SectionHeader title="Categories" />

        <CategoryList onSelectCategory={handleCategorySelect} />

        {Object.entries(groupedWorkouts).map(([type, plans]) => (
          (selectedCategory === type || selectedCategory === "All") && (
            <View key={type}>
              <SectionHeader title={type} />
              {plans.map((plan, index) => (
                <TouchableOpacity
                  style={{
                    padding: Spacing.padding.sm,
                    marginBottom: Spacing.margin.base,
                    backgroundColor: Colors.primary,
                    borderRadius: Spacing.borderRadius.base,
                    flexDirection: 'row',
                  }}
                  onPress={() =>
                    navigation.navigate('PlanOverview', { workout: plan })
                  }
                  key={index}
                >
                  <Image
                    source={plan.image}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: Spacing.borderRadius.base,
                    }}
                  />
                  <View
                    style={{
                      marginLeft: Spacing.margin.base,
                      justifyContent: 'space-between',
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
                      <Ionicons
                        name="calendar-outline"
                        size={16}
                        color={Colors.text}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Rating
                        rating={plan.rating}
                        max={5}
                        iconWidth={20}
                        iconHeight={20}
                      />
                      <AppText
                        style={{
                          marginLeft: Spacing.margin.sm,
                        }}
                      >
                        {plan.rating}
                      </AppText>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )
        ))}
      </ScrollView>
    </Screen>
  )
}