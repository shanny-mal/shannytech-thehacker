import { useEffect, useState } from 'react';

function App() {
   const [message, setMessage] = useState('');

   useEffect(() => {
      fetch('/api/hello').then((res) =>
         res.json().then((data) => setMessage(data.message))
      );
   }, []);
    return <p className="font-bold text-3xl">Message from backend: {message}</p>;
}

export default App;
