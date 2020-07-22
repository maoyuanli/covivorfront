import React, {Component} from 'react';
import {css} from '@emotion/core';
import GridLoader from 'react-spinners/GridLoader';
import 'bootstrap/dist/css/bootstrap.css'

class WaitLoader extends Component {

    render() {

        const override = css`
                        display: block;
                        margin: 0 auto;
                        border-color: red;         
                        `;


        return <div className='sweet-loading'>
            <br/>
            <h3>Loading </h3>
            <br/>
            <GridLoader
                css={override}
                sizeUnit={"px"}
                size={60}
                color={'#123abc'}
                // loading=true
            />
        </div>

    }


}

export default WaitLoader;
