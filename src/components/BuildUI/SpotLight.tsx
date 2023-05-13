import { MotionValue, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

export type SpotlightProps = {
  mouseX: MotionValue<number>,
  mouseY: MotionValue<number>,
  children: React.ReactElement | React.ReactElement[],
  spotLightColor?: [number, number, number, number],
  backgroundStyles?: string;
  innerStyles?: string
}
export default function SpotLight({ mouseX, mouseY, children, spotLightColor, ...props}: SpotlightProps) {
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={props.backgroundStyles + " group relative max-w-md rounded-xl border border-white/10 bg-gray-900 px-8 py-16 shadow-2xl"}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className={props.innerStyles + " pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"}
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(${(spotLightColor || [255,255,255,0.18]).join(",")}),
              transparent 80%
            )
          `,
        }}
      />
      <div>
        {children}
      </div>
    </div>
  );
}
