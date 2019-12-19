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

const getSingleBoard = (boardId) => axios.get(`${baseUrl}/boards/${boardId}.json`);

const saveBoard = (boardInfo) => axios.post(`${baseUrl}/boards.json`, boardInfo);

const updateBoard = (boardId, newBoardInfo) => axios.put(`${baseUrl}/boards/${boardId}.json`, newBoardInfo);

export default {
  getBoardsByUid, getSingleBoard, saveBoard, updateBoard,
};
