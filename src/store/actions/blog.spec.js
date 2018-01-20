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

		describe('should not allow empty posts', () => {
			function spec(p) {
				it(`post ${p.id} should not be empty`, () => {
					expect(p.content).toBeTruthy();
				});
			}

			console.log(posts.length)
			for (let i = 0; i < posts.length; i += 1) {
				spec(posts[i]);
			}
		});
	})
})
