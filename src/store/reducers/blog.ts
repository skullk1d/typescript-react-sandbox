import { Status } from '../../enums';
import { BlogState, Action } from '../../types';

const initialState: BlogState = {
	status: Status.IDLE,
	error: '',
	data: []
};

const blog = (state = initialState, action: Action) => {
	switch (action.type) {
		case 'GET_BLOG_POSTS_PENDING': {
			return Object.assign({}, state, {
				status: Status.PENDING,
				error: ''
			});
		}
		case 'GET_BLOG_POSTS_FULFILLED': {
			return Object.assign({}, state, {
				status: Status.SUCCESS,
				error: '',
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
