# Dockerfile

# Use Node.js LTS as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application files into the working directory
COPY . .

# Expose the application's port
EXPOSE 8080

# Command to run the application
CMD ["node", "app.js"]