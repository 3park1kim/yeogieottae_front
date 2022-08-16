import { useMemo } from "react";
import { bindActionCreators } from "redux";
import { useAppDispatch, useRootState } from "../reducers/index";
import loginSession from "../reducers/loginStore";

export function useLoginActions(): any {
  const loginState = useRootState((state) => state.loginStore);

  const dispatch2 = useAppDispatch();

  const boundLoginSession = useMemo(
    () => bindActionCreators(loginSession, dispatch2),
    [dispatch2]
  );

  return {
    loginState,
    boundLoginSession,
  };
}
