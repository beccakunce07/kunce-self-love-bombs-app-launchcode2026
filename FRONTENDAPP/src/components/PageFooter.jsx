import {Link} from 'react-router-dom';
import ContactUsForm from './ContactUsForm.jsx';


function PageFooter() {
    return (
        <footer>
                    <div><Link to="https://www.linkedin.com/in/becca-kunce-a0013255/">⟢ Hire Me ⟢ </Link></div>
                    <a href="mailto:rebeccakunce@gmail.com">⟢ Email Me ⟢ </a>
                    <div>
                    <p>
                    <i>⟢ ⟢ Because love only takes a spark.⟢ ⟢ </i><br></br>
                    ⟢  &copy; 2026 Becca Kunce. All Rights Reserved ⟢ 
                    </p>
                    </div>
                <ContactUsForm/>
        </footer>
    )
}

export default PageFooter;