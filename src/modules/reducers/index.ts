import { useDispatch, useSelector } from "react-redux";
import loginStore from "./loginStore";
import place from "./placeStore";

import { configureStore, combineReducers } from "@reduxjs/toolkit";

// 루트 리듀서
const rootReducer = combineReducers({
  loginStore,
  place,
});

// 루트 리듀서의 반환값를 유추
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 내보내줌
export type RootState = ReturnType<typeof rootReducer>;
type StateSelector<T> = (state: RootState) => T;
type EqualityFn<T> = (left: T, right: T) => boolean;

export function useRootState<T>(
  selector: StateSelector<T>,
  equalityFn?: EqualityFn<T>
): any {
  return useSelector(selector, equalityFn);
}

//configureStore를 사용해야 extraReducers 사용 가능
const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type AppDispatch = typeof store.dispatch;
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>();

// export default rootReducer;
