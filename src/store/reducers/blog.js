import { Status } from '../../enums';
import { FeedDatum } from '../../types';

const initialState = {
	status: Status.IDLE,
	error: null,
	data: []
};

const blog = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_BLOG_POSTS_PENDING': {
			return Object.assign({}, state, {
				status: Status.PENDING,
				error: null
			});
		}
		case 'GET_BLOG_POSTS_FULFILLED': {
			return Object.assign({}, state, {
				status: Status.SUCCESS,
				error: null,
				data: action.payload
			});
		}
		case 'GET_BLOG_POSTS_REJECTED': {
			return Object.assign({}, state, {
				status: Status.ERROR,
				error: action.payload
			});
		}
		default:
			return state;
	}
};

export default blog;
