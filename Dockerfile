FROM node:6

ADD . /sanda_test

WORKDIR /sanda_test

EXPOSE 8888

ENV NAME training

RUN npm install forever -g

CMD ["forever", "testjs.js"]