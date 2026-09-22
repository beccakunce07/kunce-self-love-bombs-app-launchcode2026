import React, {useEffect} from 'react';
import SelfLoveBombWithTextImage from './SelfLoveBombWithTextImage'

function PageHeader({title}) {
//getting document title from each page. storing it in title and it is displayed below
    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <>
            <header>
                    <img src={SelfLoveBombWithTextImage} alt="Self Love Bombs logo" />
                    <h1 className="main-title"> {title}</h1>                 
            </header>
        </>
    )
}
export default PageHeader;
