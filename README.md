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
* Design Decisions
    * Analysis heuristic
        * Stat/Role Analysis
            * Any pokemons with Attack/SpecialAttack about 1.1 times higher than its average stat will be consider attaker of that type
            * Else they will be consider Defensive Pokemon
            * If half the team has speed near the average speed (between 75% and 125% of the average), I recommend to have a team with more diverse speed
        * Types Analysis
            * Add all types of a team to a set and analyse them seperately (its limitation highligted under challenges)
            * Any types that no types from team can resist is considered "Defensive Weakness"
            * Any types that no types from team can be effective is considered "Offensive Weakness"
            * Any types that any types from team can be effective is considered "Offensive Strength"
* Challenges
    * To complete design, development and testing within 1-2 days is definately challenging for me
    * Adding pokemon to team
        * I didn't manage to add search/filter functinality to Selection Panel
    * Analysis
        * Currently, types analysis is done by treating each type as "one pokemon"
        * Realistically, types analysis shoud be performed on each pokemon with consideration on how all its types affect each other (for example, a pokemon with types that cancel the weaknesses of each other)
    * UX
        * Yet to implement relevant loading element to all asyn component
    * Code quality
        * Need more time to refactor after completing a MVP
        * CSS/Style not yet consolidated

