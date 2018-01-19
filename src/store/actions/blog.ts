import { handleApiResponse } from '../service';
import { Post, Comment } from '../../types';

export const getPosts = () => {
	const api = `posts`;

	return {
		type: 'GET_POSTS',
		payload: {
			promise: new Promise<Post[]>((resolve, reject) => {
				handleApiResponse(api, resolve, reject);
			})
		}
	};
};

export const getPost = (id: number) => {
	const api = `posts/${id}`;

	return {
		type: 'GET_POST',
		payload: {
			promise: new Promise<Post>((resolve, reject) => {
				handleApiResponse(api, resolve, reject);
			})
		}
	};
};

export const getComments = (id: number) => {
	const api = `posts/${id}/comments`;

	return {
		type: 'GET_POST_COMMENTS',
		payload: {
			promise: new Promise<Comment[]>((resolve, reject) => {
				handleApiResponse(api, resolve, reject);
			})
		}
	};
};

export const addComment = (id: number, comment: Comment) => {
	const api = `posts/${id}/comments`;
	const body = JSON.stringify(comment);

	return {
		type: 'ADD_COMMENT',
		payload: {
			promise: new Promise<Post>((resolve, reject) => {
				handleApiResponse(api, resolve, reject, 'POST', body);
			})
		}
	};
};


export const updateComment = (id: number, comment: Comment) => {
	const api = `comments/${id}`;
	const body = JSON.stringify(comment);

	return {
		type: 'UPDATE_COMMENT',
		payload: {
			promise: new Promise<Post>((resolve, reject) => {
				handleApiResponse(api, resolve, reject, 'PUT', body);
			})
		}
	};
};
