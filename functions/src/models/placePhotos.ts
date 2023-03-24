



export interface GooglePlacesPhotosAPIResponse {
    status: string;
    html_attributions: string[];
    photo_reference: string;
    height: number;
    width: number;
  }
  
  export interface Photo {
    reference: string;
    height: number;
    width: number;
    getUrl: (maxWidth?: number, maxHeight?: number) => Promise<string | undefined>;
  }
  