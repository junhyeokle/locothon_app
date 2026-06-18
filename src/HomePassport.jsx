import { useState } from 'react';

/**
 * 등화행궁 패스포트 — 메인 화면 (나의 패스포트)
 *
 * DB가 아직 없어서 레벨/진행도/통계는 props 기본값으로 하드코딩되어 있습니다.
 * 나중에 실제 데이터가 생기면 이 default 값들 대신 API 응답을 props로 넘기면 됩니다.
 *
 *   <HomePassport
 *     level={1}
 *     levelTitle="새내기 선비"
 *     progressPercent={30}
 *     visitedSpaces={3}
 *     discoveredStories={5}
 *     onTabChange={(key) => { ... }}   // 'home' | 'travel' | 'story' | 'my'
 *     onShare={() => { ... }}            // 우측 상단 내보내기 아이콘
 *   />
 *
 * 하단 탭은 클릭하면 active 표시가 바뀌고 onTabChange가 호출됩니다.
 * 실제로 어느 화면으로 이동할지는 아직 안 정해졌으니, 각 탭 화면을 만들 때
 * onTabChange 콜백 안에서 라우팅을 연결하면 됩니다.
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

function ShareExportIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4.5" y="9" width="15" height="11" rx="2" />
      <path d="M12 3v8M9 6.5 12 3l3 3.5" />
    </svg>
  );
}

const TABS = [
  { key: 'home', label: '홈', Icon: HomeIcon },
  { key: 'travel', label: '여행', Icon: CompassIcon },
  { key: 'story', label: '스토리', Icon: BookIcon },
  { key: 'my', label: '마이', Icon: UserIcon },
];

export default function HomePassport({
  level = 1,
  levelTitle = '새내기 선비',
  progressPercent = 30,
  progressLabel = '여정 진행도',
  visitedSpaces = 3,
  discoveredStories = 5,
  activeTab = 'home',
  onTabChange,
  onShare,
}) {
  const [tab, setTab] = useState(activeTab);

  const handleTabClick = (key) => {
    setTab(key);
    onTabChange?.(key);
  };

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const clampedPercent = Math.min(Math.max(progressPercent, 0), 100);
  const dashOffset = circumference * (1 - clampedPercent / 100);

  return (
    <div className="home-passport">
      <header className="home-header">
        <h1>나의 패스포트</h1>
        <button type="button" className="icon-button" onClick={onShare} aria-label="패스포트 내보내기">
          <ShareExportIcon />
        </button>
      </header>

      <p className="level-row">
        <span className="level-badge">Lv.{level}</span>
        {levelTitle}
      </p>

      <div className="progress-ring">
        <svg viewBox="0 0 200 200">
          <defs>
            <linearGradient id="progressGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c89a52" />
              <stop offset="100%" stopColor="#f6dfa0" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r={radius} className="ring-track" strokeWidth="14" fill="none" />
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="url(#progressGold)"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 100 100)"
          />
        </svg>
        <div className="ring-center">
          <p className="ring-percent">
            {clampedPercent}
            <span>%</span>
          </p>
          <p className="ring-label">{progressLabel}</p>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat">
          <p className="stat-label">방문한 공간</p>
          <p className="stat-value">{visitedSpaces}</p>
        </div>
        <div className="stat">
          <p className="stat-label">발견한 이야기</p>
          <p className="stat-value">{discoveredStories}</p>
        </div>
      </div>

      <div className="dots-indicator" aria-hidden="true">
        <span className="dots-line" />
        <span className="dot dot-active" />
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="dots-line" />
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

        .home-passport {
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

        .home-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 7vh 24px 0;
        }

        .home-header h1 {
          margin: 0;
          font-family: 'Nanum Myeongjo', serif;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.02em;
          background: linear-gradient(180deg, #f6dfa0 0%, #c89a52 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .icon-button {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(216, 177, 95, 0.6);
          background: rgba(255, 255, 255, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d8b15f;
          cursor: pointer;
          padding: 0;
        }

        .icon-button svg {
          width: 20px;
          height: 20px;
        }

        .icon-button:focus-visible {
          outline: 2px solid #d8b15f;
          outline-offset: 2px;
        }

        .level-row {
          margin: 30px 0 0;
          text-align: center;
          font-size: 19px;
          font-weight: 500;
          color: #e9e4d8;
        }

        .level-badge {
          color: #e8c573;
          font-weight: 700;
          margin-right: 8px;
          font-family: 'Nanum Myeongjo', serif;
        }

        .progress-ring {
          position: relative;
          width: 230px;
          height: 230px;
          margin: 40px auto 0;
        }

        .progress-ring svg {
          width: 100%;
          height: 100%;
        }

        .ring-track {
          stroke: rgba(255, 255, 255, 0.07);
        }

        .ring-center {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .ring-percent {
          margin: 0;
          font-size: 52px;
          font-weight: 700;
          color: #f3eee0;
          line-height: 1;
        }

        .ring-percent span {
          font-size: 26px;
          font-weight: 500;
          margin-left: 2px;
        }

        .ring-label {
          margin: 8px 0 0;
          font-size: 13px;
          color: #a9a397;
          letter-spacing: 0.02em;
        }

        .stats-row {
          display: flex;
          justify-content: center;
          gap: 72px;
          margin-top: 36px;
        }

        .stat {
          text-align: center;
        }

        .stat-label {
          margin: 0;
          font-size: 13px;
          color: #a9a397;
        }

        .stat-value {
          margin: 6px 0 0;
          font-size: 30px;
          font-weight: 700;
          color: #f3eee0;
          font-family: 'Nanum Myeongjo', serif;
        }

        .dots-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 34px;
        }

        .dots-line {
          width: 56px;
          height: 1px;
          background: rgba(255, 255, 255, 0.15);
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
        }

        .dot-active {
          width: 8px;
          height: 8px;
          background: transparent;
          border: 1.4px solid #d8b15f;
        }

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

        .nav-tab svg {
          width: 22px;
          height: 22px;
        }

        .nav-tab span {
          font-size: 11px;
        }

        .nav-tab.active {
          color: #e8c573;
        }

        .nav-tab:focus-visible {
          outline: 2px solid #d8b15f;
          outline-offset: 2px;
          border-radius: 8px;
        }

        @media (prefers-reduced-motion: reduce) {
          .nav-tab { transition: none; }
        }
      `}</style>
    </div>
  );
}
