import React, { useEffect, useState } from "react";
import { Button, FlatList, TextInput, View } from "react-native";
import {
    fetchAllMovies,
    fetchWatchProviders,
    searchMovieByName,
} from "../lib/api-movies";
import Loading from "./Loading";
import { AnimatedMovieCard } from "./MovieCard";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

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
        <View className='pl-2 pr-2 items-center bg-black'>
            <View className='flex-row items-center justify-center p-4'>
                <TextInput
                    placeholder='Search movie...'
                    value={query}
                    onChangeText={setQuery}
                    className='py-2 mx-2 w-2/3 rounded-xl border-b-2 border-blue-300 text-center text-white '
                />
                <Button
                    className='rounded-xl py-2 mx-2 w-1/3'
                    title='Search'
                    onPress={handleSearch}
                    disabled={query === ""}
                />
            </View>
            <FlatList
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
