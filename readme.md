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
    x create captions for add to reels because someone thouht mxHealth-2 was minusing health
    x does drinking work? yes
    x fade to black whgen you die
    x Health bar doesn't show when poisoned 
    x Can't mitigate poison
    x Game takes too long to get started - maybe start with some armor
    x At least One of the reel symbols is missing from the slots 
    x Increase line not working
    
    x It's too hard to watch the slots and check the area above the slots. 
        It makes me question if you really even need all of that other stuff 
        above it or if it can just have plain text showing the new additions    
    x Show what the player won in plain text directly above reel
    x ui.store log is populating before win is populating ui
    x reels caption not poulating with wins
    x repair armor not automatically being drunk when armor is at 0
    x theres not enough contrast between armor bar bg and when its empty
    x grace if you die (50% gold instead of 100% gold)
    x flash health bar when you're hit  (did shake instead)
    x replace enter and exit buttons with forward and backward images   
    x key icon needs to be brighter (barely visible on store)
    x be able to unlock more lines    
    x give the player a mulligan when they die the first time and let them keep their gold (but make sure they know its only that time)
    x exiting not animating
    x implement all drawn monsters
    x show when the next chest will pop up
    x open every chast by default and THEN give the option to not open it
    x move healthdelta and amror delta
    x background color for .mob in log  is weird
    x ui.reels isn't getting wiped when ui.addToReels prints to screen
    x only show auto option for chests after you seen them
    x make modifiers more specific to mobs

    checkboxes look weird
    sound
    music    

    REFACTOR

    
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
        For now, they just go back to the etnrance and mostly lose their gold

    Should the player be able to craft their own reels?
        Someone gave an idea to pick a particular type of reel. Like, one oriented towards melee combat. Another oriented towards alchemy or ranged.

    Should pay lines be exponential? I had 4 pay lines active but only 1 line won. Kinda invalidates having more than one pay line.
        No. It's fine as is.

DESIGN
    Reels spin for six seconds but can be skipped.
        Six second would have been WAY too long. A second is fine for now.

    Dungeon
        It's an autobattle situation. Just do rats for now, which get progressively more powerful as you progress forward.
        Mobs drop random gold (0, power)


    When you don't have portals, it kinda sucks. (I had 10 heals at the time, and I dind't realize you -can- hypothetically take a risk with enough health to just dive in and hope you find a blue chest.)
    Game feels trivial when you have a bunch of money and stats.
    An issue with progression is that as you go deeper, the amount of gold increases significantly, so ideally, I mihgt need to cap it at enemy's attack.

MAYBE
    x make armor degrade so it has to be repaired
    
    x incentivize the player to dive deeper by doubling their gold yield for going deeper than last time
    x create a min for how many steps they can go before spawning a mob
    x replace menu buttons with signs
    bank
        why would you need to bank gold?
    be able to sell potions        
    double up on the reels to lower the chance of a portal     
    ! change background briefly to red when you get hit  (this wasn't very good)
    change death text
    the number of portals given by a portal chest should be determined by how often you die
    change potions to inventory   
    What if dying with gold increased your stats? (it seems like im not dying like i used to so not really an issue)
    change heart icon to green when you're poisoned
    what if the slot machine was a tavern and you could recruit people to come with you?

    maybe portal should only go into effect if you'r not fighting
    maybe put icons in the dungeon logs to more easily categorize the context 
        of each log entry because I wanted to be able to easily see if I 
        had just opened a chest 
    Increased percent chance to hit potion
    Invincibility potion


MOTHER'S DAY PLAYTEST    
    UI too cluttered on my phone    
    ! Make it a little bit easier to get portal potions because that's the only viable way to deep dive safely 
    I've played for a little over 20 minutes and I reached a impasse I guess. Without a portal potion I don't feel that safe to keep going deeper so I'm no going deeper than about 50. So there might be some structural issues I should work out. 
    x Maybe snakes are too powerful. They're hitting me for like four damage every single time at a minimum
    x Snakes level 10 status is resetting after exiting
    x Does anything else get reset? I think this was because it was passing the object by reference and getting downgraded to level 1. Hopefully, pass by value resolves this.
    x I reached about twenty on all my stats and the game seems pointless 
