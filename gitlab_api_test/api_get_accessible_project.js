require('dotenv').config();

const axios = require('axios');

async function getUserAccessibleProjects(token) {
  let allProjects = [];
  let page = 1;
  const perPage = 100; // 최대값

  while (true) {
    try {
      const response = await axios.get('https://gitlab.mipllab.com/api/v4/projects', {
        headers: { 'Authorization': `Bearer ${token}` },
        params: {
          page: page,
          per_page: perPage,
          membership: true, // 사용자가 멤버인 프로젝트만 가져옴
          order_by: 'name',
          sort: 'asc'
        }
      });

      allProjects = allProjects.concat(response.data);

      if (response.headers['x-next-page'] === '') {
        break; // 마지막 페이지에 도달
      }

      page++;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  return allProjects;
}

// 사용 예시
const accessToken = process.env.PRIVATE_TOKEN;
getUserAccessibleProjects(accessToken)
  .then(projects => console.log(`접근 가능한 프로젝트 수: ${projects.length}`))
  .catch(error => console.error('Error:', error));
