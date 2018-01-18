/**
 * @overview Feed page.  Renders blog feed
 */

import React from 'react';
import { Status } from '../../enums';
import { Post } from '../../types';

import { StateProps, DispatchProps, OwnProps } from './container';

export interface BlogFeedProps extends StateProps, DispatchProps, OwnProps {};

class BlogFeed extends React.Component<BlogFeedProps, {}> {
	constructor(props: BlogFeedProps) {
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
				Loading posts...
			</div>
		);
	}

	getFeedEl(posts: Post[]) {
		return (
			<div>
				<ul>
					{posts.map((d, i) => (
						<li key={i} onClick={() => this.props.onGoToPost(d.id)}>
							{d.id}
						</li>
					))}
				</ul>
			</div>
		);
	}

	componentDidMount() {
		if (!this.props.posts.length) {
			this.props.onGetPosts();
		}
	}

	render() {
		return (
			<div className="BlogFeed">
				<button
					onClick={() => this.props.onGetPosts()}
					disabled={this.props.postsStatus === Status.PENDING}
				>Refresh</button>
				{{
					[Status.IDLE]: this.getIdleEl(),
					[Status.ERROR]: this.getErrEl(this.props.postsErr),
					[Status.PENDING]: this.getLoadingEl(),
					[Status.SUCCESS]: this.getFeedEl(this.props.posts)
				}[this.props.postsStatus]}
			</div>
		);
	}
}

export default BlogFeed;
