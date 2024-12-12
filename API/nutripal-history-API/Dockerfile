# Gunakan base image Node.js
FROM node:18

# Tentukan working directory di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file proyek ke dalam container
COPY . .

# Ekspos port yang digunakan oleh aplikasi (sesuai dengan `port` di kode)
EXPOSE 8080

# Jalankan aplikasi
CMD ["node", "app.js"]
