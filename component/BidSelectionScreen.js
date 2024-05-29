import React, { useState,useEffect } from 'react';
import { StyleSheet, View, ScrollView,Pressable,Text,Alert,TouchableOpacity } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import medxbidConfig from '../medxbid.config';
import HeaderScreen from './HeaderScreen';
import FooterScreen from './FooterScreen';
import { SafeAreaView } from 'react-native-safe-area-context';


const BidSelectionScreen = ({route,navigation}) => {
  const [bidRequest, setBidRequest] = useState([]); 
  const [tableHead] = useState(['Product Description', 'Quantity Ordered']);
  const [widthArr] = useState([150, 120]);

  const [bidHead] = useState(['Distributor', 'Quoted Price']);
  const bidRequestId = route.params.bidRequestId
  useEffect(() => {
    AsyncStorage.getItem('token').then((jwt) => {
   
      if(jwt === null){
        navigation.navigate('Login')
      }
      fetch(medxbidConfig.API_HOST+'/bidRequest/'+route.params.bidRequestId, {
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
            AsyncStorage.removeItem('token')
          }
          else{
            //console.log(response)
            //setLoginError("Invalid username or password")
          }
        })
        .then((data) =>{
        //  console.log(data)
          setBidRequest(data)       



        })
    });
  }, []);

  const tableData = [];
  console.log('inside if condition' + bidRequest.length);
  if(bidRequest && bidRequest.length > 0 ){
          console.log('inside if condition' + bidRequest.length);
          for (let i = 0; i < bidRequest.length; i += 1) {
          const rowData = [];
            rowData[i,0] =  bidRequest[i].productName;
            rowData[i,1] =  bidRequest[i].quantity;
            tableData.push(rowData);
       }
  }
  const bidData = [];
  if(bidRequest.bidQuotes && bidRequest.bidQuotes.length > 0 ){
    
    for (let i = 0; i < bidRequest.bidQuotes.length; i += 1) {
      const rowData = [];
      rowData[i,0] =  bidRequest.bidQuotes[i].bidQuoteId;
      rowData[i,1] = bidRequest.bidQuotes[i].price;
      bidData.push(rowData);
    }
 }

 
 

  const element = (data, index) => (
    <TouchableOpacity onPress={() => this._alertIndex(index)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>button</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1,backgroundColor: '#FFFFFF'} }>
    
    <HeaderScreen navigation={navigation}/>
    <View style={styles.container}>
        <Text>Bid Number: {bidRequestId}</Text>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{borderWidth: 1, borderColor: '#12E6CD'}}>
            <Row data={tableHead} style={styles.header}  />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{borderWidth: 1, borderColor: '#12E6CD'}}>
              {
                tableData.map((rowData, index) => (                  
                  <Row
                    key={index}
                    data={rowData}                                   
                    style={styles.row}                    
                    
                  />
                  
                ))
              }
            </Table>
          </ScrollView>

        </View>

      </ScrollView>     

      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{borderWidth: 1, borderColor: '#FFFFFF'}}>
            <Row data={bidHead} style={styles.header} textStyle={styles.text}/>
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              {
                bidData.map((rowData, index) => (
                
                  <Row
                    key={index}
                    data={rowData}                                        
                    style={[styles.row, index<2 && {backgroundColor: 'green'},index>2 && index<4 && {backgroundColor: 'red'},index>4 && {backgroundColor: 'red'}]}            
                    widthArr={widthArr}                        
                  />
                  
                ))
              }
            </Table>
          </ScrollView>

        </View>



      </ScrollView> 
      <Pressable style={[styles.buttonStyle]}
                  onPress={() =>
                    navigation.navigate('Home')}
                                >
                <Text style={styles.buttonText}>Order More</Text>
              </Pressable>
    </View>
    <FooterScreen styles={{margin: 1}} navigation={navigation}/>    
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1,margin: 20,alignItems: 'center'},
  header: { height: 50, backgroundColor: '#022784'},
  text: { color:'white',textAlign: 'center', fontSize: 18},
  dataWrapper: { marginTop: -1 },
  row: { height: 40},
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

export default BidSelectionScreen;