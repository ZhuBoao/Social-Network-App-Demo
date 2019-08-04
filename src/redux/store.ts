import thunkMiddleware, {
    ThunkAction as _ThunkAction,
    ThunkDispatch as _ThunkDispatch
} from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, Dispatch as ReduxDispatch } from "redux";
import rootReducer from "./reducers/index";

const loggerMiddleware = createLogger();

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

export type Dispatch = ReduxDispatch & _ThunkDispatch<any, any, any>;

export default store;
