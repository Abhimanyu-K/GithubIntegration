FROM node:18.12.1

RUN mkdir -p /app

WORKDIR /app

#context transfer
COPY . . 

RUN npm install
RUN npm build

RUN useradd -m myuser
USER myuser

CMD [ "npm", "start" ]