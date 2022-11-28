import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.less';
import App from './App';
import { ModalState } from './context/ModalContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ModalState>
      <App />
    </ModalState>
  </Provider>
);