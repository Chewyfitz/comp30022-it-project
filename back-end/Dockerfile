FROM node:10

# Create App directory
WORKDIR /master/back-end

# Install app dependenies
# wildcard used to ensure package.json and package-lock.json are both copied
# where available
COPY package*.json ./

# uncomment this line for development environments
COPY .env ./
RUN npm install
#for Production:
# RUN npm ci --only=production

# bundle app source
COPY . .

# expose the port
EXPOSE 3001
# (update this to use environment variable)
# Run the server
CMD ["node", "server.js"]