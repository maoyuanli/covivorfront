import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Container, Form, Header, Image, Segment} from "semantic-ui-react";
import {loginAction} from "../redux/action/auth-action";

const Landing = (props) => {
    const [formData, setFormData] = useState({
        email: 'guest@account.com',
        pass: 'abc123',
    });
    const {email, pass} = formData;

    if (props.isAuthenticated) {
        return (<Redirect to='/allposts'/>);
    }


    const handleOnChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        props.loginAction(email, pass);
    };

    const backgroundImgStyle = {
        filter: 'brightness(50%)'
    };

    const textStyle = {
        position: 'absolute',
        color: 'white',
        textAlign: 'center',
        left: '25%',
        alignContent: 'center'
    };


    return (
        <Segment nverted textAlign='center' vertical className='masthead'>
            <Image src="/homepage-background.jpg" fluid style={backgroundImgStyle}/>
            <Container text style={textStyle}>
                <Header as='h1' inverted>COVID19 Survivors</Header>
                <Header as='h2' inverted className="lead">
                    Share Experience, Help Each Other, Move On Together
                </Header>
                <Form inverted onSubmit={handleOnSubmit} style={{display: 'inline-block'}}>
                    <Form.Group>
                        <Form.Input
                            placeholder='email'
                            name='email'
                            value={email}
                            onChange={handleOnChange}
                        />
                        <Form.Input
                            placeholder='password'
                            name='pass'
                            value={pass}
                            onChange={handleOnChange}
                        />
                        <Form.Button color='teal' content='Log In'/>
                    </Form.Group>
                </Form>
            </Container>
        </Segment>
    );
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

const mapActionToProps = {
    loginAction
}

export default connect(mapStateToProps, mapActionToProps)(Landing);
