# Use the official Node.js 14 image as the base image
FROM node:14

# Create and set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Expose the port Cloud Run will use
ENV PORT 8080
EXPOSE 8080

# Start the application
CMD [ "node", "index.js" ]
