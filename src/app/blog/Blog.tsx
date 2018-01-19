/**
 * @overview Feed page.  Renders blog feed
 */

import React from 'react';
import { Status } from '../../enums';
import { Post } from '../../types';

import { StateProps, DispatchProps, OwnProps } from './container';

export interface BlogProps extends StateProps, DispatchProps, OwnProps {};

class Blog extends React.Component<BlogProps, {}> {
	constructor(props: BlogProps) {
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

	getPostsEl(posts: Post[]) {
		// newest on top
		posts.sort((p1, p2) => Date.parse(p2.publish_date) - Date.parse(p1.publish_date));

		return (
			<div>
				<ul>
					{posts.map((p, i) => (
						<li key={i}>
							<div>{p.author}</div>
							<div>{p.title}</div>
							<div>{p.publish_date}</div>
							<article>{p.description}</article>
							<a onClick={() => this.handleClickReadMore(p.id as number)}>Read more →</a>
						</li>
					))}
				</ul>
			</div>
		);
	}

	handleClickReadMore(id: number) {
		this.props.onGoToPost(id)
	}

	componentDidMount() {
		if (!this.props.posts.length) {
			this.props.onGetPosts();
		}
	}

	render() {
		return (
			<div className="Blog">
				<button
					onClick={() => this.props.onGetPosts()}
					disabled={this.props.postsStatus === Status.PENDING}
				>Refresh</button>
				{{
					[Status.IDLE]: this.getIdleEl(),
					[Status.ERROR]: this.getErrEl(this.props.postsErr),
					[Status.PENDING]: this.getLoadingEl(),
					[Status.SUCCESS]: this.getPostsEl(this.props.posts)
				}[this.props.postsStatus]}
			</div>
		);
	}
}

export default Blog;
