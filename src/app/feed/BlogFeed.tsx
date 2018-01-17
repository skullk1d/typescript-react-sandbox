/**
 * @overview Feed page.  Renders blog feed
 */

import React from 'react';
import { Status } from '../../enums';
import { FeedDatum } from '../../types';

export interface BlogFeedProps {
	feedStatus: Status,
	feedErr: string,
	feedData: FeedDatum[]
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

	getFeedEl(feedData: FeedDatum[]) {
		return (
			<div>
				{feedData}
			</div>
		);
	}

	componentWillMount() {
	}

	render() {
		return (
			<div className="BlogFeed">
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
