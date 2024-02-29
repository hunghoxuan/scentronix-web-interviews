import { checkOnlineUrls, sortUrlsByPriority } from "../src/utils/network";
import { onlineUrls, urls } from "./test-data";
import axios from "axios";

jest.mock("axios");
describe("[mock] check-online-urls", () => {
   beforeAll(() => {
      const mockedAxios = axios as jest.Mocked<typeof axios>;
      mockedAxios.get.mockImplementation(url => Promise.resolve(onlineUrls.includes(url) ? { status: 200 } : null));      
    });

   test('[mock] should return online Urls', async () => {  
      // filter urls included in onlineUrls and order expected by priority
      const expected = sortUrlsByPriority(urls.filter(url => onlineUrls.includes(url.url) ? url : null));
      console.log('expected:', onlineUrls, expected);
         
      const result = await checkOnlineUrls(urls);
      expect(result).toEqual(expected);
   });
});