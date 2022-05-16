import './App.css';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import LoadingPage from './pages/LoadingPage';
import ControlPage from './pages/ControlPage';

function App() {

  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io();
    
    socket.on('initial', (e) => {
      setLoading(false);
      setSocket(socket);
    })

    socket.on('disconnect', (e) => {
      setSocket(null);
      setLoading(true);
    })

    return () => socket.disconnect();
  }, [setSocket])
 
  return (
    <div className="App">
        {/* {!config && <ConfigPage />} */}
        {loading && <LoadingPage />}
        {socket && <ControlPage socket={socket}/>}
    </div>
  );
}

export default App;
