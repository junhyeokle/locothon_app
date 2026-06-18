/**
 * 등화행궁 패스포트 — 나의 이야기 (연꽃 이야기 완성)
 *
 *   <StoryComplete onClaim={() => { showGiftToast(); setPage('travelMap'); }} />
 *
 * 6개의 주변 원은 수집한 이야기 칸의 자리표시자입니다(아이콘은 동일한
 * 기본 아이콘으로 임시 채워져 있음). 실제 데이터가 생기면 collectedItems
 * props로 각기 다른 아이콘/이름을 넘기면 됩니다.
 */

function AchievementGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" />
      <path d="M8 6H5.5a1 1 0 0 0-1 1.2c.4 1.8 1.6 2.8 3.2 3" />
      <path d="M16 6h2.5a1 1 0 0 1 1 1.2c-.4 1.8-1.6 2.8-3.2 3" />
      <path d="M12 12v3M9 19.5c0-2 1.3-3 3-3s3 1 3 3" />
      <path d="M9 19.5h6" />
    </svg>
  );
}

function CenterLotus() {
  const petals = Array.from({ length: 10 }, (_, i) => i * 36);

  return (
    <div className="center-lotus">
      <div className="center-halo" />
      <svg viewBox="0 0 200 200" className="center-svg">
        <defs>
          <linearGradient id="completeLotusLine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd9a0" />
            <stop offset="100%" stopColor="#ff8a5c" />
          </linearGradient>
        </defs>
        {petals.map((angle) => (
          <path
            key={angle}
            d="M100,100 Q116,58 100,18 Q84,58 100,100 Z"
            fill="none"
            stroke="url(#completeLotusLine)"
            strokeWidth="1.2"
            opacity="0.85"
            transform={`rotate(${angle} 100 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="10" fill="#fff1d8" opacity="0.95" />
      </svg>
    </div>
  );
}

const DEFAULT_ITEMS = Array.from({ length: 6 }, (_, i) => ({ id: `item-${i}`, label: `이야기 ${i + 1}` }));

export default function StoryComplete({
  title = '나의 이야기',
  collectedItems = DEFAULT_ITEMS,
  heading = '연꽃 이야기 완성',
  body = ['모든 이야기를 모아', '특별한 선물을 받아보세요!'],
  ctaLabel = '선물 받기',
  onClaim,
}) {
  const ringRadius = 120;

  return (
    <div className="complete-page">
      <h1 className="complete-title">{title}</h1>

      <div className="mandala">
        {collectedItems.map((item, i) => {
          const angle = (i / collectedItems.length) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + (ringRadius / 2.4) * Math.cos(angle);
          const y = 50 + (ringRadius / 2.4) * Math.sin(angle);
          return (
            <span
              key={item.id}
              className="mandala-node"
              style={{ left: `${x}%`, top: `${y}%` }}
              title={item.label}
            >
              <AchievementGlyph />
            </span>
          );
        })}
        <CenterLotus />
      </div>

      <h2 className="complete-heading">{heading}</h2>

      <p className="complete-body">
        {body.map((line, i) => (
          <span key={line}>
            {line}
            {i < body.length - 1 && <br />}
          </span>
        ))}
      </p>

      <button type="button" className="btn-solid" onClick={onClaim}>
        {ctaLabel}
      </button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&family=Noto+Sans+KR:wght@400;500;700&display=swap');

        .complete-page {
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

        .complete-title {
          margin: 6vh 0 0;
          font-family: 'Nanum Myeongjo', serif;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0.03em;
          background: linear-gradient(180deg, #f6dfa0 0%, #c89a52 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .mandala {
          position: relative;
          width: 280px;
          height: 280px;
          margin: 32px auto 0;
        }

        .mandala-node {
          position: absolute;
          transform: translate(-50%, -50%);
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #e8c573;
          background: radial-gradient(circle, rgba(120, 70, 40, 0.5) 0%, rgba(10, 16, 28, 0.7) 80%);
          border: 1px solid rgba(216, 177, 95, 0.45);
        }

        .mandala-node svg { width: 24px; height: 24px; }

        .center-lotus {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 120px;
          height: 120px;
          transform: translate(-50%, -50%);
        }

        .center-halo {
          position: absolute;
          inset: -22%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 130, 70, 0.55) 0%, rgba(255, 90, 50, 0.2) 45%, transparent 75%);
          filter: blur(8px);
          animation: center-pulse 3.6s ease-in-out infinite;
        }

        .center-svg {
          position: relative;
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 0 10px rgba(255, 150, 90, 0.5));
        }

        @keyframes center-pulse {
          0%, 100% { opacity: 0.6; transform: scale(0.96); }
          50%      { opacity: 1;   transform: scale(1.05); }
        }

        .complete-heading {
          margin: 28px 0 0;
          font-family: 'Nanum Myeongjo', serif;
          font-size: 22px;
          font-weight: 700;
          color: #f3d896;
        }

        .complete-body {
          margin: 12px 0 0;
          padding: 0 32px;
          font-size: 14px;
          line-height: 1.7;
          color: #cfcabe;
          text-align: center;
        }

        .btn-solid {
          margin: 32px 24px calc(36px + env(safe-area-inset-bottom, 0px));
          width: calc(100% - 48px);
          padding: 16px 0;
          background: linear-gradient(135deg, #f3d896, #c9a050);
          border: none;
          border-radius: 10px;
          color: #1c1305;
          font-family: 'Nanum Myeongjo', serif;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: transform 0.1s ease, filter 0.15s ease;
        }

        .btn-solid:active { transform: scale(0.98); filter: brightness(0.96); }
        .btn-solid:focus-visible { outline: 2px solid #d8b15f; outline-offset: 2px; }

        @media (prefers-reduced-motion: reduce) {
          .center-halo { animation: none; }
          .btn-solid { transition: none; }
        }
      `}</style>
    </div>
  );
}
