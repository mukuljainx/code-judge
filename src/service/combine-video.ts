import axios from "./axios";
import { IFormValues } from "../screens/combine-video/index";

export interface IResponse {
  video_url: string;
}

export default (body: IFormValues) => {
  return axios.post<IResponse>("/api/combine-video ", {
    width: parseInt(body.width),
    height: parseInt(body.height),
    segments: body.segments.map((row) => ({
      video_url: row.video_url,
      start: parseInt(row.start),
      end: parseInt(row.end),
    })),
  });
};
