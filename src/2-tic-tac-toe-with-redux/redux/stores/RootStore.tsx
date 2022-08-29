import { createStore, Store } from "redux";
import TicTacToeActions from "../actions/TicTacToeActions";

import rootReducer from "../reducers/RootReducer";

const rootStore: Store<TicTacToeState, TicTacToeActions>  = createStore(rootReducer);

export default rootStore;