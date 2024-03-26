import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity, ScrollView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'

export type Word = {
    word: string
    translate: string
    id: string
}

export const WordList = () => {
    const [wordsList, setWordsList] = useState<Word[]>([])
    const [newWord, setNewWord] = useState('');
    const [newTranslation, setNewTranslation] = useState('');
    useEffect(() => {
        (async function () {
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
    const handleAddWord = () => {
        if (!newWord.trim().length || !newTranslation.trim().length) {
            return
        }
        const newList = [{word: newWord?.trim(), translate: newTranslation?.trim(), id: `${newWord}#${newTranslation}`}, ...wordsList]
        setWordsList(newList)
        setNewTranslation('')
        setNewWord('')
        ;(async function () {
            try {
                await AsyncStorage.setItem('WordList', JSON.stringify(newList))
            } catch (e) {
                console.log('AsyncStorage, error', e)
            }
        })()
    };
    const handleDelete = (id: string) => {
        const newList = wordsList.filter((word) => word.id !== id)
        setWordsList(newList)
        ;(async function () {
            try {
                await AsyncStorage.setItem('WordList', JSON.stringify(newList))
            } catch (e) {
                console.log('AsyncStorage, error', e)
            }
        })()
    }
    return (
        <View style={styles.container}>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your word"
                    value={newWord}
                    onChangeText={text => setNewWord(text)}
                />
            </View>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter the word translation"
                    value={newTranslation}
                    onChangeText={text => setNewTranslation(text)}
                />
            </View>
            <View style={styles.inputWrapper}>
                <TouchableOpacity style={styles.addButton} onPress={handleAddWord}>
                    <Text style={styles.addButtonText}>ADD</Text>
                </TouchableOpacity>
            </View>
            <View style={[{ marginTop: 20 }, styles.inputWrapper]}>
                {wordsList.map(({word, translate, id}) => (
                    <View style={styles.wordWrapper} key={id}>
                        <View>
                            <View style={styles.word}>
                                <Text style={styles.label}>{word}</Text>
                                </View>
                            <View style={styles.word}>
                                <Text style={styles.label}>{translate}</Text>   
                            </View>
                        </View>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(id)}>
                                <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>             
                    </View>
                ))}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexGrow: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    wordWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        padding: 4,
        marginBottom: 20,
    },
    word: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 4,
    },
    label: {
        fontSize: 18,
    },
    inputWrapper: {
        width: '100%',
        paddingHorizontal: 30,
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
    buttonsWrapper: {
        flexDirection:'column',
        columnGap: 10,
        flexGrow: 1,
        width: '100%',
    },
    addButton: {
        backgroundColor: '#007bff',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#D22B2B',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});