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
    x add more ui pop when changing quantities on the screen so you can tell what's being changed 
    x make slot machine look better
    x be able to stop auto-pull
    x BUG: armor is being added and then not being revealed properly
    x red color text-danger on dungeonBG is too dim
    x no ui.delta when opening chests

    checkboxes look weird
    sound
    music    
    the number of portals given by a portal chest should be determined by how often you die
    change potions to inventory   
    replace enter and exit buttons with forward and backward images    

    key icon needs to be brighter (barely visible on store)
    fade to black whgen you die
    create captions for add to reels because someone thouht mxHealth-2 was minusing health
    does drinking work?


MOTHER'S DAY PLAYTEST
    What if dying with gold increased your stats?
    Invincibility potion
    Only show auto option for chests after you seen them
    Increased percent chance to hit potion
    UI too cluttered on my phone
    It's too hard to watch the slots and check the area above the slots. It makes me question if you really even need all of that other stuff above it or if it can just have plain text showing the new additions

    Health bar doesn't show when poisoned 
    Can't mitigate poison
    Game takes too long to get started - maybe start with some armor
    At least One of the reel symbols is missing from the slots 
    Show what the player won in plain text directly above reel

    Maybe put icons in the dungeon logs to more easily categorize the context of each log entry because I wanted to be able to easily see if I had just opened a chest 
    Make it a little bit easier to get portal potions because that's the only viable way to deep dive safely 
    I've played for a little over 20 minutes and I reached a impasse I guess. Without a portal potion I don't feel that safe to keep going deeper so I'm not going deeper than about 50. So there might be some structural issues I should work out. 
    Maybe snakes are too powerful. They're hitting me for like four damage every single time at a minimum

    Increase line not working
    Snakes level 10 status is resetting after exiting
    Does anything else get reset?

    I reached about twenty on all my stats and the game seems pointless 



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