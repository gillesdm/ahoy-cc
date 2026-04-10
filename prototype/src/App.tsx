import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
// Direct component import to avoid loading the full ahoy barrel (DataGrid, Editor, etc.)
import { Button } from '@teamleader/ahoy/dist/es/components/button';
import Sidebar, { NAV_ITEMS } from './components/Sidebar';
import TopBar from './components/TopBar';
import { GetStarted } from './components/GetStarted';

// Derive page heading from path — '/' (Get started) intentionally has no heading
const PATH_LABELS = Object.fromEntries(
  NAV_ITEMS.filter(item => item.path !== '/').map(item => [item.path, item.label])
);

function PlaceholderPage({ label }: { label: string }) {
  return (
    <div className="app-main__center">
      <Button label={label} level="primary" />
    </div>
  );
}

function App() {
  const { pathname } = useLocation();
  const heading = PATH_LABELS[pathname];

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-content">
        <TopBar heading={heading} notificationCount={3} />
        <main className="app-main">
          <Routes>
            <Route path="/"            element={<GetStarted />} />
            <Route path="/calendar"    element={<PlaceholderPage label="Calendar" />} />
            <Route path="/companies"   element={<PlaceholderPage label="Companies" />} />
            <Route path="/contacts"    element={<PlaceholderPage label="Contacts" />} />
            <Route path="/deals"       element={<PlaceholderPage label="Deals" />} />
            <Route path="/quotations"  element={<PlaceholderPage label="Quotations" />} />
            <Route path="/projects"    element={<PlaceholderPage label="Projects" />} />
            <Route path="/planning"    element={<PlaceholderPage label="Planning" />} />
            <Route path="/revenue"     element={<PlaceholderPage label="Revenue" />} />
            <Route path="/expenses"    element={<PlaceholderPage label="Expenses" />} />
            <Route path="/work-orders" element={<PlaceholderPage label="Work Orders" />} />
            <Route path="/tickets"     element={<PlaceholderPage label="Tickets" />} />
            <Route path="/products"    element={<PlaceholderPage label="Products" />} />
            <Route path="/timesheets"  element={<PlaceholderPage label="Timesheets" />} />
            <Route path="/insights"    element={<PlaceholderPage label="Insights" />} />
            <Route path="/settings"    element={<PlaceholderPage label="Settings" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
