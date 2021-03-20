FROM node:15.12-alpine3.13 as builder

RUN mkdir -p /app/
WORKDIR /app

ADD package.json .
#Install modules for major version and cache it -- saves time if only package-lock is changed
RUN npm install

ADD package-lock.json .
#Fine tune installing modules with minor version and cache it
RUN npm install

#Add our sources and build
ADD . .
RUN npm run build

FROM nginx

COPY --from=builder /app/out/                 /usr/share/nginx/html/
COPY --from=builder /app/nginx/               /etc/nginx/conf.d/

CMD PORT=${PORT:-3333} \
    API_BASE_PATH=${API_BASE_PATH:-"http://host.docker.internal:5000"} \
    DOLLAR='$' envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf \
     && exec nginx -g 'daemon off;'
