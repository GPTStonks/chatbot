FROM node:latest AS build-stage
WORKDIR /usr/src/app
RUN git clone https://github.com/GPTStonks/front-end.git front-end
WORKDIR /usr/src/app/front-end
RUN npm install --force && \
    npm run build

FROM nginx:alpine
COPY --from=build-stage /usr/src/app/front-end/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

