import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import ReduxToastr from 'react-redux-toastr'
import { BrowserRouter } from 'react-router-dom'
import reducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

var store = createStore(reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <div>
                <App />
                <ReduxToastr timeOut={4000}
                    newestOnTop={true}
                    preventDuplicates
                    position='top-right'
                    transitionIn='fadeIn'
                    transitionOut='fadeOut'
                    progressBar />
            </div>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
