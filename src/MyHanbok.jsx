import { useState } from 'react';

/**
 * 등화행궁 패스포트 — 나의 한복
 *
 *   <MyHanbok />
 *
 * "AI 분석 결과 보기"를 누르면 팝업으로 분석 결과가 뜨고, 팝업의
 * "닫기"를 누르면 닫힙니다. 분석 문구는 임시로 작성된 예시 텍스트입니다.
 */

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 5 8 12l7 7" />
    </svg>
  );
}

const DEFAULT_TRAITS = [
  { label: '색상 분위기', value: '연보라 — 차분하고 우아한 인상' },
  { label: '스타일', value: '고풍스러움, 단아함' },
  { label: '연관 스토리', value: "오늘 발견한 '연꽃 이야기'와 어울림" },
];

export default function MyHanbok({
  title = '나의 한복',
  imageUrl,
  name = '연보라 당의',
  tags = ['우아함', '고풍스러움', '연꽃'],
  ctaLabel = 'AI 분석 결과 보기',
  analysisTitle = 'AI 분석 결과',
  analysisSummary = "연보라 당의는 차분한 채도와 매끄러운 실루엣이 어우러져 우아하면서도 단정한 인상을 줍니다. 치맡단의 연꽃 문양은 오늘 발견한 '연꽃 이야기'와 자연스럽게 이어지는 디테일이에요.",
  analysisTraits = DEFAULT_TRAITS,
  onBack,
}) {
  const [showAnalysis, setShowAnalysis] = useState(false);

  return (
    <div className="my-hanbok">
      <header className="hanbok-header">
        <button type="button" className="back-button" onClick={onBack} aria-label="나의 정보로 돌아가기">
          <BackIcon />
        </button>
        <h1 className="hanbok-title">{title}</h1>
      </header>

      <div className="hanbok-card">
        <div className="hanbok-image-wrap">
          {imageUrl ? (
            <img className="hanbok-image" src={imageUrl} alt={name} />
          ) : (
            <div className="hanbok-image-empty">한복 사진 자리</div>
          )}
        </div>

        <p className="hanbok-name">{name}</p>

        <div className="hanbok-tags">
          {tags.map((tag) => (
            <span key={tag} className="hanbok-tag">{tag}</span>
          ))}
        </div>
      </div>

      <button type="button" className="btn-outline" onClick={() => setShowAnalysis(true)}>
        {ctaLabel}
      </button>

      {showAnalysis && (
        <div className="analysis-backdrop" onClick={() => setShowAnalysis(false)}>
          <div className="analysis-modal" onClick={(e) => e.stopPropagation()}>
            <div className="analysis-header">
              <h2>{analysisTitle}</h2>
              <button
                type="button"
                className="analysis-close-icon"
                onClick={() => setShowAnalysis(false)}
                aria-label="분석 결과 닫기"
              >
                <CloseIcon />
              </button>
            </div>

            <p className="analysis-summary">{analysisSummary}</p>

            <div className="analysis-traits">
              {analysisTraits.map((trait) => (
                <div key={trait.label} className="trait-row">
                  <span className="trait-label">{trait.label}</span>
                  <span className="trait-value">{trait.value}</span>
                </div>
              ))}
            </div>

            <button type="button" className="btn-solid" onClick={() => setShowAnalysis(false)}>
              닫기
            </button>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&family=Noto+Sans+KR:wght@400;500;700&display=swap');

        .my-hanbok {
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

        .hanbok-header {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 6vh;
        }

        .back-button {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: none;
          background: none;
          color: #cfcabe;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .back-button svg { width: 19px; height: 19px; }
        .back-button:focus-visible { outline: 2px solid #d8b15f; outline-offset: 2px; }

        .hanbok-title {
          margin: 0;
          font-family: 'Nanum Myeongjo', serif;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.03em;
          background: linear-gradient(180deg, #f6dfa0 0%, #c89a52 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hanbok-card {
          margin: 28px 24px 0;
          width: calc(100% - 48px);
          border-radius: 16px;
          border: 1px solid rgba(216, 177, 95, 0.3);
          background: rgba(255, 255, 255, 0.03);
          padding: 18px 18px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hanbok-image-wrap {
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: 12px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.2);
        }

        .hanbok-image { width: 100%; height: 100%; object-fit: cover; }

        .hanbok-image-empty {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.35);
          text-align: center;
          padding: 12px;
        }

        .hanbok-name { margin: 18px 0 0; font-size: 17px; font-weight: 700; color: #f0ebe0; }

        .hanbok-tags {
          margin-top: 14px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }

        .hanbok-tag {
          padding: 7px 14px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.06);
          color: #cfcabe;
          font-size: 13px;
        }

        .btn-outline {
          margin-top: 28px;
          width: calc(100% - 48px);
          padding: 16px 0;
          background: rgba(6, 13, 24, 0.35);
          border: 1px solid #c9a050;
          border-radius: 10px;
          color: #e8cf95;
          font-family: 'Nanum Myeongjo', serif;
          font-size: 16px;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.1s ease;
        }

        .btn-outline:active { background: rgba(201, 160, 80, 0.18); transform: scale(0.98); }
        .btn-outline:focus-visible { outline: 2px solid #d8b15f; outline-offset: 2px; }

        .analysis-backdrop {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(4, 8, 14, 0.55);
          animation: backdrop-in 0.2s ease;
        }

        .analysis-modal {
          width: 100%;
          max-width: 380px;
          border-radius: 16px;
          border: 1px solid rgba(216, 177, 95, 0.45);
          background: linear-gradient(150deg, #1c2e49 0%, #0a1422 80%);
          box-shadow: 0 20px 44px rgba(0, 0, 0, 0.5);
          padding: 22px 22px 24px;
          animation: modal-in 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .analysis-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .analysis-header h2 {
          margin: 0;
          font-family: 'Nanum Myeongjo', serif;
          font-size: 19px;
          font-weight: 700;
          color: #f3d896;
        }

        .analysis-close-icon {
          width: 28px;
          height: 28px;
          border: none;
          background: none;
          color: #a9a397;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .analysis-close-icon svg { width: 16px; height: 16px; }
        .analysis-close-icon:focus-visible { outline: 2px solid #d8b15f; outline-offset: 2px; }

        .analysis-summary {
          margin: 16px 0 0;
          font-size: 14px;
          line-height: 1.75;
          color: #d9d4c7;
        }

        .analysis-traits {
          margin: 18px 0 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 14px;
          border-top: 1px solid rgba(216, 177, 95, 0.2);
        }

        .trait-row { display: flex; justify-content: space-between; gap: 12px; font-size: 13px; }
        .trait-label { color: #a9a397; flex-shrink: 0; }
        .trait-value { color: #e9e4d8; text-align: right; }

        .btn-solid {
          margin-top: 22px;
          width: 100%;
          padding: 14px 0;
          background: linear-gradient(135deg, #f3d896, #c9a050);
          border: none;
          border-radius: 10px;
          color: #1c1305;
          font-family: 'Nanum Myeongjo', serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: transform 0.1s ease, filter 0.15s ease;
        }

        .btn-solid:active { transform: scale(0.98); filter: brightness(0.96); }
        .btn-solid:focus-visible { outline: 2px solid #d8b15f; outline-offset: 2px; }

        @keyframes backdrop-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .analysis-backdrop, .analysis-modal { animation: none; }
          .btn-outline, .btn-solid { transition: none; }
        }
      `}</style>
    </div>
  );
}
