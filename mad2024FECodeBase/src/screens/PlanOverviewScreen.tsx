import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/Button/Button';
import Screen from '@/components/Screen/Screen';
import Font from '@/constants/Font';
import { RootStackParamList } from '@/common/types';
import Colors from '@/constants/Colors';
import FontSize from '@/constants/FontSize';
import AppText from '@/components/AppText/AppText';
import IconButton from '@/components/IconButton/IconButton';
import Spacing from '@/constants/Spacing';
import { useNavigation } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'PlanOverview'>;

const PlanOverviewScreen: React.FC<Props> = ({
  route,
  navigation: { goBack },
}) => {
  const workout = route.params.workout;
  const navigate = useNavigation();

  const handlePress = () => {
    navigate.navigate('StartStartWorkout', { item: workout });
  };
  return (
    <Screen>
      <ScrollView
        style={{
          paddingHorizontal: Spacing.padding.base,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            paddingVertical: Spacing.padding.base,
            justifyContent: 'center',
          }}
        >
          <IconButton
            onPress={() => goBack()}
            style={{
              position: 'absolute',
              left: 0,
            }}
            name="chevron-back"
          />
          <AppText>Plan Overview</AppText>
        </View>
        <ImageBackground
          source={{
            uri:
              workout.image ||
              'https://ih1.redbubble.net/image.5348806661.2024/st,large,507x507-pad,600x600,f8f8f8.jpg',
          }}
          style={{
            height: 250,
            marginVertical: Spacing.margin.lg,
            borderRadius: Spacing.borderRadius.base,
            overflow: 'hidden',
            justifyContent: 'space-between',
            paddingVertical: Spacing.padding.base,
          }}
        >
          <View
            style={{
              paddingHorizontal: Spacing.padding.base,
              alignItems: 'flex-end',
            }}
          >
            <IconButton
              name="bookmark-outline"
              style={{
                backgroundColor: Colors.primary,
                borderWidth: 0,
              }}
            />
          </View>
          <View
            style={{
              borderRadius: Spacing.borderRadius.base,
              overflow: 'hidden',
              marginHorizontal: Spacing.margin.lg,
            }}
          >
            <BlurView
              tint="dark"
              intensity={Platform.OS === 'android' ? 100 : 80}
              style={{
                padding: Spacing.padding.base,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <AppText
                  style={{
                    fontFamily: Font['Poppins_SemiBold'],
                    color: Colors.accent,
                    marginRight: Spacing.margin.base,
                  }}
                >
                  {workout.minutes || workout.exerciseCollectionDetails.length}
                </AppText>
                <AppText
                  style={{
                    fontSize: FontSize.sm,
                  }}
                >
                  minutes
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <AppText
                  style={{
                    fontFamily: Font['Poppins_SemiBold'],
                    color: Colors.accent,
                    marginRight: Spacing.margin.base,
                  }}
                >
                  {workout.calories}
                </AppText>
                <AppText
                  style={{
                    fontSize: FontSize.sm,
                  }}
                >
                  calories
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <AppText
                  style={{
                    fontFamily: Font['Poppins_SemiBold'],
                    color: Colors.accent,
                    marginRight: Spacing.margin.base,
                  }}
                >
                  {workout?.exerciseCollectionDetails?.length}
                </AppText>
                <AppText
                  style={{
                    fontSize: FontSize.sm,
                  }}
                >
                  exercises
                </AppText>
              </View>
            </BlurView>
          </View>
        </ImageBackground>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <AppText
            style={{
              fontSize: FontSize.lg,
              fontFamily: Font['Poppins_SemiBold'],
            }}
          >
            {workout.name}
          </AppText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons name="star" size={20} color={Colors.yellow} />
            <AppText
              style={{
                marginLeft: Spacing.margin.sm,
              }}
            >
              {workout.rating || 5}
            </AppText>
          </View>
        </View>
        <AppText
          style={{
            marginTop: Spacing.margin.sm,
          }}
        >
          {workout.coach}
        </AppText>
        <AppText
          style={{
            marginTop: Spacing.margin.base,
            fontFamily: Font['Poppins_SemiBold'],
          }}
        >
          Description
        </AppText>
        <AppText
          numberOfLines={3}
          style={{
            marginTop: Spacing.margin.sm,
            fontFamily: Font['Poppins_Regular'],
          }}
        >
          {workout.description ||
            'The dumbbell shoulder press is a compound exercise that primarily targets the deltoid muscles of the shoulders, as well as the triceps. To perform this exercise, start by sitting on a sturdy bench with a backrest, holding a dumbbell in each hand at shoulder height, palms facing forward. Engage your core muscles to stabilize your body.'}
        </AppText>
        <AppText
          style={{
            marginVertical: Spacing.margin.base,
            fontFamily: Font['Poppins_SemiBold'],
          }}
        >
          Exercises ({workout?.exerciseCollectionDetails.length || 0})
        </AppText>

        {workout.exerciseCollectionDetails.map((exercise) => (
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              borderRadius: Spacing.borderRadius.base,
              marginBottom: Spacing.margin.lg,
              padding: Spacing.padding.base,
              flexDirection: 'row',
            }}
            key={exercise.exercise.id}
          >
            <Image
              source={{ uri: exercise.exercise.animation }}
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
                {exercise.exercise.name}
              </AppText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Ionicons name="time-outline" size={16} color={Colors.text} />
                <AppText
                  style={{
                    fontFamily: Font['Poppins_Regular'],
                    marginLeft: Spacing.margin.sm,
                  }}
                >
                  {exercise.exercise.timer}s / {exercise.exercise.rep} set
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Ionicons name="play" size={16} color={Colors.accent} />
                <AppText
                  style={{
                    fontFamily: Font['Poppins_Regular'],
                    marginLeft: Spacing.margin.sm,
                  }}
                >
                  Play
                </AppText>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <LinearGradient
        style={{
          position: 'absolute',
          width: '100%',
          paddingBottom: Spacing.padding.xxl,
          paddingTop: Spacing.padding.sm,
          bottom: -60,
          paddingHorizontal: Spacing.padding.base,
        }}
        colors={[`rgba(0,0,0,0)`, 'black']}
      >
        <Button onPress={handlePress}>Start Workout</Button>
      </LinearGradient>
    </Screen>
  );
};

export default PlanOverviewScreen;

const styles = StyleSheet.create({});
