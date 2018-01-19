/**
 * @overview Feed page.  Renders blog feed
 */

import React from 'react';
import { Status } from '../../enums';
import { Post } from '../../types';
import { StateProps, DispatchProps, OwnProps } from './container';
import BlogPostComments from '../blogPostComments';

export interface BlogPostProps extends StateProps, DispatchProps, OwnProps {};

class BlogPost extends React.Component<BlogPostProps, {}> {
	constructor(props: BlogPostProps) {
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
				<div dangerouslySetInnerHTML={{ __html: post.content }}>
				</div>
				<BlogPostComments postId={post.id} />
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
			<div className="BlogPost">
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

export default BlogPost;
