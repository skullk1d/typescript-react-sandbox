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

export const addComment = (id: number, content: string) => {
	const api = `posts/${id}/comments`;

	return {
		type: 'ADD_COMMENT',
		payload: {
			promise: new Promise<Post>((resolve, reject) => {
				handleApiResponse(api, resolve, reject, 'POST', content);
			})
		}
	};
};


export const updateComment = (id: number, content: string) => {
	const api = `comments/${id}`;

	return {
		type: 'UPDATE_COMMENT',
		payload: {
			promise: new Promise<Post>((resolve, reject) => {
				handleApiResponse(api, resolve, reject, 'PUT', content);
			})
		}
	};
};
