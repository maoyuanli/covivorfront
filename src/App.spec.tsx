import React from 'react';
import {mount} from "enzyme";
import App from "./App";
import Landing from "./components/landing";

describe('App component', () => {
    let wrapped: any[] | import("enzyme").ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    beforeEach(() => {
        wrapped = mount(<App/>);
    });

    it('should render landing page', () => {

        expect(wrapped.find(Landing).length).toEqual(1);
    })
});
