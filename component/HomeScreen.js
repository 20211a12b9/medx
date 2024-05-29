import { useEffect,useContext } from 'react';
import React , { useState } from 'react'
import {StyleSheet,View,Pressable,TextInput,props,SafeAreaView,ScrollView,Image,Text,Dimensions,FlatList,StatusBar} from 'react-native'
import HeaderScreen from './HeaderScreen';
import FooterScreen from './FooterScreen';
import ProductScreen from './ProductScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import medxbidConfig from '../medxbid.config';
import {AppContext} from '../AppContext';
import { ImageBackground } from 'react-native-web';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HomeScreen = ({route,navigation}) => {



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
      fetch(medxbidConfig.API_HOST+'/productcategories', {
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
        //  console.log(typeof data)
          setCategories(data);
         return categories
          // data.forEach(async (product) => {
          //   await AsyncStorage.setItem(`product_${product.productId}`, JSON.stringify({ productId: product.productId, productName: product.productName }));
          // });

        })
        .then((categories) =>{
        //  console.log(categories)
        }

        )
    });
  }, []);

    try {
      console.log(typeof categories)
      console.log(categories.length)
                
     } catch (error) {
       console.log('Error is' + error)
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

    const images = {
      1: require('../assets/1.png'),
      2: require('../assets/2.png'),
      3: require('../assets/3.png'),
      4: require('../assets/4.png'),
      // Add more images as needed
    };

    const Item = ({c}) => (
      


          <Pressable style={styles.item } onPress={() => navigation.navigate('CategoryHome', {categoryId:c.id},{categoryName:c.name})}>
            
             <Image style={styles.producticon} source={images[c.id]}/>
              <Text style={styles.categorytext} >{c.name}</Text>
             
                
           </Pressable>

    );

    return (

        <SafeAreaView style={styles.container}>
              <View style={styles.container}>
                  <HeaderScreen navigation={navigation} qty={cartQty} setProducts={setProducts} showSearch={false}/>
                  <Image style={{marginVertical: 2,marginHorizontal:2, width:"100%", height:'18%', resizeMode:'contain',alignSelf:'center'}} source={require('../assets/medovolant.gif')}/>
              
                          <FlatList contentContainerStyle={styles.navbuttoncontainer}
                          numColumns={2}
                          data={categories}
                          renderItem={({item}) => <Item c={item} />}
                          keyExtractor={item => item.id}
                        />
                                        {/* {categories.map((category) => (
                                        <Pressable style={styles.navbutton} onPress={() => navigation.navigate('CategoryHome', {categoryId:1},{categoryName:'Surgicals'})}>
                                            <Image  style={styles.producticon} source={require('../assets/surgical.png')}
                                            />
                                            <Text style={styles.categorytext}>Surgicals</Text>
                                        </Pressable>
                                        ))}  */}
                                        {/* <Pressable style={styles.navbutton} onPress={() => navigation.navigate('CategoryHome', {categoryId:2},{categoryName:'Generics'})}>
                                        <Image  style={styles.producticon} source={require('../assets/generics.png')}
                                            />
                                            <Text  style={styles.categorytext}>Generics</Text>
                                        </Pressable>
                                        </View>
                                        <View style={styles.navbuttoncontainer}>
                                        <Pressable  style={styles.navbutton} onPress={() =>  navigation.navigate('CategoryHome', {categoryId:3},{categoryName:'Pharma'})}>
                                        <Image  style={styles.producticon} source={require('../assets/pharma.png')}
                                            />
                                             <Text  style={styles.categorytext}>Pharmacy</Text>
                                        </Pressable>
                                        <Pressable style={styles.navbutton} onPress={() =>  navigation.navigate('CategoryHome', {categoryId:4},{categoryName:'Intectables'})}>
                                        <Image  style={styles.producticon} source={require('../assets/injectables.png')}/>
                                            <Text  style={styles.categorytext}>Injectables</Text>
                                        </Pressable>                 */}
                                      

                                     
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
      marginTop: 0,
      marginHorizontal:2
    },
    item: {
      padding: 1,
      marginVertical: -10,
      marginHorizontal: 2,
      width: '50%',
      height: '90%',
      justifyContent:'top',
      alignItems:'top',
    },
    producticon: {
        width : '100%',
        resizeMode: 'contain',           
      },
      categorytext: {
        position: 'absolute', 
        top: 50,
        left: 20,
        elevation: 2,
        fontFamily:'NanumGothic-Bold', 
        fontSize: 25, 
        color:'#ffffff',
        borderBottomColor: '#12E6CD',
        borderBottomWidth: 5,
        textAlign: 'center',

        
           
      }
    

});
export default HomeScreen