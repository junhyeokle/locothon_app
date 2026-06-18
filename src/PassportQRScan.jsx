import { useEffect, useState } from 'react';

/**
 * 등화행궁 패스포트 — 두 번째 화면 (QR 스캔)
 *
 * 실제 카메라/QR 인식 로직 없이, "스캔하는 느낌"만 주고 자동으로
 * 다음 페이지로 넘어가는 화면입니다.
 *
 * 사용법:
 *   <PassportQRScan
 *     cameraPreviewUrl="/images/camera-preview.jpg"  // (선택) 카메라 미리보기 대신 보여줄 이미지
 *     onScanned={() => navigate('/passport-issued')}   // 스캔 완료 후 호출됨
 *     scanDurationMs={2200}                              // 스캔 애니메이션 길이(ms)
 *   />
 *
 * - cameraPreviewUrl을 안 넘기면 카메라 자리에 안내 placeholder가 보입니다.
 *   실제 카메라 연동 시 이 자리에 <video> 태그로 교체하면 됩니다.
 * - 프레임을 클릭하면 대기 시간 없이 바로 "스캔 완료"로 넘어갑니다 (테스트용).
 */

export default function PassportQRScan({
  cameraPreviewUrl,
  onScanned,
  scanDurationMs = 2200,
  title = '패스포트 발급',
  instruction = 'QR 코드를 스캔해주세요',
  footnote = ['한복 매장에서 QR 코드를', '스캔하면 패스포트가 발급됩니다.'],
}) {
  const [stage, setStage] = useState('scanning'); // 'scanning' | 'detected'

  useEffect(() => {
    if (stage !== 'scanning') return;
    const t = setTimeout(() => setStage('detected'), scanDurationMs);
    return () => clearTimeout(t);
  }, [stage, scanDurationMs]);

  useEffect(() => {
    if (stage !== 'detected') return;
    const t = setTimeout(() => onScanned?.(), 650);
    return () => clearTimeout(t);
  }, [stage, onScanned]);

  const handleFrameClick = () => {
    if (stage === 'scanning') setStage('detected');
  };

  return (
    <div className="passport-qr">
      <header className="qr-title">
        <h1>{title}</h1>
      </header>

      <p className="qr-instruction">{instruction}</p>

      <div className="qr-frame-wrap">
        <button
          type="button"
          className={`qr-frame ${stage}`}
          onClick={handleFrameClick}
          aria-label="QR 스캔 영역, 눌러서 바로 진행"
        >
          {cameraPreviewUrl ? (
            <div className="qr-preview" style={{ backgroundImage: `url(${cameraPreviewUrl})` }} />
          ) : (
            <div className="qr-preview qr-preview-empty">카메라 미리보기 영역</div>
          )}

          <span className="corner corner-tl" />
          <span className="corner corner-tr" />
          <span className="corner corner-bl" />
          <span className="corner corner-br" />

          {stage === 'scanning' && <span className="scan-line" />}

          {stage === 'detected' && (
            <div className="scan-detected">
              <span className="check">✓</span>
              <span>스캔 완료</span>
            </div>
          )}
        </button>
      </div>

      <p className="qr-footnote">
        {footnote.map((line, i) => (
          <span key={line}>
            {line}
            {i < footnote.length - 1 && <br />}
          </span>
        ))}
      </p>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&family=Noto+Sans+KR:wght@400;500&display=swap');

        .passport-qr {
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

        .qr-title {
          margin-top: 9vh;
        }

        .qr-title h1 {
          margin: 0;
          font-family: 'Nanum Myeongjo', serif;
          font-size: 26px;
          font-weight: 700;
          letter-spacing: 0.05em;
          background: linear-gradient(180deg, #f6dfa0 0%, #c89a52 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .qr-instruction {
          margin: 32px 0 0;
          font-family: 'Noto Sans KR', system-ui, sans-serif;
          font-size: 17px;
          font-weight: 500;
          color: #e9e4d8;
        }

        .qr-frame-wrap {
          margin-top: 56px;
          display: flex;
          justify-content: center;
        }

        .qr-frame {
          position: relative;
          width: min(68vw, 260px);
          aspect-ratio: 1 / 1;
          padding: 0;
          margin: 0;
          background: rgba(255, 255, 255, 0.04);
          border: none;
          border-radius: 6px;
          cursor: pointer;
          overflow: hidden;
        }

        .qr-frame:focus-visible {
          outline: 2px solid #d8b15f;
          outline-offset: 4px;
        }

        .qr-preview {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: brightness(0.85);
        }

        .qr-preview-empty {
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

        .corner {
          position: absolute;
          width: 32px;
          height: 32px;
          border-color: #d8b15f;
          transition: border-color 0.3s ease;
        }

        .corner-tl { top: -2px; left: -2px; border-top: 3px solid; border-left: 3px solid; border-radius: 8px 0 0 0; }
        .corner-tr { top: -2px; right: -2px; border-top: 3px solid; border-right: 3px solid; border-radius: 0 8px 0 0; }
        .corner-bl { bottom: -2px; left: -2px; border-bottom: 3px solid; border-left: 3px solid; border-radius: 0 0 0 8px; }
        .corner-br { bottom: -2px; right: -2px; border-bottom: 3px solid; border-right: 3px solid; border-radius: 0 0 8px 0; }

        .qr-frame.detected .corner {
          border-color: #f6dfa0;
        }

        .scan-line {
          position: absolute;
          left: 6%;
          right: 6%;
          top: 8%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #f3d896, transparent);
          box-shadow: 0 0 8px 1px rgba(243, 216, 150, 0.7);
          animation: scan-move 1.8s ease-in-out infinite;
        }

        @keyframes scan-move {
          0%   { top: 8%;  opacity: 0.25; }
          50%  { top: 88%; opacity: 1; }
          100% { top: 8%;  opacity: 0.25; }
        }

        .scan-detected {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: rgba(6, 13, 24, 0.55);
          color: #f6dfa0;
          font-family: 'Noto Sans KR', system-ui, sans-serif;
          font-size: 14px;
          font-weight: 500;
          animation: fade-in 0.25s ease;
        }

        .scan-detected .check {
          font-size: 28px;
          line-height: 1;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .qr-footnote {
          margin-top: auto;
          margin-bottom: calc(48px + env(safe-area-inset-bottom, 0px));
          padding: 0 32px;
          font-family: 'Noto Sans KR', system-ui, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.7;
          color: #b7b2a4;
          text-align: center;
        }

        @media (prefers-reduced-motion: reduce) {
          .scan-line { animation: none; top: 48%; }
          .scan-detected { animation: none; }
        }
      `}</style>
    </div>
  );
}
