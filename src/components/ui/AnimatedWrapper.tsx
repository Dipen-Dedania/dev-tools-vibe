'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedWrapperProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  animation?: 'fade' | 'slide-up' | 'scale' | 'none'
  delay?: number
}

const animations = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  'slide-up': {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  none: {
    initial: {},
    animate: {},
    exit: {},
  },
}

export function AnimatedWrapper({
  children,
  animation = 'fade',
  delay = 0,
  ...props
}: AnimatedWrapperProps) {
  const animationVariants = animations[animation]

  return (
    <motion.div
      initial={animationVariants.initial}
      animate={animationVariants.animate}
      exit={animationVariants.exit}
      transition={{
        duration: 0.3,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom easing
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface StaggeredListProps {
  children: ReactNode[]
  staggerDelay?: number
}

export function StaggeredList({ children, staggerDelay = 0.05 }: StaggeredListProps) {
  return (
    <>
      {children.map((child, index) => (
        <AnimatedWrapper key={index} animation="slide-up" delay={index * staggerDelay}>
          {child}
        </AnimatedWrapper>
      ))}
    </>
  )
}
