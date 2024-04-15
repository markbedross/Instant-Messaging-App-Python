import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { AuthContextProvider } from './context/Auth/AuthContext';
import HomePage from './views/HomePage';
import Login from './views/Login';
import Register from './views/Register';
import Navbar from './views/Navbar';
import Message from './views/Message';
import MessageDetails from './views/MessageDetails';
import Search from './views/Search';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<MessageDetails />} path="/inbox/:id" />
          <Route element={<Message />} path="/inbox" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<Search />} path="search/:username" />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
