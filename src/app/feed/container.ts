import { State, Post } from '../../types';
import { Status } from '../../enums';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'react-router-redux';
import BlogFeed from './BlogFeed';
import { getPosts } from '../../store/actions/blog';

export interface StateProps {
	postsStatus: Status,
	postsErr: string,
	posts: Post[]
}

export interface DispatchProps {
	onGetPosts: () => void,
	onGoToPost: (id: Number) => void
}

export interface OwnProps {
}

const mapStateToProps = (state: State): StateProps => {
	return {
		postsStatus: state.blog.postsStatus,
		postsErr: state.blog.postsErr,
		posts: state.blog.posts
	};
};

const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps => {
	return {
		onGetPosts: () => {
			dispatch(getPosts());
		},
		onGoToPost: (id: Number) => {
			dispatch(push({
				pathname: `/post/${id}`
			}));
		},
	};
};

const BlogFeedContainer = connect<StateProps, DispatchProps, OwnProps, State>(
	mapStateToProps,
	mapDispatchToProps
)(BlogFeed);

export default BlogFeedContainer;
