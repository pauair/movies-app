import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Loading from '../components/Loading';
import MovieProvider from '../components/MovieProvider';
import { fetchWatchProviders, searchMovieById } from '../lib/api-movies';
import { ScrollView } from 'react-native';
import MovieRecommendations from '../components/MovieRecommendations';
import AddToWatchList from '../components/AddToWatchList';

export default function MovieCardDetail() {
    const params = useLocalSearchParams();
    const { id } = params;

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isTextVisible, setIsTextVisible] = useState(false);
    const [isHeaderVisible, setHeaderVisible] = useState(true);

    useEffect(() => {
        const getMovie = async () => {
            try {
                const data = await searchMovieById(id);
                if (data) {
                    data.providers = await fetchWatchProviders(data.id);
                    setMovie(data);
                } else {
                    console.error('No movie data found');
                }
            } catch (error) {
                console.error('Error fetching movie:', error);
            } finally {
                setLoading(false);
            }
        };
        getMovie();
    }, [id]);

    const handleScroll = (event) => {
        const scrollOffsetY = event.nativeEvent.contentOffset.y;
        setHeaderVisible(scrollOffsetY <= 10);
    };

    const switchTextVisibility = () => setIsTextVisible(!isTextVisible);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    if (loading) {
        return <Loading />;
    }

    if (!movie) {
        return (
            <View className='p-6 bg-black'>
                <Text className='text-4xl font-black text-white'>
                    Movie not found
                </Text>
            </View>
        );
    }

    return (
        <View
            key={id}
            className='min-h-full min-w-full px-4 py-4 bg-black items-center'
        >
            <Stack.Screen
                options={{
                    headerTitle: movie.title,
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: 'white',
                        fontSize: 20,
                    },
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTransparent: true,
                    headerRight: () => null,
                    headerShown: isHeaderVisible,
                }}
            />
            <ScrollView className='pt-12' onScroll={handleScroll}>
                <Pressable
                    style={{
                        width: 380,
                        height: 440,
                    }}
                    onPressIn={switchTextVisibility}
                    onPressOut={switchTextVisibility}
                >
                    {!isTextVisible ? (
                        <View className='border-r-2 bg-lime-600 ml-2 border-white absolute z-10 rounded-full w-20 h-20 items-center justify-center'>
                            <Text className='text-sm font-bold text-center text-white'>
                                Rating:
                            </Text>
                            <Text className='text-4xl font-extrabold text-center text-white'>
                                {movie.vote_average.toFixed(1)}
                            </Text>
                        </View>
                    ) : (
                        <View className='bg-zinc-900 border-r-2 ml-2 border-white absolute z-10 rounded-full w-20 h-20 items-center justify-center'>
                            <Text className='text-sm font-bold text-center text-white'>
                                Votes:
                            </Text>
                            <Text className='text-3xl font-extrabold text-center text-white'>
                                {movie.vote_count}
                            </Text>
                        </View>
                    )}
                    <Image
                        className='text-white mt-2'
                        alt={movie.title}
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                        }}
                        style={{
                            width: 315,
                            height: 440,
                            borderRadius: 16,
                            alignSelf: 'center',
                            backgroundColor: 'grey',
                        }}
                    ></Image>
                </Pressable>
                <View className='absolute ml-72 mt-4'>
                    <AddToWatchList movie={movie} />
                </View>
                <Text className='text-2xl mx-4 p-6 font-semibold italic text-center text-zinc-200 rounded-xl border-b border-zinc-200'>
                    {movie.tagline}
                </Text>
                <Text className='text-base font-light p-2 text-white text-center'>
                    Release date: {formatDate(movie.release_date)}
                </Text>

                <View className='p-8 mt-2'>
                    <Text className='pb-2 text-xl font-medium text-white'>
                        Description:
                    </Text>
                    <Text className='text-xl font-light text-white'>
                        {movie.overview}
                    </Text>
                </View>
                <View className='flex-row flex-wrap p-2 text-white justify-center'>
                    {movie.genres.map((genre) => (
                        <Text
                            key={genre.id}
                            className='p-2 text-base m-2 border border-violet-300 rounded-lg text-violet-300'
                        >
                            {genre.name}
                        </Text>
                    ))}
                </View>
                <View className='flex-row justify-center bg-black p-8'>
                    {movie.providers && movie.providers.US ? (
                        <MovieProvider movie={movie} />
                    ) : (
                        <Text className='text-base font-thin text-white'>
                            No providers found for this title
                        </Text>
                    )}
                </View>
                {<MovieRecommendations movieId={movie.id} />}
            </ScrollView>
        </View>
    );
}
