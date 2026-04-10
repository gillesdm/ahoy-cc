import './Sidebar.css';

import { NavLink } from 'react-router-dom';

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

export type NavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Get started',  path: '/',            icon: <Svg24X24RocketFilled /> },
  { label: 'Calendar',     path: '/calendar',    icon: <Svg24X24CalendarFilled /> },
  { label: 'Companies',    path: '/companies',   icon: <Svg24X24BuildingFilled /> },
  { label: 'Contacts',     path: '/contacts',    icon: <Svg24X24ContactsFilled /> },
  { label: 'Deals',        path: '/deals',       icon: <Svg24X24HandshakeFilled /> },
  { label: 'Quotations',   path: '/quotations',  icon: <Svg24X24InvoiceFilled /> },
  { label: 'Projects',     path: '/projects',    icon: <Svg24X24ProjectsFilled /> },
  { label: 'Planning',     path: '/planning',    icon: <Svg24X24ScheduleFilled /> },
  { label: 'Revenue',      path: '/revenue',     icon: <Svg24X24MoneyFilled /> },
  { label: 'Expenses',     path: '/expenses',    icon: <Svg24X24ExpensesFilled /> },
  { label: 'Work Orders',  path: '/work-orders', icon: <Svg24X24WorkorderFilled /> },
  { label: 'Tickets',      path: '/tickets',     icon: <Svg24X24TicketFilled /> },
  { label: 'Products',     path: '/products',    icon: <Svg24X24ProductsFilled /> },
  { label: 'Timesheets',   path: '/timesheets',  icon: <Svg24X24TimerFilled /> },
  { label: 'Insights',     path: '/insights',    icon: <Svg24X24StatsFilled /> },
  { label: 'Settings',     path: '/settings',    icon: <Svg24X24SettingsFilled /> },
];

function Sidebar() {
  return (
    <nav className="sidebar" aria-label="Main navigation">
      <div className="sidebar__logo" aria-label="Teamleader" />
      <ul className="sidebar__menu" role="list">
        {NAV_ITEMS.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `sidebar-menu-item${isActive ? ' sidebar-menu-item--active' : ''}`
              }
            >
              <span className="sidebar-menu-item__icon">{item.icon}</span>
              <span className="sidebar-menu-item__label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
