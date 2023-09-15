function SignUp() {
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-[#F8F0E5]">
        <div className="max-w-[768px] h-5/6 flex flex-1 flex-col rounded-xl bg-[#EADBC8]">
          <header className="w-full text-[24px] h-1/6 flex justify-center items-center">
            Alpha
          </header>
          <body className="w-full h-3/6 flex flex-col gap-2 items-center">
            <div className="w-[320px] text-[18px] h-20 h- flex justify-center items-center">
              Signup to Alpha
            </div>
            <div className="flex flex-col">
              <div className="px-1 text-[14px] mb-[2px]">이메일</div>
              <input
                className="w-[320px] h-10 px-2 border-2 border-black rounded-md outline-none "
                placeholder="이메일을 입력해주세요"
              />
            </div>
            <div className="flex flex-col ">
              <div className="px-1 text-[14px] mb-[2px]">이름</div>
              <input
                className="w-[320px] h-10 px-2 border-2 border-black rounded-md outline-none"
                placeholder="이름을 입력해주세요"
              />
            </div>
            <div className="flex flex-col ">
              <div className="px-1 text-[14px] mb-[2px]">비밀번호</div>
              <input
                className="w-[320px] h-10 px-2 border-2 border-black rounded-md outline-none"
                placeholder="비밀번호를 입력해주세요"
              />
            </div>
            <div className="flex flex-col">
              <div className="px-1 text-[14px] mb-[2px]">비밀번호 확인</div>
              <input
                className="w-[320px] h-10 px-2 border-2 border-black rounded-md outline-none"
                placeholder="비밀번호 확인"
              />
            </div>
            <button className="w-[320px] h-10 mt-6 border-2 rounded-md border-black text-black bg-[#DAC0A3]">
              Continue
            </button>
          </body>
          <footer>
            <div className="w-full mt-10 flex justify-center items-center">
              Alpha
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default SignUp;
