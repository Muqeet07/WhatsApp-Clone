import './App.css';
import AppContainer from './components/AppContainer';
import SetUserReducer from './components/redux/reducers/SetUserReducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

let store = createStore(SetUserReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
        <div className="app">
          <AppContainer />
        </div>
    </Provider>
  );
}

export default App;
