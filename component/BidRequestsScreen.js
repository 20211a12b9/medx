import React from 'react'
import {StyleSheet,View,Image,Text,Pressable,props, TextInput} from 'react-native'



const BidRequestsScreen = ({navigation}) => {
  return (    
      <View style={styles.bidContainer}>  
                  
                <Text style={{marginTop: 2,padding: 1,width: 50, borderWidth:.5} }>100</Text>
                <Text style={{marginTop: 2,padding: 1,width: 80, borderWidth:.5} }>19/04/2024</Text>                
                <Text style={{marginTop: 2,padding: 1,width: 80, borderWidth:.5} }>226</Text>
        </View>
  )
}
 
  const styles = StyleSheet.create({

    bidContainer: {    
                               
      margin: 2,
      flexDirection: 'row',
      
      justifyContent: 'space-evenly'
         
    },

    descContainer:{    
      flex: 1,  
      flexDirection: 'column',          
      marginLeft: 10,
      paddingLeft: 10,
      paddingBottom: 10      
  },

    producticon: {
      height: 70,
      width: 70,
         
    },

    producttext: {
      fontSize: 18,
      margin: 1
      
      
    },

  buttonStyle: {
    backgroundColor: '#0096FF',
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 50,
    marginRight: 20,
    alignItems: 'center'
  
  },
 
  buttonText: {
    color: 'white',
    fontSize: 16    
          
  },
  });

export default BidRequestsScreen