import PageHeader from "../components/PageHeader";
import SlbButton from "../components/SlbButton";
import EmotionsWheelImage from "../components/EmotionsWheelImage"

//had to name this and navbar file temp because of casing issues...
function AboutPage() {
  return (
    <div>
    <PageHeader title = "About Self Love Bombs"></PageHeader>
    <div className="page-wrapper">
        <div className="content-card">
          <h2>
            Thanks for visiting Self Love Bombs!
          </h2>
          <h3>We are so glad you're here.</h3>
          <p><strong>Self Love Bombs</strong> is here for one reason: to stand up to your inner bully mid-rant.
            You know the voice - the one that's a little too critical, a little too loud, and not nearly as helpful as it thinks it is. Instead of going ten rounds with it, you can get lovebombed! No no no, not in the chaotic, situationship kind of way—but in the intentional, supportive, actually-helpful-to-you kind. Lovebomb yourself by just clicking a button....this button right here actually! <br></br>
            </p>
            <h1>👇</h1>
            <SlbButton />
            <h3>Please Remember</h3>
            <p>One thing we would like to remember is <strong>emotions are a spectrum.</strong> Just like the color sprectrum, all are beautiful and all are invited to the canvas. Try not to judge or shame yourself for how you're feeling (see how easily the bully is ready to sneak in). Just like you wouldn't shame a flower for the color it was displaying, no need to shame yourself for the color of your emotion.</p>
            <img 
            src={EmotionsWheelImage} 
            alt="A list of emotions superimposed onto the color wheel" 
            style={{ maxHeight: '300px', maxWidth: '100%', borderRadius: '50%' }} 
            />
            <h1>Meet the Creator</h1> 
            <p>Hey - I'm Becca - creator of Self Love Bombs and founder of Whole Body Love, LLC. I'm a recovering chronic self-hater turned self-lover and I am here to help <strong>you</strong> yes <strong>you</strong> to start walking the path of self-love and acceptance.<br></br>I hold a Bachelor of Science in Mathematics, Master of Arts in Teaching with an emphasis in Mathematics, and 200YTT certification. I am currently a student of LaunchCode and hope to continue to grow and learn both as a developer and human.<br></br>When I am not coding, you can find me hanging out with my dog Ca$h, reading, cooking, hiking, camping, working out, cheering on my nieces, swimming, singing, dancing, or lounging on my big orange couch.</p>
            </div>
        </div>
      </div>
    );
  };
export default AboutPage;