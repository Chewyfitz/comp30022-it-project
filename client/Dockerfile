FROM node:10

# Create App directory
WORKDIR /master/client

# Install app dependenies
# wildcard used to ensure package.json and package-lock.json are both copied
# where available
COPY package*.json ./
RUN npm install
#for Production:
# RUN npm ci --only=production

# bundle app source
COPY . .

# expose the port
EXPOSE 3000
# (update this to use environment variable)
# Run the server
CMD ["npm", "start"]