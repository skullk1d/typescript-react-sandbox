/**
 * @overview Feed page.  Renders blog feed
 */

import React, { ChangeEvent } from 'react';
import { Status } from '../../enums';
import { Comment } from '../../types';
import { StateProps, DispatchProps, OwnProps } from './container';
import './styles.scss';

export interface BlogPostCommentsProps extends StateProps, DispatchProps, OwnProps {};
export interface BlogPostCommentsState {
	addInput: string;
	nameInput: string;
};
export const DEFAULT_NAME = 'Anonymous';

class BlogPostComments extends React.Component<BlogPostCommentsProps, BlogPostCommentsState> {
	constructor(props: BlogPostCommentsProps) {
		super(props);

		this.state = {
			addInput: '',
			nameInput: ''
		};

		this.handleAddInput = this.handleAddInput.bind(this);
		this.handleNameInput = this.handleNameInput.bind(this);
		this.handleClickAddComment = this.handleClickAddComment.bind(this);
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
		// newest on top
		comments.sort((c1, c2) => (c2.id as number) - (c1.id as number));

		return (
			<div>
				<div className="addCommentForm input-group">
					<textarea
						className="commentInput form-control"
						value={this.state.addInput}
						placeholder='Your comment'
						onChange={this.handleAddInput}
					/>
					<input
						className="nameInput form-control"
						type="text"
						value={this.state.nameInput}
						placeholder='Your name'
						onChange={this.handleNameInput}
					/>
					<button
						className="addCommentButton btn btn-default"
						onClick={this.handleClickAddComment}
						disabled={this.props.addCommentStatus === Status.PENDING || !this.state.addInput}
					>
						Add comment
					</button>
				</div>
				<ul className="commentList">
					{comments.map((c, i) => (
						<li key={i} className="commentListItem">
							<div className="user">{c.user}</div>
							<div className="date">{c.date}</div>
							<div className = "content" key={i} dangerouslySetInnerHTML={{ __html: c.content }}></div>
						</li>
					))}
				</ul>
			</div>
		);
	}

	getComments() {
		this.props.onGetComments(this.props.postId);
	}

	handleAddInput(e: ChangeEvent<HTMLTextAreaElement>) {
		this.setState({ addInput: e.target.value});
	}

	handleNameInput(e: ChangeEvent<HTMLInputElement>) {
		this.setState({ nameInput: e.target.value });
	}

	handleClickAddComment() {
		const t = new Date();
		const comment = {
			content: this.state.addInput,
			user: this.state.nameInput || DEFAULT_NAME,
			date: `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`
		}

		this.props.onAddComment(this.props.postId, comment);
	}

	componentDidMount() {
		this.getComments();
	}

	componentWillReceiveProps(nextProps: BlogPostCommentsProps) {
		if (nextProps.addCommentStatus === Status.SUCCESS) {
			this.setState({
				addInput: '',
				nameInput: ''
			});
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
