FROM nginx:alpine

# copy semua kecuali .dockerignore
COPY . .

# hapus default config nginx dari base image
RUN rm -f /etc/nginx/conf.d/default.conf

# ganti dengan nginx.conf kita sendiri
RUN mv /nginx.conf /etc/nginx/nginx.conf

# kasih permission execute 
RUN chmod +x /entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]