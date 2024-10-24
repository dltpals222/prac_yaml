FROM alpine:latest

# Docker CLI 설치
RUN apk add --no-cache docker-cli bash

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 스크립트나 파일 복사
COPY . .

# 컨테이너 시작 시 실행할 명령 지정
CMD ["/bin/bash"]
