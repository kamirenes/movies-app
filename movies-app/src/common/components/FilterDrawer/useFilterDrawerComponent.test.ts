import { renderHook, act } from '@testing-library/react-hooks';
import useFilterDrawerComponent from './useFilterDrawerComponent';
import { Anchor } from './types';

describe('useFilterDrawerComponent hook', () => {
  it('should initialize all sides as closed (false)', () => {
    const { result } = renderHook(() => useFilterDrawerComponent());
    expect(result.current.state).toEqual({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  });

  it('should open the specified anchor when toggleDrawer is called with open=true', () => {
    const { result } = renderHook(() => useFilterDrawerComponent());

    act(() => {
      const clickEvent = { type: 'click' } as unknown as React.MouseEvent;
      result.current.toggleDrawer('left' as Anchor, true)(clickEvent);
    });

    expect(result.current.state.left).toBe(true);
    expect(result.current.state.top).toBe(false);
    expect(result.current.state.bottom).toBe(false);
    expect(result.current.state.right).toBe(false);
  });

  it('should close the specified anchor when toggleDrawer is called with open=false', () => {
    const { result } = renderHook(() => useFilterDrawerComponent());

    act(() => {
      const clickEvent = { type: 'click' } as unknown as React.MouseEvent;
      result.current.toggleDrawer('bottom' as Anchor, true)(clickEvent);
    });
    expect(result.current.state.bottom).toBe(true);

    act(() => {
      const clickEvent = { type: 'click' } as unknown as React.MouseEvent;
      result.current.toggleDrawer('bottom' as Anchor, false)(clickEvent);
    });

    expect(result.current.state.bottom).toBe(false);
  });

  it('should ignore keydown events for Tab or Shift', () => {
    const { result } = renderHook(() => useFilterDrawerComponent());

    act(() => {
      const keyEvent = {
        type: 'keydown',
        key: 'Tab',
      } as unknown as React.KeyboardEvent;
      result.current.toggleDrawer('right' as Anchor, true)(keyEvent);
    });

    expect(result.current.state.right).toBe(false);

    act(() => {
      const keyEvent = {
        type: 'keydown',
        key: 'Shift',
      } as unknown as React.KeyboardEvent;
      result.current.toggleDrawer('right' as Anchor, true)(keyEvent);
    });

    expect(result.current.state.right).toBe(false);
  });
});
