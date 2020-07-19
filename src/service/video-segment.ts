import axios from "./axios";
import { SettingType } from "../interfaces/index";

export interface IResponse {
  interval_videos: Array<{
    video_url: string;
  }>;
}

export default (video_link: string, setting: SettingType, options: any) => {
  switch (setting) {
    case "interval-duration": {
      return axios.post<IResponse>("/api/process-interval", {
        video_link,
        interval_duration: parseInt(options.interval_duration, 10),
      });
    }
    case "range-duration": {
      return axios.post<IResponse>("/api/process-range", {
        video_link,
        interval_range: options.range.map((row: any) => ({
          start: parseInt(row.start, 10),
          end: parseInt(row.end, 10),
        })),
      });
    }
    case "number-of-segments": {
      return axios.post<IResponse>("/api/process-segments", {
        video_link,
        no_of_segments: parseInt(options.no_of_segments, 10),
      });
    }
  }
};
