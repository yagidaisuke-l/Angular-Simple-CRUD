FROM node
WORKDIR /usr/src/app
COPY ./app.js .
COPY ./package*.json .
RUN mkdir -p app/routes
COPY ./app/routes/index.js ./app/routes/index.js
RUN npm install cors
RUN npm install mysql2
RUN npm install --save-dev jest
RUN npm install --save-dev swagger-jsdoc
RUN npm install --save-dev swagger-ui-express
RUN npm install
EXPOSE 8000
CMD [ "node", "app.js" ]
