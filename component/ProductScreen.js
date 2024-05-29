import React from 'react'
import {StyleSheet,View,Image,Text,Pressable,props, TextInput} from 'react-native'



const ProductScreen = ({productId,productName,productDesc,onAddToCart,onSubtractToCart}) => {
   const [qty, setQty] = React.useState(0);
   
    const shortDesc = productDesc.length > 250
      ? productDesc.substring(0, 250) + '...' 
      : productDesc;
    const trimmedName = productName.trim()
    const imageName = 'tiny_logo'
    
  return (
    <View>
      <View style={styles.productContainer}>
          <View styles={{flex: 1,flexDirection:'column',borderWidth:'5'}}>
            <Image style={styles.producticon}                                       
                    source =   {{uri: 'https://medxbid.s3.ap-south-1.amazonaws.com/'+productName +'.png'}}
                    // {require('/medxbid/UI/assets/'+productName+'.png')}
            />

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput 
                style={{marginTop: 2, padding: 1, borderWidth: .2, width: 30}} 
                placeholder="Qty" 
                keyboardType="numeric" 
                onChangeText={text => setQty(parseInt(text))}
              />                                 
                             <Pressable 
                style={[styles.buttonStyle]}
                onPress={() => {   
                                                  
                  onAddToCart(productId,qty);
                }}
              >
                  <Text style={styles.buttonPText} >+</Text>
               </Pressable>
               <Pressable 
                    style={[styles.buttonStyle]}
                    onPress={() => {     

                      onSubtractToCart(productId,qty);
                    }}
                  >
                      <Text style={styles.buttonNText}>-</Text>
              </Pressable>
            </View>
           </View>   
          <View style={styles.descContainer}>
              <Text style={styles.producttext}>{productName}</Text>
              <Text style={styles.desctext} >{shortDesc}</Text>    
              
          </View>
      </View>
    </View>
  )
}
 
  const styles = StyleSheet.create({

    productContainer: {                          
      flexDirection: 'row',
      margin: 5,      
      justifyContent: 'center',
      alignContent: 'center',
      borderWidth: 0,
      borderColor: '#12E6CD'         
    },

    descContainer:{    
      flex: 1,  
      flexDirection: 'column',          
      marginLeft: 10,
      paddingLeft: 10,
      paddingBottom: 10,
      width: 225
  },

    producticon: {
      height: 70,
      width: '100%',
         
    },

    producttext: {
      fontFamily: 'NanumGothic-Bold',
      fontSize: 18,
      margin: 1,  
      borderBottomWidth: 1,
      borderBottomColor: '#12E6CD'   
    },

    desctext: {
      fontFamily: 'NanumGothic-Regular',
      fontSize: 12,
      margin: 1,
      flexWrap: 'wrap'      
    },

  buttonStyle: {
    backgroundColor: '#022784',      
    justifyContent: 'space-evenly',
    alignContent:'stretch',
    marginLeft: 2
  },
 
  buttonPText: {
    color: 'white',    
    fontSize: 18,
    margin: 2,
    padding: 2 ,     
          
  },

  buttonNText: {
    color: 'white',    
    fontSize: 18,    
    margin: 2,
    padding: 2 ,           
  }
});


export default ProductScreen