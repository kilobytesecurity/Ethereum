# Ethereum and Solidity: The Complete Developer's Guide (with Minor Code Updates and  Changes)

## Purpose of this Repo

Up-to-date Solidity/web3.js/React code for the udemy.com course [Ethereum and Solidity: The Complete Developer's Guide](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/).

Solidity, web3.js & React code for the course [Ethereum and Solidity: The Complete Developer's Guide] (https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/), with personal notes/comments in the code for personal explanations.

## The Reason

I've recently become very interested in the blockchain development space and so I've embarked on a journey to join this fast-evolving tech arena and learn as muchas I can. Almost immediately, I've come to realise that the development tools and packages utilised in the build-develop-deploy process of dApps (more speciffically in the Ethereum Ecosystem) all share a universal trend of updates and numerous changes/iterations of the respective releases.  

## Repository structure

This repository was created as monorepo so as to keep the updated versions of the different parts of the course's code and tests well organized all within a single repository.

### Smart Contracts

The smart contracts created in the course are:

- [The Inbox Contract](/inbox/contracts/Inbox.sol)
- [The Lottery Contract](/lottery/contracts/Lottery.sol)
- [The CampaignFactory and Campaign contracts](/kickstart/ethereum/contracts/Campaign.sol)

## The UI - React & Next

The course sections that cover building out a front-end application using React make use of outdated versions of [_Create React App_](https://create-react-app.dev) and [_Next.js_](https://nextjs.org).

For a detailed methodology of the new and recommended approach to globally install, see [https://create-react-app.dev/docs/getting-started](https://create-react-app.dev/docs/getting-started).

### The lottery-react App

- [lottery-react App code files](/lottery-react)
- [Live Demo of the app](https://lottery-react.kilobytesecurity.com/) 

### The Kickstart/CrowdCoin App

- [Browse the CrowdCoin app code files](/kickstart)
- [Live Demo of the app](https://kickstart.kilobytesecurity.com/)

## Acknowledgement

All credit goes to [Stephen Grider](https://www.udemy.com/user/sgslo/) for creating the [excellent course](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/) for which I created this repository as my own personal add-on. If any mistakes or errors are found within any of this repository's content they should be attributed to an oversight on my part, and in no part should be deemed any fault of the Udemy course author, Stephen Grider.