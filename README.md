# scentronix-web-interviews

This project provides a simple TypeScript application that checks if a list of URLs is online. It uses parallel requests to efficiently determine the availability of web resources. This tool is useful for monitoring the health of websites or APIs.

## Features

- Check multiple URLs in parallel for their online status. Use express as http server.
- Utilizes Promises and the `axios` API for making HTTP requests.
- Returns a list of URLs that are successfully online.
- Use Jest and MockAxios for Unit testing.

## Getting Started

### Prerequisites

- Node.js (LTS version recommended).
- A package manager like npm or Yarn.

### Usages

1. **Clone repos and install dependencies:**
   ```bash
   git clone https://github.com/hunghoxuan/scentronix-web-interviews.git
   cd scentronix-web-interviews
   npm i # or yarn install
   
2. **Customize environment variables**
   ```bash
   cp .env.sample .env
  
  Then edit variables in .env file:
   ```bash
   PORT = 3000
   REQUEST_TIMEOUT = 5000
   ```
   
   Then edit default urls src/config.ts file. This data is used for unit tests and also default Urls incase we parse empty urls on check-online-urls api (see APIs section below).
   
   ```bash
   export const urls = [
      {
     "url": "https://gitlab.com",
     "priority": 2
   },
   {
     "url": "https://github.com",
     "priority": 2
   },
   {
     "url": "http://app.scnt.me",
     "priority": 1
   },
   ];
   ```  
3. **Run server local:**
   ```bash
   npm run start # or npm run dev
   
4. **Run unit tests:**
   ```bash
   npm test

### APIs

1. **check-online-urls:**

   Method: POST 
   Body params: 
   - priority: check only urls with given priority (null: select all). 
   - urls: array of urls needed to check { url, priority }.
     
    ```bash
    curl  -X POST \
    'http://localhost:3000/check-online-urls' \
    --header 'Content-Type: application/json' \
    --data-raw '{
    "priority": null,
    "urls": [
     {
       "url": "https://does-not-work.perfume.new",
       "priority": 1
     },
     {
       "url": "https://gitlab.com",
       "priority": 4
     },
     {
       "url": "https://github.com",
       "priority": 4
     },
     {
       "url": "https://doesnt-work.github.com",
       "priority": 4
     },
     {
       "url": "http://app.scnt.me",
       "priority": 3
     },
     {
       "url": "https://offline.scentronix.com",
       "priority": 2
     }
    ]
    }'
    ```

   Response: return array of online urls.
     ```bash
     {
       "success": true,
       "online_urls": [
         {
           "url": "http://app.scnt.me",
           "priority": 3
         },
         {
           "url": "https://gitlab.com",
           "priority": 4
         },
         {
           "url": "https://github.com",
           "priority": 4
         }
       ]
     }
     ```
