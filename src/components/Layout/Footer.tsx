const Footer = () => {
  return (
    <div className="flex h-[210px] w-full flex-col items-center justify-center gap-3 bg-gray3">
      <img src="/logo/logo-white.svg" className="mb-3" />
      <div className="text-center text-xs font-medium text-white">
        효율적 회의를 위한 솔루션,
        <br />
        우리 팀 회의의 개선점을 찾고 솔루션을 제공하는 서비스, 밋플
      </div>
      <div className="flex items-center gap-4 text-[8px] font-medium text-white">
        <div className="cursor-pointer">서비스 이용 가이드</div>
        <div className="h-3 w-[1px] bg-white"></div>
        <div className="cursor-pointer">이용약관</div>
        <div className="h-3 w-[1px] bg-white"></div>
        <div className="cursor-pointer">개인정보 처리방침</div>
      </div>
      <div className="text-center text-[8px] font-medium leading-3 text-white">
        마케팅 제휴 문의: Meetpl_contact@gmail.com
        <br />ⓒ 2023 Meetpl, All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;