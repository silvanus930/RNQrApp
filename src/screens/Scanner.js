import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Background from '../components/Background';
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import { theme } from '../core/theme'

export default function Scanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Background>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        //style={StyleSheet.container}
      />
      <BackButton goBack={navigation.goBack} />
      <Button title={'Scan'} onPress={() => navigation.navigate('WebScreen')} />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container1: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
});
