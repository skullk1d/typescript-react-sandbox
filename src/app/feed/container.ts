import { State, Post } from '../../types';
import { Status } from '../../enums';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import BlogFeed from './BlogFeed';
import { getPosts } from '../../store/actions/blog';

interface StateProps {
	feedStatus: Status,
	feedErr: string,
	feedData: Post[]
}

interface DispatchProps {
	onGetPosts: () => void
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
		}
	};
};

const BlogFeedContainer = connect<StateProps, DispatchProps, OwnProps, State>(
	mapStateToProps,
	mapDispatchToProps
)(BlogFeed);

export default BlogFeedContainer;
