import React, { useState,useEffect } from 'react'
import {StyleSheet,View,Image,Text,Pressable,props, TextInput,SafeAreaView,ScrollView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckedoutProductScreen from './CheckedoutProductScreen'
import medxbidConfig from '../medxbid.config';
import ProductScreen from './ProductScreen';
import HeaderScreen from './HeaderScreen';
import FooterScreen from './FooterScreen';



const CheckoutScreen = ({route,navigation}) => {


  const {rcart,products} = route.params;
  const [cartQty, setCartQty] = useState(0);
  const [cart, setCart] = useState({});  
  const [bidRequests, setBidRequests] = useState([]);
  useEffect(() => {
    setCart(rcart);
    
  }, []);

  const checkoutProducts = []
  {Object.entries(cart).map(([key, value], index) => {
    
   Object.entries(products).map(([id, product], index) => {
    
    if(key == product.productId){
      
       product.qty = value;
      
       checkoutProducts.push(product)
       


    }
  })} 
)}

const totalQty = checkoutProducts.reduce((sum, product) => sum + product.qty, 0);

  const handleAddToCart = (productId,qty) => {
    setCart(prevCart => {        
      const updatedCart = {...prevCart, [productId]: (prevCart[productId] || 0) + qty};
      const totalQty = Object.values(updatedCart).reduce((prev, curr) => prev + curr, 0);  
      setCartQty(totalQty);
      return updatedCart;
    });            
    
   };
   
   const handleSubtractFromCart = (productId, qty) => {
    setCart(prevCart => {
      let newQty = (prevCart[productId] || 0) - qty;
      if (newQty <= 0) {
        const newCart = { ...prevCart };
        delete newCart[productId];
        const totalQty = Object.values(newCart).reduce((prev, curr) => prev + curr, 0);
        setCartQty(totalQty);
        return newCart;
      } else {
        const updatedCart = { ...prevCart, [productId]: newQty };
        const totalQty = Object.values(updatedCart).reduce((prev, curr) => prev + curr, 0);
        setCartQty(totalQty);
        return updatedCart;
      }
    });
  };

  return (
    <SafeAreaView  style={styles.container}>
    
 <HeaderScreen navigation={navigation} qty={totalQty}/>
        <View style={styles.navbuttoncontainer}>            
        
            <ScrollView>
                {checkoutProducts.map((product, index) => (
                  <CheckedoutProductScreen 
                    key={product.productId} 
                    productId={product.productId} 
                    productName={product.productName}
                    productDesc={product.productDesc}
                    productQty={product.qty}
                    onAddToCart={handleAddToCart} 
                    onSubtractToCart={handleSubtractFromCart}
                  />
                ))}
              <Pressable style={[styles.buttonStyle]}
                onPress={() =>{          
                const bidRequest = new Object();
                const bidProducts = new Array();
                console.log(checkoutProducts.length)
                checkoutProducts.forEach(item => {
                  const products = new Object();
                  const product = new Object();
                  console.log(item)
                  product.productId = item.productId; // assign product id from checkoutProducts item
                  products.quantity = item.qty; // assign quantity from checkoutProducts item
                  products.product = product;
                  bidProducts.push(products);
                });

                bidRequest.bidProducts = bidProducts;
                
              

                
                  if (checkoutProducts.length !== 0) {
                    AsyncStorage.multiGet(['token', 'id']).then(values => {
                      const jwt = values[0][1]; // 'token' value
                      const userId = values[1][1]; // 'id' value
                  
                      if(jwt === null){
                        navigation.navigate('Login')
                      } 
                  
                      bidRequest.custUser= {"id":userId};
                        fetch(medxbidConfig.API_HOST+'/saveBidRequest', {
                          method: 'POST',
                          headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            authorization: 'Bearer ' + jwt,
                          },
                          body: JSON.stringify(bidRequest)
                        })
                          .then(response => {
                            if(response.status === 200){
                              return response.json()
                            }else if(response.status === 403){
                              AsyncStorage.removeItem('token')
                            }
                            else{
                              //setLoginError("Invalid username or password")
                            }
                          })
                          .then((data) =>{
                                setBidRequests(data)                                                         
                                const ecart = {}
                                setCart(ecart)
                                setCartQty(0)  
                                return data                              
                          }).then((data) => {
                            console.log(data.length)
                            navigation.navigate('BidRequestDashboard',{rcart:cart,products:products,bidRequests:data})
                          })
                      });
                    }
              

               
              }}
                >
                <Text style={styles.buttonText}>Submit Bid Request</Text>
            </Pressable>               
            </ScrollView>
                 
        </View>
   
        
        <FooterScreen styles={{margin: 1}} navigation={navigation} show={false}/>
    </SafeAreaView>
  )
}
 
  const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#E2EAF4'        
      },

    productContainer: {                          
      flexDirection: 'row',
      margin: 2,
      borderColor: 'red',
      borderWidth:5
    },


    navbuttoncontainer:{
        flex: 1        
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
    backgroundColor: '#022784',
    borderRadius: 10,
    height: 40,
    width: 180,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  });

export default CheckoutScreen