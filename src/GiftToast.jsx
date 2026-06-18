/**
 * 등화행궁 패스포트 — 선물 획득 토스트
 *
 * "선물 받기" 클릭 후 잠깐 보여주고, 부모 컴포넌트가 타이밍을 관리합니다.
 *
 *   const [showToast, setShowToast] = useState(false);
 *
 *   const handleClaim = () => {
 *     setShowToast(true);
 *     setTimeout(() => {
 *       setShowToast(false);
 *       setPage('travelMap');
 *     }, 1400);
 *   };
 *
 *   {showToast && <GiftToast />}
 */

function GiftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="9" width="17" height="11" rx="1.5" />
      <path d="M3.5 9V6.5a1.5 1.5 0 0 1 1.5-1.5h14a1.5 1.5 0 0 1 1.5 1.5V9" />
      <path d="M12 5v15" />
      <path d="M12 5C12 3 9.8 1.8 8 3c-1.2.8-1 2 0 2h4Z" />
      <path d="M12 5c0-2 2.2-3.2 4-2 1.2.8 1 2 0 2h-4Z" />
    </svg>
  );
}

export default function GiftToast({ message = '선물 획득!' }) {
  return (
    <div className="gift-toast-backdrop">
      <div className="gift-toast">
        <span className="gift-icon">
          <GiftIcon />
        </span>
        <p>{message}</p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@700&display=swap');

        .gift-toast-backdrop {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(4, 8, 14, 0.45);
          animation: backdrop-in 0.2s ease;
        }

        .gift-toast {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 28px 36px;
          border-radius: 16px;
          border: 1px solid rgba(216, 177, 95, 0.55);
          background: linear-gradient(150deg, #1c2e49 0%, #0a1422 80%);
          box-shadow: 0 20px 44px rgba(0, 0, 0, 0.5);
          color: #f3d896;
          animation: toast-in 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .gift-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(216, 177, 95, 0.15);
        }

        .gift-icon svg { width: 24px; height: 24px; }

        .gift-toast p {
          margin: 0;
          font-family: 'Nanum Myeongjo', serif;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: 0.03em;
        }

        @keyframes backdrop-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes toast-in {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .gift-toast-backdrop, .gift-toast { animation: none; }
        }
      `}</style>
    </div>
  );
}
