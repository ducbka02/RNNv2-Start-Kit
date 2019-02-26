import { Animated } from "react-native";
import smallAnimation from "./smallAnimation";
export default function SequenceAnimation(
    stateValTo,
    to,
    durationGo,
    stateValFrom,
    from,
    durationReturn
) {
    return Animated.sequence([
        smallAnimation(stateValTo, to, durationGo),
        smallAnimation(stateValFrom, from, durationReturn)
    ]);
}