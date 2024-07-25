import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Movies from "./components/Movies";

export default function App() {
    return (
        <SafeAreaProvider>
            <View>
                <StatusBar style='auto' />
                <Movies />
            </View>
        </SafeAreaProvider>
    );
}
