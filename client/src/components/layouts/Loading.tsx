function Loading() {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <img
          src={process.env.PUBLIC_URL + "/assets/loading.gif"}
          alt="loading"
        />
      </div>
    </>
  );
}

export default Loading;
