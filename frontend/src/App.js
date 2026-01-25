import DataProvider from './context/DataProvider';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
//components
import Login from './components/account/Login';
import Home from './components/home/Home';
import Header from './components/header/Header';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div style={{marginTop: 64 }}>
          <DataProvider>
            <Header />
            <Routes>
              <Route path='/login'element={<Login />} />
              <Route path='/home'element={<Home />} />
            </Routes>
          </DataProvider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
