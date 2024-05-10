import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import FontSize from '@/constants/FontSize';
import Spacing from '@/constants/Spacing';
import { Category, categories } from '@/data';
import AppText from '@/components/AppText/AppText';
import Colors from '@/constants/Colors';

interface CategoryListProps {
  onSelectCategory: (category: Category) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onSelectCategory }) => {
  const [active, setActive] = useState<number>(0);

  const handleCategoryPress = (category: Category) => {
    setActive(category.id);
    onSelectCategory(category);
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {[{ id: 0, name: 'All' }, ...categories].map((category) => (
        <TouchableOpacity
          //
          onPress={() => handleCategoryPress(category)}
          style={{
            paddingHorizontal: Spacing.padding.base,
            paddingVertical: Spacing.padding.sm,
            backgroundColor:
              active === category.id ? Colors.accent : Colors.primary,
            marginRight: Spacing.margin.base,
            borderRadius: Spacing.borderRadius.base,
          }}
          key={category.id}
        >
          <AppText
            style={{
              color: active === category.id ? Colors.onAccent : Colors.text,
              fontSize: FontSize.sm,
            }}
          >
            {category.name}
          </AppText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoryList;

const styles = StyleSheet.create({});
