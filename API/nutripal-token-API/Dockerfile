# Gunakan Node.js sebagai image dasar
FROM node:16

# Set direktori kerja dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Instal dependensi aplikasi
RUN npm install

# Salin semua file aplikasi ke dalam container
COPY . .

# Ekspose port yang digunakan aplikasi
EXPOSE 8080

# Ganti port dalam kode dari 5000 ke variabel `PORT`
CMD ["node", "app.js"]
