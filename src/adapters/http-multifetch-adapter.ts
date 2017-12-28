import { Headers, Request, RequestMethod, RequestOptions,
  Response, ResponseOptions, ResponseType } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { HttpBatchConfiguration } from "../batch-configuration";
import { IBatchHttpRequestAdapter } from "./batching-adapter";

export class HttpMultiFetchAdapter implements IBatchHttpRequestAdapter {

public constructor(private configuration: HttpBatchConfiguration, private defaultRequestOptions: RequestOptions) { }

public batch(requests: Request[]): Request {
  const batchRequest = new Request({
    ...this.defaultRequestOptions,
    });
  batchRequest.method = RequestMethod.Get;
  batchRequest.url = this.configuration.batchEndpointUrl + "?";

  requests.forEach((r, i) => {
    const urlParts = r.url.split("?");
    let encodedUrl: string = urlParts[0].replace(this.configuration.rootEndpointUrl, "");
    if (urlParts.length > 1) {
      encodedUrl += "?" + encodeURIComponent(urlParts[1]);
    }

    if (i > 0) {
      batchRequest.url += "&";
    } else {
      batchRequest.headers = r.headers;
    }

    batchRequest.url += i.toString() + "=" + encodedUrl;
  });
  return batchRequest;
}

public parse(response: Response): Response[] {

  const batchResponses: Response[] = [];
  const responseData = response.json();
  let dataPart: any;
  let i: number = 0;

  do {
    dataPart = responseData[i];
    if (dataPart) {
      dataPart.status = dataPart.statusCode;
      batchResponses.push(new Response(new ResponseOptions(dataPart)));
      i += 1;
    }
  } while (dataPart);

  return batchResponses;
}

}
