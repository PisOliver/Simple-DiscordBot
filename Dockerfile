FROM node:16

WORKDIR simple-discordbot

COPY . .
RUN npm install

RUN apt update
RUN apt install -y ffmpeg --noconfirm

CMD [ "node", "main.js" ]