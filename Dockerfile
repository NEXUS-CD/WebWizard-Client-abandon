FROM web_wizard_client_base

WORKDIR /opt/node_app

COPY . .

RUN yarn build

FROM nginx:1.17.6

COPY --from=0 /opt/node_app/nginx.conf /etc/nginx/nginx.conf

COPY --from=0 /opt/node_app/dist  /usr/share/nginx/html/

