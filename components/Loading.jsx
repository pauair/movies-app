import { View, Text, ActivityIndicator } from 'react-native';

const Loading = () => {

    return (
        <View className='items-center py-96 bg-black'>
            <ActivityIndicator size='large' color='fff' />
            <Text className='m-4 text-xl font-semibold text-white'>Loading...</Text>
        </View>
    );
};

export default Loading;
