
docker build -f deploy/Dockerfile -t overlock-front:latest .

docker run -p8080:80 -it overlock-front:latest
