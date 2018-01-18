import { State, Post, Comment } from '../../types';
import { Status } from '../../enums';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import BlogFeedPost from './BlogFeedPost';
import { getPost, getComments, addComment, updateComment } from '../../store/actions/blog';

export interface StateProps {
	postStatus: Status,
	postErr: string,
	post: Post,
	commentsStatus: Status,
	commentsErr: string,
	comments: Comment[],
	addCommentStatus: Status,
	addCommentErr: string,
	updateCommentStatus: Status,
	updateCommentErr: string
}

export interface DispatchProps {
	onGetPost: (id: Number) => void,
	onGetComments: (id: Number) => void,
	onAddComment: (id: Number, content: string) => void,
	onUpdateComment: (id: Number, content: string) => void,
}

export interface OwnProps {
	params: { id: string } // route params prop provided by react-router, interface varies based on <route> definition
}

const mapStateToProps = (state: State): StateProps => {
	return {
		postStatus: state.blog.postStatus,
		postErr: state.blog.postErr,
		post: state.blog.post,
		commentsStatus: state.blog.commentsStatus,
		commentsErr: state.blog.commentsErr,
		comments: state.blog.comments,
		addCommentStatus: state.blog.addCommentStatus,
		addCommentErr: state.blog.addCommentErr,
		updateCommentStatus: state.blog.updateCommentStatus,
		updateCommentErr: state.blog.updateCommentErr
	};
};

const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps => {
	return {
		onGetPost: (id) => {
			dispatch(getPost(id));
		},
		onGetComments: (id) => {
			dispatch(getComments(id));
		},
		onAddComment: (id, content) => {
			dispatch(addComment(id, content));
		},
		onUpdateComment: (id, content) => {
			dispatch(updateComment(id, content));
		},
	};
};

const BlogFeedPostContainer = connect<StateProps, DispatchProps, OwnProps, State>(
	mapStateToProps,
	mapDispatchToProps
)(BlogFeedPost);

export default BlogFeedPostContainer;
