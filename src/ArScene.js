import React, { useEffect, useState, useRef } from 'react';
import {
  ViroARScene,
  ViroText,
  ViroFlexView,
  ViroNode,
} from 'react-viro';
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
      style={{ backgroundColor: '#000000AA', padding: 0.02 }}
    >
      <ViroText
        text={text}
        width={0.56}
        height={0.31}
        style={{ fontSize: 28, color: '#FFFFFF' }}
      />
    </ViroFlexView>
  );
}

export default function ARScene({ sceneNavigator }) {
  const [data, setData] = useState(null);
  const pollingRef = useRef(null);

  async function load() {
    const d = await fetchSensor('SEN-001');
    if (d) setData(d);
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
