import { createContext, useState, useContext } from "react";

export const WatchListContext = createContext({});

export const WatchListProvider = ({ children }) => {
    const [watchList, setWatchList] = useState([]);

    const clearWatchList = () => {
        setWatchList([]);
    };

    const addToList = (movie) => {
        if (!isMovieInWatchList(movie)) {
            setWatchList([...watchList, movie]);
            console.log("Adding from watch list: ", movie);
        }
    };

    const removeFromList = (movie) => {
        setWatchList(watchList.filter((item) => item !== movie));
        console.log("Removing from watch list: ", movie);
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

    const getWatchList = () => {
        return watchList;
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
        <WatchListContext.Provider value={ context }>
            {children}
        </WatchListContext.Provider>
    );
};

export const useWatchList = () => useContext(WatchListContext);
