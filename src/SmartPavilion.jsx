/**
 * 등화행궁 패스포트 — 스마트 파빌리온
 *
 *   <SmartPavilion bloomPercent={80} onBloom={() => setPage('storyDiscovered')} />
 *
 * bloomPercent는 DB가 없어서 하드코딩된 기본값입니다.
 */

function GlowingLotus({ size = 200 }) {
  const petals = Array.from({ length: 10 }, (_, i) => i * 36);

  return (
    <div className="glowing-lotus" style={{ width: size, height: size }}>
      <div className="pavilion-ring" />
      <div className="lotus-halo" />
      <svg viewBox="0 0 200 200" className="lotus-svg">
        <defs>
          <linearGradient id="pavLotusLine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffb6c9" />
            <stop offset="100%" stopColor="#9eb8ff" />
          </linearGradient>
        </defs>
        {petals.map((angle) => (
          <path
            key={angle}
            d="M100,100 Q118,55 100,15 Q82,55 100,100 Z"
            fill="none"
            stroke="url(#pavLotusLine)"
            strokeWidth="1.2"
            opacity="0.85"
            transform={`rotate(${angle} 100 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="10" fill="#ffe3ec" opacity="0.9" />
      </svg>
    </div>
  );
}

export default function SmartPavilion({
  title = '스마트 파빌리온',
  caption = '꽃이 피어나는 순간을 경험해보세요.',
  bloomPercent = 80,
  fullUnlockNote = '한복 착용 시 100% 개방됩니다.',
  ctaLabel = '꽃 피우기',
  onBloom,
}) {
  return (
    <div className="pavilion-page">
      <h1 className="pavilion-title">{title}</h1>

      <GlowingLotus />

      <p className="pavilion-caption">{caption}</p>

      <button type="button" className="btn-solid" onClick={onBloom}>
        {ctaLabel}
      </button>

      <p className="bloom-rate">현재 개화율 {bloomPercent}%</p>
      <p className="bloom-note">{fullUnlockNote}</p>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&family=Noto+Sans+KR:wght@400;500;700&display=swap');

        .pavilion-page {
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

        .pavilion-title {
          margin: 7vh 0 0;
          font-family: 'Nanum Myeongjo', serif;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.03em;
          background: linear-gradient(180deg, #f6dfa0 0%, #c89a52 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .glowing-lotus { position: relative; margin: 40px auto 0; }

        .pavilion-ring {
          position: absolute;
          top: -8%;
          left: 50%;
          transform: translateX(-50%);
          width: 64%;
          height: 16%;
          border-radius: 50%;
          border: 3px solid rgba(150, 190, 255, 0.7);
          box-shadow: 0 0 22px 4px rgba(140, 180, 255, 0.5);
        }

        .lotus-halo {
          position: absolute;
          inset: -16%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 120, 170, 0.5) 0%, rgba(140, 170, 255, 0.22) 42%, transparent 72%);
          filter: blur(10px);
          animation: lotus-pulse 3.6s ease-in-out infinite;
        }

        .lotus-svg {
          position: relative;
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 0 10px rgba(255, 140, 180, 0.4));
        }

        @keyframes lotus-pulse {
          0%, 100% { opacity: 0.6; transform: scale(0.96); }
          50%      { opacity: 1;   transform: scale(1.04); }
        }

        .pavilion-caption {
          margin: 36px 0 0;
          padding: 0 32px;
          font-size: 15px;
          color: #cfcabe;
          text-align: center;
        }

        .btn-solid {
          margin-top: 28px;
          width: calc(100% - 64px);
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

        .bloom-rate {
          margin: 32px 0 0;
          font-size: 16px;
          font-weight: 500;
          color: #f0ebe0;
        }

        .bloom-note {
          margin: 8px 0 0 0;
          padding-bottom: 6vh;
          font-size: 13px;
          color: #a9a397;
        }

        @media (prefers-reduced-motion: reduce) {
          .lotus-halo { animation: none; }
          .btn-solid { transition: none; }
        }
      `}</style>
    </div>
  );
}
