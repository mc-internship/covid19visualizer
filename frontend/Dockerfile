From node:14
WORKDIR /frontend
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . ./
RUN npm start
EXPOSE 3000
