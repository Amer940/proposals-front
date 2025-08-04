import { useState, useMemo } from "react";
import debounce from "lodash.debounce";

function useDebouncedState<T>(initialValue: T, delay: number): [T, (value: T) => void] {
  const [state, setState] = useState(initialValue);

  const debouncedSetState = useMemo(
    () => debounce((value: T) => setState(value), delay),
    [delay]
  );

  return [state, debouncedSetState];
}

export default useDebouncedState;
