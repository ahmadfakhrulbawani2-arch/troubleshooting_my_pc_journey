#!/bin/sh

set -e

SAFE_HOSTNAME=$(printf '%s' "${VM_HOSTNAME:-unknown}" | tr -cd 'A-Za-z0-9-')

if [ -z "$SAFE_HOSTNAME" ]; then
    SAFE_HOSTNAME="unknown"
fi

case "$VM_HOSTNAME" in
    fakhrul)
        cp -r /websites/fakhrul/* /usr/share/nginx/html/
        ;;

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