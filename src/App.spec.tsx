import React from 'react';
import {mount} from "enzyme";
import App from "./App";
import Landing from "./components/landing";

describe('test App', () => {
    it('should render landing page', () => {
        const wrapped = mount(<App/>);
        expect(wrapped.find(Landing).length).toEqual(1);
    })
});
