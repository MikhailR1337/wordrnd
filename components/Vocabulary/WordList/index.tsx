import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity, ScrollView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RootStackComponent } from "..";

export type Word = {
    word: string
    translate: string
    id: string
    isActive: boolean
}

export const WordList: RootStackComponent<'WordList'> = ({ navigation }) => {
    const [wordsList, setWordsList] = useState<Word[]>([])
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

    const handleActive = (id: string) => {
        const item =  wordsList.find((word) => word.id === id)
        if (!item) {
            return
        }
        const filteredList = wordsList.filter((word) => word.id !== id)
        const newList = [...filteredList, { ...item, isActive: !item.isActive }]
        setWordsList(newList)
        ;(async function () {
            try {
                await AsyncStorage.setItem('WordList', JSON.stringify(newList))
            } catch (e) {
                console.log('AsyncStorage, error', e)
            }
        })()
    }

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
            <View style={{ width: '100%', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, textAlign: 'right' }}>Words: {wordsList.length}</Text>
            </View>
            <ScrollView style={{ width: '100%' }}>
                <View style={[{ marginTop: 20 }, styles.wordContainer]}>
                    {wordsList.map(({word, translate, id, isActive}) => (
                        <View style={styles.wordWrapper} key={id}>
                            <View>
                                <View style={styles.word}>
                                    <Text style={styles.label}>{word}</Text>
                                    </View>
                                <View style={styles.word}>
                                    <Text style={styles.label}>{translate}</Text>   
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity style={styles.hideButton} onPress={() => handleActive(id)}>
                                    {isActive ? (
                                        <Text style={styles.hideButtonText}>Hide</Text>
                                    ) : (
                                        <Text style={styles.hideButtonText}>Show</Text>
                                    )}
                                </TouchableOpacity> 
                                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(id)}>
                                    <Text style={styles.deleteButtonText}>Delete</Text>
                                </TouchableOpacity>     
                            </View>       
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 30,
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
    wordContainer: {
        width: '100%',
    },
    hideButton: {
        backgroundColor: '#ced4da',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    hideButtonText: {
        color: '#000000',
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