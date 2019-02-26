import { Animated } from "react-native";
export default function smallComponentAnimation(stateVal, to, duration) {
  return Animated.timing(stateVal, {
    toValue: to,
    duration: duration,
    //useNativeDriver: true
  });
}