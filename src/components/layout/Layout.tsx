import { useLocation } from 'react-router-dom';
import SideNavTest from './SideNavTest';
import TopNavBar from './TopNavBar';

interface Props {
  children: React.ReactNode;
  containerRef: React.RefObject<HTMLDivElement>;
}

const Layout = ({ children, containerRef }: Props) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const excludedSideNav = ['/login'];

  return (
    <div className="flex flex-col overflow-auto bg-[#EEEEFB]">
      <TopNavBar />
      <div className="flex h-screen max-h-[calc(100vh-65px)] flex-1">
        {!excludedSideNav.includes(currentPath) && <SideNavTest />}
        <div ref={containerRef} className="flex-1 overflow-y-auto bg-[#EEEEFB]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
