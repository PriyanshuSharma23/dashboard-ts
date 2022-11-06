import dashboardImage from "./assets/dashboard.svg";
import { LoadingSpinner } from "./components/LoadingSpinner";

import { useUser } from "./contexts/UserContext";

export const SignIn = () => {
  const { signInWithGoogle, loading } = useUser();

  return (
    <div
      className="font-open-sans  
      h-screen flex justify-center items-center
      bg-gradient-to-b from-blue-100 to-purple-500 via-blue-400
      "
    >
      <main className="prose flex flex-col items-center justify-center">
        <img src={dashboardImage} alt="undraw illustration for dashboard" />

        <button
          className="bg-blue-500 
        hover:bg-blue-700 
        text-white font-bold 
        py-2 px-4 rounded transition-colors 
        shadow-inner
        w-56
        flex justify-center items-center
        active:scale-95
        "
          onClick={signInWithGoogle}
        >
          {loading ? <LoadingSpinner /> : "Sign in with Google"}
        </button>
      </main>
    </div>
  );
};
