import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Blog from './pages/Blog'



function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<SignIn />} path='/signin' ></Route>
          <Route element={<SignUp />} path='/signup' ></Route>
          <Route element={<Blog />} path='/blog' ></Route>
          <Route element={<SignIn />} path='/' ></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
