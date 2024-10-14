const axios = require('axios');
const { gitlabAccessToken } = require('../config');

const GITLAB_URL = "https://gitlab.mipllab.com/api/v4";
const PRIVATE_TOKEN = gitlabAccessToken;

const headers = { "PRIVATE-TOKEN": PRIVATE_TOKEN };

// 모든 프로젝트 가져오기
async function getAllProjects() {
    try {
        const response = await axios.get(`${GITLAB_URL}/projects`, {
            headers,
            params: { per_page: 100 }
        });
        return response.data;
    } catch (error) {
        console.error("프로젝트 가져오기 오류:", error.message);
        return [];
    }
}

// 특정 프로젝트의 브랜치 가져오기
async function getProjectBranches(projectId) {
    try {
        const response = await axios.get(`${GITLAB_URL}/projects/${projectId}/repository/branches`, { headers });
        return response.data;
    } catch (error) {
        console.error(`프로젝트 ID ${projectId}의 브랜치 가져오기 오류:`, error.message);
        return [];
    }
}

// 모든 프로젝트와 각 프로젝트의 브랜치 출력
async function main() {
    const projects = await getAllProjects();
    for (const project of projects) {
        console.log(`프로젝트: ${project.name} (ID: ${project.id})`);
        const branches = await getProjectBranches(project.id);
        console.log("브랜치:");
        branches.forEach(branch => {
            console.log(`  - ${branch.name}`);
        });
        console.log();
    }
}

main().catch(error => console.error("메인 함수 오류:", error));
