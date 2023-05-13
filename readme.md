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
    x create 40 x 40 icons for slot symbols on reels
    x put a hp in attack spawn msg
    x you can get poisoned    
    x create reel spinning animation
    x repair potion
    x cure poison
    x BUG: if you die, it won't show the death msg because I hid the log
    x draw the icons that I put on the smoke on the bottle of potions
    x draw the icons for the larger screen
    x add an armor bar
    x hide store button in beginning
    x portal isn't setting the 2x position
    x put credits and lines back in
    x add auto drink option to heal and cure
    x REFACTOR
    x slowly integrate more stuff onto slots as you progress through dungeon (this makes slots harder but more lucrative)
    x chests are the only place you can get portal potions
    x Let the player know when a new monster is added to their spawn (exiting dungeon) and a new symbol is added to reel (store)
    x BUG : fighting not updating with mob
    x add straight to reels
    make slot machine look better
    sound
    music
    
    add more ui pop when changing quantities on the screen so you can tell what's being changed 
    the number of portals given by a portal chest should be determined by how often you die
    change potions to inventory
   
    replace enter and exit buttons with forward and backward images
    
    
    be able to stop auto-pull
    
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
