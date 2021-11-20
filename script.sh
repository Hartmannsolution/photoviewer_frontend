npm run build
scp -r ./build root@edu.bugelhartmann.dk:/var/www/familyphotos
# sudo tail -n 20 /var/log/nginx/error.log