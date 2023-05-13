import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { ReactElement, useEffect, useRef } from "react";

type AppIconType = typeof AppIcon
export type DockProps = {
  children: ReactElement<AppIconType> | ReactElement<AppIconType>[]
  mouseX: MotionValue<number>;
  className?: string
}

export function Dock(props: DockProps) {
  
  return (
    <motion.div
      onMouseMove={(e) => props.mouseX.set(e.pageX)}
      onMouseLeave={() => props.mouseX.set(Infinity)}
      className={props.className + " mx-auto flex h-16 items-end gap-4 rounded-2xl bg-gray-700 px-4 pb-3"}
    >
      {props.children}
    </motion.div>
  );
}


export type AppIconProps = {
  mouseX: MotionValue,
  children: React.ReactElement,
  className?: string;
}

export function AppIcon({ mouseX, children, className }: AppIconProps) {
  let ref = useRef<HTMLDivElement>(null);
  //@ts-ignore
  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  //@ts-ignore
  let widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={className + " aspect-square w-10 rounded-full bg-gray-400"}
    >{children}</motion.div>
  );
}
