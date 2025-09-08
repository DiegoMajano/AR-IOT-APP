import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ViroARSceneNavigator } from '@viro-community/react-viro';
import ARScene from './src/ArScene';
import OverlayControls from './src/OverlayControls';

export default function App() {
  const [manualRefreshToken, setManualRefreshToken] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e0dfdfff' }}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{ scene: ARScene }}
        viroAppProps={{ manualRefreshToken }}  
        style={{ flex: 1 }}
      />
      <OverlayControls onRefresh={() => setManualRefreshToken((n) => n + 1)} />
    </SafeAreaView>
  );
}
