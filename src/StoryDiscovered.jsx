/**
 * 등화행궁 패스포트 — 이야기 발견
 *
 *   <StoryDiscovered onCollect={() => setPage('storyComplete')} />
 */

function RewardGlyph() {
  return (
    <svg viewBox="0 0 40 40" className="reward-glyph">
      <defs>
        <linearGradient id="rewardGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bcd9ff" />
          <stop offset="100%" stopColor="#5c86d6" />
        </linearGradient>
      </defs>
      <path
        d="M20,30 Q26,24 26,16 Q26,8 20,4 Q14,8 14,16 Q14,24 20,30 Z"
        fill="url(#rewardGrad)"
        opacity="0.9"
      />
      <circle cx="20" cy="18" r="3" fill="#eef5ff" opacity="0.85" />
    </svg>
  );
}

export default function StoryDiscovered({
  title = '이야기 발견',
  storyTitle = '연꽃의 이야기',
  storyBody = [
    '연꽃은 진흙 속에서도 아름답게',
    '피어나는 생명력의 상징입니다.',
    '이곳 행궁동의 역사와 함께',
    '피어났던 이야기입니다.',
  ],
  rewardLabel = '이야기 보상',
  rewardName = '연꽃 문양 조각',
  ctaLabel = '수집하기',
  onCollect,
}) {
  return (
    <div className="discover-page">
      <h1 className="discover-title">{title}</h1>

      <div className="story-card">
        <p className="story-card-title">{storyTitle}</p>
        <div className="story-card-divider" />
        <p className="story-card-body">
          {storyBody.map((line, i) => (
            <span key={line}>
              {line}
              {i < storyBody.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>

      <p className="reward-label">{rewardLabel}</p>

      <div className="reward-row">
        <div className="reward-thumb">
          <RewardGlyph />
        </div>
        <p className="reward-name">{rewardName}</p>
      </div>

      <button type="button" className="btn-solid" onClick={onCollect}>
        {ctaLabel}
      </button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&family=Noto+Sans+KR:wght@400;500;700&display=swap');

        .discover-page {
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

        .discover-title {
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

        .story-card {
          margin: 32px 24px 0;
          padding: 20px;
          border-radius: 14px;
          border: 1px solid rgba(216, 177, 95, 0.3);
          background: rgba(255, 255, 255, 0.03);
        }

        .story-card-title {
          margin: 0;
          font-family: 'Nanum Myeongjo', serif;
          font-size: 18px;
          font-weight: 700;
          color: #e8c573;
        }

        .story-card-divider {
          margin: 14px 0;
          height: 1px;
          background: rgba(216, 177, 95, 0.25);
        }

        .story-card-body {
          margin: 0;
          font-size: 14px;
          line-height: 1.8;
          color: #d9d4c7;
        }

        .reward-label {
          margin: 28px 24px 0;
          font-size: 13px;
          color: #a9a397;
        }

        .reward-row {
          margin: 12px 24px 0;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .reward-thumb {
          width: 56px;
          height: 56px;
          flex-shrink: 0;
          border-radius: 10px;
          border: 1px solid rgba(216, 177, 95, 0.3);
          background: rgba(255, 255, 255, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .reward-glyph { width: 30px; height: 30px; filter: drop-shadow(0 0 6px rgba(140, 180, 255, 0.6)); }

        .reward-name { margin: 0; font-size: 15px; font-weight: 500; color: #f0ebe0; }

        .btn-solid {
          margin: auto 24px calc(36px + env(safe-area-inset-bottom, 0px));
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
          .btn-solid { transition: none; }
        }
      `}</style>
    </div>
  );
}
