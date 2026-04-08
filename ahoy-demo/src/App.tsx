// Direct component import to avoid loading the full ahoy barrel (DataGrid, Editor, etc.)
import { Button } from '@teamleader/ahoy/dist/es/components/button';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Button label="Click me" level="primary" />
    </div>
  );
}

export default App;
