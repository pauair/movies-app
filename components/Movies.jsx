import React, { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Loading from "./Loading";

import {
    fetchAllMovies,
    fetchWatchProviders,
    searchMovieByName,
} from "../lib/api-movies";
import MovieCard from "./MovieCard";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const insets = useSafeAreaInsets();

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

    return (
        <View
            className='pl-2 pr-2'
            style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        >
            <Text className='text-5xl pt-6'>Movies</Text>
            <TextInput
                placeholder='Search movie...'
                value={query}
                onChangeText={setQuery}
            />
            <Button title='Search' onPress={handleSearch} disabled={query===''}/>
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <MovieCard movie={item} />}
            />
        </View>
    );
};

export default Movies;
