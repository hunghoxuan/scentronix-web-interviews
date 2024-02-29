import axios from "axios";

export interface IPriorityURL {
   url: string;
   priority: number;
}

export const checkOnlineUrls = async (urls: IPriorityURL[], priority?: number, timeout?: number): Promise<IPriorityURL[]> => {
   const checkedUrls = priority ? urls.filter(url => url.priority === priority) : urls;

   const checkUrl = async (urlEntry: IPriorityURL): Promise<IPriorityURL | null> => {
      try {
         const response = await axios.get(urlEntry.url, { timeout: timeout || 5000 });
         // detect http status code 200-299 is considered online
         if (response.status >= 200 && response.status < 300)
            return urlEntry;
         return null;
      } catch {
        return null;
      }
   };
   
   // use Promise.all to make all requests concurrently
   const results = await Promise.all(checkedUrls.map(url => checkUrl(url)));
   return sortUrlsByPriority(results.filter((result): result is IPriorityURL => result !== null));
}

// function to sort URLs by priority. Use same sort function in result and 
export const sortUrlsByPriority = (urls: IPriorityURL[]): IPriorityURL[] => {
   return urls.sort((a, b) => a.priority - b.priority);
}
