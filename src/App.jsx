import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx'
import Log from './components/Log.jsx'
import {WINNING_COMBINATIONS} from './winning-combinations.js'
import GameOver from './components/GameOver.jsx'
import {useState} from 'react'


const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// const WINNING_COMBINATIONS =[
//   [
//     {row:0, col:0},
//     {row:0, col:1},
//     {row:0, col:2}
//   ]
// ];

function deriveActivePlayer(gameTurns){

   let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
      currentPlayer = 'O';
    }
    return currentPlayer;

}

function App() {
  const[players,setPlayers]=useState({
    'X':'Player 1',
    'O':'Player 2'
  });
  const[gameTurns,setGameTurns]=useState([]);
 // const[activePlayer,setActivePlayer]=useState('X');
//  const[hasWinner,setHasWinner]=useState(false);

  const activePlayer=deriveActivePlayer(gameTurns);



   let gameBoard=[...initialGameBoard.map(array =>[...array])];

    for(const turn of gameTurns){
        const {square, player} = turn;
        const{row, col} = square;

        gameBoard[row][col]=player;
    }
    
    let winner;

  for(const combination of WINNING_COMBINATIONS){
     const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
     const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
     const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];

      if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
        //  setHasWinner(true);
        //console.log('We have a winner', firstSquareSymbol);
        winner=players[firstSquareSymbol];
      }
  }

     const hasDraw= gameTurns.length===9 && !winner;
   
  function handleSelectSquare(rowIndex, colIndex) {
  // setActivePlayer((curActivePlayer) =>
  //   curActivePlayer === 'X' ? 'O' : 'X'
  // );

  setGameTurns((prevTurns) => {
    // let currentPlayer = 'X';
    // if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
    //   currentPlayer = 'O';
    // }
    const currentPlayer = deriveActivePlayer(prevTurns);

    const updatedTurns = [
      { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
      ...prevTurns,
    ];
    return updatedTurns;
  });
}


  function handleRRestart(){
    setGameTurns([]);
  }   

    function handlePlayerNameChange(symbol, newName){
      setPlayers(prevPlayers =>{
        return {
        ...prevPlayers,
        [symbol]:newName
        };
      });
    }

  return (
    <>
    <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName="Player 1" 
        symbol="X" 
        isActive={activePlayer === 'X'}
         onChangeName={handlePlayerNameChange}/>
        <Player initialName="Player 2"
         symbol="O" 
         isActive={activePlayer === 'O'} 
         onChangeName={handlePlayerNameChange}/>
        {/* <li>
          <span className="player">
          <span className="player-name">Player 1</span>
          <span className="player-symbol">X</span>
          </span>
          <button>Edit</button>
        </li>
        <li>
          <span className="player"> 
          <span className="player-name">Player 2</span>
          <span className="player-symbol">O</span>
          </span>
          <button>Edit</button>
        </li> */}
      </ol>
      {(winner || hasDraw ) && (
        <GameOver winner={winner} onRestart={handleRRestart}/>
        )}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
    </div>
    <Log turns={gameTurns}/>
    </main>
    </>
  )
}

export default App
