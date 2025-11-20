"use client";

import { useGateValue } from "@statsig/react-bindings";

export function useStatsigFeatures() {
  const load_beta_tabs = useGateValue("load_beta_tabs"); 

  return {
    load_beta_tabs,
  };
}
