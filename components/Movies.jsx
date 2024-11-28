import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import {
    fetchAllMovies,
    fetchWatchProviders,
    searchMovieByName,
} from '../lib/api-movies';
import Loading from './Loading';
import { AnimatedMovieCard } from './MovieCard';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [isVisibleSearch, setIsVisibleSearch] = useState(true); 

    useEffect(() => {
        const getAllMovies = async () => {
            const movies = await fetchAllMovies();
            const moviesWithProviders = await Promise.all(
                movies.map(async (movie) => {
                    const providers = await fetchWatchProviders(movie.id);
                    return { ...movie, providers };
                })
            );
            setMovies(moviesWithProviders);
            setLoading(false);
        };
        getAllMovies();
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        const movies = await searchMovieByName(query);
        const moviesWithProviders = await Promise.all(
            movies.map(async (movie) => {
                const providers = await fetchWatchProviders(movie.id);
                return { ...movie, providers };
            })
        );
        setMovies(moviesWithProviders);
        setLoading(false);
    };

    if (loading) {
        return <Loading />;
    }

    const handleSearchVisibility = (event) => {
        const scrollOffsetY = event.nativeEvent.contentOffset.y;
        setIsVisibleSearch(scrollOffsetY <= 180);
    }

    return (
        <View className='pl-2 pr-2 items-center bg-black'>
            {isVisibleSearch && <View className='flex-row items-center justify-center p-2'>
                <TextInput
                    placeholder='Search for movie or actor'
                    placeholderTextColor={'grey'}
                    value={query}
                    onChangeText={setQuery}
                    className='py-2 mx-2 w-2/3 text-center text-white'
                    style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}
                />
                <Pressable
                    className='rounded-md bg-white p-2'
                    onPress={handleSearch}
                    disabled={query === ''}
                >
                    <Text className='text-sm font-medium text-violet-900'>
                        SEARCH
                    </Text>
                </Pressable>
            </View>}
            <View className='pl-2 pr-2 items-center bg-black'>
                <FlatList
                    onScroll={handleSearchVisibility}
                    data={movies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <AnimatedMovieCard movie={item} index={index} />
                    )}
                />
            </View>
        </View>
    );
};

export default Movies;
