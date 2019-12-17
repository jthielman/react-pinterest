import React from 'react';
import PropTypes from 'prop-types';

import Board from '../Board/Board';
import BoardForm from '../BoardForm/BoardForm';

import authData from '../../helpers/data/authData';
import boardData from '../../helpers/data/boardData';

class BoardsContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func,
  }

  state = {
    boards: [],
  }

  getBoards = () => {
    boardData.getBoardsByUid(authData.getUid())
      .then((boards) => {
        this.setState({ boards });
      })
      .catch((errFromBoardsContainer) => console.error(errFromBoardsContainer));
  }

  componentDidMount() {
    this.getBoards();
  }

  addBoard = (newBoard) => {
    boardData.saveBoard(newBoard)
      .then(() => {
        this.getBoards();
      })
      .catch((errFromSaveBoard) => console.error(errFromSaveBoard));
  }

  render() {
    const { setSingleBoard } = this.props;

    return (
      <div>
        <BoardForm addBoard={this.addBoard} />
        <div className='row'>
          {this.state.boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard} />)}
        </div>
      </div>
    );
  }
}

export default BoardsContainer;
