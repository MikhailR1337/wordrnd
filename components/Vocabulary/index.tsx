import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { WordList } from './WordList';
import { AddWord } from './AddWord';
import {Text, StyleSheet, Pressable, View} from 'react-native'
import { Ionicons } from '@expo/vector-icons';


const Stack = createStackNavigator();

type RootStackParamList = {
    WordList: undefined;
    AddWord: undefined;
};

export type RootStackComponent<RouteName extends keyof RootStackParamList> = React.FC<{
    navigation: StackNavigationProp<RootStackParamList, RouteName>,
}>

export const Vocabulary = () => {
    return (
        <Stack.Navigator
            initialRouteName="WordList"
            >
            <Stack.Screen
                name="WordList"
                component={WordList}
                options={{ header: ({ navigation }) => (
                    <View style={styles.container}>
                        <Pressable onPress={() => navigation.navigate('AddWord')} style={styles.button}>
                            <Ionicons name="add-circle" size={24} color="black" />
                        </Pressable>
                    </View>
                )}}
            />
            <Stack.Screen
                name="AddWord"
                component={AddWord}
                options={{ header: ({ navigation }) => (
                    <View style={styles.container}>
                        <Pressable onPress={navigation.goBack} style={styles.button}>
                            <Ionicons name="arrow-back-circle" size={24} color="black" />
                        </Pressable>
                    </View>
                )}}
            />
        </Stack.Navigator>
    );


}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexGrow: 1,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#000000',
        marginLeft: 20,
        marginTop: 20,
        width: 44,
        height: 44,
    },
});