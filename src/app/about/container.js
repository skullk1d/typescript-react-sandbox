import { connect } from 'react-redux';
import About from './About';

const mapStateToProps = (state, ownProps) => {
	// "routes" props is provided by React-Router, which stores a reference of the "Route" components according to browser history
	return {};
};

// dispatch navigation directly, or setup dispatch a view transition first
const mapDispatchToProps = (dispatch) => {
	return {};
};

const AboutContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(About);

export default AboutContainer;
