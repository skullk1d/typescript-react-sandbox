/**
 * @overview Feed page.  Renders blog feed
 */

import React from 'react';
import { Status } from '../../enums';
import { Comment } from '../../types';
import { StateProps, DispatchProps, OwnProps } from './container';

export interface BlogPostCommentsProps extends StateProps, DispatchProps, OwnProps {};

class BlogPostComments extends React.Component<BlogPostCommentsProps, {}> {
	constructor(props: BlogPostCommentsProps) {
		super(props);
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
			</div>
		);
	}

	componentDidMount() {
		const postId = this.props.postId;

		if (!Number.isNaN(postId)) {
			this.props.onGetComments(postId);
		}

	}

	render() {
		return (
			<div className="BlogPost">
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
