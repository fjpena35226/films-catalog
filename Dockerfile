FROM node:17.2.0

COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src && cp -a /tmp/node_modules /usr/src/

WORKDIR /usr/src
COPY . /usr/src

#build prod
RUN npm run build
# Expose the port to get access
EXPOSE 3000
# Run the node command
CMD npm run start