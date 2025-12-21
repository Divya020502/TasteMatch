import Navbar from "../../components/layout/Navbar";
import "../../styles/home.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="hero">
          <h1>Find food that matches your taste 😋</h1>
          <p>
            Personalized dish & restaurant recommendations powered by
            taste profiling and location.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
