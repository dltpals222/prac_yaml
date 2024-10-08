FROM alpine/git as clone
WORKDIR /app
RUN git clone https://github.com/dltpals222/prac_yaml.git .

FROM node:14
WORKDIR /app
COPY --from=clone /app .
RUN npm install
CMD ["npm", "start"]
