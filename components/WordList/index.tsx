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
            <ScrollView>
                <Text style={styles.label}>Write your new word</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your word"
                    value={newWord}
                    onChangeText={text => setNewWord(text)}
                />

                <Text style={styles.label}>Write translation</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter the word translation"
                    value={newTranslation}
                    onChangeText={text => setNewTranslation(text)}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddWord}>
                    <Text style={styles.addButtonText}>ADD</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 20 }}>
                    {wordsList.map(({word, translate, id}) => (
                        <View style={styles.wordWrapper} key={id}>
                            <View>
                                <View style={styles.word}>
                                    <Text>Word - </Text>                    
                                    <Text>{word}</Text>
                                    </View>
                                <View style={styles.word}>
                                    <Text>Translate - </Text>                    
                                    <Text>{translate}</Text>   
                                </View>
                            </View>
                            <TouchableOpacity style={styles.addButton} onPress={() => handleDelete(id)}>
                                    <Text style={styles.addButtonText}>Delete</Text>
                            </TouchableOpacity>             
                        </View>
                    ))}
                </View>
            </ScrollView>
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
        flexDirection: 'column',
        borderWidth: 1,
        padding: 4,
        marginBottom: 8,
    },
    word: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 4,
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
    buttonsWrapper: {
        flexDirection:'column',
        columnGap: 10,
        flexGrow: 1,
        width: '100%',
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
});