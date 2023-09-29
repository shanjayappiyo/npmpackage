import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import ChatScreen from './src/screens/ChatScreen';
import IndividualChat from './src/screens/IndividualChat';
import MyContext from './globalcontext';
import { testChats } from './src/services/api';
import { requestUserPermission, notificationListener } from './src/components/pushnotifications';


// const firebaseConfig = {
//   apiKey: 'AIzaSyAWcmxdgeCIZT758U55X5JC0iDWLlxe-wM',
//   projectId: 'twixor-agent-1b7a4',
//   storageBucket: 'twixor-agent-1b7a4.appspot.com',
//   appId: '1:523146334682:ios:3e175373bf7bd28550f0e3',
//   databaseURL: '',
//   messagingSenderId: '',
// };

// firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

let App = () => {
  const [myData, setMyData] = React.useState('Initials');

  React.useEffect(() => {
    // testChats().then((jsonData) => {
    //   setMyData(jsonData);
    // });
    requestUserPermission();
    notificationListener();
  }, []);


  return (
    <SafeAreaProvider>
      <MyContext.Provider value={{ myData, setMyData }}>
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChatScreen"
              component={ChatScreen}
              options={{ headerShown: false }}
            /> */}
            <Stack.Screen
              name="IndividualChat"
              component={IndividualChat}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MyContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;
