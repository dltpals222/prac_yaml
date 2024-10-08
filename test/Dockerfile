FROM alpine/git as clone
WORKDIR /app
RUN git clone https://github.com/dltpals222/PKI_Cert.git .

FROM node:14
WORKDIR /app
COPY --from=clone /app .
RUN npm install
CMD ["npm", "start"]
