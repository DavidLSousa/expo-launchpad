import { renderHook, act } from '../../../shared/utils/test-utils';
import { useAuthContext } from '../context/AuthContext';

describe('useAuth (Integration)', () => {
  it('should start with no user', () => {
    const { result } = renderHook(() => useAuthContext());
    expect(result.current.user).toBeNull();
  });

  it('should sign in a user', async () => {
    const { result } = renderHook(() => useAuthContext());

    await act(async () => {
      await result.current.signIn();
    });

    expect(result.current.user).toEqual({ name: 'Test User' });
  });

  it('should sign out a user', async () => {
    const { result } = renderHook(() => useAuthContext());

    await act(async () => {
      await result.current.signIn();
    });

    act(() => {
      result.current.signOut();
    });

    expect(result.current.user).toBeNull();
  });
});
