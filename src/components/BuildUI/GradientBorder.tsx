import { CSSProperties } from "react";

export type GradientBorderTypes = {
  children: React.ReactElement | React.ReactElement[]
  bgColor?: string
  backgroundColor?: string
  borderColor?: string,
  className?: string
}

export function GradientBorder(props: GradientBorderTypes) {
  return (
    <div
      style={
        {
          "--dark-purple": `${props.backgroundColor ? props.backgroundColor : "4 6 22"}`,
          "--light-purple": `${props.borderColor ? props.borderColor : "120 119 198"}`,

          "--bg-color":
            "linear-gradient(rgb(var(--dark-purple)), rgb(var(--dark-purple)))",
          "--border-color": `linear-gradient(145deg,
            rgb(var(--light-purple)) 0%,
            rgb(var(--light-purple) / 0.3) 33.33%,
            rgb(var(--light-purple) / 0.14) 66.67%,
            rgb(var(--light-purple) / 0.1) 100%)
          `,
        } as CSSProperties
      }
      className={props.className + " flex aspect-[2/1] w-full max-w-md flex-col items-center justify-center rounded-xl border border-transparent p-8 text-center [background:padding-box_var(--bg-color),border-box_var(--border-color)]"}
    >
      {props.children}
    </div>
  );
}
