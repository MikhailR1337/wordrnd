import { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, Pressable } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Word } from "../WordList";
import { RootStackComponent } from "..";


export const AddWord:  RootStackComponent<'AddWord'> = ({ navigation }) => {
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
        const newList = [
            {
                word: newWord?.trim(),
                translate: newTranslation?.trim(),
                isActive: true,
                id: `${newWord}#${newTranslation}${Math.random() * 1000}`},
                ...wordsList,
        ]
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
});