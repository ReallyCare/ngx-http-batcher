import { Request, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

export enum WellKnownHttpBatchingAdapters {
  Http_MultipartMixed = 0,
  Http_MultiFetch
}

export interface IBatchHttpRequestAdapter {
  batch(requests: Request[]): Request;
  parse(response: Response): Response[];
}
