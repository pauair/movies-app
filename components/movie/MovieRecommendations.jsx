import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import Loading from '../common/Loading';
import { fetchMovieRecommendations } from '../../services/api-movies';

const MovieRecommendations = ({ movieId }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const getRecommendations = async () => {
            try {
                const recommendations =
                    await fetchMovieRecommendations(movieId);
                setMovies(recommendations);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        getRecommendations();
    }, [movieId]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <Text className='text-base font-thin text-white'>
                No recommendations found for this title
            </Text>
        );
    }

    return (
        <>
            {movies && movies.length !== 0 ? (
                <View className='bg-zinc-950 h-96 border-y-2 border-zinc-800 mb-8'>
                    <Text className='text-white font-semibold text-center text-xl py-6'>
                        Recommendations:
                    </Text>
                    <FlatList
                        horizontal={true}
                        data={movies}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => (
                            <Pressable className='m-4' onPress={() => router.replace(`/${item.id}`)}>
                                <View>
                                    <Image
                                        key={index}
                                        alt={item.title}
                                        source={{
                                            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                                        }}
                                        style={{ width: 150, height: 230 }}
                                    />
                                </View>
                            </Pressable>
                        )}
                    />
                </View>
            ) : (
                <Text className='text-white font-thin text-center text-xl py-6'>
                    No recommendations found for this title
                </Text>
            )}
        </>
    );
};

export default MovieRecommendations;
