import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

// @ts-ignore
const Alert = (props) => {
    const {alerts} = props;
    if (alerts && alerts.length > 0) { // @ts-ignore
        return alerts.map(alert =>
            (
                <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                    {alert.msg}
                </div>
            )
        );
    }
    return null;
}

// @ts-ignore
const mapStateToProps = state => ({
    alerts: state.alertReducer
})

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

// @ts-ignore
export default connect(mapStateToProps)(Alert);
