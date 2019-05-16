# Stage 1 - build process
FROM node:10 AS build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn bootstrap
RUN yarn build

# Stage 2 - production env
FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/packages/router/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
