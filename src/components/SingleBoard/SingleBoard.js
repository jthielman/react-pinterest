import React from 'react';
import PropTypes from 'prop-types';

import Pin from '../Pins/Pin';
import PinForm from '../PinForm/PinForm';

import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';

class SingleBoard extends React.Component {
  static propTypes = {
    selectedBoardId: PropTypes.string,
    setSingleBoard: PropTypes.func,
  }

  state = {
    board: {},
    pins: [],
  }

  getPinData = (selectedBoardId) => {
    pinData.getPinsByBoardId(selectedBoardId)
      .then((pins) => {
        this.setState({ pins });
      })
      .catch((errFromGetPinsByBoardId) => console.error(errFromGetPinsByBoardId));
  }

  componentDidMount() {
    const { selectedBoardId } = this.props;
    boardData.getSingleBoard(selectedBoardId)
      .then((request) => {
        this.setState({ board: request.data });
        this.getPinData(selectedBoardId);
      })
      .catch((errFromGetSingleBoard) => console.error(errFromGetSingleBoard));
  }

  addPin = (newPin) => {
    pinData.savePin(newPin)
      .then(() => {
        this.getPinData(this.props.selectedBoardId);
      })
      .catch((errFromSavePin) => console.error(errFromSavePin));
  }

  deleteSinglePin = (pinId) => {
    const { selectedBoardId } = this.props;
    pinData.deletePin(pinId)
      .then(() => {
        this.getPinData(selectedBoardId);
      })
      .catch((errFromDeletePin) => console.error(errFromDeletePin));
  };

  removeSelectedBoardId = (e) => {
    e.preventDefault();
    const { setSingleBoard } = this.props;
    setSingleBoard(null);
  }

  render() {
    const { board, pins } = this.state;
    const { selectedBoardId } = this.props;
    return (
      <div>
        <PinForm selectedBoardId={selectedBoardId} addPin={this.addPin} />
        <button className="btn btn-info" onClick={this.removeSelectedBoardId}>x Close Board View</button>
        <div className="SingleBoard col-8 offset-2">
          <h2>{board.name}</h2>
          <p>{board.description}</p>
          <div className="d-flex flex-wrap">
            {pins.map((pin) => <Pin key={pin.id} pin={pin} deleteSinglePin={this.deleteSinglePin} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default SingleBoard;
