import { createContext, useState } from 'react';
import './App.css'
import SubmitImage from './components/submit_image'
import Cartoon from './components/cartoon_image'

export const context = createContext<
  {
    initial:
    {
      image: string, setImage: (img: string) => void
    },
    cartoon:
    {
      image: string, setImage: (img: string) => void
    },
    turnOff: { isTurnedOff: boolean, setTurnedOff: (off: boolean) => void }
  } | null>(null);

function App() {
  const [image, setImage] = useState<string>("");
  const [cartoonImage, setCartoonImage] = useState<string>("");
  const [isTurnedOff, setTurnedOff] = useState<boolean>(false);

  return (
    <context.Provider value={{ initial: { image, setImage }, cartoon: { image: cartoonImage, setImage: setCartoonImage }, turnOff: { isTurnedOff, setTurnedOff } }}>
      <div className='image-upload-section flex flex-col justify-center items-center w-screen gap-3'>
        <div className='absolute top-0 bg-red-500 h-10 w-full flex items-center'>
          {/*Here all the image section*/}
          <div className='relative'>
            <p className='pl-2 capitalize text-slate-50 font-sans cursor-default'>Home</p>
          </div>
        </div>
        <h1 className='p-5 font-sans'>Cartoon App</h1>
        <main className='flex w-full justify-center gap-10 items-center'>
          <SubmitImage />
          <Cartoon />
        </main>
      </div>
    </context.Provider>
  )
}

export default App;