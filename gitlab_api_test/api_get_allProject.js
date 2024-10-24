const axios = require('axios');
require('dotenv').config();

// GitLab API 엔드포인트 및 개인 액세스 토큰 설정
const gitlabUrl = 'https://gitlab.mipllab.com/api/v4';
const privateToken = process.env.PRIVATE_TOKEN;

// 헤더 설정
const headers = {
  'Private-Token': privateToken
};

// 프로젝트 목록 가져오기 (페이지네이션 적용)
async function getAllProjects() {
  let page = 1;
  const perPage = 100;
  let allProjects = [];

  while (true) {
    try {
      const response = await axios.get(`${gitlabUrl}/projects`, {
        headers: headers,
        params: { page: page, per_page: perPage }
      });

      const projects = response.data;

      if (projects.length === 0) {
        break;
      }

      allProjects = allProjects.concat(projects);
      page++;
    } catch (error) {
      console.error('Error fetching projects:', error);
      break;
    }
  }

  return allProjects;
}

// 프로젝트 멤버 가져오기
async function getProjectMembers(projectId) {
  try {
    const response = await axios.get(`${gitlabUrl}/projects/${projectId}/members`, {
      headers: headers
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching members for project ${projectId}:`, error);
    return [];
  }
}

// 모든 프로젝트와 멤버 정보 가져오기
async function getAllProjectsWithMembers() {
  const projects = await getAllProjects();

  for (let project of projects) {
    project.members = await getProjectMembers(project.id);
  }

  return projects;
}

// 접근 레벨을 문자열로 변환
function accessLevelToString(level) {
  const levels = {
    10: 'Guest',
    20: 'Reporter',
    30: 'Developer',
    40: 'Maintainer',
    50: 'Owner'
  };
  return levels[level] || 'Unknown';
}

// 실행 및 결과 출력
getAllProjectsWithMembers().then(projects => {
  projects.forEach(project => {
    console.log(`프로젝트: ${project.name}`);
    console.log('접근 가능한 개발자들:');
    project.members.forEach(member => {
      console.log(`  - ${member.name} (Username: ${member.username}, Access Level: ${accessLevelToString(member.access_level)})`);
    });
    console.log();
  });
  console.log(`총 프로젝트 수: ${projects.length}`);
});
