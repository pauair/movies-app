import { StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Movies from './components/movie/Movies';

export default function App() {
    return (
        <SafeAreaProvider>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <StatusBar style='auto' />
                <Movies />
            </View>
        </SafeAreaProvider>
    );
}
