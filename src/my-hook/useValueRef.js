import { useRef } from "react";

export default function useValueRef(params) {
  const paramsRef = useRef(null);
  paramsRef.current = params;
  return paramsRef;
}
