import { useState } from 'react';

/**
 * 등화행궁 패스포트 — 여행 지도
 *
 *   <TravelMap
 *     mapImageUrl="/images/night-map.jpg"               // (선택) 지도 배경 사진
 *     onClose={() => setPage('todayStory')}                // 우측 상단 X
 *     onViewDetail={() => setPage('pavilion')}              // 카드의 "상세보기"
 *     onTabChange={...}
 *   />
 *
 * 핀/선택된 장소 데이터는 DB가 없어서 우선 하드코딩되어 있습니다.
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
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}
function PinGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 15 9 21 10 16.5 14.3 17.7 21 12 17.7 6.3 21 7.5 14.3 3 10 9 9 12 3Z" />
    </svg>
  );
}

const TABS = [
  { key: 'home', label: '홈', Icon: HomeIcon },
  { key: 'travel', label: '여행', Icon: CompassIcon },
  { key: 'story', label: '스토리', Icon: BookIcon },
  { key: 'my', label: '마이', Icon: UserIcon },
];

const DEFAULT_PINS = [
  { id: 'p1', x: 20, y: 36, variant: 'blue' },
  { id: 'p2', x: 76, y: 20, variant: 'blue' },
  { id: 'p3', x: 44, y: 32, variant: 'gold', selected: true },
  { id: 'p4', x: 16, y: 58, variant: 'blue' },
  { id: 'p5', x: 70, y: 56, variant: 'gold' },
  { id: 'p6', x: 38, y: 74, variant: 'blue' },
];

export default function TravelMap({
  mapImageUrl,
  pins = DEFAULT_PINS,
  place = { name: '스마트 파빌리온', distance: '45m' },
  onClose,
  onViewDetail,
  activeTab = 'travel',
  onTabChange,
}) {
  const [tab, setTab] = useState(activeTab);

  const handleTabClick = (key) => {
    setTab(key);
    onTabChange?.(key);
  };

  const pathPoints = pins.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="travel-map">
      <header className="map-header">
        <h1>여행 지도</h1>
        <button type="button" className="close-button" onClick={onClose} aria-label="여행 지도 닫기">
          <CloseIcon />
        </button>
      </header>

      <div className="map-canvas">
        {mapImageUrl ? (
          <div className="map-image" style={{ backgroundImage: `url(${mapImageUrl})` }} />
        ) : (
          <div className="map-image map-image-empty">지도 배경 이미지 자리</div>
        )}

        <svg className="map-path" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={pathPoints}
            fill="none"
            stroke="rgba(150, 200, 255, 0.55)"
            strokeWidth="0.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>

        {pins.map((pin) => (
          <span
            key={pin.id}
            className={`map-pin ${pin.variant} ${pin.selected ? 'selected' : ''}`}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <PinGlyph />
          </span>
        ))}
      </div>

      <div className="place-card">
        <div className="place-thumb" />
        <div className="place-info">
          <p className="place-name">{place.name}</p>
          <p className="place-distance">{place.distance}</p>
        </div>
        <button type="button" className="btn-outline-sm" onClick={onViewDetail}>
          상세보기
        </button>
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

        .travel-map {
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

        .map-header {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: 6vh;
        }

        .map-header h1 {
          margin: 0;
          font-family: 'Nanum Myeongjo', serif;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0.03em;
          background: linear-gradient(180deg, #f6dfa0 0%, #c89a52 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .close-button {
          position: absolute;
          right: 24px;
          top: calc(6vh - 4px);
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

        .close-button svg { width: 18px; height: 18px; }
        .close-button:focus-visible { outline: 2px solid #d8b15f; outline-offset: 2px; }

        .map-canvas {
          position: relative;
          margin: 24px 20px 0;
          height: 46vh;
          border-radius: 16px;
          border: 1px solid rgba(216, 177, 95, 0.3);
          overflow: hidden;
        }

        .map-image { position: absolute; inset: 0; background-size: cover; background-position: center; }

        .map-image-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.03);
          font-family: 'Noto Sans KR', system-ui, sans-serif;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.35);
          text-align: center;
          padding: 12px;
        }

        .map-path { position: absolute; inset: 0; width: 100%; height: 100%; }

        .map-pin {
          position: absolute;
          transform: translate(-50%, -50%);
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(8, 15, 26, 0.6);
        }

        .map-pin svg { width: 13px; height: 13px; }

        .map-pin.blue { color: #bcd9ff; box-shadow: 0 0 10px 2px rgba(120, 180, 255, 0.55); border: 1px solid rgba(150, 200, 255, 0.7); }
        .map-pin.gold { color: #ffe2a8; box-shadow: 0 0 10px 2px rgba(216, 177, 95, 0.6); border: 1px solid rgba(255, 210, 140, 0.8); }
        .map-pin.selected { width: 32px; height: 32px; }
        .map-pin.selected svg { width: 16px; height: 16px; }

        .place-card {
          margin: 16px 20px 0;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid rgba(216, 177, 95, 0.3);
          background: rgba(255, 255, 255, 0.03);
        }

        .place-thumb {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          flex-shrink: 0;
          background: radial-gradient(circle, rgba(190, 130, 255, 0.55) 0%, rgba(20, 30, 50, 0.9) 75%);
        }

        .place-info { flex: 1; min-width: 0; }
        .place-name { margin: 0; font-size: 14px; font-weight: 500; color: #f0ebe0; }
        .place-distance { margin: 2px 0 0; font-size: 12px; color: #a9a397; }

        .btn-outline-sm {
          flex-shrink: 0;
          padding: 8px 14px;
          background: none;
          border: 1px solid #c9a050;
          border-radius: 8px;
          color: #e8cf95;
          font-family: 'Noto Sans KR', system-ui, sans-serif;
          font-size: 13px;
          cursor: pointer;
        }

        .btn-outline-sm:focus-visible { outline: 2px solid #d8b15f; outline-offset: 2px; }

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
