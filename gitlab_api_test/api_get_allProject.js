const axios = require('axios');
require('dotenv').config(); // dotenv 패키지 추가

// GitLab API 엔드포인트 및 개인 액세스 토큰 설정
const gitlabUrl = 'https://gitlab.mipllab.com/api/v4';
const privateToken = process.env.PRIVATE_TOKEN; // .env에서 토큰 가져오기

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

// 실행 및 결과 출력
getAllProjects().then(projects => {
  console.log(JSON.stringify(projects, null, 2));
  console.log(`총 프로젝트 수: ${projects.length}`);
});
