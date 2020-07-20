import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

const Alert = ({alerts}) => {
    if (alerts && alerts.length > 0)
        return alerts.map(alert =>
            (
                <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                    {alert.msg}
                </div>
            )
        );
    return null;
}

const mapStateToProps = state => ({
    alerts: state.alertReducer
})

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(Alert);
