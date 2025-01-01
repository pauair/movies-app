import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const WatchListContext = createContext({});

export const WatchListProvider = ({ children }) => {
    const [watchList, setWatchList] = useState([]);

    const WATCHLIST_KEY = 'watchlist';

    useEffect(() => {
        const getWatchList = async () => {
            try {
                const storedWatchList = await AsyncStorage.getItem(WATCHLIST_KEY);
                if (storedWatchList) {
                    setWatchList(JSON.parse(storedWatchList));
                }
            } catch (error) {
                console.error('Error loading watchlist:', error);
            }
        };
        getWatchList();
    }, []);

    useEffect(() => {
        const saveWatchList = async () => {
            try {
                await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchList));
            } catch (error) {
                console.error('Error saving watchlist:', error);
            }
        };
        saveWatchList();
    }, [watchList]);

    const addToList = (movie) => {
        if (!isMovieInWatchList(movie)) {
            setWatchList([...watchList, movie]);
        }
    };

    const removeFromList = (movie) => {
        setWatchList(watchList.filter((item) => item.id !== movie.id));
    };

    const clearWatchList = async () => {
        try {
            await AsyncStorage.removeItem(WATCHLIST_KEY);
            setWatchList([]);
        } catch (error) {
            console.error('Error clearing watchlist:', error);
        }
    };

    const isMovieInWatchList = (movie) => {
        return watchList.some((item) => item.id === movie.id);
    };

    const toggleWatchList = (movie) => {
        if (isMovieInWatchList(movie)) {
            removeFromList(movie);
        } else {
            addToList(movie);
        }
    };

    const getWatchListCount = () => {
        return watchList.length;
    };

    const context = {
        watchList,
        getWatchList: () => watchList,
        clearWatchList,
        addToList,
        removeFromList,
        isMovieInWatchList,
        toggleWatchList,
        getWatchListCount,
    };

    return (
        <WatchListContext.Provider value={context}>
            {children}
        </WatchListContext.Provider>
    );
};

export const useWatchList = () => useContext(WatchListContext);
