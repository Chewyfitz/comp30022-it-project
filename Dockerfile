FROM node:10

# Create App directory
WORKDIR /master

# Install app dependenies
# wildcard used to ensure package.json and package-lock.json are both copied
# where available
COPY package*.json ./
RUN npm install
#for Production:
# RUN npm ci --only=production

# bundle app source
COPY . .

# Now do it again for the client
COPY client/package*.json ./client
RUN ./client/npm install

# and again for the back-end
COPY back-end/package*.json ./back-end
RUN ./back-end/npm install

CMD ['concurrently', 'cd back-end && node server.js', 'cd client && npm start']