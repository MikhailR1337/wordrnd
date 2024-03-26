import { View, Text, StyleSheet, Pressable } from "react-native"
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'


export const TabBar = ({ state }: BottomTabBarProps) => {
    const navigation = useNavigation<any>()

    return (
        <View style={styles.container}>
            <Pressable style={styles.pressable} onPress={() => navigation.navigate(state.routes[0].name)}>
                <Text>Vocabulary</Text>
            </Pressable>
            <Pressable style={styles.pressable} onPress={() => navigation.navigate(state.routes[1].name)}>
                <Text>Studying</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      paddingBottom: 16,
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'flex-end',
      justifyContent: 'center',
      gap: 20,
    },
    pressable: {
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
    }
  });