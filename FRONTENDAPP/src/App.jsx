import { Routes, Route} from "react-router-dom";
import './index.css';
import AboutPage from "./pages/AboutPageTemp.jsx";
import HomePage from "./pages/HomePage.jsx";
import CheckInPage from "./pages/CheckInPage.jsx";
import CreateYourOwnPage from './pages/CreateYourOwnPage.jsx';
import PageFooter from './components/PageFooter.jsx';
import PetLoveBombPage from "./pages/PetLoveBombPage.jsx";
import NavBar from "./components/NavBarTemp.jsx";
import CreateUserPage from "./pages/CreateUserPage.jsx";

function App() {

  return (
    <>
     <div className = "app-wrapper">
      <NavBar />
      <Routes>
      <Route path = '/AboutPage' element ={<AboutPage></AboutPage>}></Route>
      <Route path = '/' element ={<HomePage></HomePage>}></Route>
      <Route path = '/CreateUserPage' element ={<CreateUserPage></CreateUserPage>}></Route>
      <Route path = '/CheckInPage' element ={<CheckInPage></CheckInPage>}></Route>
      <Route path = '/CreateYourOwnPage' element ={<CreateYourOwnPage></CreateYourOwnPage>}></Route>
      <Route path = '/PetLoveBombPage' element ={<PetLoveBombPage></PetLoveBombPage>}></Route>            
      </Routes>
      <PageFooter></PageFooter>
    </div>
    
    </>
  )
}

export default App