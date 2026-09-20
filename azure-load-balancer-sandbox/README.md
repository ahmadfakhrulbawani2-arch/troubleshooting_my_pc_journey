# Azure Load Balancer Sandbox

Penjelasan bagaimana cara deploy dan setup multi aplikasi pada multi VM di Azure (1 VM master untuk public IP)

## Prasyarat

Hal yang dibutuhkan adalah membuat Resource Group, Virtual Network dan Load Balancer.

## Cara Kerja

Setelah memenuhi prasyarat, kamu bisa membuat VM masing2 dimana ada 1 VM master dengan public IP dan VM lainnya private ip (Hanya bisa login lewat VM master). Hal ini mengantisipasi limit 3 public IP azure di satu akun microsoft. Untuk detail setup bisa dibaca sebagai berikut:

TL;DR

1. Setup `entrypoint.sh` agar copy folder website ke workspace server nginx utama yaitu di `/usr/share/nginx/html`
2. Setup `Dockerfile` dan `nginx.conf` seperti setup lainnya
3. Buat masing2 vm. Caranya dengan melakukan hal yang sama dengan video ini: [youtube](https://www.youtube.com/watch?v=67Ws9YZIilE)

### Project Root

```bash
.
├── Dockerfile
├── entrypoint.sh
├── LICENSE
├── nginx.conf
└── websites
    ├── alice           # sebagai aplikasi milik vm 'alice'
    │   ├── data.json
    │   ├── index.html
    │   ├── script.js
    │   └── style.css
    └── fakhrul         # sebagai aplikasi milik vm 'fakhrul'
        ├── data.json
        ├── index.html
        ├── public
        ├── script.js
        └── style.css
```

### nginx.conf

Menggunakan basic nginx.conf

```conf
; kasih worker otomatis menyesuaikan resource vm
worker_processes auto;

; events mengatur bagaimana Nginx menangani koneksi
events {
    ; maksimal koneksi yang dapat ditangani oleh setiap worker secara bersamaan
    worker_connections 1024;
}

; config http servernya nginx
http {
    ; MIME type identifier
    include       /etc/nginx/mime.types;
    ; MIME type default apabila nginx tidak mengetahui tipe file yang diminta, application/octet-stream basically menganggap ini file biasa bukan file khusus
    default_type  application/octet-stream;
    ; aktivasi fitur sendfile
    sendfile      on;

    ; virtual server setup nginx
    server {
        ; port yang dijalankan di 8080, sama dengan Dockerfile
        listen 8080;
        ; server name defaultnya _
        server_name _;

        ; ini root directory atau workspacenya server html si nginx, kita harus save website index.html di sini
        root /usr/share/nginx/html;
        ; file default yang dibuka ketika client call api GET /
        index index.html;

        location / {
            ; jika request client tidak ditemukan, maka set status code 404 not found
            try_files $uri $uri/ =404;
        }
    }
}
```

### Dockerfile

Basically cuma dockerfile biasa gak aneh2 soalnya vanilla js.

```Dockerfile
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
```

### entrypoint.sh

Setelah build docker image dengan dockerfile, di masing-masing VM tinggal docker run saja image tersebut.

```bash
docker run -d \
  --name fakhrul-web \
  -e VM_HOSTNAME=$(whoami) \
  -p 8080:8080 \
  <vm_hostname>/<nama_image>:latest
```

Perintah itu akan run docker image di mana memiliki entrypoint mengeksekusi `entrypoint.sh` berikut:

```bash
#!/bin/sh

set -e

# parse input env VM_HOSTNAME agar valid
SAFE_HOSTNAME=$(printf '%s' "${VM_HOSTNAME:-unknown}" | tr -cd 'A-Za-z0-9-')

# kalo no input diset ke 'unknown'
if [ -z "$SAFE_HOSTNAME" ]; then
    SAFE_HOSTNAME="unknown"
fi

# tentukan copy folder mana, sesuaikan dengan data project
case "$VM_HOSTNAME" in
    # jika VM_HOSTNAME nya fakhrul maka copy milik fakhrul
    fakhrul)
        # notice kita copy dari /websites karena di dockerfile kita sudah copy folder websites/
        cp -r /websites/fakhrul/* /usr/share/nginx/html/
        ;;

    # jika VM_HOSTNAME nya alice ya copy milik alice
    alice)
        cp -r /websites/alice/* /usr/share/nginx/html/
        ;;

    *)
        echo "Unknown VM_HOSTNAME: $VM_HOSTNAME"
        exit 1
        ;;
esac

echo "Starting Azure LB demo sandbox, whoami injected as: ${SAFE_HOSTNAME}"

exec nginx -g "daemon off;"
```

### Langkah selanjutnya

Bisa meniru di video ini: [youtube](https://www.youtube.com/watch?v=67Ws9YZIilE)

Baca ini biar jelas: [OFFLINE.md](https://github.com/ncclaboratory18/lbe-2026/blob/main/module-3/OFFLINE.md)
