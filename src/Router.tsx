import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRef } from 'react';

import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Meeting from './pages/Meeting';
import MeetingDetail from './pages/MeetingDetail';
import MyPage from './pages/MyPage';
import Template from './pages/Template';
import TemplateDetail from './pages/TemplateDetail';
import Roadmap from './pages/Roadmap';
import RoadmapDetail from './pages/RoadmapDetail';
import Management from './pages/Management';
import LoginPage from './pages/Login';
import GoogleLogin from './pages/GoogleLogin';
import KakaoLogin from './pages/KakaoLogin';
import TemplateEditor from './pages/TemplateEditor';
import TemplateSearch from './pages/TemplateSearch';
import RoadmapEditor from './pages/RoadmapEditor';

const Router = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const MoveToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    console.log('실행');
  };

  return (
    <BrowserRouter>
      <Layout containerRef={containerRef}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauth">
            <Route path="google" element={<GoogleLogin />} />
            <Route path="kakao" element={<KakaoLogin />} />
          </Route>
          <Route path="/meeting">
            <Route path="" element={<Meeting />} />
            <Route path=":meetingId">
              <Route path="" element={<MeetingDetail />} />
              <Route path="template/:templateId" element={<Management />} />
            </Route>
          </Route>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/template">
            <Route path="" element={<Template MoveToTop={MoveToTop} />} />
            <Route path=":templateId" element={<TemplateDetail />} />
            <Route path="create" element={<TemplateEditor />} />
          </Route>
          <Route path="roadmap">
            <Route path="" element={<Roadmap MoveToTop={MoveToTop} />} />
            <Route path=":roadmapId" element={<RoadmapDetail />} />
            <Route path="create" element={<RoadmapEditor />} />
          </Route>
          <Route path="/management" element={<Management />} />
          <Route path="/search-template" element={<TemplateSearch />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
