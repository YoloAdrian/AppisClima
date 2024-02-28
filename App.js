import {  StyleSheet, Text,  View } from 'react-native';
import Clima from './componentes/Clima';

export default function App() {
  return (
    <View style={styles.container}>
      <Encabezado/>
      <Cuerpo/>
      
    </View>
  );
}
export const Encabezado=()=>{
  return(
    <View style={styles.encabezado}>
        <Text style={styles.texto}></Text>
        <Text style={styles.texto}>Pronosticos del clima</Text>
        <Text style={styles.texto}></Text>
    </View>
  )
}

export const Cuerpo=()=>{
  return(
    <View style={styles.cuerpo}>
      <Clima/>
    </View>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5D6D7E',
    alignItems:'stretch',
    justifyContent: 'center',
  },
  texto:{
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop:20,
  },
  encabezado:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#17202A',
  },
  cuerpo:{
    flex:8
  },
  
});