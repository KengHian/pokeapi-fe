# Pokémon Team Builder
This frontend is built via React with Vite, calling [PokeAPI](https://pokeapi.co/) as the backend. 

It allows users to add up to six Pokemon in a team, which includes a breif summary of each Pokemons' information. After which, there will be anaylsis performed on the team to identify streangths and weaknesses of the team from the perspective of Types and Stats. 

## Overview
The architecture of the app is roughly as follows:

* Main Page
    * Team Panel
        * Detail Panel (Display details of pokemon in team)
        * Selectin Panel (Add Pokemon to team)
    * Analysis Panel (Display anaylsis and recommendation)
        * Type Analysis Panel 
        * Role Analysis Panel
    * Misc (Helper)
        * Animated Sprite (of Pokemon)
        * PokeBoxSprite (of Pokemon)
        * TypeLabel (Pokemon Type component)
        * TopBar (Nav Bar at the top)


## Setup Instructions
* To install dependencies
```
npm i
```

* To run the app
```
npm run dev
```

## Testing Instructions  
* How to run tests
```
npm run test
```

Unfortunately, I didn't manage to write any meaningful tests before submission. 


## Assumptions / Challenges
Design decisions or limitations
* To complete design, development and testing within 1-2 days is definately challenging for me
* Adding pokemon to team
    * I didn't manage to add search/filter functinality to Selection Panel
* Analysis
    * Currently, types analysis is done by treating each type as "one pokemon"
    * Realistically, types analysis shoud be performed on each pokemon with consideration on how all its types affect each other (for example, a pokemon with types that cancel the weaknesses of each other)
* Code quality
    * Need more time to refactor after completing a MVP
    * CSS/Style not yet consolidated

