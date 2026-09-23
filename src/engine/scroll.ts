import { Caption } from '@/types/story';

export const computeSceneLayout = (captions: Caption[]) => {
  const getCaptionVH = (text: string) => Math.max(0.6, 0.105 * text.trim().split(/\s+/).length);
  
  let totalVH = 0;
  const mappedCaptions = captions.map((cap, idx) => {
    const vh = getCaptionVH(cap.text);
    const breath = ((idx + 1) % 3 === 0) ? 1.2 : 0;
    const startVH = totalVH;
    totalVH += vh + breath;
    return { cap, startVH, vh, breath };
  });

  // Minimum scene length
  const L_i = Math.max(1.5, totalVH);
  
  const finalMapped = mappedCaptions.map(l => ({
    ...l,
    progressStart: l.startVH / L_i,
    progressEnd: (l.startVH + l.vh) / L_i,
    progressMid: (l.startVH + l.vh / 2) / L_i
  }));

  return { L_i, mappedCaptions: finalMapped };
};
