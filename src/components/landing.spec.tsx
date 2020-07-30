import React from 'react';
import {mount, ReactWrapper} from "enzyme";
import Landing from "./landing";
import Root from '../root';

describe('Landing Component', () => {
    let wrapped: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    beforeEach(() => {
        wrapped = mount(
            <Root>
                <Landing/>
            </Root>
        );
    });

    it('has login form', () => {
        expect(wrapped.find('input').length).toEqual(2);
        expect(wrapped.find('button').length).toEqual(1);
    });
});
