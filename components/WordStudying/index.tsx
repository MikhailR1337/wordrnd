import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native"
import { Word } from "../WordList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'


export const WordStudying = () => {
    const [wordsList, setWordsList] = useState<Word[]>([])
    const [currentWord, setCurrentWord] = useState<Word>()
    const [answer, setAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const navigation = useNavigation<any>()
    useEffect(() => {
        ;(async function () {
            try {
                const wordsSaved = await AsyncStorage.getItem('WordList')
                if (wordsSaved) {
                    setWordsList(JSON.parse(wordsSaved).filter((item: Word) => item?.isActive))
                }
            } catch (e) {
                console.log('AsyncStorage, error', e)
            }
        })()
    }, [])
    useEffect(() => {
        handleCurrentWord();
    }, [wordsList])
    const handleCurrentWord = () => {
        setCurrentWord(wordsList[Math.floor(Math.random() * (wordsList.length))])
    }
    const handleCheckResult = () => {
        if (answer.trim().toLowerCase() === currentWord?.translate?.trim().toLowerCase()) {
            setIsCorrect(true)
        } else {
            setIsCorrect(false)
        }
        setTimeout(() => {
            handleCurrentWord()
            setAnswer('')
            setIsCorrect(null)
        }, 3000)
    }
    return (
        <View style={styles.container}>
            {currentWord?.word ? (
                <>
                    <View style={styles.inputWrapper}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.title}>{currentWord?.word}</Text>
                            {isCorrect === false && (
                                <Text style={styles.title}> - {currentWord?.translate}</Text>
                            )}
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter the answer"
                            value={answer}
                            onChangeText={text => setAnswer(text)}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TouchableOpacity
                            style={
                                [styles.checkButton,
                                isCorrect === true && { backgroundColor: '#097969' },
                                isCorrect === false && { backgroundColor: '#D22B2B' }]
                            }
                            onPress={handleCheckResult}
                        >
                            {isCorrect !== null ? (
                                <Text style={styles.checkButtonText}>{isCorrect ? 'correct' : 'wrong'}</Text>
                            ) : (
                                <Text style={styles.checkButtonText}>Check</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </>
            ): (
                <TouchableOpacity style={styles.checkButton} onPress={() => navigation.navigate('WordList')}>
                    <Text style={styles.checkButtonText}>Fill your vocabulary...</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkButton: {  
        backgroundColor: '#007bff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    checkButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        marginBottom: 10,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        fontSize: 16,
        marginBottom: 15,
    },
    inputWrapper: {
        width: '100%',
        paddingHorizontal: 30,
    },
  });