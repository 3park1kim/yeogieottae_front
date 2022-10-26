import { useMemo } from "react";
import { bindActionCreators } from "redux";
import { useAppDispatch, useRootState } from "../reducers/index";
import loginSession from "../reducers/loginStore";

export function useLoginActions(): any {
  const loginState = useRootState((state) => state.loginStore);

  const dispatch = useAppDispatch();

  const boundLoginSession = useMemo(
    () => bindActionCreators(loginSession, dispatch),
    [dispatch]
  );

  return {
    loginState,
    boundLoginSession,
  };
}
