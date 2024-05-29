import React, { useState } from 'react'
import {View,Image,StyleSheet,Text,TextInput,StatusBar,TouchableOpacity} from 'react-native'
import medxbidConfig from '../medxbid.config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderScreen = ({navigation,qty,setProducts,showSearch}) => {
  if(qty === undefined ){
    qty = 0
  }

  const [searchText, setSearchText] = useState('');

  const handleSearch = async () => {
    AsyncStorage.multiGet(['token', 'id']).then(values => {
      const jwt = values[0][1]; // 'token' value
      const userId = values[1][1]; // 'id' value
  
      if(jwt === null){
        navigation.navigate('Login')
      } 
        fetch(medxbidConfig.API_HOST+'/productSearch', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'text/plain',
            authorization: 'Bearer ' + jwt,
          },
          body: '%'+searchText
        })
          .then(response => {
            if(response.status === 200){
              return response.json()
            }else if(response.status === 403){
             console.log('403')
            }
            else{
              //setLoginError("Invalid username or password")
            }
          })
          .then((data) =>{
            setProducts(data);

          })
      });
  };


    return (
<View style={styles.container}>
  <TouchableOpacity style={{flex:1,flexDirection:'row',justifyContent:'center',alignContent:'stretch'}}
  onPress={() => navigation.navigate('Home')}>
  
      <Image
          style={styles.appicon}
          source={require('../assets/mxb_icon.png')}    
            
        /> 
        


  </TouchableOpacity>
  <View style={{flex:1,flexDirection:'column',justifyContent:'space-evenly'}}>
  <Text style={styles.appheadingtext}>
        MedXBid
      </Text>
      {showSearch ?
    <TextInput style={{marginTop: 1,marginBottom:1, padding: 1,backgroundColor:'white',alignContent:'stretch'} }  
          placeholder="Search" 
          keyboardType="default" 
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          /> : <></>}
  </View>
  <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignContent:'stretch'}}>
  <Image
      style={styles.carticon}
      source={require('../assets/cart.png')}
    /> 
  <Text 
    style={{
      position: 'absolute', 
      top: 15, 
      left: 40, 
      right: 0, 
      bottom: 0, 
      backgroundColor:'transparent', 
      color: '#022784', 
      textAlign: 'center',
      fontSize: 20,
      fontFamily: 'NanumGothic-ExtraBold'
    }}  
  >
    {qty}
  </Text>
</View>
      {/*  
   <Text style={styles.appheadingtext}>
     MedXBid
   </Text>
   <View>
       <TextInput style={{margin</View>Top: 2,marginBottom:2, padding: 1,borderWidth:.5} }  placeholder="Search" keyboardType="default" />
    </View>
   <Image
      style={styles.carticon}
      source={require('/medxbid/UI/assets/cart.jpeg')}
    />   */}


  
</View>

 

    );
  };


  const styles = StyleSheet.create({
    container: {    
      backgroundColor: '#022784',      
      flexDirection: 'row',
      width:'100%',
      paddingTop: StatusBar.currentHeight      
      
    },
    appheadingtext: {
      fontSize: 26,
      color: 'white',
      alignSelf:'center',
      fontFamily: 'NanumGothic-ExtraBold',
      borderBottomWidth: 1,
      borderColor:'#12E6CD'
    },
    appicon: {      
      height: '100%',
      width: '100%',
      marginRight: 10,
      resizeMode: 'contain'
    },
    carticon: {      
      height: '100%',
      width: '100%',
      marginLeft: 50,
      resizeMode: 'contain'
    }
  });
export default HeaderScreen