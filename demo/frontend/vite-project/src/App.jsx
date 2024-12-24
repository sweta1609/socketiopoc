import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import socket from './DataVisualizer'
import DataVisualizer from './DataVisualizer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <div><DataVisualizer/></div>
    </>
  )
}

export default App
