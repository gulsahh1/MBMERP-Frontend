import { useState } from "react";
import { Link } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";

import { login } from "../../features/auth/services/authService";
import { useNavigate } from "react-router-dom";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
     const response = await login({ email, password });

            localStorage.setItem("token", response.token.accessToken);
            localStorage.setItem("refreshToken", response.token.refreshToken);

        navigate("/");
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ChevronLeftIcon className="size-5" />
          Geri dön
        </Link>
      </div> */}

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="mb-2 font-semibold text-title-md">Giriş Yap</h1>
          {/* <p className="text-sm text-gray-500">
            Email ve şifrenizi girin
          </p> */}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="space-y-6">

            {/* EMAIL */}
            <div>
              <Label>Email *</Label>
              <Input
                placeholder="info@gmail.com"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <Label>Şifre *</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Şifrenizi girin"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
                </span>
              </div>
            </div>

            {/* CHECKBOX */}
            <div className="flex items-center gap-3">
              <Checkbox checked={isChecked} onChange={setIsChecked} />
              <span className="text-sm text-gray-600">
                Beni hatırla
              </span>
              <span className="flex-1 text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Şifremi Unuttum
                </Link>
              </span>
            </div>

            {/* BUTTON */}
          <Button
    className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 
             dark:from-purple-500 dark:via-indigo-500 dark:to-blue-500
             text-white dark:text-white font-medium shadow-lg
             hover:shadow-xl hover:scale-[1.02]
             transition-all duration-200"
  size="sm"
  type="submit"
>
  Giriş Yap
</Button>

          </div>
        </form>
      </div>
    </div>
  );
}