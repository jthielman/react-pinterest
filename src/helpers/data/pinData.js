import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((result) => {
      const demPins = result.data;
      const pins = [];
      if (demPins) {
        Object.keys(demPins).forEach((pinId) => {
          const newPinn = demPins[pinId];
          newPinn.id = pinId;
          pins.push(newPinn);
        });
      }
      resolve(pins);
    })
    .catch((err) => reject(err));
});

const getSinglePin = (pinId) => axios.get(`${baseUrl}/pins/${pinId}.json`);

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

export default { getPinsByBoardId, getSinglePin, deletePin };
