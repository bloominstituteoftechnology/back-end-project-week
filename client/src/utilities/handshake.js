import axios from 'axios';

const Handshake = {
  getNotes: function(URL){  const _this = this;
    return axios
      .get(URL)
      .then((res) => {
        let data = res.data;
        console.log('data in handshake.js', data);
        return data;
      })
      .catch(err => {
        return console.log(`Error: ${err}`);
      });
  }
};

export default Handshake;