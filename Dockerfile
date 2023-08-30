FROM node:16-alpine 
EXPOSE 3000

WORKDIR /app 


RUN apk add --update python3 make g++\
    && rm -rf /var/cache/apk/*

COPY  package*.json ./ 

COPY yarn.lock ./

RUN yarn

COPY . .


EXPOSE 3000 

# CMD [ "npm", "run" , "start:cont" ]
# RUN . start.sh
CMD [ "sh","start.sh" ]



