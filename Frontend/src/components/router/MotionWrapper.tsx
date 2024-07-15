import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

interface ChildrenProps {
  children: JSX.Element
  classname?: string
}

export default function MotionWrapper({ children, classname }: ChildrenProps) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-100%', opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={classname}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
