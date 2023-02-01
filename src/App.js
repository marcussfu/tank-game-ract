import RotateWarning from './components/rotate-warning/rotate-warning.component';
import World from './components/world/world.component';
import { autocompleteClasses } from '@mui/material';

function App() {
  return (
    <div style={{
      position: "relative",
      maxWidth: '800px',
      // paddingTop: '50%',
      aspectRatio: '1.66/1',
      margin: '5% auto'
    }}>
        <RotateWarning />
        <World />
    </div>
  );
}

export default App;
