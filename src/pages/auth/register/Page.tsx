import { PageSEO } from "@/utils/PageSEO";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
  return (
    <div>
      <PageSEO page="register" />
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
