import { View, Text, StyleSheet, Alert, Pressable,Image } from "react-native";
import React, { useState,useContext } from "react";
import { TextInput, Touchable, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Checkbox } from 'expo-checkbox';
import { SafeAreaView } from "react-native-safe-area-context";

import medxbidConfig from "../medxbid.config";

import {AppContext} from '../AppContext';
const LoginScreen = ({ navigation }) => {

  const [emailMobile, setEmailMobile] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [loginError, setLoginError] = useState("")
  const { setIsLoggedIn} = useContext(AppContext);

  const submit = () => {

    if (emailMobile === "") {
      setEmailError("Please enter your  mobile number")
    }else if(password === ""){
      setPasswordError("Please enter your password")
    }else{

        fetch(medxbidConfig.API_HOST+'/authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: emailMobile,
        password: password,
      })})
      .then(response =>
        {
            if(response.status === 200){
              return response.json()
            }
            else{
              setLoginError("Invalid username or password")
            }
      }
        )
      .then(json => {
        try {
           AsyncStorage.setItem(
            'token',
            json.jwt,
          );
          AsyncStorage.setItem(
            'id',
            JSON.stringify(json.userId),
          );
          setIsLoggedIn(true);
          // navigation.navigate('Home')
        } catch (error) {
          console.log(error)
        }
        
      })  
      .catch(error => {
        setLoginError("Invalid username or password")
      });
    }
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
    
      <View style={styles.header}>
        <Text
          style={styles.mainHeader}>
          Welcome To MedXBid!
        </Text>
 
      </View>
      <View style={{ color: '#022784',height:'20%',justifyContent:'center' }}>
      <Image
          style={styles.applogin}
          source={require('../assets/mxb_logo.png')}      
        />
      </View>

      <View style={styles.inputContainer}>


        <View style={styles.input}>
          <TextInput style={styles.inputStyle}
            placeholder="Enter Mobile Number"
            autoCaptalize='none'
            autoCorrect={false}
            value={emailMobile}
            onChangeText={
              (actualData) => 
                    {setEmailMobile(actualData) 
                      setEmailError("")
                    }
            }
          />
          {emailError.length > 0 &&
                  <Text  style= {styles.errorStyle}>{emailError}</Text>  
                }
        </View>
        <View style={styles.input}>
          <TextInput style={styles.inputStyle}
            placeholder="Enter Password "
            autoCaptalize='none'
            autoCorrect={false}
            secureTextEntry={true}
            value={password}
            onChangeText={
              (actualData) => 
              {
              setPassword(actualData)
              setPasswordError("")
              }} 
              />
            {passwordError.length > 0 &&
            
            <Text style= {styles.errorStyle}>{passwordError}</Text> 
          }
        </View>


        <Pressable style={[styles.buttonStyle]}
          onPress={() =>
            submit()
            }
         >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        {loginError.length > 0 &&
            
            <Text style= {styles.errorStyle}>{loginError}</Text> 
          }
        <View style={styles.wrapper}>
          <Text style={styles.wrapperText}>Don't have an account? <Text style={{ color: '#022784' , borderBottomColor:'#12E6CD',borderBottomWidth: 2 }} onPress={() => navigation.navigate('Register')}>Register</Text></Text>

        </View>

      </View>
    
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  mainHeader: {
    fontSize: 20,
    color: "white",    
    paddingTop: 20,
    paddingBottom: 15,
  },
  labels: {
    fontSize: 20,
    color: 'white',
    //marginTop: 10,
    //marginBottom: 5,
    lineHeight: 25    
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    marginTop: 50

  },
  input: {
    borderRadius: 15,
    borderRightColor: 'black',
    width: '60%',
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 10,
  },
  inputStyle: {

    justifyContent: 'center',
    alignItems: 'center',
    color: '#022784',    
    borderBottomWidth: 1,
    borderColor: '#12E6CD',
    paddingTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 7,    
    fontSize: 15
    
  },
  errorStyle: {

    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',        
    paddingTop: 5,
    paddingHorizontal: 15,
    paddingVertical: 7,    
    fontSize: 15,
    
  },
  wrapper: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 30,
    // paddingLeft: 5,

    //justifyContent: 'space-between',
  },
  wrapperText: {
    paddingHorizontal: 10,
    //paddingLeft: 50,
    width: '100%',
    marginTop: 20,
    fontSize: 15,
    color: '#022784',
  },
  buttonStyle: {
    backgroundColor: '#12E6CD',
    borderRadius: 10,
    height: 50,
    width: 80,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#022784',
    fontSize: 20,    
  },
  header: {
    backgroundColor: '#022784',
    margin: 0,    
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'row'
  },
  footer: {
    backgroundImage: 'linear-gradient(to right, #3437eb, #eb34d9)',
    margin: 0,
    height: '10%',
    justifyContent: 'bottom'
    // flexDirection: 'row'
  },
  applogin: {      
    alignSelf: 'center',
    height: '100%',
    width: '100%',
    resizeMode: 'center'
  },
})
export default LoginScreen