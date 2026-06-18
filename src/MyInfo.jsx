import { useState } from 'react';

/**
 * 등화행궁 패스포트 — 나의 정보
 * 하단 탭 "마이"를 누르면 이 화면으로 옵니다.
 *
 *   <MyInfo
 *     onNavigate={(key) => {
 *       if (key === 'hanbok') setPage('myHanbok');
 *       // 'profile' / 'reservations' / 'settings' 는 아직 화면이 없음
 *     }}
 *     onTabChange={...}
 *   />
 */

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v8.5a1 1 0 0 0 1 1h3.5v-5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v5H17a1 1 0 0 0 1-1V10" />
    </svg>
  );
}
function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.2" />
      <path d="M14.6 9.4 13 13l-3.6 1.6L11 11l3.6-1.6Z" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5.5c0-.6.5-1 1.1-.9 2 .3 4 1 6.9 2.4 2.9-1.4 4.9-2.1 6.9-2.4.6-.1 1.1.3 1.1.9V18c0 .5-.4.9-.9 1-2.1.3-4.1 1-7.1 2.4-3-1.4-5-2.1-7.1-2.4-.5-.1-.9-.5-.9-1V5.5Z" />
      <path d="M12 7v13.4" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8.3" r="3.3" />
      <path d="M5 20c0-3.6 3-6 7-6s7 2.4 7 6" />
    </svg>
  );
}
function HanbokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 4h5l1 3-1.5 1.5h-3L9.5 7Z" />
      <path d="M10 8.4 7.5 20h9L14 8.4" />
    </svg>
  );
}
function ClipboardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4.5" width="12" height="16" rx="2" />
      <rect x="9" y="3" width="6" height="3" rx="1" />
      <path d="M9 10.5h6M9 14h6M9 17.5h3.5" />
    </svg>
  );
}
function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.4M12 18.6V21M3 12h2.4M18.6 12H21M5.7 5.7l1.7 1.7M16.6 16.6l1.7 1.7M5.7 18.3l1.7-1.7M16.6 7.4l1.7-1.7" />
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

const TABS = [
  { key: 'home', label: '홈', Icon: HomeIcon },
  { key: 'travel', label: '여행', Icon: CompassIcon },
  { key: 'story', label: '스토리', Icon: BookIcon },
  { key: 'my', label: '마이', Icon: UserIcon },
];

const MENU_ITEMS = [
  { key: 'profile', label: '내 정보', Icon: UserIcon },
  { key: 'hanbok', label: '나의 한복', Icon: HanbokIcon },
  { key: 'reservations', label: '예약 내역', Icon: ClipboardIcon },
  { key: 'settings', label: '설정', Icon: GearIcon },
];

export default function MyInfo({
  title = '나의 정보',
  avatarUrl,
  name = '김하늘',
  level = 1,
  levelTitle = '새내기 선비',
  passportNo = '000123',
  onNavigate,
  activeTab = 'my',
  onTabChange,
}) {
  const [tab, setTab] = useState(activeTab);

  const handleTabClick = (key) => {
    setTab(key);
    onTabChange?.(key);
  };

  return (
    <div className="my-info">
      <h1 className="info-title">{title}</h1>

      <div className="profile-row">
        <div className="avatar">
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} />
          ) : (
            <UserIcon />
          )}
        </div>
        <div className="profile-text">
          <p className="profile-name">{name}</p>
          <p className="profile-level">Lv.{level} {levelTitle}</p>
          <p className="profile-passport">패스포트 No. {passportNo}</p>
        </div>
      </div>

      <div className="menu-list">
        {MENU_ITEMS.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            className="menu-row"
            onClick={() => onNavigate?.(key)}
          >
            <span className="menu-icon"><Icon /></span>
            <span className="menu-label">{label}</span>
            <span className="menu-chevron"><ChevronRightIcon /></span>
          </button>
        ))}
      </div>

      <nav className="bottom-nav">
        {TABS.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            className={`nav-tab ${tab === key ? 'active' : ''}`}
            onClick={() => handleTabClick(key)}
          >
            <Icon />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&family=Noto+Sans+KR:wght@400;500;700&display=swap');

        .my-info {
          position: relative;
          width: 100%;
          min-height: 100vh;
          max-width: 480px;
          margin: 0 auto;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background:
            radial-gradient(ellipse 120% 60% at 50% -10%, #1c2e49 0%, #0e1a2c 45%, #060d18 100%);
          color: #e8cf95;
          font-family: 'Noto Sans KR', system-ui, sans-serif;
        }

        .info-title {
          margin: 7vh 0 0;
          text-align: center;
          font-family: 'Nanum Myeongjo', serif;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.03em;
          background: linear-gradient(180deg, #f6dfa0 0%, #c89a52 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .profile-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 32px 24px 0;
        }

        .avatar {
          width: 84px;
          height: 84px;
          flex-shrink: 0;
          border-radius: 50%;
          overflow: hidden;
          background: radial-gradient(circle, #2a3f60 0%, #101c30 80%);
          border: 1px solid rgba(216, 177, 95, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8d9bb5;
        }

        .avatar img { width: 100%; height: 100%; object-fit: cover; }
        .avatar svg { width: 36px; height: 36px; }

        .profile-text { flex: 1; min-width: 0; }
        .profile-name { margin: 0; font-size: 20px; font-weight: 700; color: #f3eee0; }
        .profile-level { margin: 6px 0 0; font-size: 14px; color: #e8c573; }
        .profile-passport { margin: 4px 0 0; font-size: 12px; color: #a9a397; }

        .menu-list {
          margin: 32px 24px 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .menu-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(216, 177, 95, 0.22);
          background: rgba(255, 255, 255, 0.03);
          color: #e9e4d8;
          font-family: 'Noto Sans KR', system-ui, sans-serif;
          font-size: 15px;
          cursor: pointer;
          text-align: left;
        }

        .menu-row:focus-visible { outline: 2px solid #d8b15f; outline-offset: 2px; }

        .menu-icon { display: flex; color: #d8b15f; flex-shrink: 0; }
        .menu-icon svg { width: 20px; height: 20px; }
        .menu-label { flex: 1; }
        .menu-chevron { display: flex; color: #6f6a5e; flex-shrink: 0; }
        .menu-chevron svg { width: 16px; height: 16px; }

        .bottom-nav {
          margin-top: auto;
          margin-left: 16px;
          margin-right: 16px;
          margin-bottom: calc(20px + env(safe-area-inset-bottom, 0px));
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 10px 4px;
          border: 1px solid rgba(216, 177, 95, 0.35);
          border-radius: 18px;
          background: rgba(8, 15, 26, 0.55);
        }

        .nav-tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          padding: 6px 10px;
          color: #8d887c;
          cursor: pointer;
          font-family: 'Noto Sans KR', system-ui, sans-serif;
          transition: color 0.15s ease;
        }

        .nav-tab svg { width: 22px; height: 22px; }
        .nav-tab span { font-size: 11px; }
        .nav-tab.active { color: #e8c573; }
        .nav-tab:focus-visible { outline: 2px solid #d8b15f; outline-offset: 2px; border-radius: 8px; }
      `}</style>
    </div>
  );
}
