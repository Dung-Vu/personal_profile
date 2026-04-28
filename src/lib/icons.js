import {
  Bot,
  Cable,
  Code2,
  Gauge,
  LayoutDashboard,
  PanelTop,
  ScanSearch,
  SearchCheck,
  Workflow,
} from "lucide-react";

export const iconMap = {
  api: Cable,
  automation: Bot,
  build: Workflow,
  code: Code2,
  dashboard: LayoutDashboard,
  layout: PanelTop,
  scan: ScanSearch,
  verify: SearchCheck,
};

export const fallbackIcon = Gauge;
