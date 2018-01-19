import { State, Comment } from '../../types';
import { Status } from '../../enums';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import BlogPostComments from './BlogPostComments';
import { getComments, addComment, updateComment } from '../../store/actions/blog';

export interface StateProps {
	commentsStatus: Status,
	commentsErr: string,
	comments: Comment[],
	addCommentStatus: Status,
	addCommentErr: string,
	updateCommentStatus: Status,
	updateCommentErr: string
}

export interface DispatchProps {
	onGetComments: (id: number) => void,
	onAddComment: (id: number, content: string) => void,
	onUpdateComment: (id: number, content: string) => void,
}

export interface OwnProps {
	postId: number
}

const mapStateToProps = (state: State): StateProps => {
	return {
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

const BlogPostCommentsContainer = connect<StateProps, DispatchProps, OwnProps, State>(
	mapStateToProps,
	mapDispatchToProps
)(BlogPostComments);

export default BlogPostCommentsContainer;
