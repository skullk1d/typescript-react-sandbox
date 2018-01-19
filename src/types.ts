import { Status } from './enums';

export interface Action {
	type: string,
	payload: Promise<any>
}
export interface BlogState {
	postsStatus: Status,
	postsErr: string,
	posts: Post[],
	postStatus: Status,
	postErr: string,
	post: Post,
	commentsStatus: Status,
	commentsErr: string,
	comments: Comment[],
	addCommentStatus: Status,
	addCommentErr: string,
	updateCommentStatus: Status,
	updateCommentErr: string
}
export interface State {
	blog: BlogState
}

export interface Post {
	id?: number;
	title: string;
	author: string;
	publish_date: string; // Date that post was published in YYYY-MM-DD format
	slug: string;         // Readable URL to use for individual posts
	description: string;  // Short description for blog post listing
	content: string;      // Full blog post content -- may contain markup
}

export interface Comment {
	id?: number;
	postId?: number;
	parent_id?: number | null; // Parent comment for replies, is `null` if top-level comment
	user: string;           // Name of commenter
	date: string;           // Date of comment in YYYY-MM-DD format
	content: string;        // Comment content
}
