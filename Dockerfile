# Etapa 1: Build
FROM node:21.7.1 AS builder

WORKDIR /app

# Copiar los archivos necesarios para instalar dependencias
COPY package*.json tsconfig.json ./
COPY src ./src

# Instalar todas las dependencias (incluyendo devDependencies para compilar)
RUN npm install

# Compilar TypeScript a JavaScript
RUN npm run build

# Etapa 2: Producción
FROM node:21.7.1

WORKDIR /app

# Copiar solo las dependencias necesarias para producción
COPY package*.json ./
RUN npm install --only=production

# Copiar los archivos compilados desde la etapa de build
COPY --from=builder /app/dist ./dist

# Copiar cualquier otro archivo necesario (ej: views, configs, emails, etc.)
# COPY --from=builder /app/assets ./assets

# Exponer el puerto de la aplicación
EXPOSE 4002

# Comando para ejecutar la app
CMD ["npm", "start"]