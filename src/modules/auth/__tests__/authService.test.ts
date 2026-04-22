import { authService } from '../service/authService';

describe('authService', () => {
  it('should return user data on login', async () => {
    const response = await authService.login();
    expect(response).toEqual({ name: 'Test User', token: 'mock-token' });
  });

  it('should resolve on logout', async () => {
    await expect(authService.logout()).resolves.toBeUndefined();
  });
});
