FROM node:16
RUN npm install pm2 -g --no-optional
ENV NODE_ENV=production
WORKDIR /app
COPY app .
RUN npm ci --production
CMD []