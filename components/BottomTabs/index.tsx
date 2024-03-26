import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WordList } from '../WordList';
import { WordStudying } from '../WordStudying';
import { TabBar } from '../TabBar.tsx';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const WordListHeader = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Manage words</Text>
      </View>
    </SafeAreaView>
  )
}

const WordStudyingHeader = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Improve vocabulary</Text>
      </View>
    </SafeAreaView>
  )
}

export const BottomTabs = () => {
  return (
    <View style={{flex: 1, flexGrow: 1, width: '100%'}}>
      <Tab.Navigator initialRouteName="WordList" tabBar={(props) => <TabBar {...props} />}>
          <Tab.Screen name="WordList" component={WordList} options={{header: WordListHeader}}/>
          <Tab.Screen name="WordStudying" component={WordStudying} options={{ header: WordStudyingHeader, unmountOnBlur: true }} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 25,
    flexGrow: 1,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  }
});
