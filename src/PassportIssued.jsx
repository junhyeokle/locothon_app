import { useState } from 'react';

/**
 * 등화행궁 패스포트 — 세 번째 화면 (발급 완료)
 *
 * 이전 QR 스캔 화면의 onScanned 콜백에서 이 화면으로 이동시키면 됩니다:
 *   <PassportQRScan onScanned={() => setPage('issued')} />
 *   {page === 'issued' && <PassportIssued onConfirm={() => setPage('home')} />}
 *
 * 카드가 살짝 기울어진 채로 등장(scale+rotate+fade)하고, 한 번 금빛 광택이
 * 스쳐 지나가는 애니메이션이 더해져 있습니다. prefers-reduced-motion이면
 * 애니메이션 없이 바로 최종 상태로 보입니다.
 */

function LotusEmblem() {
  return (
    <svg viewBox="0 0 120 120" className="emblem-svg" aria-hidden="true">
      <defs>
        <linearGradient id="issuedGoldBright" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#9c7a3e" />
          <stop offset="100%" stopColor="#f6dfa0" />
        </linearGradient>
        <linearGradient id="issuedGoldMid" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#7d5f30" />
          <stop offset="100%" stopColor="#dcb567" />
        </linearGradient>
        <linearGradient id="issuedGoldDark" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#5e4720" />
          <stop offset="100%" stopColor="#b48d49" />
        </linearGradient>
        <linearGradient id="issuedRingGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dcb567" />
          <stop offset="100%" stopColor="#8a6a35" />
        </linearGradient>
      </defs>

      <circle cx="60" cy="60" r="54" fill="none" stroke="url(#issuedRingGrad)" strokeWidth="1.6" />

      <g id="issuedRightPetals">
        <path d="M60,90 Q77.9,98.4 86.3,80.4 Q68.4,72.0 60,90 Z" fill="url(#issuedGoldDark)" />
        <path d="M60,90 Q81.9,86.4 85.5,64.5 Q63.6,68.1 60,90 Z" fill="url(#issuedGoldMid)" />
        <path d="M60,90 Q76.6,73.7 74.4,50.5 Q57.8,66.8 60,90 Z" fill="url(#issuedGoldBright)" />
      </g>
      <use href="#issuedRightPetals" xlinkHref="#issuedRightPetals" transform="scale(-1,1) translate(-120,0)" />

      <path d="M60,90 Q69,67 60,44 Q51,67 60,90 Z" fill="url(#issuedGoldBright)" />
      <ellipse cx="60" cy="91" rx="6" ry="3" fill="url(#issuedGoldMid)" />
    </svg>
  );
}

export default function PassportIssued({
  onConfirm,
  title = '패스포트 발급 완료!',
  cardTitle = '등화행궁',
  cardSubtitle = '패스포트',
  message = ['등화행궁 패스포트가', '발급되었습니다.'],
  confirmLabel = '확인',
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="passport-issued">
      <h1 className="issued-title">{title}</h1>

      <div className="card-stage">
        <div className="passport-card">
          <span className="card-corner cc-tl" />
          <span className="card-corner cc-tr" />
          <span className="card-corner cc-bl" />
          <span className="card-corner cc-br" />
          <div className="card-shine" />

          <div className="card-text">
            <p className="card-title">{cardTitle}</p>
            <p className="card-subtitle">{cardSubtitle}</p>
          </div>

          <div className="card-emblem">
            <LotusEmblem />
          </div>
        </div>
      </div>

      <p className="issued-message">
        {message.map((line, i) => (
          <span key={line}>
            {line}
            {i < message.length - 1 && <br />}
          </span>
        ))}
      </p>

      <button
        type="button"
        className={`confirm-button ${pressed ? 'pressed' : ''}`}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        onClick={onConfirm}
      >
        {confirmLabel}
      </button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&family=Noto+Sans+KR:wght@400;500&display=swap');

        .passport-issued {
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
        }

        .issued-title {
          margin: 11vh 0 0;
          font-family: 'Nanum Myeongjo', serif;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.03em;
          background: linear-gradient(180deg, #f6dfa0 0%, #c89a52 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .card-stage {
          margin-top: 56px;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .passport-card {
          position: relative;
          width: 200px;
          height: 290px;
          border-radius: 14px;
          background: linear-gradient(150deg, #18283f 0%, #0a1422 75%);
          border: 1px solid rgba(216, 177, 95, 0.55);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 28px 16px 24px;
          overflow: hidden;
          transform: rotate(-9deg) scale(0.85);
          opacity: 0;
          animation: card-in 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        @keyframes card-in {
          to { transform: rotate(-9deg) scale(1); opacity: 1; }
        }

        .card-corner {
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: rgba(216, 177, 95, 0.8);
        }

        .cc-tl { top: 10px; left: 10px; border-top: 1.5px solid; border-left: 1.5px solid; }
        .cc-tr { top: 10px; right: 10px; border-top: 1.5px solid; border-right: 1.5px solid; }
        .cc-bl { bottom: 10px; left: 10px; border-bottom: 1.5px solid; border-left: 1.5px solid; }
        .cc-br { bottom: 10px; right: 10px; border-bottom: 1.5px solid; border-right: 1.5px solid; }

        .card-shine {
          position: absolute;
          top: -50%;
          left: -60%;
          width: 40%;
          height: 220%;
          background: linear-gradient(
            75deg,
            transparent 0%,
            rgba(255, 255, 255, 0.16) 45%,
            rgba(255, 255, 255, 0.32) 50%,
            rgba(255, 255, 255, 0.16) 55%,
            transparent 100%
          );
          animation: shine-sweep 1.1s ease-in-out 0.6s 1;
          pointer-events: none;
        }

        @keyframes shine-sweep {
          0%   { left: -60%; opacity: 0; }
          15%  { opacity: 1; }
          60%  { opacity: 1; }
          100% { left: 130%; opacity: 0; }
        }

        .card-text {
          text-align: center;
        }

        .card-title {
          margin: 0;
          font-family: 'Nanum Myeongjo', serif;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.04em;
          background: linear-gradient(180deg, #f6dfa0 0%, #c89a52 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .card-subtitle {
          margin: 4px 0 0;
          font-family: 'Nanum Myeongjo', serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          color: #cda257;
        }

        .card-emblem {
          margin-top: auto;
          margin-bottom: 6px;
          width: 78px;
          height: 78px;
        }

        .card-emblem .emblem-svg {
          width: 100%;
          height: 100%;
        }

        .issued-message {
          margin: 48px 0 0;
          padding: 0 32px;
          font-family: 'Noto Sans KR', system-ui, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.7;
          color: #cfcabe;
          text-align: center;
        }

        .confirm-button {
          margin: auto 24px calc(36px + env(safe-area-inset-bottom, 0px));
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

        .confirm-button.pressed {
          background: rgba(201, 160, 80, 0.18);
          transform: scale(0.98);
        }

        @media (prefers-reduced-motion: reduce) {
          .passport-card { animation: none; transform: rotate(-9deg) scale(1); opacity: 1; }
          .card-shine { display: none; }
          .confirm-button { transition: none; }
        }
      `}</style>
    </div>
  );
}
