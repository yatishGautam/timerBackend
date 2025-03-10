# Use an official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /timerApp

# Copy only package.json and package-lock.json first for better Docker caching
COPY package*.json ./

# Install dependencies inside the container
RUN npm install 

# Copy the rest of the application files
COPY . .

RUN npx prisma generate

# Expose application port
EXPOSE 80

# Start the application
CMD ["npm", "run", "dev"]
