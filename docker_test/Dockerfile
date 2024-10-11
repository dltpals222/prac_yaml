# Source image
FROM alpine/git AS source

WORKDIR /app

ARG REPO_URL
ARG BRANCH=main
ARG SSH_PRIVATE_KEY

RUN mkdir -p ~/.ssh && \
    echo "${SSH_PRIVATE_KEY}" | sed 's/\\r//g' | sed 's/\\n/\n/g' > ~/.ssh/id_rsa && \
    chmod 600 ~/.ssh/id_rsa && \
    ssh-keyscan gitlab.mipllab.com >> ~/.ssh/known_hosts

RUN git clone --branch ${BRANCH} ${REPO_URL} .

# Base image
FROM node:18-alpine AS base

WORKDIR /app

# package.json 및 package-lock.json 파일을 복사하여 종속성을 설치합니다.
COPY --from=source /app/package.json ./
RUN npm install

# Runner layer
FROM node:18-alpine AS runner
WORKDIR /app

# 환경 변수 설정
ENV NODE_ENV production

# 이전 단계에서 설치한 node_modules를 복사
COPY --from=base /app/node_modules ./node_modules

# 소스 파일 복사
COPY --from=source /app .

EXPOSE 4567

# npm run local 명령어 실행
CMD ["npm", "start"]