import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import useLocation from "./router/use-location";
import UserContext from "./router/context";

import "./app.css";
import appLogo from "/logo.svg";

import Icon from "./components/icon/icon";
import Name from "./components/user/name";
import Count from "./components/user/count";
import Activity from "./components/user/activity";
import Session from "./components/user/session";
import Performance from "./components/user/performance";
import Score from "./components/user/score";

// Create a client
const queryClient = new QueryClient();

function App() {
  const state = useLocation();
  return (
    <>
      <header className="bg-black w-full h-[90px] flex items-center justify-between p-8 shadow-md">
        <img src={appLogo} className="logotype" alt="SportSee" />
        <nav className="flex-grow mx-2">
          <ul className="flex flex-row justify-around">
            <li>
              <a href="#accueil">Accueil</a>
            </li>
            <li>
              <a href="#profil">Profil</a>
            </li>
            <li>
              <a href="#reglages">Réglages</a>
            </li>
            <li>
              <a href="#communaute">Communauté</a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="flex h-full">
        <aside className="bg-black w-[82px] xl:w-[117px] flex flex-col items-center justify-between p-4 xl:p-8">
          <div></div>
          <nav>
            <ul>
              <li>
                <a href="#dashboard">
                  <Icon iconType="yoga" />
                </a>
              </li>
              <li>
                <a href="#activity">
                  {" "}
                  <Icon iconType="swimming" />
                </a>
              </li>
              <li>
                <a href="#performance">
                  {" "}
                  <Icon iconType="bike" />
                </a>
              </li>
              <li>
                <a href="#settings">
                  {" "}
                  <Icon iconType="dumbbell" />
                </a>
              </li>
            </ul>
          </nav>
          <small className="rotate-270 whitespace-nowrap pl-10 w-full">
            Copyright, SportSee 2020
          </small>
        </aside>
        {/* Provide the client to your App */}
        <UserContext.Provider value={state}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <main className="m-2 xl:my-14 xl:mx-26 w-full">
              <section id="dashboard">
                <hgroup className="flex flex-row xl:flex-col gap-0 justify-between items-center xl:justify-start xl:items-start">
                  <h1 className="font-semibold mb-4">
                    Bonjour <Name />
                  </h1>
                  <p className="text-lg">
                    Félicitation ! Vous avez explosé vos objectifs hier 👏
                  </p>
                </hgroup>
              </section>
              <section
                id="data"
                className="flex flex-row justify-between w-full mt-4 gap-2 xl:gap-4"
              >
                <section id="activity" className="flex-2/3">
                  <Activity />

                  <div className="flex flex-row justify-between gap-2 xl:gap-4 mt-2 xl:mt-4">
                    <div className="flex-1/3">
                      <Session />
                    </div>
                    <div className="flex-1/3">
                      <Performance />
                    </div>
                    <div className="flex-1/3">
                      <Score />
                    </div>
                  </div>
                </section>
                <section id="reports" className="flex-1/3">
                  <Count type="calorieCount" variant="warning" />
                  <Count type="proteinCount" variant="info" />
                  <Count type="carbohydrateCount" variant="notice" />
                  <Count type="lipidCount" variant="danger" />
                </section>
              </section>
            </main>
          </QueryClientProvider>
        </UserContext.Provider>
      </div>
    </>
  );
}

export default App;
