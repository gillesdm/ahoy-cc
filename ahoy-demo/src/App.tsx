import { useState } from 'react';
// Direct component import to avoid loading the full ahoy barrel (DataGrid, Editor, etc.)
import { Button } from '@teamleader/ahoy/dist/es/components/button';
import Sidebar, { type Page } from './components/Sidebar';

function App() {
  const [page, setPage] = useState<Page>('Get started');

  return (
    <div className="app-shell">
      <Sidebar page={page} onNavigate={setPage} />
      <main className="app-main">
        <Button label="Click me" level="primary" />
      </main>
    </div>
  );
}

export default App;
