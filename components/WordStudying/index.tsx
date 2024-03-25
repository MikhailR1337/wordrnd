import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native"
import { Word } from "../WordList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, getFocusedRouteNameFromRoute } from '@react-navigation/native';


export const WordStudying = () => {
    const [wordsList, setWordsList] = useState<Word[]>([])
    const [currentWord, setCurrentWord] = useState<Word>()
    const [answer, setAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    useEffect(() => {
        ;(async function () {
            try {
                const wordsSaved = await AsyncStorage.getItem('WordList')
                if (wordsSaved) {
                    setWordsList(JSON.parse(wordsSaved))
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
                <View>
                    <Text style={{marginBottom: 10}}>{currentWord?.word}</Text>
                    <Text style={styles.label}>Write answer</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter the answer"
                        value={answer}
                        onChangeText={text => setAnswer(text)}
                    />
                </View>
                <TouchableOpacity style={styles.addButton} onPress={handleCheckResult}>
                        <Text style={styles.addButtonText}>Check</Text>
                </TouchableOpacity>
                {isCorrect !== null ? (
                     <Text style={styles.label}>{isCorrect ? 'correct' : 'wrong'}</Text>
                ) : null}
                </>
            ): (
                <TouchableOpacity style={styles.addButton} onPress={handleCurrentWord}>
                    <Text style={styles.addButtonText}>Try</Text>
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
    addButton: {  
        backgroundColor: '#007bff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
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
  });