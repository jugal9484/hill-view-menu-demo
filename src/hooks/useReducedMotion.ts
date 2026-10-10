import { useReducedMotion as useFmReducedMotion } from 'framer-motion';

/** True when the guest has asked the OS for less motion. */
export function useReducedMotion() {
  return useFmReducedMotion() ?? false;
}
