FROM node:6

EXPOSE 8888

ADD . /

CMD ["node", "testjs.js"]


