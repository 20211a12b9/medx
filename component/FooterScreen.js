import React from 'react'
import {View,Image,StyleSheet,Text, Pressable, Button} from 'react-native'

import { TouchableOpacity } from 'react-native';


const FooterScreen = ({navigation,cart,products,show}) => {
  
  return (
    <View style={styles.header}>    
     
     {show && (
                      <Pressable style={styles.buttonStyle}  
                                onPress={() =>{
                                  if(Object.keys(cart).length > 0){
                                navigation.navigate('Checkout',{rcart:cart,products:products},)} 
                                }
                              }
                      >
                           <Text  style={styles.buttonText} >Checkout</Text>
                            <Image
                                style={styles.carticon}
                              source={require('../assets/checkout.png')}
    />               
                      </Pressable>
     )}
                      
    </View>

    );
  };


  const styles = StyleSheet.create({
    header: {      
      backgroundColor: '#022684',
      margin: 0,
      height: 40,
      alignItems: 'flex-end',
      borderWidth: 1,
      
    },
    buttonStyle: {
      backgroundColor: '#022684',      
      height: '100%',
      width: '40%',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexDirection: 'row',
    },
    buttonText: {
      color: '#12E6CD',
      fontSize: 20
    },
    carticon: {      
      height: '100%',
      width: '40%',
      resizeMode: 'contain'
    }
  });
export default FooterScreen