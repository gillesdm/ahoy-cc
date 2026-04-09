import { useState } from 'react';
import './App.css';
// Direct component import to avoid loading the full ahoy barrel (DataGrid, Editor, etc.)
import { Button } from '@teamleader/ahoy/dist/es/components/button';
import Sidebar, { type Page } from './components/Sidebar';
import TopBar from './components/TopBar';

function App() {
  const [page, setPage] = useState<Page>('Get started');

  return (
    <div className="app-shell">
      <Sidebar page={page} onNavigate={setPage} />
      <div className="app-content">
        <TopBar notificationCount={3} />
        <main className="app-main">
          <Button label="Click me" level="primary" />
        </main>
      </div>
    </div>
  );
}

export default App;
