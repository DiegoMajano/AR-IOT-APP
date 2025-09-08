import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function OverlayControls({ onRefresh }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={onRefresh}>
        <Text style={styles.txt}>Actualizar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#000000AA',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  txt: { color: '#fff', fontWeight: '600' },
});
