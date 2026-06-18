import { useState } from 'react';

/**
 * 등화행궁 패스포트 — 첫 화면 (스플래시)
 *
 * 사용법:
 *   <PassportSplash
 *     backgroundImageUrl="/images/night-palace.jpg"  // 본인이 넣을 야경 사진 경로
 *     onStart={() => navigate('/home')}                // "패스포트 시작하기" 클릭 시 동작
 *   />
 *
 * - backgroundImageUrl을 안 넘기면 사진 자리에 안내 placeholder가 보입니다.
 * - 로고는 금색 그라데이션 연꽃 SVG로 직접 그려 넣었습니다. 원하면 LotusEmblem
 *   함수 안의 <path>들만 본인 로고 SVG로 교체하면 됩니다.
 */

function LotusEmblem() {
  return (
    <svg viewBox="0 0 120 120" className="emblem-svg" aria-hidden="true">
      <defs>
        <linearGradient id="goldBright" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#9c7a3e" />
          <stop offset="100%" stopColor="#f6dfa0" />
        </linearGradient>
        <linearGradient id="goldMid" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#7d5f30" />
          <stop offset="100%" stopColor="#dcb567" />
        </linearGradient>
        <linearGradient id="goldDark" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#5e4720" />
          <stop offset="100%" stopColor="#b48d49" />
        </linearGradient>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dcb567" />
          <stop offset="100%" stopColor="#8a6a35" />
        </linearGradient>
      </defs>

      <circle cx="60" cy="60" r="54" fill="none" stroke="url(#ringGrad)" strokeWidth="1.6" />
      <circle cx="60" cy="60" r="50" fill="none" stroke="url(#ringGrad)" strokeWidth="0.6" opacity="0.6" />

      <g id="rightPetals">
        <path d="M60,90 Q77.9,98.4 86.3,80.4 Q68.4,72.0 60,90 Z" fill="url(#goldDark)" />
        <path d="M60,90 Q81.9,86.4 85.5,64.5 Q63.6,68.1 60,90 Z" fill="url(#goldMid)" />
        <path d="M60,90 Q76.6,73.7 74.4,50.5 Q57.8,66.8 60,90 Z" fill="url(#goldBright)" />
      </g>
      <use href="#rightPetals" xlinkHref="#rightPetals" transform="scale(-1,1) translate(-120,0)" />

      <path d="M60,90 Q69,67 60,44 Q51,67 60,90 Z" fill="url(#goldBright)" />
      <ellipse cx="60" cy="91" rx="6" ry="3" fill="url(#goldMid)" />
    </svg>
  );
}

export default function PassportSplash({ backgroundImageUrl, onStart }) {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="passport-splash">
      <div className="stars" />

      <div className="scene">
        {backgroundImageUrl ? (
          <div className="scene-image" style={{ backgroundImage: `url(${backgroundImageUrl})` }} />
        ) : (
          <div className="scene-placeholder">배경 사진 자리 (야경 사진을 여기에)</div>
        )}
        <div className="scene-fade" />
      </div>

      <div className="content">
        <header className="titles">
          <h1>등화행궁</h1>
          <p>패스포트</p>
        </header>

        <div className="emblem">
          <LotusEmblem />
        </div>
      </div>

      <button
        type="button"
        className={`start-button ${pressed ? 'pressed' : ''}`}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        onClick={onStart}
      >
        패스포트 시작하기
      </button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&display=swap');

        .passport-splash {
          position: relative;
          width: 100%;
          min-height: 100vh;
          max-width: 480px;
          margin: 0 auto;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: 'Nanum Myeongjo', serif;
          background:
            radial-gradient(ellipse 120% 60% at 50% -10%, #1c2e49 0%, #0e1a2c 45%, #060d18 100%);
          color: #e8cf95;
        }

        .stars {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-image:
            radial-gradient(1.5px 1.5px at 20% 15%, #f3e3ba 60%, transparent 100%),
            radial-gradient(1px 1px at 70% 8%, #f3e3ba 60%, transparent 100%),
            radial-gradient(1.2px 1.2px at 85% 22%, #f3e3ba 60%, transparent 100%),
            radial-gradient(1px 1px at 40% 25%, #f3e3ba 50%, transparent 100%),
            radial-gradient(1.5px 1.5px at 55% 12%, #f3e3ba 60%, transparent 100%),
            radial-gradient(1px 1px at 10% 30%, #f3e3ba 50%, transparent 100%);
          opacity: 0.7;
          animation: twinkle 6s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }

        .scene {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 46%;
          z-index: 1;
        }

        .scene-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
        }

        .scene-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px dashed rgba(220, 181, 103, 0.35);
          margin: 8px;
          font-family: system-ui, sans-serif;
          font-size: 13px;
          color: rgba(232, 207, 149, 0.45);
          text-align: center;
          padding: 12px;
        }

        .scene-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(6, 13, 24, 1) 0%,
            rgba(6, 13, 24, 0.55) 35%,
            rgba(6, 13, 24, 0) 75%
          );
        }

        .content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding-top: 17vh;
        }

        .titles {
          text-align: center;
        }

        .titles h1 {
          margin: 0;
          font-size: 42px;
          font-weight: 800;
          letter-spacing: 0.06em;
          background: linear-gradient(180deg, #f6dfa0 0%, #c89a52 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .titles p {
          margin: 10px 0 0;
          font-size: 19px;
          font-weight: 400;
          letter-spacing: 0.25em;
          color: #d8b15f;
        }

        .emblem {
          margin-top: 48px;
          width: 130px;
          height: 130px;
        }

        .emblem-svg {
          width: 100%;
          height: 100%;
        }

        .start-button {
          position: relative;
          z-index: 3;
          margin: 0 24px calc(36px + env(safe-area-inset-bottom, 0px));
          margin-top: auto;
          width: calc(100% - 48px);
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

        .start-button.pressed {
          background: rgba(201, 160, 80, 0.18);
          transform: scale(0.98);
        }

        @media (prefers-reduced-motion: reduce) {
          .stars { animation: none; }
          .start-button { transition: none; }
        }
      `}</style>
    </div>
  );
}
