import CYOForm from "../components/CYOForm";
import PageHeader from "../components/PageHeader";
import LoveBombGrid from "../components/LoveBombGrid";

function  CreateYourOwnPage () {
    return (
        <>
        <PageHeader title = "Create A Love Bomb"></PageHeader>
        <div className="page-wrapper">
        <div className = "content-card">
            <p>
            Here at Self Love Bombs we believe you are the author of your own narrative. You get to decide how you talk to you. Here is an opportunity to practice speaking kindly to yourself. No pressure - whatever feels true.
            </p>
            <CYOForm />
            <LoveBombGrid />
            </div>
        </div>
        </>
    )

}
export default CreateYourOwnPage