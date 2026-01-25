import DataProvider from './context/DataProvider';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
//components
import Login from './components/account/Login';
import Home from './components/home/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
          <DataProvider>
            <Routes>
              <Route path='/login'element={<Login />} />
              <Route path='/home'element={<Home />} />
            </Routes>
          </DataProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
