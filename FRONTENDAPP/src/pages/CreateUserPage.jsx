import CreateUserForm from "../components/CreateUserForm";
import PageHeader from "../components/PageHeader";
import LoveBombGrid from "../components/LoveBombGrid";

function  CreateUserPage () {
    return (
        <>
        <PageHeader title = "Create a User"></PageHeader>
        <div className="page-wrapper">
        <div className = "content-card">
            <p>
            We want you to be able to access your information! Create a basic user profile to keep love bombing yourself! Please note: this is not a secure username. Authentication is not required.
            </p>
            <CreateUserForm />
            <LoveBombGrid />
            </div>
        </div>
        </>
    )

}
export default CreateUserPage