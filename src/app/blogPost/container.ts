import { State, Post } from '../../types';
import { Status } from '../../enums';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import BlogPost from './BlogPost';
import { getPost } from '../../store/actions/blog';

export interface StateProps {
	postStatus: Status,
	postErr: string,
	post: Post
}

export interface DispatchProps {
	onGetPost: (id: number) => void
}

export interface OwnProps {
	params: { id: string } // route params prop provided by react-router, interface varies based on <route> definition
}

const mapStateToProps = (state: State): StateProps => {
	return {
		postStatus: state.blog.postStatus,
		postErr: state.blog.postErr,
		post: state.blog.post
	};
};

const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps => {
	return {
		onGetPost: (id) => {
			dispatch(getPost(id));
		}
	};
};

const BlogPostContainer = connect<StateProps, DispatchProps, OwnProps, State>(
	mapStateToProps,
	mapDispatchToProps
)(BlogPost);

export default BlogPostContainer;
