import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function TabTwoScreen() {
  const filas = 11; // 10 filas
  let arbol = []; // array del arbol

  // Estrella (elemento 1)
  arbol.push(<Text key={0} style={styles.estrella}>*</Text>);

  for (let i = 2; i < filas; i++) {
    let espacio = ''.repeat(filas - i - 1);
    let ceros = '0'.repeat(1 + (i - 2) * 2);
    arbol.push(
      <Text key={i} style={styles.arbolRow}>{espacio}{ceros}</Text>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {arbol}
      <Text style={styles.texto}>¡Feliz Navidad! 🎄</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  estrella: {
    color: 'gold',
    fontSize: 32,
    textAlign: 'center',
  },
  arbolRow: {
    color: 'green',
    fontSize: 24,
  },
  texto: {
    color: 'red',
    fontSize: 20,
    marginTop: 30,
    textAlign: 'center',
  },
});
