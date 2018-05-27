import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export { getNotesData };

function getNotesData() {
  const url = `${BASE_URL}/api/notes`;
  return axios.get(url).then(response => response.data);
}
