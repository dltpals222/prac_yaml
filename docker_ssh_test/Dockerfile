# Runner layer
FROM node:18-alpine AS runner
WORKDIR /app

# 패키지 설치(필수)
RUN apk add --no-cache bash openssh git

# ARG 설정
ARG PASSWORD
ARG REPO_URL
ARG BRANCH=main

# git source
# RUN git clone --branch ${BRANCH} ${REPO_URL} .
RUN git clone --branch ${BRANCH} ${REPO_URL} .
RUN npm install

# 환경변수 설정
ENV NODE_ENV development

# SSH 설정
RUN ssh-keygen -A
RUN echo "root:${PASSWORD}" | chpasswd

# SSH 설정 파일 수정
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config

# SSH key setting
COPY authorized_keys /root/.ssh/
RUN chmod 700 /root/.ssh 
RUN chmod 600 /root/.ssh/authorized_keys

# 포트 설정
EXPOSE 22

# SSH 서비스 시작 및 bash 실행
CMD ["/usr/sbin/sshd", "-D"]