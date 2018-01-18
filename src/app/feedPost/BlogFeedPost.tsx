/**
 * @overview Feed page.  Renders blog feed
 */

import React from 'react';
import { Status } from '../../enums';
import { Post } from '../../types';
import { StateProps, DispatchProps, OwnProps } from './container';

export interface BlogFeedPostProps extends StateProps, DispatchProps, OwnProps {};

class BlogFeedPost extends React.Component<BlogFeedPostProps, {}> {
	constructor(props: BlogFeedPostProps) {
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

	getLoadingEl() {
		return (
			<div>
				Loading post...
			</div>
		);
	}

	getPostEl(post: Post) {
		return (
			<div>
				{post.content}
			</div>
		);
	}

	componentDidMount() {
		const postId = parseInt(this.props.params.id);

		if (!Number.isNaN(postId)) {
			this.props.onGetPost(postId);
		}

	}

	render() {
		return (
			<div className="BlogFeedPost">
				{{
					[Status.IDLE]: this.getIdleEl(),
					[Status.ERROR]: this.getErrEl(this.props.postErr),
					[Status.PENDING]: this.getLoadingEl(),
					[Status.SUCCESS]: this.getPostEl(this.props.post)
				}[this.props.postStatus]}
			</div>
		);
	}
}

export default BlogFeedPost;
