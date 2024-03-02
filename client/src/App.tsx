import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { removeAuth, setAuth } from './stores/features/auths/authSlice';
import { credit, debit } from './stores/features/wallets/walletSlice';
import { useAppDispatch, useAppSelector } from './stores/features/hooks';


function App() {
 
  const {
    auth: $auth, 
    wallet: $wallet
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const LoginUser = () => {
    localStorage.setItem("_access_token", "sfsfsdfsdfsdf");
    dispatch(setAuth({name: "Henshaw", role: "ADMIN", isLoggedIn: true, token: "fghjgch"}));
  }
  const LogOutUser = () => {
    dispatch(removeAuth(null!));
    dispatch(debit(0));
    localStorage.removeItem("_access_token");
  }
  const TopUp = () => dispatch(credit($wallet?.amount + 5));


  return (
    <>
      <div>

        <h1>User {$auth?.name} has {$wallet.amount}</h1>
        <div>
           <button onClick={LoginUser}>Login</button>
           <button onClick={LogOutUser}>Logout</button>
           <button onClick={TopUp}>Top Up</button>
        </div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
     
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
