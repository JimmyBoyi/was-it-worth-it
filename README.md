# Was it worth it?
A real-time data tracking platform exposing the psychological gap in gambling by pairing Server-Sent Events (SSE) with automated loss-tracking analytics.

> **Why this exists:** *Gambling is an issue that many people face in their life one problem is that wins overshadow losses with dopamine hits. When your career loss is tracked a better perspective may be won and hopefully work as a deterrent.*

<img width="800" height="540" alt="Roulette" src="https://github.com/user-attachments/assets/f5debef9-baa1-4c88-bfba-3dba5986211d" />

## Quick Overview

### Tech Stack:

* Frontend: React, Vite, TypeScript, Tailwind CSS, AnimeJs

* Backend: Node.js, Express, TypeScript, Zod

* Database & Tools: PostgreSQL, Prisma ORM, Server-Sent Events (SSE), Docker, ESLint


### Core Technical Features:

* Real-time global statistics streamed instantly via Server-Sent Events (SSE).

* Full-stack TypeScript implementation ensuring end-to-end type safety, further strengthened with Zod.

* Optimized database tracking and event aggregations.


### Core Application Features:

* Draggable roulette chips
* Roulette table to bet on
* Multiple bets with one spin
* Global profit tracked
* Current session profit tracked (Not to localstorage)
* History of spins of the current session



### Installation & Setup:

Follow these steps to clone the repository, spin up the local PostgreSQL database, and launch both the frontend and backend simultaneously.

### 1. Clone the Repository
```bash
git clone https://github.com/JimmyBoyi/was-it-worth-it.git
```
run all the following commands directly in the root of the cloned project.
### 2. Install Dependencies
```bash
npm install
```
### 3. Start the database in a docker container
```bash
docker compose up -d
```
### 4. Push the prisma schema to the database
```bash
npx prisma db push
```
### 5. Start the application
```bash
npm run dev
```
Any issues getting it to run? Send me an email!

## Troubles and Solutions
### Loss tracking
The first trouble while planning the poject was how to keep track of the loss a user has accumulated without using a login and how to persist it after a login.   
> *The solution has not yet been implemented but the plan is to locally store a uuid and create all the database entries of this user with the uuid. upon successful login through the planned github OAuth if a uuid is present a change request will be sent to the backend and all database entries with this uuid will be changed to the new user*

### WinTypes and Colour
Planning the structure of a field on the roulette wheel the question was how to keep track of all the possible wintypes for a single number? the number 7 for instance is "odd", "red", "1 to 18", "first 12", "first column" and the number 7 itself.
> *As a solution I decided to create the rouletteWheel which contains an array of RouletteField. Each field contains a number and an array of WinTypes. This way one can simply check if the array.contains() the WinType that was bet on.*

### Each number as a WinType
Considering that each number from 0 to 36 is also a "Wintype" the question arises if to add each of them to the enum which is ofcourse senseless.
> *Instead it was decided that a spin request gives a string as the type whereas if it converts to a number it was a bet on the number and if not then the string is the WinType enum.*

### Global "profit" update
I had not yet handled information which needed to be updated on every client regardless of whether that client performed an action such as the global profit updating.
> *After some research SSE was chosen to fullfill this role. Each client connects to the endpoint to register for the SSE and upon doing so a push to each client is performed to ensure the data is present whent the page is first loaded. After this every spin on the roulette table triggers another update to every registered client.*

### Upgrading the visuals
Selecting the field to bet on and typing the amount of money to bet is very unappealing and does not allow for multiple bets with one spin.
> *I believed it the best solution to have a roulette table display on the page and chips that you can place via drag and dropping. This allows for multiple bets at the same time as well as a total limit for each bet which has been set to 40$ to avoid a muddied global profit by bets that are too high. To accomplish this AnimeJS was used to create draggable chips which upon spinning the wheel check their overlap with all fields on the roulette table to find out which field they overlap the most and add this to the bets.*


### Minimise roulette table code
Creating all the possible fields necessary within the RouletteTable.tsx would bloat the file and make it less readable.
> *To minimise the rouletteTable after some research a layout file was created. This was simply an array of ZoneData a custom interface with all the data necessary to create a BettingZone (custom react component for the fields of the roulette table). Now the RouletteTable.tsx only requires to loop over each field and create a BettingZone.*
``` Typescript
<div id="roulette-table" className="grid grid-cols-14 gap-2 bg-emerald-950 p-4 rounded-xl border-2 border-emerald-500 w-[1300px] h-[400px] select-none">
    {layoutFields.map((field) => (
        <BettingZone
            key={field.type}
            type={field.type}
            label={field.label}
            className={`flex items-center justify-center text-sm font-bold border-2 border-emerald-400/30 rounded transition-all duration-150 ${field.gridClass} ${field.bgClass}`}
            ref={el => { zoneRefs.current[field.type] = el; }}
        />
    ))}
</div>
```
### Making the spin wheel dynamic
For the sake of future additions the wheel will be reused and should be dynamic for this purpose.
> *As a solution a similar approach was used to the roulette table code. A WheelConfig is loaded into the component and this determines the structure of the wheel.*

### New Technologies
This was my first time using Prisma and Zod and I’m definitely going to be relying on them for future projects.
Prisma made setting up the database and writing queries incredibly straightforward. Having full type-safety and auto-complete right inside the IDE made interacting with the database much smoother. Zod on the other hand, made sure that the data moving between the frontend and the backend was completely validated and safe.
Looking back to when I first started learning JavaScript during my apprenticeship and comparing that to where I am now with these tools is amazing. Seeing everything lock together with strict type safety is incredibly satisfying and fun.

## Planned future Additions
* Layout improvements for Mobile (currently unusable).
* Login using Github OAuth to keep permanent track of losses.
* Expanding tracking models to analyze dark patterns and gamified micro-transactions (such as video game loot boxes) that mimic gambling mechanics for younger audiences.


## Architecture:
```
.
├── README.md
├── apps
|   |
|   | (BACKEND)
|   |
│   ├── api
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── prisma
│   │   │   ├── migrations
│   │   │   │   ├── 20260610125228_init
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20260610151859_init
│   │   │   │   │   └── migration.sql
│   │   │   │   └── migration_lock.toml
│   │   │   └── schema.prisma
│   │   ├── src
│   │   │   ├── controllers
│   │   │   ├── db
│   │   │   ├── games
│   │   │   │   └── roulette
│   │   │   │       ├── data
│   │   │   │       │   ├── RouletteBetDefinitions.ts
│   │   │   │       │   └── rouletteWheel.ts
│   │   │   │       ├── dto
│   │   │   │       ├── engine
│   │   │   │       │   └── rouletteEngine.ts
│   │   │   │       ├── enums
│   │   │   │       ├── models
│   │   │   │       │   └── RouletteField.ts
│   │   │   │       └── types
│   │   │   ├── generated
│   │   │   │   └── prisma
│   │   │   │       ├── browser.ts
│   │   │   │       ├── client.ts
│   │   │   │       ├── commonInputTypes.ts
│   │   │   │       ├── enums.ts
│   │   │   │       ├── internal
│   │   │   │       │   ├── class.ts
│   │   │   │       │   ├── prismaNamespace.ts
│   │   │   │       │   └── prismaNamespaceBrowser.ts
│   │   │   │       ├── models
│   │   │   │       │   └── Bets.ts
│   │   │   │       └── models.ts
│   │   │   ├── lib
│   │   │   │   └── prisma.ts
│   │   │   ├── middleware
│   │   │   ├── routes
│   │   │   ├── server.ts
│   │   │   ├── services
│   │   │   ├── types
│   │   │   └── utils
│   │   │       └── sseManager.ts
│   │   └── tsconfig.json
|   |
|   | (FRONTEND)
|   |
│   └── web
│       ├── eslint.config.js
│       ├── index.html
│       ├── package-lock.json
│       ├── package.json
│       ├── public
│       │   └── favicon.png
│       ├── src
│       │   ├── App.tsx
│       │   ├── api
│       │   │   └── roulette.ts
│       │   ├── components
│       │   │   └── RollingStrip.tsx
│       │   ├── constants
│       │   │   └── rollingStripWheelConfigs.ts
│       │   ├── features
│       │   │   └── roulette
│       │   │       ├── components
│       │   │       │   ├── BettingZone.tsx
│       │   │       │   ├── RouletteChip.tsx
│       │   │       │   ├── RouletteSpinHistory.tsx
│       │   │       │   └── RouletteTable.tsx
│       │   │       ├── constants
│       │   │       │   └── theme.ts
│       │   │       ├── hooks
│       │   │       │   └── useTableBets.ts
│       │   │       └── utils
│       │   │           ├── domGeometry.ts
│       │   │           ├── rouletteColourCalculator.ts
│       │   │           ├── rouletteTableLayout.ts
│       │   │           └── tableBridge.ts
│       │   ├── global.d.ts
│       │   ├── hooks
│       │   │   └── useSession.ts
│       │   ├── index.css
│       │   ├── layouts
│       │   ├── main.tsx
│       │   ├── pages
│       │   │   └── RoulettePage.tsx
│       │   ├── store
│       │   ├── types
│       │   └── utils
│       │       ├── LiveStatsService.ts
│       │       └── sessionStore.ts
│       ├── tsconfig.json
│       └── vite.config.ts
|
|  (ROOT & SHARED)
|
├── docker-compose.yaml
├── eslint.config.js
├── package-lock.json
├── package.json
├── packages
│   ├── config
│   ├── shared
│   │   ├── constants
│   │   ├── enums
│   │   │   ├── GameTypes.ts
│   │   │   └── RouletteWinTypes.ts
│   │   ├── schemas
│   │   │   ├── RouletteSpinRequestSchema.ts
│   │   │   └── RouletteSpinResponseSchema.ts
│   │   └── types
│   │       └── roulette.ts
│   └── ui
├── prisma.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
