/**
 * @overview Feed page.  Renders blog feed
 */

import React, { ChangeEvent } from 'react';
import { Status } from '../../enums';
import { Comment } from '../../types';
import { StateProps, DispatchProps, OwnProps } from './container';

export interface BlogPostCommentsProps extends StateProps, DispatchProps, OwnProps {};
export interface BlogPostCommentsState {
	addInput: string;
	updateInput: string;
};
class BlogPostComments extends React.Component<BlogPostCommentsProps, BlogPostCommentsState> {
	constructor(props: BlogPostCommentsProps) {
		super(props);

		this.state = {
			addInput: '',
			updateInput: ''
		};

		this.handleAddInput = this.handleAddInput.bind(this);
	}

	getIdleEl() {
		return (
			<div>
				Nothing's happening yet.
			</div>
		);
	}

	getErrEl(err: string) {
		return (
			<div>
				{`Oops: ${err}`}
			</div>
		);
	}

	getLoadingCommentsEl() {
		return (
			<div>
				Loading comments...
			</div>
		);
	}

	getCommentsEl(comments: Comment[]) {
		return (
			<div>
				<ul>
					{comments.map((c, i) => (
						<li key={i} dangerouslySetInnerHTML={{ __html: c.content }}>
						</li>
					))}
				</ul>
				<input type='textarea' value={this.state.addInput} onChange={this.handleAddInput}/>
				<button
					onClick={() => this.props.onAddComment(this.props.postId, this.state.addInput)}
					disabled={this.props.addCommentStatus === Status.PENDING || !this.state.addInput}
				>Add comment</button>
			</div>
		);
	}

	getComments() {
		this.props.onGetComments(this.props.postId);
	}

	handleAddInput(e: ChangeEvent<HTMLInputElement>) {
		this.setState({ addInput: e.target.value});
	}

	componentDidMount() {
		this.getComments();
	}

	componentWillReceiveProps(nextProps: BlogPostCommentsProps) {
		if (nextProps.addCommentStatus === Status.SUCCESS) {
			this.setState({ addInput: '' });
		}
	}

	componentDidUpdate(lastProps: BlogPostCommentsProps) {
		if (this.props.addCommentStatus === Status.SUCCESS && this.props.addCommentStatus !== lastProps.addCommentStatus) {
			this.getComments();
		}
	}

	render() {
		return (
			<div className="BlogPostComments">
				{{
					[Status.IDLE]: this.getIdleEl(),
					[Status.ERROR]: this.getErrEl(this.props.commentsErr),
					[Status.PENDING]: this.getLoadingCommentsEl(),
					[Status.SUCCESS]: this.getCommentsEl(this.props.comments)
				}[this.props.commentsStatus]}
			</div>
		);
	}
}

export default BlogPostComments;
