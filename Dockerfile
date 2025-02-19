# Use Node.js LTS version
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Compile TypeScript
RUN npm run build

# Expose port 5000
EXPOSE 5000

# Start the server
CMD ["node", "dist/index.js"]