import { Animated } from "react-native";
import smallAnimation from "./smallAnimation";
export default function upDownRepeatAnimation(instructionY) {
    Animated.sequence([
        smallAnimation(instructionY, 20, 500),
        smallAnimation(instructionY, 0, 200)
    ]).start(() => upDownRepeatAnimation(instructionY));
}