import Icon from "react-native-vector-icons/FontAwesome";
import { View } from "react-native";
import { useState} from "react";
import { useWatchList } from "./WatchListContext";

const AddToWatchList = ({ movie }) => {
    const { addToList, removeFromList, isMovieInWatchList } = useWatchList();
    const [removeButton, setRemoveButton] = useState(isMovieInWatchList(movie));

    const AddToWatchListButton = () => (
        <Icon.Button
            name='heart-o'
            size={36}
            color='#8b5cf6'
            backgroundColor='white'
            borderRadius={90}
            onPress={() => {
                addToList(movie);
                setRemoveButton(true);
            }}
            style={{ marginRight: 0 }}
            iconStyle={{ marginRight: 0 }}
        />
    );

    const RemoveFromWatchListButton = () => (
        <Icon.Button
            name='heart'
            size={36}
            color='#8b5cf6'
            backgroundColor='white'
            borderRadius={90}
            onPress={() => {
                removeFromList(movie);
                setRemoveButton(false);
            }}
            style={{ marginRight: 0 }}
            iconStyle={{ marginRight: 0 }}
        />
    );

    return (
        <View className='items-center justify-center'>
            {!removeButton ? <AddToWatchListButton /> : <RemoveFromWatchListButton />}
        </View>
    );
};

export default AddToWatchList;