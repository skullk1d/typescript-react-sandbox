import { handleApiResponse, baseApi } from '../service';
import { Post, Comment } from '../../types';

export const getPosts = () => {
	const url = `${baseApi}/posts`;

	return {
		type: 'GET_POSTS',
		payload: {
			promise: new Promise<Post[]>((resolve, reject) => {
				handleApiResponse(url, resolve, reject);
			})
		}
	};
};

export const getPost = (id: string) => {
	const url = `${baseApi}/posts/${id}`;

	return {
		type: 'GET_POST',
		payload: {
			promise: new Promise<Post>((resolve, reject) => {
				handleApiResponse(url, resolve, reject);
			})
		}
	};
};

export const getPostComments = (id: string) => {
	const url = `${baseApi}/posts/${id}/comments`;

	return {
		type: 'GET_POST_COMMENTS',
		payload: {
			promise: new Promise<Comment[]>((resolve, reject) => {
				handleApiResponse(url, resolve, reject);
			})
		}
	};
};

export const addCommentToPost = (id: string, comment: string) => {
	const url = `${baseApi}/posts/${id}/comments`;

	return {
		type: 'ADD_COMMENT',
		payload: {
			promise: new Promise<Post>((resolve, reject) => {
				handleApiResponse(url, resolve, reject, 'POST', comment);
			})
		}
	};
};


export const updateComment = (id: string, comment: string) => {
	const url = `${baseApi}/comments/${id}`;

	return {
		type: 'UPDATE_COMMENT',
		payload: {
			promise: new Promise<Post>((resolve, reject) => {
				handleApiResponse(url, resolve, reject, 'PUT', comment);
			})
		}
	};
};
