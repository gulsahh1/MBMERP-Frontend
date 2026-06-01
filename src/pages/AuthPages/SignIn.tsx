import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="İş Yönetim Paneli - Giriş Yap"
        description="İş Yönetim Paneli'ne giriş yap"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
