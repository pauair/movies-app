import React, { useEffect, useState, useRef } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
    const [searchVisible, setSearchVisible] = useState(true);
    
    const flatListRef = useRef(null);

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

    const toggleSearchVisibility = (event) => {
        const scrollOffsetY = event.nativeEvent.contentOffset.y;
        setSearchVisible(scrollOffsetY <= 180);
    };

    const ScrollToTopButton = () => {
        return (
            <Icon.Button
                name='angle-double-up'
                size={34}
                color='#4c1d95'
                backgroundColor='white'
                borderRadius={80}
                onPress={() => {
                        flatListRef.current.scrollToOffset({
                            offset: 0,
                            animated: true,
                        });
                }}
                style={{ marginHorizontal: 0 }}
                iconStyle={{ marginHorizontal: 8, marginVertical: 2 }}
            />
        );
    };

    return (
        <View className='px-2 py-2 items-center bg-black'>
            {searchVisible ? (
                <View className='flex-row items-center justify-center p-1 bg-black rounded-lg'>
                    <TextInput
                        placeholder='Search for movie or actor'
                        placeholderTextColor={'grey'}
                        value={query}
                        onChangeText={setQuery}
                        className='mx-2 w-2/3 text-center text-white'
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                        }}
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
                </View>
            ) : (
                <View className='fixed z-20 -bottom-3/4 left-36'>
                    <ScrollToTopButton />
                </View>
            )}
                <FlatList
                    ref={flatListRef}
                    onScroll={toggleSearchVisibility}
                    data={movies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <AnimatedMovieCard movie={item} index={index} />
                    )}
                />
            </View>
    );
};

export default Movies;
