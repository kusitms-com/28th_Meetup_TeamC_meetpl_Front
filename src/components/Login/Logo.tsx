import styled from 'styled-components';

const LogoImg = styled.img`
  @media (max-width: 700px) {
    width: 140px;
    height: 110px;
  }
`;

const LogoTypo = styled.img`
  @media (max-width: 700px) {
    width: 115px;
    height: 21.615px;
  }
`;

const LogoTxt = styled.div`
  @media (max-width: 700px) {
    font-size: 10px;
  }
`;

const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <LogoImg src="/logo/logo-3d.png" className="mb-2 h-[135px] w-[170px]" />
      <LogoTypo src="/logo/logo-typo-white.svg" />
      <LogoTxt className="text-xs font-medium text-white">
        쉽고 빠른 회의의 시작, 밋플
      </LogoTxt>
    </div>
  );
};

export default Logo;
