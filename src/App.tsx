import { Route, BrowserRouter,  Routes } from 'react-router-dom';
import Login from './Templates/Login.tsx'
import BaseLayout from './Templates/BaseLayout.tsx';
import Dashboard from './Templates/Dashboard.tsx';
import UserDetails from './Templates/UserDetails.tsx';
import MainPage from './Templates/MainPage.tsx';
import NotFound from './Templates/MainPage.tsx';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<BaseLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-details/:userId" element={<UserDetails />} />
        <Route path='/welcome' element={<MainPage/>}/>
      </Route>
      <Route path={'*'}  element={<NotFound />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;

