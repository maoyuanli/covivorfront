import {Provider} from "react-redux";
import React from "react";

import store from "./redux/store";

export default (props: { children: React.ReactNode; }) => {
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}
