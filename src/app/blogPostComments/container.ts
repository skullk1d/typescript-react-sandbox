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
	onAddComment: (id: number, comment: Comment) => void,
	onUpdateComment: (id: number, comment: Comment) => void,
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
		onAddComment: (id, comment) => {
			dispatch(addComment(id, comment));
		},
		onUpdateComment: (id, comment) => {
			dispatch(updateComment(id, comment));
		},
	};
};

const BlogPostCommentsContainer = connect<StateProps, DispatchProps, OwnProps, State>(
	mapStateToProps,
	mapDispatchToProps
)(BlogPostComments);

export default BlogPostCommentsContainer;
