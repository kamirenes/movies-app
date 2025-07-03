import { Provider } from 'react-redux';
import './App.css';
import ImagesFeature from './features/ImagesFeature/ImagesFeature';
import { store } from './ducks/store';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './features/Auth/Login';
import PrivateRoute from './common/PrivateRoute';
import SellMovie from './features/SellMovie/SellMovie';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<ImagesFeature />} />

          <Route element={<PrivateRoute />}>
            <Route path="/transfers" element={<SellMovie />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
