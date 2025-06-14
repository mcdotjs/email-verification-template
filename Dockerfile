# Pull the base image 
FROM node:20.18.0-alpine as build-stage

# set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build app
RUN npm run build

# Expose port 80
EXPOSE 80

# start nginx in the foreground
CMD ["npm", "run", "start"]
