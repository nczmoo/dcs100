SUMMARY
    Dungeon Crawler Slots 
        You crawl a dungeon to get gold but you have to use a slot machine to get better equipment to go deeper.

TODO
    x Dungeon

        Start crawling

        Mobs spawn as you go forward and you fight them.

        Mobs get progressively more difficult.

        You can retreat back to the entrance, fighting progressively easier monsters on your way out.

        When you get back to the entrance, you leave the dungeon.

        Health replenishes when exiting dungeon.

    x Slots

    x Potions
    create 40 x 40 icons for slot symbols on reels
    put a hp in attack spawn msg

    
QUESTIONS
    What can you get from the slots?
        Potions
        Upgrades to armor and weapons (making it as generic as possible for the prototype)

    What symbols are on the reel?
        Heal potion
        Weapon
        Armor
        Health Upgrade        
        (maybe put the rest blank cause I can't think of anything else)

    What should happen when you die in the dungeon?

    Should the player be able to craft their own reels?

    Should pay lines be exponential? I had 4 pay lines active but only 1 line won. Kinda invalidates having more than one pay line.



DESIGN
    Reels spin for six seconds but can be skipped.

    Dungeon
        It's an autobattle situation. Just do rats for now, which get progressively more powerful as you progress forward.
        Mobs drop random gold (0, power)
MAYBE
    x make armor degrade so it has to be repaired
    bank
        why would you need to bank gold?
    x incentivize the player to dive deeper by doubling their gold yield for going deeper than last time
    x create a min for how many steps they can go before spawning a mob
    maybe portal should only go into effect if you'r not fighting
    be able to sell potions        
    double up on the reels to lower the chance of a portal 
    replace menu buttons with signs
    show when the next chest will pop up
    change background briefly to red when you get hit
    give the player a mulligan when they die the first time and let them keep their gold (but make sure they know its only that time)
    change death text
