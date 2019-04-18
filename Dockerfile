FROM node:10
WORKDIR /app
COPY ./package.json /app
RUN yarn
COPY . /app

EXPOSE 3000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait

CMD /wait && yarn dev
