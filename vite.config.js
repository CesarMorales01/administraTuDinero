import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        // Esto es CRUCIAL para que Vite escuche en todas las interfaces de red
        // y sea accesible desde tu IP local (192.168.1.36) y localhost.
        host: '0.0.0.0', // Permite que Vite sea accesible desde otras IPs de tu red
        port: 5173, // Asegúrate de que este sea el puerto que Vite usa (por defecto)

        // Configuración de CORS para permitir que tu servidor Laravel acceda a los recursos de Vite
        cors: {
            origin: true, // Esto permite que cualquier origen (incluido tu servidor Laravel en :8000) acceda a los recursos de Vite
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
            credentials: true,
        },
    },
});
