import { View, Text, ActivityIndicator } from 'react-native';

const Loading = () => {

    return (
        <View className='items-center py-80 pl-2 pr-2'>
            <ActivityIndicator size='large' color='#0000ff' />
            <Text className='text-lg bold m-4'>Loading...</Text>
        </View>
    );
};

export default Loading;
