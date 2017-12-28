import { Headers, Request, RequestMethod, RequestOptions } from "@angular/http";
import { HttpMultiFetchAdapter } from "../../src/adapters/http-multifetch-adapter";
import { HttpBatchConfiguration } from "../../src/batch-configuration";

describe("HttpMultifetchAdapter", () => {
  it("Can be created", () => {
    const config = new HttpBatchConfiguration({ batchEndpointUrl: "", rootEndpointUrl: "" });
    const defaultRequestOptions = new RequestOptions();
    const adapter = new HttpMultiFetchAdapter(config, defaultRequestOptions);
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
      const adapter = new HttpMultiFetchAdapter(config, defaultRequestOptions);

      const requests = [new Request({ url: `${rootUrl}users`, method: RequestMethod.Get })];
      const batchRequest = adapter.batch(requests);

      expect(batchRequest).toBeDefined();
      expect(batchRequest.url).toEqual(batchUrl + "?0=users");
    });

  });
});
