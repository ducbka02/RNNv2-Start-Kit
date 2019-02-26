import smallAnimation from "./smallAnimation";
export default function dramaticAppearanceAnimation(
    welcomeOpacity,
    instructionOpacity
) {
    smallAnimation(welcomeOpacity, 1, 1000).start(() => {
        smallAnimation(instructionOpacity, 1, 1000).start();
    });
}