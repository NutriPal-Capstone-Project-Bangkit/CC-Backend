# Gunakan image resmi Node.js
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json ke container
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file kode aplikasi ke container
COPY . .

# Expose port aplikasi
EXPOSE 8080

# Jalankan aplikasi
CMD ["npm", "start"]
