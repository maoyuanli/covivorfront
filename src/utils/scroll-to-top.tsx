import {Component} from "react";
import {withRouter} from "react-router-dom";

class ScrollToTop extends Component {
    // @ts-ignore
    componentDidUpdate(prevProps) {
        // @ts-ignore
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return this.props.children;
    }
}

// @ts-ignore
export default withRouter(ScrollToTop);
