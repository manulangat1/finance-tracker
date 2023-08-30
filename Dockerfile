FROM node:16-alpine 

# RUN apk add --no-cache python g++ make
WORKDIR /app 
# RUN apk --no-cache --virtual build-dependencies add \
#     python \
#     make \
#     g++

RUN apk add --update python3 make g++\
    && rm -rf /var/cache/apk/*

# COPY --chown=node:node package*.json ./
COPY  package*.json ./ 

COPY yarn.lock ./

RUN yarn

COPY . .
# COPY --chown=node:node . .

# USER node 

# RUN chown -R node /app/node_modules
# RUN chown -R node /app/dist

EXPOSE 3000 

CMD [ "npm", "run" , "start:cont" ]