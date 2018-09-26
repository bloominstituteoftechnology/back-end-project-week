import axios from 'axios';

function getNotes(URL){
  return axios
    .get(URL)
    .then(res => {
      let data = res.data;
      return data;
    })
    .catch(err => {
      return console.log(`Error: ${err}`);
    });
}

const Handshake = { getNotes };
export default Handshake;