import './App.css';
import SnakeGame from './SnakeGame';
import TitleView from './viewComponents/TitleView';

function App() {
  return (
    <div className="page">
      <div className="header"><TitleView/></div>
      <div className="content">
        <SnakeGame></SnakeGame>
      </div>
    </div>
  );
}

export default App;
