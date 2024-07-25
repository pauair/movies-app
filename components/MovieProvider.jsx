import React from 'react';
import { Image, View } from 'react-native';

const MovieProvider = ({ movie }) => {
    return (
        <View className='flex-row'>
            {movie.providers.US.flatrate &&
                movie.providers.US.flatrate.map((provider, index) => (
                    <Image
                    alt={provider.provider_name}
                    key={index}
                    source={{
                        uri: `https://image.tmdb.org/t/p/w500${provider.logo_path}`,
                    }}
                    style={{ width: 50, height: 50 }}
                    className='rounded-lg m-2 p-2'
                />
                ))}
        </View>
    );
};

export default MovieProvider;
