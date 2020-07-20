import React from 'react';

const Landing = () => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">COVID19 Survivors</h1>
                    <p className="lead">
                        We fighted to survive, it's time to share experiences and move on together
                    </p>
                    <div className="buttons">
                        <a href="register.html" className="btn btn-primary">Sign Up</a>
                        <a href="login.html" className="btn btn-light">Login</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Landing;
