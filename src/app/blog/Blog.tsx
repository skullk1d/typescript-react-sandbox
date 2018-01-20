/**
 * @overview Feed page.  Renders blog feed
 */

import React from 'react';
import { Status } from '../../enums';
import { Post } from '../../types';
import { StateProps, DispatchProps, OwnProps } from './container';
import './styles.scss';

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
				<ul className="postList">
					{posts.map((p, i) => (
						<li key={i} className="postListItem">
							<div className="author">{p.author}</div>
							<div className="title">{p.title}</div>
							<article className="description">
								<span className="date">{p.publish_date}</span>
								{p.description}
							</article>
							<a href="#" className="readMore" onClick={(e) => {
									e.preventDefault();
									this.handleClickReadMore(p.id as number);
								}
							}>
								Read more →
							</a>
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
					className="refreshButton btn btn-default"
					onClick={() => this.props.onGetPosts()}
					disabled={this.props.postsStatus === Status.PENDING}
				>
					Refresh
				</button>
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
