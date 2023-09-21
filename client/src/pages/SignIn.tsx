import { useState, ChangeEvent, FC } from "react";
import SignupInput from "../components/SignupInput";
import { postAPI } from "../axios";
import { useNavigate } from "react-router-dom";

interface SignInRequest {
  email: string;
  password: string;
}

const SignIn: FC = () => {
  const navigate = useNavigate();
  const [signinRequest, setSignupRequest] = useState<SignInRequest>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      const result = await postAPI("/api/login", signinRequest);
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: result.data.data.userId,
          userName: result.data.data.username,
        })
      );
      navigate("/main");
    } catch (error: any) {
      console.error("Signin error:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <div
        className="w-screen h-screen flex justify-center items-center bg-cover"
        style={{ backgroundImage: "url('/assets/background.svg')" }}
      >
        <div className="max-w-[768px] h-5/6 flex flex-1 flex-col rounded-xl bg-[#163172]">
          <header className="w-full cursor-default text-[24px] text-white h-1/6 flex justify-center items-center">
            Alpha
          </header>
          <div className="w-full h-3/6 flex flex-col gap-2 mb-6 items-center">
            <div className="w-[320px] cursor-default text-[18px] mb-4 text-white h-20 h- flex justify-center items-center">
              Login to Alpha
            </div>
            <form onSubmit={handleSubmit}>
              <SignupInput
                label="이메일"
                placeholder="이메일을 입력해주세요"
                type="text"
                onChange={(e) => handleChange(e)}
                name="email"
              />
              <SignupInput
                label="비밀번호"
                placeholder="비밀번호를 입력해주세요"
                type="password"
                onChange={(e) => handleChange(e)}
                name="password"
              />
              <div className="w-[320px] justify-end px-1 flex items-center gap-2 text-white text-[12px]">
                <div className="cursor-default">아직 아이디가 없으신가요?</div>
                <div
                  className="cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  회원가입 하기
                </div>
              </div>
              <div className="flex flex-col mt-6 gap-4">
                <button
                  className="w-[320px] h-10 rounded-md text-black bg-white"
                  onClick={handleSubmit}
                >
                  로그인
                </button>
                <button
                  className="w-[320px] h-10 rounded-md text-black bg-white"
                  onClick={handleSubmit}
                >
                  구글 로그인
                </button>
                <button
                  className="w-[320px] h-10 rounded-md text-black bg-[#FFDD1D]"
                  onClick={handleSubmit}
                >
                  카카오 로그인
                </button>
              </div>
            </form>
          </div>
          <footer className="w-full flex flex-col justify-center items-center">
            <div className="w-full mt-10 cursor-default text-white mb-10 flex justify-center items-center">
              Alpha
            </div>
            <div className="w-[320px] flex text-[12px] text-white gap-4 justify-around">
              <div className="cursor-pointer">Templates</div>
              <div className="cursor-pointer">Pricing</div>
              <div className="cursor-pointer">Apps</div>
              <div className="cursor-pointer">Jobs</div>
              <div className="cursor-pointer">Blog</div>
              <div className="cursor-pointer">Developers</div>
              <div className="cursor-pointer">About</div>
              <div className="cursor-pointer">Help</div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default SignIn;
