import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import Router from "./shared/Router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attempt) => Math.min(attempt * 1000, 30 * 1000),
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error(error);
      },
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Router />
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}

export default App;
