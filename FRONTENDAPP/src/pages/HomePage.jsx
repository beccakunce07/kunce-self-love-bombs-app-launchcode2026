import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import SelfLoveBombWithTextImage from '../components/SelfLoveBombWithTextImage.jsx';

//function that allows for a button to be pressed to navigate to the check in page
function HomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/CheckInPage");
  };

  return (
    <>
    <PageHeader title="Welcome Home" />
    <div className="page-wrapper">
      <div className="content-card">
          <img src={SelfLoveBombWithTextImage} alt="A line drawing of a heart with the ends trailing. The ends have sparks on them as if they are fuses that are lit. The text 'Self Love Bombs' in cursive font. Subtext 'Because love only takes a spark."/>
        <h1>
          An app designed to help you fall in love with you, one love bomb at a time. 
        </h1>
        <button className="start-button" onClick={handleClick}>
          ⟢Bombs Away⟢
        </button>
      </div>
    </div>
    </>
  );
}

export default HomePage;