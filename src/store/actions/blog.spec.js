import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './blog';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('blog data', () => {
	describe('async actions', () => {
		let posts = [];
		const store = mockStore({
			blog: {
				posts: []
			}
		});

		beforeEach(() =>
			store.dispatch(actions.getPosts()).payload.promise.then(res => {
				posts = res;
			})
		);

		it('when there exists at least one post', () => {
			expect(posts.length).toBeGreaterThan(0);
		});

		it('should not allow empty posts', () => {
			let foundEmpty = false;

			for (let i = 0; i < posts.length; i += 1) {
				if (!posts[i].content) {
					foundEmpty = true;
					break;
				}
			}

			expect(foundEmpty).toBe(false);
		});
	})
})
