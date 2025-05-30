import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import CustomerRatingSection from "../components/CustomerRatingSection";

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <CustomerRatingSection />
    </div>
  );
};

export default Home;
