import { Headers, Request, RequestMethod, RequestOptions } from "@angular/http";
import { HttpGetMultiFetchAdapter } from "../../src/adapters/http-getmultifetch-adapter";
import { HttpBatchConfiguration } from "../../src/batch-configuration";

describe("HttpGetMultifetchAdapter", () => {

  it("Can be created", () => {
    const config = new HttpBatchConfiguration({ batchEndpointUrl: "", rootEndpointUrl: "" });
    const defaultRequestOptions = new RequestOptions();
    const adapter = new HttpGetMultiFetchAdapter(config, defaultRequestOptions);
    expect(adapter).toBeDefined();
  });

  describe("batchRequests", () => {

    it("Should configure a single get batch request correctly", () => {
      const rootUrl = "https://api.abc.com/";
      const batchUrl = `${rootUrl}$batch`;
      const config = new HttpBatchConfiguration({
        batchEndpointUrl: batchUrl,
        rootEndpointUrl: rootUrl
      });
      const defaultRequestOptions = new RequestOptions();
      const adapter = new HttpGetMultiFetchAdapter(config, defaultRequestOptions);

      const requests = [new Request({ url: `${rootUrl}users`, method: RequestMethod.Get })];
      const batchRequest = adapter.batch(requests);

      expect(batchRequest).toBeDefined();
      expect(batchRequest.url).toEqual(batchUrl + "?0=users");
    });

  });
});
