import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator, FlatList, Image, StyleSheet } from 'react-native';

const Clima = () => {
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetch(
      'https://api.weatherapi.com/v1/forecast.json?key=5a492ff34efa492b91a172441211110%20&q=huejutla&days=10&aqi=no&alerts=no&lang=es'
    )
      .then((res) => res.json())
      .then((obj) => {
        setData(obj);
        setLoad(true);
      })
      .catch((err) => Alert.alert('Error inesperado: ' + err));
  }, []);

  const Card = ({ fecha, iko, min, max }) => {
    return (
      <View style={styles.cardview}>
        <Text style={styles.text}>{fecha} </Text>
        <Image style={{ height: 50, width: 50 }} source={{ uri: 'https:' + iko }} />
        <Text style={styles.text}> {max}°C </Text>
        <Text style={styles.text}> {min}°C </Text>
      </View>
    );
  };

  const CardVelocidad = ({ velocidadViento }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>La velocidad del viento es de: {velocidadViento} km/h</Text>
      </View>
    );
  };
  
  const CardRadiacion = ({ radiacionUV }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>Radiación UV: {radiacionUV}</Text>
      </View>
    );
  };
  
  const CardHumedad = ({ humedad }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>Humedad: {humedad}</Text>
      </View>
    );
  };
  
  const CardSensacionTermica = ({ sensacionTermica }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>Sensación térmica: {sensacionTermica}°C</Text>
      </View>
    );
  };

  const Velocidad=()=>{
    return (
      <View>
        <FlatList
        horizontal
          data={data.forecast.forecastday}
          renderItem={({ item }) => (
            <CardVelocidad
              velocidadViento={item.day.maxwind_kph} 
            />
          )}
        />
      </View>
    );
  };

  const LScreen = () => {
    return (
      <View>
        <Text style={styles.text}>{data.location.name}</Text>
        <Text style={styles.text}>{data.current.temp_c}°C</Text>
        <Text style={styles.text}>
          {data.current.condition.text} * max {data.forecast.forecastday[0].day.maxtemp_c} °C min{' '}
          {data.forecast.forecastday[0].day.mintemp_c} °C
        </Text>

        <FlatList
        //{horizontal}
          data={data.forecast.forecastday}
          renderItem={({ item }) => (
            <Card fecha={item.date} iko={item.day.condition.icon} max={item.day.maxtemp_c} min={item.day.mintemp_c} />
          )}
        />
      </View>
    );
  };

  const RadiacionUV = () => {
    return (
      <View>
        <FlatList
        horizontal
          data={data.forecast.forecastday}
          renderItem={({ item }) => (
            <CardRadiacion
              radiacionUV={item.day.uv} 
            />
          )}
        />
      </View>
    );
  };

  const Humedad = () => {
    return (
      <View>
        <FlatList
        horizontal
          data={data.forecast.forecastday}
          renderItem={({ item }) => (
            <CardHumedad
              humedad={item.day.avghumidity}
            />
          )}
        />
      </View>
    );
  };

  const SensacionTermica = () => {
    return (
      <View>
        <FlatList
        horizontal
          data={data.forecast.forecastday}
          renderItem={({ item }) => (
            <CardSensacionTermica sensacionTermica={item.day.avgtemp_c} />
          )}
        />
      </View>
    );
  };

  const SensacionTermicaHoy = () => {
    return (
      <View>
        <Text style={styles.text}>Sensacion termica de hoy: {data.current.feelslike_c}</Text>
      </View>
    );
  };


  const Anochese = () => {
    return (
      <View>
        <Text style={styles.text}>Anochese a las: {data.forecast.forecastday[0].astro.moonrise}</Text>
        <Text style={styles.text}>Amanece a las: {data.forecast.forecastday[0].astro.sunrise}</Text>
      </View>
    );
  };


  const Presion = () => {
    return (
      <Text style={styles.text}>Presion atmosferica: {data.current.pressure_in}</Text>
    );
  };


  const Uscreen = () => {
    return (
      <View>
        <ActivityIndicator size={'large'} color={'darkblue'} />
        <Text>Cargando datos...</Text>
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.text}>Clima</Text>
      {load ? (
        <>
          <LScreen />
          <Anochese/>
          <Presion/>
          <SensacionTermicaHoy/>
          <RadiacionUV />
          <Humedad/>
          <SensacionTermica/>
          <Velocidad/>
        </>
      ) : (
        <Uscreen />
      )}
    </View>
  );
};

export default Clima;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#34495E',
    borderRadius: 5,
    marginBottom: 10,
    width:140,
    marginLeft:2,
    marginLeft:2,
    marginTop:15,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  cardview: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#34495E',
    width:280,
    alignItems:"center",
    justifyContent: 'center', 
    marginLeft:50,
  },
});