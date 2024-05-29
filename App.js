import React, {useState,useEffect,createContext} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TextInput,
  Text,
  Pressable,
  Dimensions
} from 'react-native';
//import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

import AsyncStorage from '@react-native-async-storage/async-storage';


import HomeScreen from './component/HomeScreen';
import CategoryHomeScreen from './component/CategoryHomeScreen';
import HeaderScreen from './component/HeaderScreen';
import LoginScreen from './component/LoginScreen';
import FooterScreen from './component/FooterScreen';
import ProductScreen from './component/ProductScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckoutScreen from './component/CheckoutScreen';
import CheckedoutProductScreen from './component/CheckoutScreen';
import BidReuestDashboardScreen from './component/BidRequestDashboardScreen'; 
import BidRequestsScreen from './component/BidRequestsScreen';
import BidSelectionScreen from './component/BidSelectionScreen';
import {AppContext} from './AppContext';




const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;




export default function App() {
 

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  let [fontsLoaded] = useFonts({
    'NanumGothic-Regular': require('./assets/fonts/NanumGothic-Regular.ttf'),
    'NanumGothic-Bold': require('./assets/fonts/NanumGothic-Bold.ttf'),
    'NanumGothic-ExtraBold': require('./assets/fonts/NanumGothic-ExtraBold.ttf'),
  });


  // if (!fontsLoaded) {
  //  // return <AppLoading />;
  // } else {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Text style={{ fontFamily: 'CustomFontName', fontSize: 25 }}>Hello, world!</Text>
  //     </View>
  //   );
  // }
  
  useEffect(() => {

    AsyncStorage.getItem('token').then((jwt) => {
      if(jwt){
        setIsLoggedIn(true);
      }
    });
  }, []);


  const AuthNavigator = () => (
    <AuthStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }} >
      <AuthStack.Screen name="Login">
        {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </AuthStack.Screen>
      {/* <AuthStack.Screen name="Signup" component={SignupScreen} /> */}
    </AuthStack.Navigator>
  );
  
  const AppNavigator = () => (
    <AppStack.Navigator initialRouteName="Home" screenOptions={{ headerTitleStyle: {display: 'none'}, headerShown: false }}>
      <AppStack.Screen name="Header" component={HeaderScreen} />
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="CategoryHome" component={CategoryHomeScreen} />
      <AppStack.Screen name="Product" component={ProductScreen} />
      <AppStack.Screen name="Checkout" component={CheckoutScreen} />
      <AppStack.Screen name="CheckoutProduct" component={CheckedoutProductScreen} />
      <AppStack.Screen name="Footer" component={FooterScreen} />
      <AppStack.Screen name="BidRequestDashboard" component={BidReuestDashboardScreen} />
      <AppStack.Screen name="BidRequests" component={BidRequestsScreen} />
      <AppStack.Screen name="BidSelection" component={BidSelectionScreen} />    
    </AppStack.Navigator>
  );
  

  return (

    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
    <View style={styles.container}>
      <NavigationContainer>
        {isLoggedIn ? 
        <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </View>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    height: screenHeight
  },
});