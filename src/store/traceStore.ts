import { create } from "zustand";
type UIState = {
  activeSpan: string;
  selectedSkill: string | null;
  selectedProject: string | null;
  setActiveSpan: (id: string) => void;
  setSelectedSkill: (id: string | null) => void;
  setSelectedProject: (id: string | null) => void;
};
export const useTraceStore = create<UIState>((set) => ({
  activeSpan: "hero",
  selectedSkill: null,
  selectedProject: null,
  setActiveSpan: (activeSpan) => set({ activeSpan }),
  setSelectedSkill: (selectedSkill) => set({ selectedSkill }),
  setSelectedProject: (selectedProject) => set({ selectedProject }),
}));
