import React, { useState, useRef, useEffect } from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import Card from '../components/Card';
import ColorTheme from '../constants/colortheme';

const generateRandomNumber = (max, min, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNm = Math.floor(Math.random() * (max - min)) + min;
    if(rndNm === exclude) {
        return generateRandomNumber(min,max,exclude);
    } else {
        return rndNm;
    }
}
const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomNumber(1,100,props.userChoice)
    );
    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const {userChoice, onGameOver} = props;
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds);
        }
    },[currentGuess,userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('I Don\'t think so!', 'You know its wrong...', [
                {text: 'Sorry!', style: 'cancel'}
            ]);
            return;
        }
        if(direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomNumber(currentLow.current,currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(curRounds => curRounds + 1);
    }
    
    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <View style={styles.numberContainer}>
                <Text style={styles.number}>{currentGuess}</Text>
            </View>
            <Card style={styles.buttonContainer}>
                <Button title="Lower" onPress={nextGuessHandler.bind(this, 'lower')}/>
                <Button title="Greater" onPress={nextGuessHandler.bind(this, 'greater')}/>
            </Card>
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    },
    numberContainer: {
        borderWidth: 2,
        borderColor: ColorTheme.primary,
        padding: 5,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    number: {
        fontSize: 22,
        color: ColorTheme.primary
    }
})
export default GameScreen;