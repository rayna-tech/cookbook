import { motion } from "framer-motion";
import { useState } from "react";

export type Tab = {
  id: string,
  label: string
  children: React.ReactElement | React.ReactElement[]
}
export type AnimatedTabsTypes = {
  tabs: Tab[]
  tabStyles?: string
  backgroundStyles?: string
  activeTextColor?: string
}

export function AnimatedTabs({ tabs, ...props }: AnimatedTabsTypes) {
  //@ts-ignore
  let [activeTab, setActiveTab] = useState(tabs.length > 0 ? tabs[0].id : { id: "UNDEFINED TAB", label: "UNDEFINED TAB", children: <h1>Hello World</h1>});

  return (
    <div className="flex space-x-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`${props.tabStyles} ${activeTab === tab.id ?  props.activeTextColor ? props.activeTextColor : "hover:text-white/60" : ""
            } relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2`}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId="bubble"
              className={props.backgroundStyles +  " absolute inset-0 z-10 bg-black mix-blend-difference"}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
