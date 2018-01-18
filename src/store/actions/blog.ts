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

export const getPost = (id: string) => {
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

export const getPostComments = (id: string) => {
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

export const addCommentToPost = (id: string, comment: string) => {
	const api = `posts/${id}/comments`;

	return {
		type: 'ADD_COMMENT',
		payload: {
			promise: new Promise<Post>((resolve, reject) => {
				handleApiResponse(api, resolve, reject, 'POST', comment);
			})
		}
	};
};


export const updateComment = (id: string, comment: string) => {
	const api = `comments/${id}`;

	return {
		type: 'UPDATE_COMMENT',
		payload: {
			promise: new Promise<Post>((resolve, reject) => {
				handleApiResponse(api, resolve, reject, 'PUT', comment);
			})
		}
	};
};
