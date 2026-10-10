import { MotionConfig } from 'framer-motion';
import { Hero } from '../components/Hero';

/** The hero is its own React root: pre-rendered into index.html and hydrated on load. */
export function HeroRoot() {
  return (
    <MotionConfig reducedMotion="user">
      <Hero />
    </MotionConfig>
  );
}
