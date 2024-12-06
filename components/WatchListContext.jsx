import { createContext, useContext, useState } from 'react';

export const WatchListContext = createContext({});

export const WatchListProvider = ({ children }) => {
    const [watchList, setWatchList] = useState([]);
    
    const getWatchList = () => {
        return watchList;
    };

    const clearWatchList = () => {
        setWatchList([]);
    };

    const addToList = (movie) => {
        if (!isMovieInWatchList(movie)) {
            setWatchList([...watchList, movie]);
        }
    };

    const removeFromList = (movie) => {
        setWatchList(watchList.filter((item) => item.id !== movie.id));
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
        clearWatchList,
        addToList,
        removeFromList,
        isMovieInWatchList,
        toggleWatchList,
        getWatchList,
        getWatchListCount,
    };

    return (
        <WatchListContext.Provider value={context}>
            {children}
        </WatchListContext.Provider>
    );
};

export const useWatchList = () => useContext(WatchListContext);
