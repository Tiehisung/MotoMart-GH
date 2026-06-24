import SignInForm from "@/pages/auth/signin/SignInForm";
import { PageSEO } from "@/utils/PageSEO";

const SignInPage = () => {
  return (
    <div>
      <PageSEO page="login" />
      <SignInForm />
    </div>
  );
};

export default SignInPage;

 