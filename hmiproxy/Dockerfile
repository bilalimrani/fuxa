#bdatabiot/hmiproxy
FROM nginx:stable-alpine

EXPOSE 443   80

ENV CERT_PATH=/etc/letsencrypt/live/hmi.bdata.ca/
COPY ./certs/chain*.pem    $CERT_PATH/chain.pem
COPY ./certs/cert*.pem    $CERT_PATH/cert.pem
COPY ./certs/fullchain*.pem   $CERT_PATH/fullchain.pem
COPY ./certs/privkey*.pem  $CERT_PATH/privkey.pem

RUN ls -l /etc/letsencrypt/live/hmi.bdata.ca/

COPY  ./default.conf /etc/nginx/conf.d/default.conf

CMD [ "nginx", "-g", "daemon off;" ]