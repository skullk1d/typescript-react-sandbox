import { State, Post } from '../../types';
import { Status } from '../../enums';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'react-router-redux';
import BlogFeed from './BlogFeed';
import { getPosts } from '../../store/actions/blog';

interface StateProps {
	feedStatus: Status,
	feedErr: string,
	feedData: Post[]
}

interface DispatchProps {
	onGetPosts: () => void,
	onGoToPost: (id: Number) => void
}

interface OwnProps {

}

const mapStateToProps = (state: State): StateProps => {
	return {
		feedStatus: state.blog.status,
		feedErr: state.blog.error,
		feedData: state.blog.data
	};
};

const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps => {
	return {
		onGetPosts: () => {
			dispatch(getPosts());
		},
		onGoToPost: (id: Number) => {
			dispatch(push({
				pathname: `/feed/${id}`
			}));
		},
	};
};

const BlogFeedContainer = connect<StateProps, DispatchProps, OwnProps, State>(
	mapStateToProps,
	mapDispatchToProps
)(BlogFeed);

export default BlogFeedContainer;
