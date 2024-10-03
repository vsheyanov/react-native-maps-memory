import './gesture-handler';

import React, {  useEffect } from 'react';
import { Button, FlatList, Image, SafeAreaView, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';

function App({ navigation }): React.JSX.Element {
  return (
    <SafeAreaView>
      <FlatList
        data={new Array(100).fill(0).map((_, index) => index)}
        renderItem={(value) => (
          <Button title={`Item ${value.item}`} onPress={() => navigation.navigate('MemoryLeak', { value: value.item })} />
        )}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 60,
  },
});

const Map = ({ route, navigation }) => {
  useEffect(() => {
    console.log('Map mount');
    return () => {
      console.log('Map unmount');
    };
  }, []);

  return (
    <>
      <Button title="Reset stack" onPress={() => navigation.reset({ routes: [{ name: 'Home'}]})} />
      <Text>{route.params.value}</Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}/>
    </>
  );
};

const ImageList = () => (
  <ScrollView>
    {
      new Array(1000).fill(0).map((_, index) => (
        <Image
          key={index}
          source={{ uri: `https://picsum.photos/200/300?random=${Math.round(Math.random() * 1000)}` }}
          style={{ width: 300, height: 400}} />
      ))
    }
  </ScrollView>
);


const Stack = createStackNavigator();

const renderMap = true;

const MainApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="MemoryLeak" component={renderMap ? Map : ImageList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainApp;
