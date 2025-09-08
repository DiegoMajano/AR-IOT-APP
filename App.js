import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { ViroARSceneNavigator } from '@viro-community/react-viro';
import ARScene from './src/ArScene';
import OverlayControls from './src/OverlayControls';

export default function App() {
  const [manualRefreshToken, setManualRefreshToken] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{ scene: ARScene }}
      />
      <OverlayControls onRefresh={() => setManualRefreshToken((n) => n + 1)} />
    </SafeAreaView>
  );
}
    