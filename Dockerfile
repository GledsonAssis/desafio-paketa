FROM node:14.16.1
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8000
ENTRYPOINT [ "npm" ]
CMD ["run", "start"]