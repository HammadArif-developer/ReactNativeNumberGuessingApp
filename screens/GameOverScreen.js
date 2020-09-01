import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Game is Over!</Text>
            <Text>Your Number Was :{props.userNumber}</Text>
            <Text>Computer Guessed it in: {props.roundsNumber}</Text>
            <Button title="New Game" onPress={props.restartGame}/>
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default GameOverScreen;