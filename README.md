# Instrucciones para configurar y ejecutar el proyecto

##  Requisitos Previos
- Node.js instalado
- App **Expo Go** en tu dispositivo móvil
  
## Pasos necesarios:

### 1) Modificar el archivo URL
- Ubicar el archivo en: `src/Services/url.js`
- Reemplazar la constante `URL` con tu dirección IPv4
- Para obtener tu IPv4:
  - Abrir una terminal y ejecutar `ipconfig` (Windows)
  - Copiar la dirección que aparece en el campo "IPv4"
  - Pegarla en la constante mencionada ('http://*********')

### 2) Iniciar el servidor para los routers
- Abrir una terminal nueva
- Ejecutar el comando:
  ```
  npm run dev
- NOTA: No cerrar esta terminal
  
### 3) Iniciar al aplicacion
- Abrir otra terminal nueva
- Ejecutar el comando:
  ```
  npm start
- Escanear el código QR que aparece con tu celular (usando la app Expo Go)
- La aplicación se ejecutará en tu dispositivo móvil
- NOTA:
  - No cerrar esta terminal.
  - No hay necesidad de salir del app despues de hacer cambios.
  - Al guardad cambio se refleja en el app dirrectamente. 
