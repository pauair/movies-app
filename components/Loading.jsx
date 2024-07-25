import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Loading = () => {

    const insets = useSafeAreaInsets();
    return (
        <View
            className='items-center pl-2 pr-2'
            style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        >
            <Text className='text-lg'>Loading...</Text>
        </View>
    );
};

export default Loading;
