# Dapponics Verifier Google Chrome Extension

#### Video Demo: https://www.youtube.com/watch?v=1X1otn1_WWk

#### Description: Google Chrome extension that verifies Ethereum NFT smart contracts

**Summary:**

Dapponics Verifier is a tool that tells you if the NFT you are watching is legit or is a scam.
This extension analizes contracts from Ethereum NFTs and provides relevant data about them.
With Dapponics Verifier you have now an extra layer of protection when you are going to buy a NFT.
You can also use it any time you want to access to more information about your favourite NFTs.
This extension works for every NFTs in the Ethereum blockchain and in every platform, such as opensea.io, looksrare.org, sudoswap.xyz, rarible.com, mintable.app, superrare.com, and so on.

Dapponics Verifier extension is able to, with just one click, show the user the following data about the Ethereum NFT the user is watching:

1. The name of the NFT colection.
2. The token standard of thet collection.
3. The total supply of the collection.
4. The current number of holders of the collection's NFT.
5. The total number of transfers.
6. The amount of NFTs the biggest holder (Top Whale) has.
7. Time since the last transaction.
8. Time since the contract from this collection was deployed.
9. A clickable link to the Website of the collection.
10. A clickable link to the Twitter of the collection.
11. A clickable link to the Discord of the collection.
12. A clickable link to the Opensea page of the collection.
13. The contract of the colection.

Dapponics Verifier provides feedback to the user for every posible situation:

1. If the extension couldn't find a contract on the URL, it shows _"Couldn't find any contract on this page"_.
2. If the extension finds a contract in the URL, it shows _"Results are coming, wait for 10 seconds"_.
3. If the API request is unsuccessful because the server is down, it shows _"We found a problem, try again later"_.
4. If the .json coming from the API is empty, it shows _"We found a problem, try again later"_.
5. If the server receives a wrong request, it shows _"error: send a real contract"_
6. If the data received contain unexpected values, it shows _"⚠️This contract is suspicious \n If is an Ethereum NFT, might be a scam"_, meaning is a scam or not Ethereum.

To gather all the data from every request I built my own dynamic API server:
When the server receives a request, if the request is correct scans four _(4)_ diferent webpages.
In each webpage, scraps the relevant data values.
By try and catching every action it gathers as much data pairs as possible in a dictionary.
After filtering and cleaning the data sends it to the client as json.
The total processing time takes around _8 seconds_.

_**Development process (long reading)**_

**Introduction:**

Recently there are so many good projects in the crypto world, building great applications on top of the blockchain with web3 technologies. Users now can benefit from real digital ownership with NFTs and other tokens, and this trend is constantly growing and expanding.

Nevertheless, nowadays is very common to be surrounded by hackers and scammers in the space who will try to make users fall into phishing and other kind of social engineering techniques in order to steal their money.

For this reason is crucial for the user to verify everything whenever a transaction is going to be made in order to ensure a safe and successful transaction.

The problem is that verifying contractsis is increasingly difficult for many, specially for the new users. Verifying contracts require some knowhow and experience an also can be a boring and tedious process if someone needs to do it recursively.

Usually higher security is synonim of uncomfort and roughness in the user experience. The goal of this project is helping the user to increase safety and protection while mantaining a comfortable experience and an easy and intuitive interface.

As the biggest programmable blockchain and the prefered by the majority of the users is Ethereum, The focus the efforts of this project will be to add this functionality for the Ethereum ecosystem.

**Initial usecase concepts:**

For NFTs (ethereum):
An user that is navigating in Opensea (a popular NFT marketplace) might want to check the information about a contract. Instead of going to etherscan or another blockchain explorer, could simply open "Dapponics Verifier Google Chrome Extension" and paste there the contract adress. Then by the use of APIs the extension the extension will reveal many of the information of the contract such as date of deploy, type of token, name of token, number of holders, number of supply or number of transactions. Also it will provide some hypertects linking to etherscan or other relevant sources so user can go directly and easily to the source and find the information quickly.

For ERC20 tokens (ethereum):
An user who is going to use uniswap might want to trade some tokens to others, if the token has low market capitalization (and also if not) is important to verify the contract adress of the token because there are many tokens with the same name, for this purpose someone would just go to other webpage such as coingecko or coinmarketcap where many projects are listed and copy the adress to paste it on uniswap. "Dapponics Verifier Google Chrome Extension" could make this process easier if you can direcly get extra information about any token in the same page in a more userfriendly way.

For wallets (ethereum):
Introducing a wallet adress could give you few information about when the first and last transaction was, current holding in eth and tokens.

The idea is achieve this goals with APIs connected to webpages such as etherscan, in this project I won't tackle any pure web3 taks involving solidity or direct communication with the blockchain.

**How to develop this project**

First I need to learn how to create a google extension

Second I need to decide what is the best logic and arquitecture. Example: there is a blank box where the user can paste any contract and when they do the extension will show them extra information and provide some links to the source of this info.
(Can the information display when hovering over a contract? I need to discover that kind of inputs)

The extension must categorize what kind of input it is and then decide where to look for the information, then bring it to the user and display it.

Third I need to find the APIs and organize the data flow. https://etherscan.io/apis could be the solution.

Lastly I need to make a good UX/UI givind some design and style to the extension.

**Notes v1.0**

I'm considering only specializing on NFTs, the idea is the following, when I'm in opensea, looksrare, sudoswap, universe or other marketplace, I want my extension to give me all this information about the NFT I'm watching.

```
Token tracker: CollectionName
Total Supply: 10000
Number of Holders: 4000 (40%)
*Biggest Whale: 400 (10%)
*Deploy date: 3/20/2022
*Last tx: 5 minutes ago
Number of transfers: 12000

Website: collection.io
Twitter: twitter.com/collection
Discord: discord.com/collection
Opensea: opensea.asdfasdfasdffasdf...
Etherscan: etherscan.asdfamasdfasd...
```

To do that my extension needs to do the following steps:

_(0)_(while the token is not found then just display).

```
contract not found
```

_(1)_ Know the page I'm in and from the URL.
https://opensea.io/assets/ethereum/_
https://sudoswap.xyz/#/browse/buy/_
etc...

_(2)_ take the contract adress (0xA1b2C...).

_(3)_ Then call the etherscan api and ask for the information giving the adress as input.

_(4)_ When the information is received.

_(5)_ organize the data.

_(6)_ The extension shows a notification on the icon.

_(7)_ when click in the extension displays all the information in a pop up.

**Notes v2.0**

Extension permissions:
I want the extension to use the less permisions possible, for this reason I will only use "activeTab" instead of "tabs" as permission in the manifest.json.
This way, then the user click in the extension it will get the information from the current tab and then when the tab is closed or the user do other thing our extension will become passive again. No need to keep track of everything happening on the browser all the time.

Script Injection:
For the design of this extension I want to chose to display the information in a popup or popover, instead of manipulate the dom and customizing the interface with the information I want to display. Not injecting scripts is another layer of trust for our extension.
For this reason the logic of this extension will be in backgroind.js as service worker in the background and we dont need contentScript.

Popup:
popup.htm will be our UI.

Regex:
When I get the current URL I need to find a pattern corresponding with the contract address, I will use regex to find the pattern and then save the contract adress in a variable if found.

Async:
Sending querys is asyncronous so I need to learn how to wait until I have the data I need in my variables so I can use them. Same for calling the API later.

Errors:
I need to have some way to catch all the errors for the situations where the URL does not contain a contract address or the user wants to use the extension in other websites.

Problem with the apis:
I found the APIs that I need for receive the data with the information of the collection...
For Name, Supply and SNS https://docs.etherscan.io/api-endpoints/tokens#get-token-info-by-contractaddress
And for the number of holders and biggest holder https://docs.etherscan.io/api-endpoints/tokens#get-token-holder-list-by-contract-address
But there is a big problem, this API is not free and they charge minimum 200$ per month :( so I need to figure out how to work around that.
Possibly the solution to this issue is using a Web Scrapper selecting the information I need from their webpage.

Web Scrapping:
After researching I found a library by Google called Puppeteer, I will need to use node.js as backend so we add another layer of dificulty to the project.

Backend:
Now I need to figure out how to use node, how to manage the backend and also where to host it later.

**Notes v2.5**

Design Changes:
Web Scraping takes longer time than call an API, so it makes much more sense to start processing the logic whenever a new tab is opened instead of doing what I was doing, which is start the program when the extension is opened.
This implies change the design in two different areas. First I'm forced to ask for more permisions than activeTab :( , I need "tabs" so I can get my extension ready to deliver as soon as posible. Second, I need to move my logic from popup.js to background.js becasuse since now I will have access to the tabs I dont need to interact with the extension in order to receive the information I need to display, I will only click over the extension to just open the popup already rendered.

Process Flow:
_(1)_ Background.js reads the URL and gets the contract, if !contract displays default.
_(2)_ index.js receives the contract string and scraps the specific etherscan pages to get the data we need.
_(3)_ background.js receives the data and updates both popup.html and css.html (also showns notification icon in the extension).

Aditional notes:
//I need to learn node.js and Puppeteer library
//Almost everything is asyncronous so I need to be mindful about it.
//The idea is optimize this processes in order to render the popup as fast as possible.
//From now on, if I need to call any API it will be a good practise to store the apyKey value in the backend for safety.
//apparently popup.js is not very important for this app since the user won't interact with the popup other than clicking the SNS urls.
//apparently contentScript.js is also not very important because I won't manipulate the dom, everything will be in the popup.

**Notes v3**

API creation:
I made progress with the web scrapping and I'm able to make a dictionary with all the data I need. But this is in node.js, in the backend. Now I have to find the way to keep the server active and listening for a request with the contract, and after scrapping the web I need to send a json to the extension's background.
So it seems that the whole function of this backend is to work as an API.
This also means this project is two different projects at once: The API side independently and the extension side as I was already doing.
I'm going to use a framework called Express to have a RESTful API
Also I'm going to make sure all the possible errors are handled properly through try-catch for every query.
The data is a dict and I think it needs to be parsed as JSON.
I wonder now where can I host the API to have a server always up available anytime to be called.

**Notes v4**

API fetch from background.js:
Now background.js can call any api via async await fetch. I made a function called apiCall() that takes the contract as argument and returns the data received from the api (or an error message is fetching the api failed).
I tested with other APIs becasue my api gave me CORS error. Correct apis gave back a succesful return of the data while broken url gave back the error message as a catch.

API CORS:
To solve this cors policy errors I had to update my api with cors library and give cors access to any origin.

Bug Fixes:
The main function now calls the api only one time instead of 7 every time. The reason this bug happened is because it started everytime an update occured in a tab, so while loading it called the api multiple times. To solve it I made a conditional that expects the status of the tab to be completely loaded, and then when is fully loaded I can continue the rest of the program.

Functions and abstraction:
Inside the main function in background.js there were a lot of stuf inside if conditionals so I decided to group every action and encapsulate them as independent functions. This way the main function will call the other functions to require smaller tasks from each of them. This way my code looks way cleaner and more tidy.

Data management:
I need to filter the data from the api and make it cleaner and more useful.

Update HTML from popup.html:
I made the loop that will iterate over the filtered data and will append new childs in the HTML.

New design Issue:
On one side I have background calling the api and reveiving the data ; on the other side I have popup.js able to loop over the data and append the info in hte popup UI.
The problem is that popup.js can not acces to the data variable fom background.js.
I could call the api from the popup but if I do it will take longer time to load because it starts loading when I click the extension (or can I do everything in popup.js?).
The extension works well only when the extension is opened. But it fails to work as intended (loading the data and showing a notification even before clicking the extension).

Design improvement:
getContract() takes an url as argument and if the urls doesnt match with the pattern then returns null.
updateHTML() takes the data as argument and loops through it appending a new div per data element, when data is empty displays error message.
The extension logic moved from background.js to popup.js expecting this way to connect all the functions related with the data from the api and the functions related with updating the popup.
statusCheck() takes the contract and the dataElement as arguments and modify the dataElement depending on the status, this way we provide feedback and guidance to the user in a more friendly interface.

Big Design change:
To improve the performance of this extension it now fires when the extension is clicked, and provide feedback to the user.

1. If the tab does not contain a contract in the URL, it displays "Couldn't find any contract on this page".
2. If the url has a contract it displays "Loading...".
3. If it has a contract but the data is not available it displays "We found a problem, try again later".
4. If contract and data are successful then it displays the data.

**Notes v5**

Style:
By styling the popup I realised I need to filter the data in order to display it beautifully, that's how in the function updateHTML I added a few conditionals to sort the data and append each kind of data to a different div.
I used Figma for designing a beautiful UI, once I was happy with the result I tried to mimic that design in the popup.css style sheet.

Design Improvements:
Links are now shown in the popup but I had to add click event listener to make them usefull to the user.
While upgrading the updateHTML function I realised I had to use other filters to hide the data in case is not clean or buggy. SNS are now also filtered correctly and only the ones with links are shown.
Contracts with strange data are filtered now with a message saying "⚠️This contract is suspicious".
Event listener added so the links can be opened in a new tab on click.
Cleaned all the cose by using sintactic sugar.
The banner of the extension now redirects to dapponis.io, my startup.

API data successfully filtered:
I finally completed to successfully deliver the last three of the difficult data to reach, wich is the Top Whale, the Last Transaction and the Deploy Date.
To do it I had to use the web scrapper intensely and carefull selecting the elements from the dom and moving from one page to another to scan the dom elements.
The response time of the API got way slower. I doubled the waiting time for the API. But that's the trade off for having high quality and important data in the extension.

API now headless:
I found a library called "puppeteer extra plugin stealth" that allows me to set my API headless and yet avoid the detenction from etherscan.io. Great improvement in the Server side to optimise performance.

**Notes v6**

Extension Purpose:
Dapponics Verifier is a tool that tells you if the NFT you are watching is legit or is a scam.
This extension analizes contracts from Ethereum NFTs and provides relevant data about them.
With Dapponics Verifier you have now an extra layer of protection when you are going to buy a NFT.
You can also use it any time you want to access to more information about your favourite NFTs.
This extension works for any platform: opensea.io, looksrare.org, sudoswap.xyz, rarible.com, mintable.app, superrare.com etc...

Extension Summary:
Dapponics Verifier extension is now able to, with just one click, show the user the following data about the Ethereum NFT the user is watching:
_(1)_ The name of the NFT colection.
_(2)_ The token standard of thet collection.
_(3)_ The total supply of the collection.
_(4)_ The current number of holders of the collection's NFT.
_(5)_ The total number of transfers.
_(6)_ The amount of NFTs the biggest holder (Top Whale) has.
_(7)_ Time since the last transaction.
_(8)_ Time since the contract from this collection was deployed.
_(9)_ A clickable link to the Website of the collection.
_(10)_ A clickable link to the Twitter of the collection.
_(11)_ A clickable link to the Discord of the collection.
_(12)_ A clickable link to the Opensea page of the collection.
_(13)_ The contract of the colection.

Extension's Feedback Sumary:
_(1)_ If the extension couldn't find a contract on the URL, it shows _"Couldn't find any contract on this page"_.
_(2)_ If the extension finds a contract in the URL, it shows _"Results are coming, wait for 10 seconds"_.
_(3)_ If the API request is unsuccessful because the server is down, it shows _"We found a problem, try again later"_.
_(4)_ If the .json coming from the API is empty, it shows _"We found a problem, try again later"_.
_(5)_ If the server receives a wrong request, it shows _"error: send a real contract"_
_(6)_ If the data received contain unexpected values, it shows _"⚠️This contract is suspicious"_, meaning:
A - There is something suspicious about the contract, with a very high probability is a scam.
B - Contract is not an NFT or from the Ethereum blockchain.

Server Summary:
When the server receives a request, if the request is correct searches four _(4)_ diferent webpages.
In each webpage, scraps the relevant data values.
By try and catching every action it gathers as much data pairs as possible in a dictionary.
After filtering and cleaning the data sends it to the client.
The total processing time takes around _8 seconds_.

Known Issues:
(Fixed: read Notes v6.5) The links from Website, Twitter, Discord and Opensea might be buggy for edge cases e.g. very small NFT collections.
Data can give an abnormal reading when using the extension out of its scope e.g. some ERC-20 tokens, we expect the user to not misuse the tool.

Next Steps:
-Hosting the API online.
-Publishing the extension in Chrome Store.

**Notes v6.5**

Bug Fixes:
The server now detects the exact name of the SNS and sends always the right names for every case.
In the client the function updateHTML() has now a big pool of social networks to handle diverse incoming data.
Edge cases are covered now and the SNS displayed always work as expected.

CSS styles are now more curated and I'm very happy with the result.

Went through the code of every file optimizing here and there and adding sintactic sugar.

**Notes v7**

Code Improvements:
Function statusCheck() replaced for eficiency.
Change of the names of the funcitons to look cleaner.
Adding more sintactic suggar.

Feedback Improvement:
When the contract is suspicious, the extension asks the user "⚠️This contract is suspicious \n If is an Ethereum NFT, might be a scam" to let them two things: First, that if the contracts is from the ethereum blockchain it looks very scammy. Second, that searching for contracts out of the scope of this extension could be the reason of this output.

Github Repository:
Created a repository on github with every file except the "node_modules" folder from the server because is too heavy and I foundout many developers use.gitignore for that folder, so I did.
