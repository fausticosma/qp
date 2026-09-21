const fs = require('fs');
const path = require('path');

// Devuelve la ruta absoluta de un archivo dentro de /data
function rutaData(nombreArchivo) {
  return path.join(__dirname, '..', 'data', nombreArchivo);
}

// Lee y parsea un archivo JSON de /data
function leerData(nombreArchivo) {
  const contenido = fs.readFileSync(rutaData(nombreArchivo), 'utf-8');
  return JSON.parse(contenido);
}

// Escribe (sobreescribe) un archivo JSON de /data con los datos actualizados
function escribirData(nombreArchivo, datos) {
  fs.writeFileSync(rutaData(nombreArchivo), JSON.stringify(datos, null, 2), 'utf-8');
}

// Calcula el próximo id disponible para un array de registros
function proximoId(registros) {
  if (registros.length === 0) return 1;
  return Math.max(...registros.map((r) => r.id)) + 1;
}

module.exports = { leerData, escribirData, proximoId };