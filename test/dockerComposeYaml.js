const axios = require('axios');
const yaml = require('js-yaml');
const fs = require('fs');
require('dotenv').config();

// GitLab API 설정
const GITLAB_URL = 'https://gitlab.com';
const GITLAB_TOKEN = process.env.GITLAB_TOKEN;
const PROJECT_ID = 'your_project_id';
const NEW_USER_ID = 'new_user_id';

// GitLab API를 사용하여 프로젝트 접근 권한 부여
async function addUserToProject() {
    try {
        const url = `${GITLAB_URL}/api/v4/projects/${PROJECT_ID}/members`;
        const response = await axios.post(url, {
            user_id: NEW_USER_ID,
            access_level: 30 // Developer access
        }, {
            headers: { 'PRIVATE-TOKEN': GITLAB_TOKEN }
        });

        if (response.status === 201) {
            console.log("User successfully added to the project");
            return true;
        }
    } catch (error) {
        console.error("Failed to add user to the project:", error.message);
        return false;
    }
}

// Docker Compose YAML 파일 생성
function createDockerComposeYaml() {
    const composeConfig = {
        version: '3',
        services: {
            app: {
                image: 'node:14',
                ports: ['3000:3000'],
                volumes: ['./:/app'],
                working_dir: '/app',
                command: 'npm start',
                environment: [
                    'NODE_ENV=production'
                ]
            }
        }
    };

    const yamlStr = yaml.dump(composeConfig);
    fs.writeFileSync('docker-compose.yml', yamlStr);
    console.log("Docker Compose YAML file created successfully");
}

// 메인 실행 함수
async function main() {
    const userAdded = await addUserToProject();
    if (userAdded) {
        createDockerComposeYaml();
    }
}

main().catch(console.error);
