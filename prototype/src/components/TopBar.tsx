import './TopBar.css';

import { Button }    from '@teamleader/ahoy/dist/es/components/button';
import IconButton    from '@teamleader/ahoy/dist/es/components/iconButton';

import Svg14X14AddOutline        from '@teamleader/ahoy/dist/es/assets/icons/components/14X14AddOutline';
import Svg14X14SearchOutline     from '@teamleader/ahoy/dist/es/assets/icons/components/14X14SearchOutline';
import Svg24X24BellOutline       from '@teamleader/ahoy/dist/es/assets/icons/components/24X24BellOutline';
import Svg24X24UserAddOutline    from '@teamleader/ahoy/dist/es/assets/icons/components/24X24UserAddOutline';
import Svg24X24GiftOutline       from '@teamleader/ahoy/dist/es/assets/icons/components/24X24GiftOutline';
import Svg24X24TimerOutline      from '@teamleader/ahoy/dist/es/assets/icons/components/24X24TimerOutline';

function LogoMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Large triangle — left */}
      <polygon points="3,18 16.04,18 9.52,6.82"     fill="#17BFC0" />
      {/* Medium triangle — centre */}
      <polygon points="10.48,17.18 17,17.18 13.74,6" fill="#0D9E9F" />
      {/* Small triangle — right */}
      <polygon points="18,17.15 21,17.15 19.5,6.86"  fill="#067374" />
    </svg>
  );
}

export type TopBarProps = {
  /** Optional page heading displayed on the left (e.g. "Projects") */
  heading?: string;
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
  heading,
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
      <div className="top-bar__left">
        {heading && <h1 className="top-bar__heading">{heading}</h1>}
      </div>
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
            <IconButton icon={<Svg24X24BellOutline />} />
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
          <IconButton icon={<Svg24X24UserAddOutline />} />
          <IconButton icon={<Svg24X24GiftOutline />} />
        </div>

        {/* Timer */}
        <button className="top-bar__timer" type="button" aria-label="Start timer">
          <Svg24X24TimerOutline aria-hidden="true" />
          00:00
        </button>

        {/* Logo chip */}
        <div className="top-bar__logo" role="img" aria-label="Teamleader">
          <LogoMark />
        </div>

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
