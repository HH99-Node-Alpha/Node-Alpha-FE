import Wrapper from "../components/Wrapper";
import Navbar from "../components/Navbar";

function Main() {
  return (
    <Wrapper>
      <Navbar />
      <div className="flex w-full h-full overflow-auto justify-center items-center">
        <div className=" w-7/12 h-5/6 bg-[#1D2125] rounded-lg flex flex-col items-center overflow-auto">
          <h1 className="w-full h-16 py-2 border-b-2 border-white flex items-center text-white px-4 ">
            하이!
          </h1>
          <div>
            <div className="w-full flex-1 mb-2">
              <h3 className="w-full h-10 flex items-center p-4 text-white mt-2 text-2xl text-bold mb-2">
                Recent visited
              </h3>
              <div className="w-full h-full px-4 grid grid-cols-6 grid-rows-2 gap-x-6 gap-y-2 items-center">
                <MainCard />
                <MainCard />
                <MainCard />
                <MainCard />
                <MainCard />
                <MainCard />
                <MainCard />
              </div>
            </div>
          </div>
          <div>
            <div className="flex-1">
              <h3 className="w-full h-10 flex items-center p-4 text-white mt-2 text-2xl text-bold mb-2">
                My Workspaces
              </h3>
              <div className="w-full h-full px-4 grid grid-cols-6 grid-rows-2 gap-x-6 gap-y-2 items-center">
                <MainCard />
                <MainCard />
                <MainCard />
                <MainCard />
                <MainCard />
                <MainCard />
                <MainCard />
              </div>
            </div>
          </div>
          <div>
            <div className="flex-1 mb-8">
              <h3 className="w-full h-10 flex items-center p-4 text-white mt-2 text-2xl text-bold mb-2">
                My Boards
              </h3>
              <div className="w-full h-full px-4 grid grid-cols-6 grid-rows-2 gap-x-6  gap-y-2 items-center">
                <MainCard />
                <MainCard />
                <MainCard />
                <MainCard />
                <MainCard />
                <MainCard />
                <MainCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Main;

function MainCard() {
  return (
    <>
      <div>
        <div className="w-40 h-20 bg-rose-400 rounded-md"></div>
        <div className="text-white mt-2 mx-1">Alpha</div>
      </div>
    </>
  );
}
