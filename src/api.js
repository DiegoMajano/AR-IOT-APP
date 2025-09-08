const BASE_URL = 'http://192.168.0.10:3001';

export async function fetchSensor(id = 'SEN-001') {
  try {
    const res = await fetch(`${BASE_URL}/api/sensors/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
    
  } catch (err) {
    console.warn("Error al obtener datos:", err);
    return null;
  }
}
