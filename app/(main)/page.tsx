import Banner from "./components/Banner";
import HomeIntroSection from "./components/HomeIntroSection";
import HomeNoticeSection from "./components/HomeNoticeSection";

const page = () => {
  return (
    <div>
      <Banner></Banner>
      <HomeIntroSection></HomeIntroSection>
      <HomeNoticeSection></HomeNoticeSection>
    </div>
  );
};

export default page;
