declare module '@photo-sphere-viewer/core' {
  interface ViewerConfig {
    transition?: {
      duration: number;
      timingFunction: string;
    };
  }
} 