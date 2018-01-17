import { connect } from 'react-redux';
import BlogFeed from './BlogFeed';

const mapStateToProps = (state: any/* , ownProps: any */) => {
	// "routes" props is provided by React-Router, which stores a reference of the "Route" components according to browser history
	return {
		feedStatus: state.blog.status,
		feedErr: state.blog.error,
		feedData: state.blog.data
	};
};

// dispatch navigation directly, or setup dispatch a view transition first
const mapDispatchToProps = (/* dispatch: any */) => {
	return {};
};

const BlogFeedContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(BlogFeed);

export default BlogFeedContainer;
