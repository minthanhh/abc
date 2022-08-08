FROM nginx:1.23.0-alpine as production
COPY apps/tasks/nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/apps/tasks /usr/share/nginx/html
ENV PORT=80
ENV NERDEARLA_API=""
# Start nginx
CMD sed -ibak -e 's/$PORT/'"$PORT"'/g' -e 's|$NERDEARLA_API|'"$NERDEARLA_API"'|g' /etc/nginx/conf.d/default.conf && nginx -g "daemon off;"
