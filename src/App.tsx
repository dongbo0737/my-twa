import './App.css'
import { TonConnectButton } from '@tonconnect/ui-react';
import { useCounterContract } from './hooks/useCounterContract';
import { useTonConnect } from './hooks/useTonConnect';
import { useEffect,useState} from 'react';
import WebApp from '@twa-dev/sdk';

function App() {
  const { connected } = useTonConnect();
  const { value, address, sendIncrement } = useCounterContract();
  const [count, setCount] = useState(0)

  const sendDataToBot = () => {
    const data = {
      message: 'Hello, this is a test message from the web app!',
      timestamp: new Date().toISOString(),
    };

    // Sending data to bot
    WebApp.sendData(JSON.stringify(data));
  };
  useEffect(() => {

    // 可以访问telegram对象的属性和方法
    // console.log(WebApp.initDataUnsafe);
    // console.log(WebApp.version);
  }, []);

  return (
    <div className='App'>
      <div className='Container'>
        <TonConnectButton />

        <div className='Card'>
          <b>Counter Address</b>
          <div className='Hint'>{address?.slice(0, 30) + '...'}</div>
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{value ?? 'Loading...'}</div>
        </div>


        <a
          className={`Button ${connected ? 'Active' : 'Disabled'}`}
          onClick={() => {
            sendIncrement();
          }}
        >
          Increment
        </a>
        <h1>Hello, Telegram Web App!</h1>
        <a
          className={`Button 'Active' `}
          onClick={() => {
            sendDataToBot();
          }}
        >
          sendDataToBot
        </a>

        <button onClick={() => setCount((count) => count + 1)}>
          计数是 {count}
        </button>

        <button onClick={() => WebApp.showAlert(`Hello World! Current count is ${count}`)}>
            显示警告
        </button>
      </div>
    </div>
  );
}

export default App
