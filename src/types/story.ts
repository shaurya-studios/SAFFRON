export interface Caption {
  text: string;
  mode: 'fade-up' | 'lurch' | 'shout' | 'typewriter' | 'glitch';
  start: number;
  speaker?: string;
  trauma?: number;
  sound?: string;
}

export interface Scene {
  id: string;
  name: string;
  captions: Caption[];
}

export interface Story {
  id: string;
  title: string;
  signalColor: string;
  accentColor?: string;
  scenes: Scene[];
}
