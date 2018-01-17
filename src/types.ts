import { Status } from './enums';

export interface Action {
	type: string,
	payload: Promise<any>
}
export interface BlogState {
	status: Status,
	error: string,
	data: Post[]
}
export interface State {
	blog: BlogState
}

export interface Post {
	"id": Number;
	"title": String;
	"author": String;
	"publish_date": String; // Date that post was published in YYYY-MM-DD format
	"slug": String;         // Readable URL to use for individual posts
	"description": String;  // Short description for blog post listing
	"content": String;      // Full blog post content -- may contain markup
}

export interface Comment {
	"id": Number;
	"postId": Number;
	"parent_id": Number | null; // Parent comment for replies, is `null` if top-level comment
	"user": String;           // Name of commenter
	"date": String;           // Date of comment in YYYY-MM-DD format
	"content": String;        // Comment content
}
