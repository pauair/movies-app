import { useRouter } from 'expo-router';
import IconFilm from 'react-native-vector-icons/Fontisto';

export default function FilmTrackerButton() {
    const router = useRouter();

    return (
        <IconFilm.Button
            name='film'
            size={32}
            color='white'
            backgroundColor='transparent'
            borderRadius={100}
            onPress={() => router.replace('/')}
            style={{ marginRight: 0, borderColor: '#c7246a', border: 3 }}
            iconStyle={{ marginRight: 0 }}
        />
    );
}