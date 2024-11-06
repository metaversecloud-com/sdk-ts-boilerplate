# README Template

Please update the following in each of your SDK application.

## Introduction / Summary

This boilerplate is meant to give you a simple starting point to build new features in Topia using our Javascript SDK. Please reference the [documentation](https://metaversecloud-com.github.io/mc-sdk-js/index.html) for a more detailed breakdown of what the SDK is capable of and how to use it!

## Key Features

### Canvas elements & interactions

- Key Asset: When clicked this asset will open the drawer and allow users and admins to start interacting with the app.

### Drawer content

- How to play instructions
- Leaderboard
- Admin features (see below)

### Admin features

_Does your app have special admin functionality? If so your key features may looks something like this:_

- Access: Click on the key asset to open the drawer and then select the Admin tab. Any changes you make here will only affect this instance of the application and will not impact other instances dropped in this or other worlds.
- Theme selection: Use the dropdown to select a theme.
- Reset: Click on the Reset button to clear the active game state and rebuild the game board in it's default state.

### Themes description

- Winter (default): A snowy theme that when selected will drop snowflakes throughout the scene
- Spring: A garden theme that when selected will drop flowers throughout the scene

### Data objects

_We use data objects to store information about each implementation of the app per world._

- Key Asset: the data object attached to the dropped key asset will store information related to this specific implementation of the app and would be deleted if the key asset is removed from world. Example data:
  - isResetInProgress
  - lastInteraction
  - lastPlayerTurn
  - playerCount
  - resetCount
  - turnCount
- World: the data object attached to the world will store analytics information for every instance of the app in a given world by keyAssetId and will persist even if a specific instance is removed from world. Example data:
  - gamesPlayedByUser (`keyAssets.${assetId}.gamesPlayedByUser.${profileId}.count`)
  - gamesWonByUser (`keyAssets.${keyAssetId}.gamesWonByUser.${profileId}.count`)
  - totalGamesResetCount (`keyAssets.${assetId}.totalGamesResetCount`)
  - totalGamesWonCount (`keyAssets.${assetId}.totalGamesWonCount`)

## Developers:

### Built With

#### Client

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

#### Server

![Node.js](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/express-%23000000.svg?style=for-the-badge&logo=express&logoColor=white)

### Getting Started

- Clone this repository
- Run `npm i` in server
- `cd client`
- Run `npm i` in client
- `cd ..` back to server

### Add your .env environmental variables

```json
API_KEY=xxxxxxxxxxxxx
INSTANCE_DOMAIN=api.topia.io
INSTANCE_PROTOCOL=https
INTERACTIVE_KEY=xxxxxxxxxxxxx
INTERACTIVE_SECRET=xxxxxxxxxxxxxx
```

### Where to find API_KEY, INTERACTIVE_KEY and INTERACTIVE_SECRET

[Topia Dev Account Dashboard](https://dev.topia.io/t/dashboard/integrations)

[Topia Production Account Dashboard](https://topia.io/t/dashboard/integrations)

### Helpful links

- [SDK Developer docs](https://metaversecloud-com.github.io/mc-sdk-js/index.html)
- [View it in action!](topia.io/appname-prod)
- [Notion One Pager](https://www.notion.so/topiaio/6257c74f9532449b842cfe557975c826?v=8cdffb024588478caeee0cecb8989e82&pvs=4)
- To see an example of an on canvas turn based game check out TicTacToe:
  - (github))[https://github.com/metaversecloud-com/sdk-tictactoe]
  - (demo))[https://topia.io/tictactoe-prod]
