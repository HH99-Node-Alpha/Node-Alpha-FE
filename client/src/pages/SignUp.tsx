import { useState, ChangeEvent, FC } from "react";
import SignupInput from "../components/SignupInput";
import { postAPI } from "../axios";
import { useNavigate } from "react-router-dom";

interface SignupRequest {
  email: string;
  name: string;
  password: string;
  confirm: string;
}

const SignUp: FC = () => {
  const navigate = useNavigate();
  const [signupRequest, setSignupRequest] = useState<SignupRequest>({
    email: "",
    name: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      console.log(signupRequest);
      const response = await postAPI("/api/signup", signupRequest);
      console.log(response.data);
      navigate("/login");
    } catch (error: any) {
      console.error("Signup error:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <div
        className="w-screen h-screen flex justify-center items-center bg-cover"
        style={{ backgroundImage: "url('/assets/background.svg')" }}
      >
        <div className="max-w-[768px] h-5/6 flex flex-1 flex-col rounded-xl bg-[#163172]">
          <header className="w-full text-[24px] text-white h-1/6 flex justify-center items-center">
            Alpha
          </header>
          <body className="w-full h-3/6 flex flex-col gap-2 items-center">
            <div className="w-[320px] text-[18px] text-white h-20 h- flex justify-center items-center">
              Signup to Alpha
            </div>
            <SignupInput
              label="이메일"
              placeholder="이메일을 입력해주세요"
              type="text"
              onChange={(e) => handleChange(e)}
              name="email"
            />
            <SignupInput
              label="이름"
              placeholder="이름을 입력해주세요"
              type="text"
              onChange={(e) => handleChange(e)}
              name="name"
            />
            <SignupInput
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              type="password"
              onChange={(e) => handleChange(e)}
              name="password"
            />
            <SignupInput
              label="비밀번호 확인"
              placeholder="비밀번호 확인"
              type="password"
              onChange={(e) => handleChange(e)}
              name="confirm"
            />
            <button
              className="w-[320px] h-10 mt-6 rounded-md text-black bg-white"
              onClick={handleSubmit}
            >
              Continue
            </button>
          </body>
          <footer>
            <div className="w-full mt-10 text-white flex justify-center items-center">
              Alpha
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default SignUp;
