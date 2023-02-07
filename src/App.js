import RotateWarning from './components/rotate-warning/rotate-warning.component';
import World from './components/world/world.component';
import MoveButtons from './components/move-buttons/move-buttons.component';

import './App.styles.scss';

function App() {
  return (
    <div className='app-container'>
        <RotateWarning />
        <World />
    </div>
  );
}

export default App;
