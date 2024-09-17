import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Loading from '../components/Loading';
import MovieProvider from '../components/MovieProvider';
import { fetchWatchProviders, searchMovieById } from '../lib/api-movies';
import { ScrollView } from 'react-native';
import MovieRecommendations from '../components/MovieRecommendations';

export default function MovieCardDetail() {
    const params = useLocalSearchParams();
    const { id } = params;
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isTextVisible, setIsTextVisible] = useState(false);

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

    const switchTextVisibility = () => setIsTextVisible(!isTextVisible);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <View
            key={id}
            className='min-h-full min-w-full px-4 py-4 bg-black items-center'
        >
            <Stack.Screen
                options={{
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTransparent: true,
                }}
            />
            <ScrollView>
                {
                    <Text className='text-3xl m-4 p-6 font-normal text-center text-white'>
                        {movie.title}
                    </Text>
                }
                
                <Pressable
                    style={{
                        width: 380,
                        height: 440,
                    }}
                    onPressIn={switchTextVisibility}
                    onPressOut={switchTextVisibility}
                >
                    {!isTextVisible ? (
                        <View className='border-r-4 bg-lime-600 border-white absolute z-10 mx-4 rounded-full w-24 h-24 items-center justify-center'>
                            <Text className='text-base font-bold text-center text-white'>
                                Rating:
                            </Text>
                            <Text className='text-4xl font-extrabold text-center text-white'>
                                {movie.vote_average.toFixed(1)}
                            </Text>
                        </View>
                    ) : (
                        <View className='bg-lime-600 border-r-4 border-white absolute z-10 mx-4 rounded-full w-24 h-24 items-center justify-center'>
                            <Text className='text-base font-bold text-center text-white'>
                                Votes:
                            </Text>
                            <Text className='text-3xl font-extrabold text-center text-white'>
                                {movie.vote_count}
                            </Text>
                        </View>
                    )}
                    <Image className='text-white'
                        alt={movie.title}
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                        }}
                        style={{
                            width: 320,
                            height: 440,
                            borderRadius: 15,
                            alignSelf: 'center',
                            backgroundColor: 'grey',
                        }}
                    ></Image>
                </Pressable>
                
                <Text className='text-2xl mx-4 p-6 font-semibold italic text-center text-zinc-200 rounded-lg border-b border-zinc-200'>
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
                            className='p-2 text-base m-2 border border-white rounded-lg text-white'
                        >
                            {genre.name}
                        </Text>
                    ))}
                </View>
                <View className='flex-row justify-center bg-black p-8'>
                    {movie.providers && movie.providers.US ? (
                        <MovieProvider movie={movie} />
                    ) : (
                        <Text className='text-xl font-thin text-white'>
                            No providers found for this title
                        </Text>
                    )}
                </View>
                {<MovieRecommendations movieId = {movie.id} />}
            </ScrollView>
        </View>
    );
}
