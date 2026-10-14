import { content } from "./content.mjs";

export const initialState = {track:"executive", step:0, notes:false, present:false, hiddenByTrack:{}};

export function validateState(value) {
  if (!value || typeof value !== "object") throw new Error("Invalid presentation state.");
  const track = content.tracks.find(t => t.id === value.track);
  if (!track || !Number.isInteger(value.step) || value.step < 0 || value.step >= track.steps.length ||
      typeof value.notes !== "boolean" || typeof value.present !== "boolean") {
    throw new Error("Invalid presentation track, step or display settings.");
  }
  const hiddenByTrack = value.hiddenByTrack ?? {};
  if (typeof hiddenByTrack !== "object" || Array.isArray(hiddenByTrack) || hiddenByTrack === null) {
    throw new Error("Hidden slides must be grouped by journey.");
  }
  const hidden = {};
  for (const [id, slides] of Object.entries(hiddenByTrack)) {
    const journey = content.tracks.find(t => t.id === id);
    if (!journey || !Array.isArray(slides) || new Set(slides).size !== slides.length ||
        slides.some(sid => !journey.steps.some(step => step[0] === sid))) {
      throw new Error("Invalid hidden slides for this journey.");
    }
    if (slides.length === journey.steps.length) throw new Error("Keep at least one slide visible in each journey.");
    hidden[id] = [...slides];
  }
  const visible = track.steps.map((step, index) => ({step, index}))
    .filter(({step}) => !(hidden[track.id] ?? []).includes(step[0]));
  const step = value.present && !visible.some(item => item.index === value.step)
    ? (visible.find(item => item.index >= value.step) ?? visible[0]).index : value.step;
  return {track:value.track, step, notes:value.notes, present:value.present, hiddenByTrack:hidden};
}
