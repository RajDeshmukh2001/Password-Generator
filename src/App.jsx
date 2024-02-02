import './App.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const App = () => {
  const [length, setLength] = useState(8);
  const [copy, setCopy] = useState('Copy')
  const [password, setPassword] = useState('');
  const [addNumber, setAddNumber] = useState(false);
  const [addCharacters, setAddCharacters] = useState(false);

  const passwordRef = useRef(null);

  // Password Generator function
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (addNumber) str = str + "0123456789"
    if (addCharacters) str = str + "!@#$%^&*_-+=[]{}~";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, addNumber, addCharacters, setPassword])

  // Copy Password function
  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    const copied = window.navigator.clipboard.writeText(password);

    if (copied) {
      setCopy('Copied');
    }

    setTimeout(() => {
      setCopy('Copy');
    }, 3000);
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, addNumber, addCharacters, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-xl mx-auto shadow-md rounded-md px-6 py-2 my-12 text-orange-600 bg-gray-700">
        <h2 className="text-yellow-300 text-center py-3 text-lg">Password Generator</h2>
        <div className="flex shadow rounded-md overflow-hidden mb-4">
          <input type="text" value={password} className="outline-none w-full py-1 px-3" ref={passwordRef} readOnly />
          <button onClick={copyPassword} className={`cursor-pointer outline-none ${copy === 'Copied' ? 'bg-green-700' : 'bg-blue-700'} text-white px-3 py-0.5 shrink-0`}>{copy}</button>
        </div>

        <div className="flex text-md justify-between">
          <div className="flex items-center gap-x-1">
            <input type="range" min={8} max={20} value={length} id="passwordLength" className="cursor-pointer" onChange={(e) => { setLength(e.target.value) }} />
            <label htmlFor="passwordLength">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={addNumber} id="numberInput" onChange={() => { setAddNumber((prev) => !prev) }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={addCharacters} id="characterInput" onChange={() => { setAddCharacters((prev) => !prev) }} />
            <label htmlFor="characterInput">Special Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
