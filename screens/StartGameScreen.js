import React, { useState } from 'react';
import {View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import Card from '../components/Card';
import ColorTheme from '../constants/colortheme';
import Input from '../components/Input'; 
const StartGameScreen = props => {
    const [enterValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState('');
    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }
    const resetInputHandler = () => {
        setEnteredValue('');
    }
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enterValue);
        if( isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number!', 'Number has to be in range of 0 to 99.',[{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
        } else {
            setConfirmed(true);
            setSelectedNumber(chosenNumber);
            setEnteredValue('');
        }
    };
    let confirmedOutput;
    if(confirmed) {
    confirmedOutput = (
    <Card style={styles.summaryContainer}>
        <View style={styles.numberContainer}><Text style= {styles.number}>{selectedNumber}</Text></View>
        <View style={styles.startbutton}><Button color='blue' title="Start Game" onPress={() => props.onStartGame(selectedNumber)}/></View>
    </Card>
    )
    }
    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
                <Input style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType="number-pad" maxLength={2} onChangeText={numberInputHandler} value={enterValue}/>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttons}><Button color={ColorTheme.secondary} title="Reset" onPress={resetInputHandler}/></View>
                    <View style={styles.buttons}><Button color={ColorTheme.primary} title="Confirm" onPress={confirmInputHandler}/></View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    buttons: {
        width: '40%'
    },
    input: {
        width: 50,
        textAlign: 'center',
        justifyContent: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    startbutton: {
        width: '50%',
        paddingVertical: 10
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
});
export default StartGameScreen;