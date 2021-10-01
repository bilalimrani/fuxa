#bdatabiot/hmiproxy
FROM nginx:stable-alpine

EXPOSE 443   80
COPY ./certs/      /etc/letsencrypt/live/hmi.bdata.ca/

RUN ls -l /etc/letsencrypt/live/hmi.bdata.ca/

COPY  ./default.conf /etc/nginx/conf.d/default.conf

CMD [ "nginx", "-g", "daemon off;" ]