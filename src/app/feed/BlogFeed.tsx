/**
 * @overview Feed page.  Renders blog feed
 */

import React from 'react';
import { Status } from '../../enums';
import { Post } from '../../types';

export interface BlogFeedProps {
	feedStatus: Status,
	feedErr: string,
	feedData: Post[],
	onGetPosts: () => void,
	onGoToPost: (id: Number) => void
};

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
				Loading feed...
			</div>
		);
	}

	getFeedEl(feedData: Post[]) {
		return (
			<div>
				<ul>
					{feedData.map((d, i) => (
						<li key={i} onClick={() => this.goToPost(d.id)}>
							{d.id}
						</li>
					))}
				</ul>
			</div>
		);
	}

	goToPost(id: Number) {
		this.props.onGoToPost(id);
	}

	componentDidMount() {
		if (!this.props.feedData.length) {
			this.props.onGetPosts();
		}
	}

	render() {
		return (
			<div className="BlogFeed">
				<button
					onClick={() => this.props.onGetPosts()}
					disabled={this.props.feedStatus === Status.PENDING}
				>Refresh</button>
				{{
					[Status.IDLE]: this.getIdleEl(),
					[Status.ERROR]: this.getErrEl(this.props.feedErr),
					[Status.PENDING]: this.getLoadingEl(),
					[Status.SUCCESS]: this.getFeedEl(this.props.feedData)
				}[this.props.feedStatus]}
			</div>
		);
	}
}

export default BlogFeed;
