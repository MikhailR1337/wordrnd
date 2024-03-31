import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WordStudying } from '../WordStudying';
import { TabBar } from '../TabBar.tsx';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Vocabulary } from '../Vocabulary';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <View style={styles.container}>
        <Tab.Navigator initialRouteName="Vocabulary" tabBar={(props) => <TabBar {...props} />}>
            <Tab.Screen name="Vocabulary" component={Vocabulary} options={{ headerShown: false }}/>
            <Tab.Screen name="WordStudying" component={WordStudying} options={{ headerShown: false, unmountOnBlur: true }} />
        </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    width: '100%'
  },
});
