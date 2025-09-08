import React, { useEffect, useState, useRef } from 'react';
import {
  ViroARScene,
  ViroText,
  ViroFlexView,
  ViroNode,
} from '@viro-community/react-viro';
import { fetchSensor } from './api';

const POLL_MS = 5000;

function Panel({ data }) {
  const text = data
    ? `📍 ${data.name}\n${data.location}\n\n🌡️ ${data.temperature} °C\n💧 ${data.humidity} %\n🔎 ${data.status}\n⏱ ${new Date(data.timestamp).toLocaleTimeString()}`
    : 'Cargando...';

  return (
    <ViroFlexView
      width={0.6}
      height={0.35}
      position={[0, 0, -1]} // 1m frente al usuario
      style={{ backgroundColor: '#000000AA' }}
    >
      <ViroText
        text={text}
        width={0.56}
        height={0.31}
        color="#FFFFFF"
        textAlign="left"
        textAlignVertical="top"
      />
    </ViroFlexView>
  );
}

export default function ARScene({ sceneNavigator }) {
  const [data, setData] = useState(null);
  const pollingRef = useRef(null);

  async function load() {
    try {
      const d = await fetchSensor('SEN-001');
      if (d) setData(d);
    } catch (e) {
      console.warn("Error fetching sensor:", e);
    }
  }

  useEffect(() => {
    load();
    pollingRef.current = setInterval(load, POLL_MS);
    return () => clearInterval(pollingRef.current);
  }, []);

  return (
    <ViroARScene>
      <ViroNode>
        <Panel data={data} />
      </ViroNode>
    </ViroARScene>
  );
}
