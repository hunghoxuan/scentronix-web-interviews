import { checkOnlineUrls, sortUrlsByPriority } from "../src/utils/network";
import { urls } from "../src/config";
import axios from "axios";

const checkedUrls = [
   ...urls,
   { url: "https://www.googlex.com", priority: 1 }, // random non-existing url
   { url: "https://not-exists.com", priority: 2 },
];

describe("check-online-urls", () => {
   test('should return online Urls with all priority', async () => {   
      const result = await checkOnlineUrls(checkedUrls);
      const expected = sortUrlsByPriority(urls);

      expect(result.length).toBe(expected.length);
      expect(result).toEqual(expected);
   });

   test('should return online Urls with priority = 1', async () => {   
      const result = await checkOnlineUrls(checkedUrls, 1);
      const expected = sortUrlsByPriority(urls.filter(url => url.priority === 1));

      expect(result.length).toBe(expected.length);
      expect(result).toEqual(expected);
   });
});