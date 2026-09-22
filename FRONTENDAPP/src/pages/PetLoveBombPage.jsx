import CatPic from '../components/FetchCat.jsx';
import DogPic from '../components/FetchDog.jsx';
import PageHeader from '../components/PageHeader.jsx';


function PetLoveBombPage () {
    
    return (
        <div>
        <PageHeader title = "Pet Love Bombs"></PageHeader>
        <div className='page-wrapper'>
        <div className = "content-card">
            <p>
            Sometimes the kind of love we need can only come from animals. Whether you identify as a dog or a cat person, take a moment to <strong>Love Bomb</strong> yourself with a sweet angel muffin pup or cuddly mew mew kitty. Stay as long as you need...the pet pics will keep on coming.
            <br></br>
            🐾🐾🐾
            </p>
        <DogPic />
        <CatPic />
        </div>
        </div>
        </div>

    )
}

export default PetLoveBombPage