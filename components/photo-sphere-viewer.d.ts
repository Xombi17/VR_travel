declare module '@photo-sphere-viewer/core' {
  interface ViewerConfig {
    transition?: {
      duration: number;
      timingFunction: string;
    };
  }

  export class Viewer {
    constructor(config: ViewerConfig);
    // Add any other methods or properties as needed
  }
} 