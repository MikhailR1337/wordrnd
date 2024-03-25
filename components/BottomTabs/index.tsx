import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WordList } from '../WordList';
import { WordStudying } from '../WordStudying';
import { TabBar } from '../TabBar.tsx';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator initialRouteName="WordList" tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen name="WordList" component={WordList}/>
        <Tab.Screen name="WordStudying" component={WordStudying} options={{ unmountOnBlur: true }} />
    </Tab.Navigator>
  );
}