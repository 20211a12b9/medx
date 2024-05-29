import React, { useState,useEffect } from 'react';
import { StyleSheet, View, ScrollView,Pressable,Text } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import HeaderScreen from './HeaderScreen';
import FooterScreen from './FooterScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import medxbidConfig from '../medxbid.config';

const BidRequestDashboardScreen = ({route,navigation}) => {

  console.log("here....")
  const [cartQty, setCartQty] = useState(0);
  const [cart, setCart] = useState({});  
  const [bidRequests, setBidRequests] = useState([]);

  const rcart= route.params?.rcart ?? {};
  const brs = route.params?.bidRequests ?? [];

  useEffect(() => {
    setCart(rcart)
    console.log(brs)
    setBidRequests(brs)
  }, [route.params]);

  // useEffect(() => {
  //   AsyncStorage.multiGet(['token', 'id']).then(values => {
  //     const jwt = values[0][1]; // 'token' value
  //     const userId = values[1][1]; // 'id' value
  
  //     if(jwt === null){
  //       navigation.navigate('Login')
  //     }
  //     fetch(medxbidConfig.API_HOST+'/bidRequests/'+userId, {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         authorization: 'Bearer ' + jwt,
  //       }})
  //       .then(response => {
  //         if(response.status === 200){
  //           return response.json()
  //         }else if(response.status === 403){
  //           AsyncStorage.removeItem('token')
  //         }
  //         else{
  //           //setLoginError("Invalid username or password")
  //         }
  //       })
  //       .then((data) =>{
  //         setBidRequests(data)       

  //       })
  //   });
  // }, []);

  const [tableHead] = useState(['Bid Request#', 'Bid Date', 'Total Quantity']);
  const [widthArr] = useState([120, 120, 80]);
  
        const tableData = [];
        for (let i = 0; i < bidRequests.length; i += 1) {
          const rowData = [];
          rowData[i,0] = bidRequests[i].bidRequestId;
          rowData[i,1] = bidRequests[i].bidDate;
          rowData[i,2] = bidRequests[i].qty;
          for (let j = 0; j < 3; j += 1) {
            rowData.push(`${i}${j}`);
          }
          tableData.push(rowData);
  }


  return (
    <SafeAreaView style={{flex: 1,backgroundColor: '#FFFFFF'} }>
    
    <HeaderScreen navigation={navigation}/>
    <View style={styles.container}>
        
      <ScrollView horizontal={true}>
        <View>
          <Table >
            <Row data={tableHead} widthArr={widthArr} style={styles.header}/>
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table >
              {
                tableData.map((rowData, index) => (
                  <Pressable
                  onPress={() =>
                    navigation.navigate('BidSelection',{bidRequestId:rowData[0]})}
            >                  
                  <Row
                    key={index}
                    data={rowData}                    
                    style={styles.row}
                    widthArr={widthArr}
                    
                  />
                  </Pressable>
                ))
              }
            </Table>
    
          </ScrollView>
          <Pressable style={[styles.buttonStyle]}
                  onPress={() =>
                    navigation.navigate('Home',{rcart:cart})}
                                >
                <Text style={styles.buttonText}>Order More</Text>
              </Pressable>
        </View>

      </ScrollView>     
       
    </View>
    <FooterScreen styles={{margin: 1}} navigation={navigation} show={false}/>
                    
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1,margin: 20,alignItems: 'center'},
  header: { height: 50, backgroundColor: '#022784', color:'white'},
  text: { color:'white', textAlign: 'center', fontSize: 18 , borderBottomWidth: 1, borderColor:'#12E6CD'},
  dataWrapper: { marginTop: -1 },
  row: { height: 40,margin: 2},
  buttonStyle: {
    backgroundColor: '#022784',
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

export default BidRequestDashboardScreen;