import Icon from "react-native-vector-icons/FontAwesome";
import { View } from "react-native";
import { useState } from "react";

export function AddToList(movie) {
    console.log("Adding to watch list: ", movie);
}

export function RemoveFromList(movie) {
    console.log("Removing from watch list: ", movie);
}

export function AddToWatchList(movie) {
    const [removeButton, setRemoveButton] = useState(false);

    const AddToWatchListButton = () => (
        <Icon.Button
            name='heart-o'
            size={36}
            color='red'
            backgroundColor='white'
            borderRadius={15}
            onPress={() => {
                AddToList(movie);
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
            color='red'
            backgroundColor='white'
            borderRadius={15}
            onPress={() => {
                RemoveFromList(movie);
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
}
