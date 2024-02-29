import { checkOnlineUrls, sortUrlsByPriority } from "../src/utils/network";
import { urls } from "../src/config";
import axios from "axios";

jest.mock("axios");
const checkedUrls = [
   ...urls,
   { url: "https://www.googlexx.com", priority: 1 }, // random non-existing url
   { url: "https://not-exists.com", priority: 2 },
];

describe("[mock] check-online-urls", () => {
   beforeAll(() => {
      const mockedAxios = axios as jest.Mocked<typeof axios>;
      mockedAxios.get.mockImplementation(url => Promise.resolve(urls.map(item => item.url).includes(url) ? { status: 200 } : null));
   });

   test('[mock] should return online Urls', async () => {  
      const result = await checkOnlineUrls(checkedUrls);
      const expected = sortUrlsByPriority(urls);

      expect(result.length).toBe(expected.length);
      expect(result).toEqual(expected);
   });

   test('[mock] should return online Urls with priority = 1', async () => {   
      const result = await checkOnlineUrls(checkedUrls, 1);
      const expected = sortUrlsByPriority(urls.filter(url => url.priority === 1));

      expect(result.length).toBe(expected.length);
      expect(result).toEqual(expected);
   });
});