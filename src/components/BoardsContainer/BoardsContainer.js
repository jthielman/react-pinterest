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
    editMode: false,
    boardToEdit: {},
    showBoardForm: false,
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
        this.setState({ showBoardForm: false });
      })
      .catch((errFromSaveBoard) => console.error(errFromSaveBoard));
  }

  setEditMode = (editMode) => {
    this.setState({ editMode, showBoardForm: true });
  }

  setBoardToEdit = (board) => {
    this.setState({ boardToEdit: board });
  }

  setShowBoardForm = () => {
    this.setState({ showBoardForm: true });
  }

  render() {
    const { setSingleBoard } = this.props;

    return (
      <div>
        <button onClick={this.setShowBoardForm}>Add a new Board</button>
        { this.state.showBoardForm && <BoardForm addBoard={this.addBoard} editMode={this.state.editMode} boardToEdit={this.state.boardToEdit} /> }
        <div className='row'>
          { this.state.boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard} setEditMode={this.setEditMode} setBoardToEdit={this.setBoardToEdit} />) }
        </div>
      </div>
    );
  }
}

export default BoardsContainer;
