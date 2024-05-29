import { useEffect,useContext } from 'react';
import React , { useState } from 'react'
import {StyleSheet,View,Pressable,TextInput,props,SafeAreaView,ScrollView,Image,Text,Dimensions} from 'react-native'
import HeaderScreen from './HeaderScreen';
import FooterScreen from './FooterScreen';
import ProductScreen from './ProductScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import medxbidConfig from '../medxbid.config';
import {AppContext} from '../AppContext';



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CategoryHomeScreen = ({route,navigation}) => {



  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const rcart = route.params?.rcart ?? {};
  
  const [cartQty, setCartQty] = useState(0);
  const [cart, setCart] = useState({});  
  const { setIsLoggedIn} = useContext(AppContext);

  useEffect(() => {
    setCart(rcart);
    if(Object.keys(rcart).length === 0){
      setCartQty(0)
    }
   
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('token').then((jwt) => {
      if(jwt === null){
        navigation.navigate('Login')
      }
      fetch(medxbidConfig.API_HOST+'/nproductsforcategory/'+route.params.categoryId, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + jwt,
        }})
        .then(response => {
          if(response.status === 200){
            return response.json()
          }else if(response.status === 403){
            setIsLoggedIn(false)
            AsyncStorage.removeItem('token')
          }
          else{
            //setLoginError("Invalid username or password")
          }
        })
        .then((data) =>{
          setProducts(data) // set the products state here
          //setCategories([...new Set(data.map(product => product.category.id))]);
          // setCategories([...new Set(data.map(product => JSON.stringify(product.productCategory)))].map(item => JSON.parse(item)));
          // console.log(categories.length)
          // data.forEach(async (product) => {
          //   await AsyncStorage.setItem(`product_${product.productId}`, JSON.stringify({ productId: product.productId, productName: product.productName }));
          // });

        })
    });
  }, []);

    try {

                
     } catch (error) {
       console.log(error)
     }




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

        <SafeAreaView style={styles.container}>
              <View style={styles.container}>
                  <HeaderScreen navigation={navigation} qty={cartQty} setProducts={setProducts} showSearch={true}/>
                  <ScrollView key={route.params.categoryId}>
                      <Text style={{fontFamily: 'NanumGothic-ExtraBold',fontSize:20, marginBottom:5,borderBottomColor:'#12E6CD',borderBottomWidth: 2}}>{route.params.categoryName}</Text>
                      <ScrollView showsHorizontalScrollIndicator={true} >
                        {products.map((product) => (
                          <ProductScreen key={product.productId} productId={product.productId} productName={product.productName} productDesc={product.productDesc} onAddToCart={handleAddToCart} onSubtractToCart={handleSubtractFromCart}/>
                        ))}
                    </ScrollView>
                    </ScrollView>
                    <FooterScreen styles={{margin: 1}} navigation={navigation} cart={cart} products={products} show={true}/>
          </View>
    </SafeAreaView>
    );
  }; 

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      width:'100%',
      justifyContent: 'center',
      alignContent: 'center',
      width: screenWidth,
      height: screenHeight
    },
    navbuttoncontainer:{
        flex: 1,
        flexDirection: 'row', 
        marginBottom: 5 ,
        justifyContent:'center',
        alignItems:'center'     

    },
    navbutton:{
        height: '100%',
        width: '50%',
        justifyContent: "center",
        alignItems:"center",
        margin: 2,
       
    },
    floatingbutton:{
        width: 60,  
        height: 60,   
        borderRadius: 0,                                                     
        position: 'absolute',                                          
        bottom: 580,                                                    
        right: 0, 
    },
    producticon: {
        height:'70%',
        width: '70%',
        resizeMode: 'contain',
           
      },
      categorytext: {
        fontFamily:'NanumGothic-Bold', 
        fontSize: 20, 
        color:'#022784',
           
      }
    

});
export default CategoryHomeScreen