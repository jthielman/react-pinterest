import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoardsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const allBordsObj = result.data;
      const boards = [];
      if (allBordsObj != null) {
        Object.keys(allBordsObj).forEach((bordId) => {
          const newBord = allBordsObj[bordId];
          newBord.id = bordId;
          boards.push(newBord);
        });
      }
      resolve(boards);
    })
    .catch((err) => reject(err));
});

export default { getBoardsByUid };
