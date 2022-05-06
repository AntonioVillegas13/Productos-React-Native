import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View, FlatList, ScrollView, Button, TextInput, Alert, TouchableHighlight, Modal,TouchableOpacity } from 'react-native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { useState } from 'react'
import { linear } from 'react-native/Libraries/Animated/Easing';
let Productos = [
  {
    nombre: 'Monitor',
    categoria: 'Periferico',
    precioCompra: '120',
    PrecioVenta: '160.23',
    id: '01'
  },
  {
    nombre: 'Mouse',
    categoria: 'Periferico',
    precioCompra: '20',
    PrecioVenta: '36.33',
    id: '02'
  }, {
    nombre: 'Teclado Wireless',
    categoria: 'Periferico',
    precioCompra: '80',
    PrecioVenta: '50.44',
    id: '03'
  }, {
    nombre: 'Tarjeta madre',
    categoria: 'Componente',
    precioCompra: '180',
    PrecioVenta: '203.34',
    id: '04'
  }, {
    nombre: 'Procesador',
    categoria: 'Componente',
    precioCompra: '190',
    PrecioVenta: '257.23',
    id: '05'
  },

]

let nuevo = true;
let indice = -1;
export default function App() {
  const [txtCod, setTxtCod] = useState();
  const [txtNomP, setTxtNomP] = useState();
  const [txtCategoria, setTxtCategoria] = useState();
  const [txPrecioComp, setTxtPrecioComp] = useState();
  const [txPrecioVent, setTxtPrecioVent] = useState();

  const [numElem, setNumEl] = useState(Productos.length);
  //Componente de Producto
  let ItemProduct = (props) => {

    return (<ScrollView style={styles.impar} >
      <TouchableHighlight onPress={() => {

        setTxtNomP(props.prod.nombre)
        setTxtCategoria(props.prod.categoria)
        setTxtCod(props.prod.id)
        setTxtPrecioComp(props.prod.precioCompra)
        setTxtPrecioVent(props.prod.PrecioVenta)

        nuevo = false;
        indice = props.indice
      }}>
        <View style={{ flexDirection: 'row', alignContent: 'flex-start', flex: 1 }}>



          <View style={{ flexDirection: 'column', alignContent: 'flex-start', flex: 1, alignItems: 'center', alignContent: 'center', marginTop: 20 }}>
            <Text>{props.prod.id}</Text>
          </View>

          <View style={{ flexDirection: 'column', alignContent: 'flex-start', flex: 4 }}>
            <Text style={{ fontSize: 20, paddingLeft: 4, color: '#FAC028', fontWeight: 'bold' }}>{props.prod.nombre}</Text>
            <Text style={{ fontSize: 15, fontStyle: 'italic', textAlign: 'left', color: "#eeeeee" }}> ({props.prod.categoria})</Text>
          </View>
          <View style={{ flexDirection: 'row', alignContent: 'flex-end', flex: 2, alignItems: 'center' }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#F7621E', fontStyle: 'italic', marginTop: 4 }}> USD</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#F7621E', textDecorationStyle: 'dashed', justifyContent: 'flex-end' }}> {props.prod.PrecioVenta}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignContent: 'flex-start', flex: 0.8, padding: 12 }}>
            <View style={{ marginRight: 1, marginLeft: 2 }}>

            </View>
            <View style={{ marginLeft: 10 }}>
              <Button title='X'
                color={"red"}
                onPress={({indice}) => {
                  let indiceSec =indice;
                  setModalVisible(true);
                  return indiceSec
                }

                }
              />
            </View>

          </View>




        </View>

      </TouchableHighlight>

    </ScrollView  >


    );
  }
  let nombreMIO = 'Antonio Villegas'
  let limpiar = () => {
    setTxtCategoria()
    setTxtCod()
    setTxtNomP()
    setTxtPrecioComp()
    setTxtPrecioVent("PRECIO DE VENTA")
    indice = -1;
  }


  let guardarProd = () => {
    if (nuevo) {
      let producto = {
        nombre: txtNomP,
        categoria: txtCategoria,
        precioCompra: txPrecioComp,
        PrecioVenta: txPrecioVent,
        id: txtCod


      };
      Productos.push(producto);
      console.log("PERSONAS", producto);
      setNumEl(Productos.length);


    }
    else {
      console.log("Modificar")
      Productos[indice].nombre = txtNomP;
      Productos[indice].categoria = txtCategoria;
      Productos[indice].precioCompra = txPrecioComp;
      Productos[indice].PrecioVenta = txPrecioVent;
      nuevo = true
      limpiar();
    }

  }


  const [modalVisible, setModalVisible] = useState(false);

  return (

    <View style={styles.container}>
     
        <View style={{ flex: 4 }} >
     
          <ScrollView>
            <View style={{ marginLeft: 80 }}>
              <Text style={styles.titulo}>Productos </Text>
            </View>


            <TextInput
              style={styles.Inputs}
              value={txtCod}
              placeholder=' CODIGO'
              onChangeText={setTxtCod}
              keyboardType="numeric"
              editable={nuevo}
            />
            <TextInput
              style={styles.Inputs}
              value={txtNomP}
              placeholder=' NOMBRE PRODUCTO'
              onChangeText={setTxtNomP}
            /><TextInput
              style={styles.Inputs}
              value={txtCategoria}
              placeholder=' CATEGORIA'
              onChangeText={setTxtCategoria}
            />
            <TextInput
              style={styles.Inputs}
              value={txPrecioComp}
              keyboardType='number-pad'
              placeholder=' PRECIO DE COMPRA'
              onChangeText={(precio) => {

                setTxtPrecioComp(precio);
                precio = parseFloat(parseFloat(precio) + (parseFloat(precio) * 0.20)).toFixed(2)
                let res = "" + precio;
                setTxtPrecioVent(res);
              }}

            />
            <TextInput
              style={styles.Inputs}
              value={txPrecioVent}
              placeholder=' PRECIO DE VENTA'
              onChangeText={setTxtPrecioVent}
              editable={false}
            />
            
          </ScrollView>

        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }} >
          <View style={{ marginRight: 50, marginLeft: 20 }}>
            <Button
              title='GUARDAR'
              onPress={() => {
                if (txPrecioComp != null && txtCod != null && txtCategoria != null && txPrecioComp != null) {
                  guardarProd();
                  limpiar();
                } else {
                  Alert.alert("INFO", "Complete los campos")

                }

              }}
            />
          </View>
          <View style={{ marginRight: 50, marginLeft: 2 }}>
            <Button
              title='NUEVO'
              onPress={limpiar}
            />

          </View>
          <Text>Productos:{numElem}</Text>
        </View>



        <View style={{ flex: 5 }}>
          <FlatList
            data={Productos}
            renderItem={(e) => {
              //ITEM PASADO COMO COMPONENTE
              return <ItemProduct
                indice={e.index} prod={e.item}
              />
            }

            }
            keyExtractor={(item) => { return item.id }}
          />
        </View>
        <View style={{ flexDirection: 'row', flex: 0.5, alignContent: 'center', alignItems: 'flex-end', marginTop: 10, margin: 14, marginLeft: 180 }}>

          <Text
            style={{ fontSize: 18, fontFamily: 'sans-serif-condensed', fontWeight: 'bold' }}>Autor:</Text>

          <Text style={{ fontSize: 18, fontFamily: 'sans-serif-condensed' }} > {nombreMIO}</Text>
        </View>

        <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
      setModalVisible(modalVisible);
      
    }}
    
  >   
  
  <View style={styles.centeredView}>
          <View style={styles.modalView}>
<Text style={{fontFamily: 'sans-serif-condensed',fontSize:30,fontWeight:'500'}}> ¿Estas seguro?  </Text>
<View  style={{flexDirection:'row',margin:30}}>
            <TouchableOpacity
        style={styles.buttonS}
        onPress={ (indiceSec)=>{
           Productos.splice(indiceSec, 1)
           console.log(Productos)
           setNumEl(Productos.length)

          setModalVisible(false)
         
            
        
        
        }}
      >
        <Text style={{fontSize:15,fontStyle:'italic',color:"#fff"}}>Si</Text>
        
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.buttonP}
        onPress={ ()=>setModalVisible(false)}
      >
        <Text style={{fontSize:15,fontStyle:'italic',color:"#fff"}} >No</Text>

  </TouchableOpacity>
  </View>  
          </View>
        </View>
  
  </Modal>









        
        <StatusBar style="auto" />
        

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 100,
    paddingLeft: 30
  },
  impar: {

    marginLeft: 1,
    marginBottom: 25,
    marginRight: 20,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#E09726',
    borderRadius: 5




  },
  titulo: {
    fontSize: 30,
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#F03E0A',
    letterSpacing: 3


  },
  Inputs: {
    borderBottomColor: "#82B5FA",
    borderBottomWidth: 2,
    borderBottomLeftRadius: 3.7,
    borderBottomRightRadius: 3.7,
    backgroundColor: "#B3DDF2",
    margin: 20,
    marginTop: 2,
    marginLeft: 1,
    shadowColor: "#0000",
    shadowRadius: 100
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonS: {
    borderRadius: 20,
    padding: 30,
    paddingHorizontal:40,
    backgroundColor:"#6B7FE3",
    margin:10
  },
  buttonP: {
    borderRadius: 20,
    padding: 30,
    paddingHorizontal:40,
    backgroundColor:"#82B5FA",
    margin:10
  }

});
