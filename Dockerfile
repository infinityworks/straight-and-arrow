FROM node:6

ADD . /sanda_test

WORKDIR /sanda_test

EXPOSE 8888

ENV NAME training

CMD ["sh", "init.sh"]