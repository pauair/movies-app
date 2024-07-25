import React, { useEffect, useState } from "react";
import { Button, FlatList, Image, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  fetchAllMovies,
  fetchWatchProviders,
  searchMovieByName,
} from "../lib/api-movies";

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
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  //

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Text className='text-5xl pt-6'>Movies</Text>
      <TextInput
        placeholder='Search movie...'
        value={query}
        onChangeText={setQuery}
      />
      <Button title='Search' onPress={handleSearch} />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className='justify-center'>
            {item.poster_path && (
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={{ width: 225, height: 337.5 }}
              />
            )}
            <View>
              <Text>{item.title}</Text>
              <Text>{item.overview}</Text>
              {item.providers && item.providers.US && (
                <View>
                  {item.providers.US.flatrate &&
                    item.providers.US.flatrate.map((provider, index) => (
                      <Text key={index} className='text-purple-800'>
                        {provider.provider_name}
                      </Text>
                    ))}
                </View>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Movies;
