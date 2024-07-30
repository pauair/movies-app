import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Loading from '../components/Loading';
import MovieProvider from '../components/MovieProvider';
import { searchMovieById } from '../lib/api-movies';


export default function MovieCardDetail () {

    const params = useLocalSearchParams();
    const { id } = params;
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMovie = async () => {
            try {
                const data = await searchMovieById(id);
                if (data) {
                    setMovie(data);
                    console.log('Movie data:', data);
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
        return (
            <Loading/>
        );
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
        <View key={id} className='p-6 bg-black'>
            <Text className='text-4xl font-black text-white'>
                {movie.title}
            </Text>
            <Text className='text-xl font-bold text-white'>
                {movie.overview}
            </Text>
            <View className='flex-row justify-center bg-black p-8'>
                {movie.providers && movie.providers.US && (
                    <MovieProvider movie={movie} />
                )}
            </View>
        </View>
    );
}