import { checkOnlineUrls, sortUrlsByPriority } from "../src/utils/network";
import { onlineUrls, urls } from "./test-data";
import axios from "axios";

describe("check-online-urls", () => {
   test('should return online Urls', async () => {
      // filter urls included in onlineUrls and order expected by priority
      const expected = sortUrlsByPriority(urls.filter(url => onlineUrls.includes(url.url) ? url : null));
      console.log('expected:', expected);
   
      const result = await checkOnlineUrls(urls);
      expect(result).toEqual(expected);
   });
});