FROM cypress/included:11.1.0

WORKDIR /var/app

RUN apt-get install openssl

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN dockerize yarn install;

# For non-isolated mode only
# ENTRYPOINT dockerize -wait tcp://frontend:3000 -wait tcp://backend:8000 -timeout 10m && yarn cypress install && yarn cy:run; 
