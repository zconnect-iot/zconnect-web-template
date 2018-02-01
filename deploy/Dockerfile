FROM node:8

WORKDIR /www

# Copying the package files over first means that
# this 'layer' can be cached and only rebuilt if the file
# hashes change later
COPY package.json package-lock.json ./
COPY src/modules ./src/modules
RUN npm install

# Now copy in the source which changes a lot more
# and build
COPY . /www
RUN npm run deploy

# Now we just need the built files in an nginx image
FROM nginx:stable-alpine

WORKDIR /www
COPY --from=0 /www/dist .
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
