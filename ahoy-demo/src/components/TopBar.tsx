import './TopBar.css';

import { Button }    from '@teamleader/ahoy/dist/es/components/button';
import IconButton    from '@teamleader/ahoy/dist/es/components/iconButton';

import Svg14X14AddOutline        from '@teamleader/ahoy/dist/es/assets/icons/components/14X14AddOutline';
import Svg14X14SearchOutline     from '@teamleader/ahoy/dist/es/assets/icons/components/14X14SearchOutline';
import Svg24X24BellOutline       from '@teamleader/ahoy/dist/es/assets/icons/components/24X24BellOutline';
import Svg24X24ContactsFilled    from '@teamleader/ahoy/dist/es/assets/icons/components/24X24ContactsFilled';
import Svg24X24GiftOutline       from '@teamleader/ahoy/dist/es/assets/icons/components/24X24GiftOutline';
import Svg24X24HelpBadgedOutline from '@teamleader/ahoy/dist/es/assets/icons/components/24X24HelpBadgedOutline';

export type TopBarProps = {
  /** Show or hide the purple "Upgrade now" marketing CTA */
  mktAction?: 'True' | 'False';
  /** Show a tab navigation row immediately below the top bar */
  withTabs?: 'True' | 'False';
  /** Number shown on the notification bell badge; 0 hides the badge */
  notificationCount?: number;
  /** Full name of the current user — used to generate initials */
  userName?: string;
};

function TopBar({
  mktAction = 'True',
  withTabs = 'False',
  notificationCount = 0,
  userName = 'User',
}: TopBarProps) {
  const initials = userName
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="top-bar">
      <div className="top-bar__right">

        {/* Actions: Search + Add */}
        <div className="top-bar__actions">
          <div className="top-bar__search-wrapper">
            <span className="top-bar__search-icon" aria-hidden="true">
              <Svg14X14SearchOutline />
            </span>
            <input
              className="top-bar__search"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
          <Button icon={<Svg14X14AddOutline />} level="primary" size="small" />
        </div>

        {/* Links: Icon buttons + Need help */}
        <div className="top-bar__links">
          <div className="top-bar__bell-wrapper">
            <IconButton icon={<Svg24X24BellOutline />} size="small" />
            {notificationCount > 0 && (
              <span
                className="top-bar__badge"
                aria-label={`${notificationCount} notifications`}
                aria-live="polite"
              >
                {notificationCount}
              </span>
            )}
          </div>
          <IconButton icon={<Svg24X24ContactsFilled />} size="small" />
          <IconButton icon={<Svg24X24GiftOutline />} size="small" />
          <Button icon={<Svg24X24HelpBadgedOutline />} label="Need help?" size="small" />
        </div>

        {/* Timer — native placeholder */}
        <button className="top-bar__timer" type="button" aria-label="Start timer">
          00:00
        </button>

        {/* Logo chip — placeholder until LogoMark component exists */}
        <div className="top-bar__logo" role="img" aria-label="Teamleader" />

        {/* Avatar — initials chip */}
        <div className="top-bar__avatar" aria-label={`Logged in as ${userName}`}>
          {initials}
        </div>

        {/* Marketing CTA */}
        {mktAction === 'True' && (
          <button className="top-bar__mkt-cta" type="button">
            Upgrade now
          </button>
        )}
      </div>

      {withTabs === 'True' && (
        <div className="top-bar__tabs">
          {/* TODO: tab navigation row */}
        </div>
      )}
    </header>
  );
}

export default TopBar;
