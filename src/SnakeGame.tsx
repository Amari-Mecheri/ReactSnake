import { useState, useEffect, memo } from 'react';

import BoardView from './viewComponents/BoardView';
import { FreeSpace, CandyBody, SnakePart } from './gamelogic/gameboard';
import { gameState } from './gamelogic/gamestate';
import { Position, Size, Sprite } from './gamelogic/common';
import StateView from './viewComponents/StateView';
import MessageView from './viewComponents/MessageView';
import When from './When';
import HelpView from './viewComponents/HelpView';


const	defaultBoardSize = 40
const	sizeIncrement    = 10
const refreshInterval  = 100 // Defines the animations refresh rate
const boardBackGroundColor = getComputedStyle(document.documentElement).getPropertyValue('--boardViewBackGroundColor')
const candyColor = "cyan"
const aGameState = new gameState()

function SnakeGame(){
    const [boardSize, setBoardSize] = useState(new Size( defaultBoardSize, defaultBoardSize))
    const [score,setScore] = useState(aGameState.Score());
    const [highScore,setHighScore] = useState(aGameState.HighScore());
    const [snakeLength,setSnakeLength] = useState(aGameState.SnakeSize()[0]);
    const [snakePosition,setSnakePosition] = useState(new Position(0,0));
    //getComputedStyle(document.documentElement).setProperty('--boardViewBackGroundColor',"green")

    useEffect(() => {
        function clearBoardView(){
            for( let x=0; x<boardSize.Height; x++)
              for( let y=0; y<boardSize.Width; y++)
                clearPixel(x,y)
        }

        function  updateBoardSize(): Size {
            let size = boardSize.Width
            size += sizeIncrement
            if(size>defaultBoardSize){
              size = sizeIncrement
            }

            let newBoardSize = new Size(size,size)
            setBoardSize(newBoardSize)
            return newBoardSize
        }

        function launchGame(){
            const interval = setInterval(() => {
                if( aGameState.GameInProgress())
                {
                  const [listSprite, err] = aGameState.Play();
                  if(err == null){
                    displayObjects(listSprite)
                  }
                  setScore(aGameState.Score());
                  setHighScore(aGameState.HighScore());
                  setSnakeLength(aGameState.SnakeSize()[0]);
                  setSnakePosition(aGameState.SnakePosition()[0]);
                } else clearInterval(interval);
            }, refreshInterval);      
        }

        function handleKey(e: KeyboardEvent) {
            handleKeyDown(e,launchGame,clearBoardView,updateBoardSize)
        }

        if (aGameState.InitBoard(boardSize) == null) {
            clearBoardView()
            const [listSprite, err] = aGameState.CreateObjects();
    
            if (err == null)
                displayObjects(listSprite);
        }

        document.addEventListener("keydown", handleKey);
        
        return () => document.removeEventListener("keydown", handleKey);
      }, [boardSize]);

    return (
        <div className="snakeGame">
            <div className='board'>
              <BoardView {...boardSize}/>
            </div>
            <div className='state'>
              <StateView {...{score,highScore,snakeLength,snakePosition, boardSize}}/>
            </div>
            <div className="message">
              <When condition={!aGameState.GameInProgress()}>
                <MessageView message={"Game Over"}/>
              </When>
            </div>
            <div className="help">
                <HelpView/>
            </div>
        </div>
      );
}

function handleKeyDown(e:KeyboardEvent,launchGame: Function, clearBoardView: Function,
    updateBoardSize: Function){
    const key = e.key;
    switch (key) {
      case "ArrowLeft":
        aGameState.MoveLeft()
        break;
  
      case "ArrowRight":
        aGameState.MoveRight()
        break;
  
      case "ArrowUp":
        aGameState.MoveUp()
        break;
  
      case "ArrowDown":
        aGameState.MoveDown()
        break;

      case "Enter":
        if(!aGameState.GameInProgress()){
            updateBoardSize()
            //initStateBoard(boardSize)
        }
        break;
  
      case " " :
        if(!aGameState.GameInProgress()){
          if(aGameState.Dirty()){
            clearBoardView()
            aGameState.clearBoard()

            const [listSprite, err] = aGameState.CreateObjects()

            if(err == null) displayObjects(listSprite)
          }
          aGameState.Start()
          launchGame()
        } 
        break;
        
      default:
        break;
    }
  }


  

  
  function displayObjects(listSprite: Sprite[]){
    if(listSprite){
      for(let i=0; i<listSprite.length; i++){
        const sprite = listSprite[i]
       
        switch(sprite.Value){
          case FreeSpace:
            clearPixel(sprite.Position.X,sprite.Position.Y)
            break;
          case CandyBody:
            setPixel(sprite.Position.X,sprite.Position.Y, candyColor)
            break;
          case SnakePart:
            setPixel(sprite.Position.X,sprite.Position.Y)          
            break;
  
          default:
            break;
        }
  
      }
    }
  }
  
  function setPixel(x: number, y: number, color = `rgb(${[1].map(x=>Math.random()*256|0)},0,0)`){
    const id = "spot"+x.toString().padStart(2,"0")+y.toString().padStart(2,"0")
    const element = document.getElementById(id);
    if (element != null) element.style.backgroundColor = color;
  }
  
  function clearPixel(x: number,y: number){
    setPixel(x,y,boardBackGroundColor)
  }
  
  export default memo(SnakeGame)