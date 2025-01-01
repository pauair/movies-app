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
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchVisible, setSearchVisible] = useState(true);

    const flatListRef = useRef(null);
    const debounceTimeout = useRef(null);

    useEffect(() => {
        const getAllMovies = async () => {
            setLoading(true);
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

    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(async () => {
            if (searchQuery === '') {
                const movies = await fetchAllMovies();
                const moviesWithProviders = await Promise.all(
                    movies.map(async (movie) => {
                        const providers = await fetchWatchProviders(movie.id);
                        return { ...movie, providers };
                    })
                );
                setMovies(moviesWithProviders);
            } else {
                setLoading(true);
                const movies = await searchMovieByName(searchQuery);
                const moviesWithProviders = await Promise.all(
                    movies.map(async (movie) => {
                        const providers = await fetchWatchProviders(movie.id);
                        return { ...movie, providers };
                    })
                );
                setMovies(moviesWithProviders);
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(debounceTimeout.current);
    }, [searchQuery]);

    const toggleSearchVisibility = (event) => {
        const scrollOffsetY = event.nativeEvent.contentOffset.y;
        setSearchVisible(scrollOffsetY <= 180);
    };

    const ScrollToTopButton = () => (
        <View style={{ position: 'absolute', bottom: 50, right: 30 }}>
            <Icon.Button
                name="angle-double-up"
                size={32}
                color="#4c1d95"
                backgroundColor="white"
                borderRadius={100}
                onPress={() => {
                    if (flatListRef.current) {
                        flatListRef.current.scrollToOffset({
                            offset: 0,
                            animated: true,
                        });
                    }
                }}
                style={{ marginHorizontal: 0, marginVertical: 0 }}
                iconStyle={{ marginHorizontal: 9, marginVertical: 4 }}
            />
        </View>
    );

    return (
        <View className="px-2 py-2 items-center bg-black" style={{ flex: 1 }}>
            <View className="flex-row items-center justify-center p-1 bg-black rounded-lg">
                <TextInput
                    placeholder="Search for movie or actor"
                    placeholderTextColor="grey"
                    value={query}
                    onChangeText={(text) => {
                        setQuery(text);
                        setSearchQuery(text);
                    }}
                    className="mx-2 w-2/3 text-center text-white"
                    style={{
                        borderBottomColor: 'grey',
                        borderBottomWidth: 1,
                    }}
                />
                <Pressable
                    className="rounded-md bg-white p-2"
                    disabled={query === ''}
                    onPress={() => setSearchQuery(query)}
                >
                    <Text className="text-sm font-medium text-violet-900">
                        SEARCH
                    </Text>
                </Pressable>
            </View>

            {loading && <Loading />}

            <FlatList
                ref={flatListRef}
                onScroll={toggleSearchVisibility}
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <AnimatedMovieCard movie={item} index={index} />
                )}
                contentContainerStyle={{ paddingBottom: 100 }} 
            />
            {!searchVisible && <ScrollToTopButton />}
        </View>
    );
};

export default Movies;
