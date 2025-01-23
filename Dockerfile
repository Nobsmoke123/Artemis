FROM node:lts-alpine

# Create app directory
WORKDIR /app

#Copy package json
COPY package*.json ./

# Copy the client package.json
COPY client/package*.json client/

# Install app dependencies that are only for production
RUN npm run install-client --omit=dev

# Copy the server package.json
COPY server/package*.json server/

# Install app dependencies that are only for production
RUN npm run install-server --omit=dev

# Copy the client code
COPY client/ client/

# Build our frontend client
RUN npm run build --prefix client

# Copy the server code
COPY server/ server/

# Sets the user to use when running this image
USER node

# The command to run our app when the container starts
CMD [ "npm", "start", "prefix", "server" ]

# Expose the port the app runs on
EXPOSE 8000