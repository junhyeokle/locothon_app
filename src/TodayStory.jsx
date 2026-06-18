import { useState } from 'react';

/**
 * 등화행궁 패스포트 — 오늘의 이야기
 * 메인 화면 하단 탭 "여행"을 누르면 이 화면으로 옵니다.
 *
 *   <TodayStory onViewStory={() => setPage('travelMap')} onTabChange={...} />
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

const TABS = [
  { key: 'home', label: '홈', Icon: HomeIcon },
  { key: 'travel', label: '여행', Icon: CompassIcon },
  { key: 'story', label: '스토리', Icon: BookIcon },
  { key: 'my', label: '마이', Icon: UserIcon },
];

function GlowingLotus({ size = 220 }) {
  const petals = Array.from({ length: 10 }, (_, i) => i * 36);

  return (
    <div className="glowing-lotus" style={{ width: size, height: size }}>
      <div className="lotus-halo" />
      <svg viewBox="0 0 200 200" className="lotus-svg">
        <defs>
          <linearGradient id="lotusLine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffb6c9" />
            <stop offset="100%" stopColor="#caa0ff" />
          </linearGradient>
        </defs>
        {petals.map((angle) => (
          <path
            key={angle}
            d="M100,100 Q118,55 100,15 Q82,55 100,100 Z"
            fill="none"
            stroke="url(#lotusLine)"
            strokeWidth="1.2"
            opacity="0.85"
            transform={`rotate(${angle} 100 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="10" fill="#ffe3ec" opacity="0.9" />
      </svg>
      <span className="sparkle s1" />
      <span className="sparkle s2" />
      <span className="sparkle s3" />
      <span className="sparkle s4" />
    </div>
  );
}

export default function TodayStory({
  title = '오늘의 이야기',
  body = ["오늘의 행궁동은", "'연꽃' 이야기로 가득합니다.", '숨겨진 장소를 찾아보세요.'],
  ctaLabel = '이야기 보러가기',
  onViewStory,
  activeTab = 'travel',
  onTabChange,
}) {
  const [tab, setTab] = useState(activeTab);
  const [pressed, setPressed] = useState(false);

  const handleTabClick = (key) => {
    setTab(key);
    onTabChange?.(key);
  };

  return (
    <div className="today-story">
      <h1 className="story-title">{title}</h1>

      <p className="story-body">
        {body.map((line, i) => (
          <span key={line}>
            {line}
            {i < body.length - 1 && <br />}
          </span>
        ))}
      </p>

      <GlowingLotus />

      <button
        type="button"
        className={`btn-outline ${pressed ? 'pressed' : ''}`}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        onClick={onViewStory}
      >
        {ctaLabel}
      </button>

      <div className="dots-indicator" aria-hidden="true">
        <span className="dot dot-active" />
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
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

        .today-story {
          position: relative;
          width: 100%;
          min-height: 100vh;
          max-width: 480px;
          margin: 0 auto;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          background:
            radial-gradient(ellipse 120% 60% at 50% -10%, #1c2e49 0%, #0e1a2c 45%, #060d18 100%);
          color: #e8cf95;
          font-family: 'Noto Sans KR', system-ui, sans-serif;
        }

        .story-title {
          margin: 8vh 0 0;
          font-family: 'Nanum Myeongjo', serif;
          font-size: 26px;
          font-weight: 700;
          letter-spacing: 0.03em;
          background: linear-gradient(180deg, #f6dfa0 0%, #c89a52 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .story-body {
          margin: 28px 0 0;
          padding: 0 32px;
          font-size: 16px;
          line-height: 1.7;
          color: #e9e4d8;
          text-align: center;
        }

        .glowing-lotus {
          position: relative;
          margin: 36px auto 0;
        }

        .lotus-halo {
          position: absolute;
          inset: -20%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 120, 170, 0.5) 0%, rgba(190, 130, 255, 0.2) 40%, transparent 72%);
          filter: blur(10px);
          animation: lotus-pulse 3.6s ease-in-out infinite;
        }

        .lotus-svg {
          position: relative;
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 0 10px rgba(255, 140, 180, 0.45));
        }

        @keyframes lotus-pulse {
          0%, 100% { opacity: 0.6; transform: scale(0.96); }
          50%      { opacity: 1;   transform: scale(1.04); }
        }

        .sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.8);
          animation: twinkle 2.6s ease-in-out infinite;
        }

        .s1 { top: 8%; left: 18%; animation-delay: 0s; }
        .s2 { top: 14%; right: 12%; animation-delay: 0.6s; }
        .s3 { bottom: 18%; left: 10%; animation-delay: 1.2s; }
        .s4 { bottom: 10%; right: 16%; animation-delay: 1.8s; }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50%      { opacity: 1; }
        }

        .btn-outline {
          margin-top: 40px;
          width: calc(100% - 64px);
          padding: 16px 0;
          background: rgba(6, 13, 24, 0.35);
          border: 1px solid #c9a050;
          border-radius: 10px;
          color: #e8cf95;
          font-family: 'Nanum Myeongjo', serif;
          font-size: 16px;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.1s ease;
        }

        .btn-outline.pressed {
          background: rgba(201, 160, 80, 0.18);
          transform: scale(0.98);
        }

        .dots-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 22px;
        }

        .dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255, 255, 255, 0.25); }
        .dot-active { width: 8px; height: 8px; background: transparent; border: 1.4px solid #d8b15f; }

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

        @media (prefers-reduced-motion: reduce) {
          .lotus-halo, .sparkle { animation: none; }
          .btn-outline, .nav-tab { transition: none; }
        }
      `}</style>
    </div>
  );
}
