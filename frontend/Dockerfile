FROM node:18

WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ code vào container
COPY . .

# Build ứng dụng
RUN npm run build

# Expose port
EXPOSE 3001

# Start ứng dụng
CMD ["npm", "start"] 
