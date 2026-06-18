import { useState } from 'react';
import PassportSplash from './PassportSplash';
import PassportQRScan from './PassportQRScan';
import PassportIssued from './PassportIssued';
import HomePassport from './HomePassport';
import TodayStory from './TodayStory';
import TravelMap from './TravelMap';
import SmartPavilion from './SmartPavilion';
import StoryDiscovered from './StoryDiscovered';
import StoryComplete from './StoryComplete';
import GiftToast from './GiftToast';
import MyInfo from './MyInfo';
import MyHanbok from './MyHanbok';

/**
 * 등화행궁 패스포트 — 전체 화면 흐름
 *
 *   splash --시작하기--> qr --스캔 완료--> issued --확인--> home
 *
 *   home 하단 탭:
 *     "홈"   --> home (자기 자신으로, 다른 화면에 있을 때도 항상 home으로)
 *     "여행" --> todayStory
 *     "마이" --> myInfo
 *     "스토리" --> 아직 화면 없음 (콘솔 로그만)
 *
 *   todayStory --이야기 보러가기--> travelMap
 *   travelMap --상세보기--> pavilion --꽃 피우기--> storyDiscovered
 *   storyDiscovered --수집하기--> storyComplete --선물 받기--> (토스트) --> travelMap
 *   travelMap --X--> todayStory
 *
 *   myInfo --나의 한복--> myHanbok
 *
 * 라우터 없이 state로만 전환합니다. react-router 등을 붙이면 이 state를
 * 실제 경로로 바꾸면 됩니다.
 */
export default function App() {
  const [page, setPage] = useState('splash');
  const [showGiftToast, setShowGiftToast] = useState(false);

  // 하단 탭바는 여러 화면(home, todayStory, travelMap, myInfo)에서 공통으로
  // 쓰이기 때문에, 탭 변경 로직을 한 곳에서 관리합니다. "홈" 탭은 항상
  // home 화면으로 돌아가도록 처리합니다.
  const handleTabChange = (key) => {
    if (key === 'home') {
      setPage('home');
    } else if (key === 'travel') {
      setPage('todayStory');
    } else if (key === 'my') {
      setPage('myInfo');
    } else {
      // "스토리" 탭은 아직 화면이 없어서 우선 콘솔로만 확인합니다.
      console.log('탭 이동 요청 (아직 화면 없음):', key);
    }
  };

  const handleClaimGift = () => {
    setShowGiftToast(true);
    setTimeout(() => {
      setShowGiftToast(false);
      setPage('travelMap');
    }, 1400);
  };

  const handleMyInfoNavigate = (key) => {
    if (key === 'hanbok') {
      setPage('myHanbok');
    } else {
      // '내 정보' / '예약 내역' / '설정'은 아직 화면이 없습니다.
      console.log('나의 정보 메뉴 클릭 (아직 화면 없음):', key);
    }
  };

  return (
    <>
      {page === 'splash' && <PassportSplash onStart={() => setPage('qr')} />}

      {page === 'qr' && <PassportQRScan onScanned={() => setPage('issued')} />}

      {page === 'issued' && <PassportIssued onConfirm={() => setPage('home')} />}

      {page === 'home' && (
        <HomePassport
          onTabChange={handleTabChange}
          onShare={() => console.log('패스포트 내보내기 클릭')}
        />
      )}

      {page === 'todayStory' && (
        <TodayStory onViewStory={() => setPage('travelMap')} onTabChange={handleTabChange} />
      )}

      {page === 'travelMap' && (
        <TravelMap
          onClose={() => setPage('todayStory')}
          onViewDetail={() => setPage('pavilion')}
          onTabChange={handleTabChange}
        />
      )}

      {page === 'pavilion' && <SmartPavilion onBloom={() => setPage('storyDiscovered')} />}

      {page === 'storyDiscovered' && (
        <StoryDiscovered onCollect={() => setPage('storyComplete')} />
      )}

      {page === 'storyComplete' && <StoryComplete onClaim={handleClaimGift} />}

      {page === 'myInfo' && (
        <MyInfo onNavigate={handleMyInfoNavigate} onTabChange={handleTabChange} />
      )}

      {page === 'myHanbok' && <MyHanbok onBack={() => setPage('myInfo')} />}

      {showGiftToast && <GiftToast />}
    </>
  );
}
