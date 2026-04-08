import './Sidebar.css';

// Direct icon imports — avoid the barrel export (includes DataGrid, Editor, etc.)
import Svg24X24RocketFilled    from '@teamleader/ahoy/dist/es/assets/icons/components/24X24RocketFilled';
import Svg24X24CalendarFilled  from '@teamleader/ahoy/dist/es/assets/icons/components/24X24CalendarFilled';
import Svg24X24BuildingFilled  from '@teamleader/ahoy/dist/es/assets/icons/components/24X24BuildingFilled';
import Svg24X24ContactsFilled  from '@teamleader/ahoy/dist/es/assets/icons/components/24X24ContactsFilled';
import Svg24X24HandshakeFilled from '@teamleader/ahoy/dist/es/assets/icons/components/24X24HandshakeFilled';
import Svg24X24InvoiceFilled   from '@teamleader/ahoy/dist/es/assets/icons/components/24X24InvoiceFilled';
import Svg24X24ProjectsFilled  from '@teamleader/ahoy/dist/es/assets/icons/components/24X24ProjectsFilled';
import Svg24X24ScheduleFilled  from '@teamleader/ahoy/dist/es/assets/icons/components/24X24ScheduleFilled';
import Svg24X24MoneyFilled     from '@teamleader/ahoy/dist/es/assets/icons/components/24X24MoneyFilled';
import Svg24X24ExpensesFilled  from '@teamleader/ahoy/dist/es/assets/icons/components/24X24ExpensesFilled';
import Svg24X24WorkorderFilled from '@teamleader/ahoy/dist/es/assets/icons/components/24X24WorkorderFilled';
import Svg24X24TicketFilled    from '@teamleader/ahoy/dist/es/assets/icons/components/24X24TicketFilled';
import Svg24X24ProductsFilled  from '@teamleader/ahoy/dist/es/assets/icons/components/24X24ProductsFilled';
import Svg24X24TimerFilled     from '@teamleader/ahoy/dist/es/assets/icons/components/24X24TimerFilled';
import Svg24X24StatsFilled     from '@teamleader/ahoy/dist/es/assets/icons/components/24X24StatsFilled';
import Svg24X24SettingsFilled  from '@teamleader/ahoy/dist/es/assets/icons/components/24X24SettingsFilled';

export type Page =
  | 'Get started'
  | 'Calendar'
  | 'Companies'
  | 'Contacts'
  | 'Deals'
  | 'Quotations'
  | 'Projects'
  | 'Planning'
  | 'Revenue'
  | 'Expenses'
  | 'Work Orders'
  | 'Tickets'
  | 'Products'
  | 'Timesheets'
  | 'Insights'
  | 'Settings';

type SidebarProps = {
  page?: Page;
  onNavigate?: (page: Page) => void;
};

const NAV_ITEMS: { label: Page; icon: React.ReactNode }[] = [
  { label: 'Get started',  icon: <Svg24X24RocketFilled /> },
  { label: 'Calendar',     icon: <Svg24X24CalendarFilled /> },
  { label: 'Companies',    icon: <Svg24X24BuildingFilled /> },
  { label: 'Contacts',     icon: <Svg24X24ContactsFilled /> },
  { label: 'Deals',        icon: <Svg24X24HandshakeFilled /> },
  { label: 'Quotations',   icon: <Svg24X24InvoiceFilled /> },
  { label: 'Projects',     icon: <Svg24X24ProjectsFilled /> },
  { label: 'Planning',     icon: <Svg24X24ScheduleFilled /> },
  { label: 'Revenue',      icon: <Svg24X24MoneyFilled /> },
  { label: 'Expenses',     icon: <Svg24X24ExpensesFilled /> },
  { label: 'Work Orders',  icon: <Svg24X24WorkorderFilled /> },
  { label: 'Tickets',      icon: <Svg24X24TicketFilled /> },
  { label: 'Products',     icon: <Svg24X24ProductsFilled /> },
  { label: 'Timesheets',   icon: <Svg24X24TimerFilled /> },
  { label: 'Insights',     icon: <Svg24X24StatsFilled /> },
  { label: 'Settings',     icon: <Svg24X24SettingsFilled /> },
];

function Sidebar({ page = 'Get started', onNavigate }: SidebarProps) {
  return (
    <nav className="sidebar" aria-label="Main navigation">
      <div className="sidebar__logo" aria-label="Teamleader" />
      <ul className="sidebar__menu" role="list">
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <button
              className={`sidebar-menu-item${page === item.label ? ' sidebar-menu-item--active' : ''}`}
              onClick={() => onNavigate?.(item.label)}
              aria-current={page === item.label ? 'page' : undefined}
            >
              <span className="sidebar-menu-item__icon">{item.icon}</span>
              <span className="sidebar-menu-item__label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
