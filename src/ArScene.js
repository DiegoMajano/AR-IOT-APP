import React, { useEffect, useState, useRef } from 'react';
import {
  ViroARScene,
  ViroText,
  ViroFlexView,
  ViroNode,
} from '@viro-community/react-viro';
import { fetchSensor } from './api';

const POLL_MS = 5000;

function Panel({ data, onRefresh }) {
  let text;
  if (!data) {
    text = 'Cargando datos...';
  } else if (data.error) {
    text = `⚠️ Error al obtener datos\n${data.error}`;
  } else {
    text = `📍 ${data.name}\n${data.location}\n\n🌡️ ${data.temperature} °C\n💧 ${data.humidity} %\n🔎 ${data.status}\n⏱ ${new Date(
      data.timestamp
    ).toLocaleTimeString()}`;
  }

  return (
    <ViroFlexView
      width={0.7}
      height={0.5}
      position={[0, -0.3, -1]} 
    >
      <ViroText
        text={text}
        width={0.66}
        height={0.4}
        color="#FFFFFF"
        textAlign="left"
        textAlignVertical="top"
        scale={[0.3, 0.3, 0.3]}
        position={[0, 0.1, 0]}
      />

      {/* Botón refrescar manual */}
      <ViroText
        text="🔄 Actualizar"
        color="#75716fff"
        width={0.6}
        height={0.1}
        textAlign="center"
        textAlignVertical="center"
        scale={[0.25, 0.25, 0.25]}
        position={[0, -0.2, 0]}
        onClick={() => onRefresh()}  
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
      if (d) {
        setData(d);
      } else {
        setData({ error: 'Sin respuesta del servidor' });
      }
    } catch (e) {
      setData({ error: e.message });
      console.warn('Error fetching sensor:', e);
    }
  }

  useEffect(() => {
    load();
    pollingRef.current = setInterval(load, POLL_MS);
    return () => clearInterval(pollingRef.current);
  }, []);

  return (
    <ViroARScene onTrackingUpdated={() => {}}>
      <ViroNode>
        <Panel data={data} onRefresh={load} />
      </ViroNode>
    </ViroARScene>
  );
}
