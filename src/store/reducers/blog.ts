import { Status } from '../../enums';
import { BlogState, Action } from '../../types';

const initialState: BlogState = {
	postsStatus: Status.IDLE,
	postsErr: '',
	posts: [],
	postStatus: Status.IDLE,
	postErr: '',
	post: {
		"id": -1,
		"title": '',
		"author": '',
		"publish_date": '', // Date that post was published in YYYY-MM-DD format
		"slug": '',         // Readable URL to use for individual posts
		"description": '',  // Short description for blog post listing
		"content": ''      // Full blog post content -- may contain markup
	},
	commentsStatus: Status.IDLE,
	commentsErr: '',
	comments: [],
	addCommentStatus: Status.IDLE,
	addCommentErr: '',
	updateCommentStatus: Status.IDLE,
	updateCommentErr: '',
};

const blog = (state = initialState, action: Action) => {
	switch (action.type) {
		case 'GET_POSTS_PENDING': {
			return Object.assign({}, state, {
				postsStatus: Status.PENDING,
				postsErr: ''
			});
		}
		case 'GET_POSTS_FULFILLED': {
			return Object.assign({}, state, {
				postsStatus: Status.SUCCESS,
				postsErr: '',
				posts: action.payload
			});
		}
		case 'GET_POSTS_REJECTED': {
			return Object.assign({}, state, {
				postsStatus: Status.ERROR,
				postsErr: action.payload
			});
		}

		case 'GET_POST_PENDING': {
			return Object.assign({}, state, {
				postStatus: Status.PENDING,
				postErr: ''
			});
		}
		case 'GET_POST_FULFILLED': {
			return Object.assign({}, state, {
				postStatus: Status.SUCCESS,
				postErr: '',
				post: action.payload
			});
		}
		case 'GET_POST_REJECTED': {
			return Object.assign({}, state, {
				postStatus: Status.ERROR,
				postErr: action.payload
			});
		}

		case 'GET_POST_COMMENTS_PENDING': {
			return Object.assign({}, state, {
				commentsStatus: Status.PENDING,
				commentsErr: ''
			});
		}
		case 'GET_POST_COMMENTS_FULFILLED': {
			return Object.assign({}, state, {
				commentsStatus: Status.SUCCESS,
				commentsErr: '',
				comments: action.payload
			});
		}
		case 'GET_POST_COMMENTS_REJECTED': {
			return Object.assign({}, state, {
				commentsStatus: Status.ERROR,
				commentsErr: action.payload
			});
		}

		case 'ADD_COMMENT_PENDING': {
			return Object.assign({}, state, {
				addCommentStatus: Status.PENDING,
				addCommentErr: ''
			});
		}
		case 'ADD_COMMENT_FULFILLED': {
			return Object.assign({}, state, {
				addCommentStatus: Status.SUCCESS,
				addCommentErr: ''
			});
		}
		case 'ADD_COMMENT_REJECTED': {
			return Object.assign({}, state, {
				addCommentStatus: Status.ERROR,
				addCommentErr: action.payload
			});
		}

		case 'UPDATE_COMMENT_PENDING': {
			return Object.assign({}, state, {
				updateCommentStatus: Status.PENDING,
				updateCommentErr: ''
			});
		}
		case 'UPDATE_COMMENT_FULFILLED': {
			return Object.assign({}, state, {
				updateCommentStatus: Status.SUCCESS,
				updateCommentErr: ''
			});
		}
		case 'UPDATE_COMMENT_REJECTED': {
			return Object.assign({}, state, {
				updateCommentStatus: Status.ERROR,
				updateCommentErr: action.payload
			});
		}

		default:
			return state;
	}
};

export default blog;
