FROM alpine:latest AS base

# 필요한 패키지 설치
RUN apt-get update && apt-get install -y openssh-server

# SSH 설정
RUN mkdir /var/run/sshd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# 비밀번호 설정
ARG PASSWORD
RUN echo "root:${PASSWORD}" | chpasswd

# SSH 포트 열기
EXPOSE 22

# SSH 서비스 시작
CMD ["/usr/sbin/sshd", "-D"]
