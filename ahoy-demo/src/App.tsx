import { useState } from 'react';
import './App.css';
// Direct component import to avoid loading the full ahoy barrel (DataGrid, Editor, etc.)
import { Button } from '@teamleader/ahoy/dist/es/components/button';
import Sidebar, { type Page } from './components/Sidebar';
import TopBar from './components/TopBar';
import { GetStarted } from './components/GetStarted';

function App() {
  const [page, setPage] = useState<Page>('Get started');

  return (
    <div className="app-shell">
      <Sidebar page={page} onNavigate={setPage} />
      <div className="app-content">
        <TopBar notificationCount={3} />
        <main className="app-main">
          {page === 'Get started' ? (
            <GetStarted />
          ) : (
            <div className="app-main__center">
              <Button label="Click me" level="primary" />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
