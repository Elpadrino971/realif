# 🎮 REAL LIFE+ V2.0 - GAME DESIGN DOCUMENT

**Version:** 2.0 (Viral Edition)
**Date:** November 2025
**Type:** Social Life Simulator 3D - Mobile (iOS/Android)
**Genre:** Simulation, Social, Competitive, Life Management
**Target:** 16-35 ans, urbains, actifs sur réseaux sociaux

---

## 📋 TABLE DES MATIÈRES

1. [Vision & Concept](#vision)
2. [Core Gameplay Loop](#core-loop)
3. [Systèmes de Jeu](#systemes)
4. [Progression & Méta-Game](#progression)
5. [Fonctionnalités Sociales](#social)
6. [Intégration IRL](#irl)
7. [Monétisation](#monetization)
8. [Features Virales](#viral)
9. [Roadmap](#roadmap)
10. [Technical Stack](#tech)

---

<a name="vision"></a>
## 1. 🎯 VISION & CONCEPT

### Vision Statement

**"Le premier jeu mobile où ta vraie vie devient ton arme compétitive."**

REAL LIFE+ transforme tes activités quotidiennes (marcher, visiter des lieux, socialiser) en progression dans un jeu compétitif où tu construis ton empire d'influence virtuel.

### Concept Unique (USP - Unique Selling Proposition)

**Ce qui nous différencie de TOUS les autres jeux :**

1. **IRL → In-Game Progression**
   - Tes pas = Énergie
   - Tes lieux visités = Contenu débloché
   - Tes photos IRL = Posts in-game

2. **Objectif Clair : Devenir l'Influenceur #1**
   - Pas juste "jouer pour jouer"
   - Classements compétitifs par ville
   - Rivalité sociale addictive

3. **TikTok-Native**
   - Contenu shareable par design
   - AR Filters intégrés
   - Export vidéo one-tap

4. **Compétition Hebdomadaire**
   - Fashion Battles (comme Fortnite events)
   - FOMO intense
   - Communauté active

### Elevator Pitch

*"Imagine Les Sims rencontre Pokémon GO, avec la compétition de Fortnite et l'aspect social de TikTok. Tu crées ton avatar, explores une ville 3D, collectes des vêtements via gacha, et rivalises pour devenir l'influenceur #1 de ta ville. Chaque pas IRL te donne de l'énergie, chaque lieu visité débloque du contenu. C'est addictif, social, et viral."*

### Références (Inspirations)

| Jeu | Ce qu'on prend | Ce qu'on améliore |
|-----|---------------|-------------------|
| **The Sims** | Simulation de vie, customisation | + Compétition, + IRL link |
| **Pokémon GO** | IRL integration, géolocalisation | + Vraie progression, + Depth |
| **Genshin Impact** | Gacha, progression, qualité | + IRL rewards, + Social |
| **BitLife** | Life simulation, choix | + 3D, + Multiplayer |
| **Kim Kardashian Hollywood** | Influencer career, social climb | + Gameplay depth, + IRL |
| **Fortnite** | Battle Pass, events, FOMO | + IRL component |

---

<a name="core-loop"></a>
## 2. 🔄 CORE GAMEPLAY LOOP

### Minute-to-Minute Loop

```
1. Login → Collect rewards (daily bonus, step rewards)
2. Check notifications (rival updates, event alerts)
3. Use energy on activities:
   - Work job → Earn money
   - Attend party → Gain followers
   - Manage business → Passive income
4. Spend money on gacha → New items
5. Create outfit → Equip for events
6. Post on RealGram → Gain followers
7. Check leaderboards → See ranking
8. Compete in Fashion Battle → Vote & participate
```

**Session durée moyenne : 10-15 minutes**

### Daily Loop

```
MORNING (IRL):
- Walk to work/school (app tracks steps)
- Gain energy + XP passively
- Notification: "You earned 50 energy from 5000 steps!"

LUNCH:
- Visit café (scan QR code)
- Unlock "Café Meetup" event
- Network with NPCs/players

AFTERNOON:
- Open game (5-10 min session)
- Complete daily quests
- Use energy on job/business
- Pull gacha with earnings
- Create outfit for tonight's battle

EVENING (Prime Time):
- Fashion Battle event (8pm - 10pm)
- Everyone votes on best outfits
- Real-time leaderboard updates
- Win/lose → Followers gained/lost

NIGHT:
- Check final rankings
- Plan tomorrow's strategy
- Chat with crew
- Set business to auto-manage overnight
```

### Weekly Loop

```
MONDAY:
- New Battle Pass week begins
- New Fashion Battle theme announced
- Weekly quests unlock

TUESDAY-THURSDAY:
- Grind daily activities
- Build outfit for weekend battle
- Crew events

FRIDAY:
- Major Fashion Battle (biggest rewards)
- Limited-time gacha banner

WEEKEND:
- Special IRL events (geolocation)
- Crew wars
- Double XP events

SUNDAY:
- Season leaderboard resets
- Claim weekly rewards
- Prepare for new week
```

### Monthly/Seasonal Loop

```
SEASON STRUCTURE (3 months):

Month 1: New season starts
- New Battle Pass (100 levels)
- New gacha items
- New theme (Summer, Winter, etc.)
- Fresh leaderboards

Month 2: Mid-season
- Mid-season event
- New challenges
- Community goals

Month 3: End-season
- Final push for Battle Pass level 100
- Exclusive end-season items
- Championship Fashion Battle
- Season rewards distributed

→ Next season teaser
→ Repeat
```

---

<a name="systemes"></a>
## 3. 🎮 SYSTÈMES DE JEU

### 3.1 Avatar System (Character Creation)

**Customisation Profonde :**

```
PHYSIQUE:
- Gender: Male, Female, Non-binary
- Body Type: 5 options (skinny → muscular)
- Height: Slider
- Skin Tone: Palette de 20+ couleurs

VISAGE:
- Face Shape: 10 options
- Eyes: 15 shapes, 20+ colors
- Nose: 10 shapes
- Mouth: 10 shapes
- Hair: 50+ styles, any color
- Facial Hair: 20+ options (barbe, moustache)
- Makeup: 30+ options

VOIX:
- Pitch slider
- 5 voice types
```

**UMA Integration :**
- Runtime customization
- Blend shapes pour expressions
- Animations faciales
- Optimisé mobile

**Présets :**
- 20 presets par défaut (quick start)
- Import selfie → AI génère avatar
- Scan visage via caméra (optionnel)

### 3.2 Style System (Fashion & Appearance)

**Clothing Slots :**
```
- Top (T-shirt, chemise, hoodie)
- Bottom (Pantalon, short, jupe)
- Shoes (Sneakers, boots, talons)
- Outfit (Full body, remplace top+bottom)
- Outerwear (Veste, manteau)
- Accessories (Casquette, lunettes, bijoux)
- Bags (Sac à main, backpack)
```

**Style Categories :**
```
1. Casual - Everyday wear
2. Formal - Costume, robe
3. Streetwear - Hypebeast, urban
4. Luxury - Designer brands
5. Sporty - Athletic wear
6. Alternative - Punk, goth, indie
7. Seasonal - Beach, winter
```

**Style Bonus System :**
```
Match 2 items same style → +10% Style
Match 3 items → +25% Style
Match 5 items (full set) → +50% Style + Special aura

Example:
- Full Luxury Set:
  → +50% Style
  → Golden particle effects
  → "Luxury" badge on profile
```

**Rarity System :**

| Rarity | Drop Rate | Style Bonus | Visual Effects |
|--------|-----------|-------------|----------------|
| Common | 60% | +5 | None |
| Rare | 30% | +15 | Subtle glow |
| Epic | 9% | +40 | Animated texture |
| Legendary | 1% | +100 | Particles + aura |

**Brand Collaborations (Future) :**
```
- Nike (sneakers)
- Adidas (streetwear)
- Gucci (luxury)
- Supreme (limited drops)

Licensed items = $3-5 each
Limited editions = FOMO
```

### 3.3 Gacha System

**Pull Types :**

```
SINGLE PULL:
- Cost: $100 in-game currency
- Random item based on rates
- Pity counter +1

10-PULL:
- Cost: $900 (10% discount)
- 10 random items
- Guaranteed: At least 1 Rare+
- Pity counter +10
```

**Pity System :**
```
- Every pull without Legendary → Counter +1
- At 90 pulls → Guaranteed Legendary
- Counter resets when Legendary obtained

Display to player:
"37/90 pulls until guaranteed Legendary"
→ Transparent & fair
```

**Gacha Banners :**

```
PERMANENT BANNER:
- Always available
- Standard item pool
- Cheaper (100 per pull)

FEATURED BANNER:
- Rotates weekly
- Specific themed items
- Rate-up for featured items (50% chance on Epic/Legendary)
- Slightly more expensive (120 per pull)

LIMITED BANNER:
- 2 weeks only
- Exclusive items (NEVER available again)
- FOMO driver
- Premium price (150 per pull)
```

**Gacha Tickets (Alternative Currency) :**
```
Earned via:
- Daily login (1/day)
- Battle Pass (20 total)
- Event rewards
- Achievements

1 Ticket = 1 Free Pull
→ F2P friendly
```

### 3.4 Inventory & Equipment

**Inventory Management :**
```
- Unlimited storage
- Filter by:
  → Rarity
  → Style category
  → Slot type
  → Date acquired
  → Favorites

- Sort by:
  → Style bonus
  → Rarity
  → Alphabetical

- Mass actions:
  → Sell multiple items
  → Favorite sets
  → Lock items (prevent accidental sell)
```

**Equipment System :**
```
Quick Equip:
- Tap item → Auto-equip to correct slot
- Replace warning if slot occupied

Outfit Presets:
- Save up to 10 outfit combinations
- Quick-swap for different events
- Name your outfits
  Example: "Formal Party", "Streetwear Flex", "Work Casual"

Auto-Equip Best:
- AI suggests highest style combination
- One-tap equip
```

**Wardrobe Room (3D) :**
```
Special 3D space in your apartment:
- Walk-in closet
- Mannequins display favorite outfits
- Try items in real-time
- Take photos for RealGram
```

### 3.5 Energy System

**Energy Mechanics :**

```
MAX ENERGY:
- Base: 100
- Level 10: 120
- Level 50: 200
- VIP: +20%

ENERGY REFILL:
- Full refill at midnight (local time)
- +1 energy per 100 steps (IRL)
- Watch ad: +10 energy (3x per day)
- Energy potion (IAP): Full refill ($0.99)

ENERGY COSTS:
- Work job: 20 energy
- Attend party: 30 energy
- Fashion battle entry: 40 energy
- Business management: 10 energy
- Training (gym): 25 energy
```

**Strategic Depth :**
```
Players must choose:
- Grind money (work) vs Social (party) vs Competition (battle)
- IRL walking = More energy = More options
- VIP = Higher cap = More plays per day

→ Creates meaningful decisions
→ Encourages IRL activity
```

### 3.6 Currency System

**In-Game Currencies :**

| Currency | How to Earn | Used For |
|----------|-------------|----------|
| **💵 Money** | Jobs, business, quests | Gacha pulls, items, rent |
| **💎 Gems** | IAP, events, achievements | Premium gacha, skips, VIP |
| **⭐ Fame Points** | Followers, battles, posts | Unlock VIP locations |
| **🎟️ Gacha Tickets** | Daily, events, Battle Pass | Free gacha pulls |
| **🏆 Crew Points** | Crew activities | Crew upgrades |

**Conversion Rates :**
```
Gems → Money: 1 gem = $100 (one-way)
Gems → Gacha Tickets: 10 gems = 1 ticket
Money → Gems: NOT ALLOWED (prevents exploits)

Fame Points:
- 1000 FP = VIP Club access
- 5000 FP = Penthouse unlock
- 10000 FP = Celebrity tier
```

**Daily Earnings (F2P) :**
```
Average player (1 hour/day):
- Job: $500
- Quests: $300
- Steps bonus: $200
- Total: ~$1000/day

= 10 gacha pulls per day (F2P)
= Totally viable without paying
```

**Daily Earnings (VIP) :**
```
VIP player:
- Jobs: $750 (+50%)
- Quests: $450 (+50%)
- Steps: $200
- Daily gem: 10 gems
- Total: $1400 + 10 gems/day

= 14+ pulls per day
= Faster progression but not P2W
```

### 3.7 Jobs & Career System

**Career Progression :**

```
TIER 1 - Entry Level ($20-30/job)
├── Delivery Driver
├── Barista
├── Retail Worker
└── Waiter

TIER 2 - Skilled ($50-80/job)
├── Bartender
├── Personal Trainer
├── Photographer
└── DJ

TIER 3 - Professional ($100-150/job)
├── Fashion Designer
├── Event Planner
├── Marketing Manager
└── Content Creator

TIER 4 - Influencer ($200-300/job)
├── Micro-Influencer (10k followers)
├── Influencer (100k followers)
├── Mega-Influencer (1M followers)
└── Celebrity (10M+ followers)
```

**Job Requirements :**
```
Entry → Tier 2:
- Level 10
- Complete 50 jobs

Tier 2 → Tier 3:
- Level 25
- 5000 followers
- Complete 100 jobs

Tier 3 → Tier 4:
- Level 50
- 50,000 followers
- Win 10 Fashion Battles
```

**Job Activities (Mini-Games) :**

```
DELIVERY DRIVER:
- Mini racing game (like Crazy Taxi)
- Deliver packages on time
- Better time = Better pay

BARISTA:
- Tapping rhythm game (like Diner Dash)
- Make drinks correctly
- Combos = Bonus tips

DJ:
- Rhythm game (like Guitar Hero)
- Hit beats correctly
- Score = Earnings + Popularity

PHOTOGRAPHER:
- Photo mode mini-game
- Take photos of NPCs
- Composition score = Pay
```

**Passive Income (Business Ownership) :**

```
Buy Businesses:
- Coffee Shop: $10,000 → $50/hour passive
- Boutique: $50,000 → $200/hour passive
- Night Club: $200,000 → $1000/hour passive
- Fashion Brand: $1,000,000 → $5000/hour passive

Upgrades:
- Hire staff: +20% income
- Renovate: +30% income
- Advertise: +50% income

Risk/Reward:
- Large upfront cost
- Long-term passive gains
- Competes with other players for customers
```

---

<a name="progression"></a>
## 4. 📈 PROGRESSION & MÉTA-GAME

### 4.1 Level System

**XP Sources :**
```
- Jobs completed: 10 XP
- Steps walked (100 steps): 1 XP
- Fashion Battle participation: 50 XP
- Fashion Battle win: 200 XP
- Social interactions: 5 XP
- Daily quests: 100 XP
- RealGram posts: 20 XP
```

**Level Curve :**
```
Level 1 → 2: 100 XP
Level 10 → 11: 1,000 XP
Level 50 → 51: 10,000 XP
Level 100: 100,000 XP total

Formula: XP needed = 100 * level^1.5
→ Slows down but always achievable
```

**Level Rewards :**
```
Every level:
- +10 max energy
- +$500 money
- +5 gems

Milestone rewards (5, 10, 15, etc.):
- Gacha ticket
- Exclusive item
- New feature unlock

Level 50:
- Penthouse apartment unlock
- Celebrity status
- Special avatar effects
```

### 4.2 Influencer Meta-Game

**THE CORE OBJECTIVE : Become #1 Influencer**

**Follower System :**

```
HOW TO GAIN FOLLOWERS:

1. RealGram Posts (+10-100 followers/post)
   - Quality = Likes received
   - More likes = More followers

2. Fashion Battle Wins (+500 followers)
   - Win weekly battle
   - Massive follower spike

3. Social Events (+50-200 followers)
   - Attend parties
   - Network with NPCs
   - High charisma = More followers

4. Style Score (+1 follower per 10 style points)
   - Passive gain
   - Always wearing good outfit = Growth

5. Crew Activity (+20 followers/day)
   - Active crew member
   - Crew reputation boosts you
```

**Follower Tiers & Benefits :**

| Followers | Tier | Unlocks |
|-----------|------|---------|
| 0 - 1,000 | Nobody | Basic locations |
| 1,000 - 10,000 | Micro-Influencer | VIP Club access |
| 10,000 - 100,000 | Influencer | Brand deals, penthouse |
| 100,000 - 1M | Mega-Influencer | Celebrity events, mansion |
| 1M+ | Celebrity | Everything, special aura |

**Leaderboards :**

```
GLOBAL LEADERBOARDS:
- Top 100 worldwide (all-time)
- Whale territory
- Prestige only

CITY LEADERBOARDS:
- Top 100 in your city
- Achievable for dedicated F2P
- Main competition

WEEKLY LEADERBOARDS:
- Resets every Monday
- Top 10 get exclusive rewards
- Short-term competition

CREW LEADERBOARDS:
- Top 50 crews
- Competitive guild aspect
```

**Leaderboard Rewards :**

```
WEEKLY (Top 10):
- Rank 1: 1000 gems + Legendary item + "Champion" badge
- Rank 2-3: 500 gems + Epic item
- Rank 4-10: 200 gems + Rare item

MONTHLY (Top 3):
- Rank 1: Exclusive avatar skin + $10,000 + Crown icon
- Rank 2: Exclusive outfit
- Rank 3: Exclusive accessory

→ F2P can compete in weekly
→ Monthly requires dedication
→ Global = whales only
```

### 4.3 Battle Pass System

**Structure (100 Levels, 3 months) :**

```
FREE PASS:
- Basic rewards every level
- 10 gacha tickets total
- $50,000 total money
- 3 Epic items

PREMIUM PASS ($9.99):
- Enhanced rewards every level
- 50 gacha tickets total
- $200,000 total money
- 10 Epic items
- 3 Legendary items
- Exclusive outfits (Levels 25, 50, 75, 100)
- XP boost (+25%)
- Energy boost (+20 max)

VIP PASS ($19.99):
- All Premium rewards
- Double XP boost (+50%)
- Instant 25 levels
- Exclusive VIP skin
- Monthly gems (300 total)
```

**Leveling System :**
```
XP per level: 1,000 XP
Total for Level 100: 100,000 XP

Daily XP sources:
- Daily quests: 1,500 XP
- Fashion battle: 500 XP
- Jobs: 200 XP
- Steps: 200 XP (20k steps)

Total daily: ~2,400 XP = 2.4 levels/day

Days to complete (F2P): ~42 days
Days to complete (Premium +25%): ~34 days
Days to complete (VIP +50%): ~28 days

Season duration: 90 days
→ Achievable for all tiers
→ Rewards commitment
```

**Exclusive Level 100 Reward :**

```
"ULTIMATE" Tier Item:
- Only available this season
- Never in gacha
- FOMO driver
- Flexing rights

Example:
- Season 1: Golden Dragon Suit
- Season 2: Neon Cyber Outfit
- Season 3: Ice Queen Dress

→ People who finish = Status symbol
```

### 4.4 Achievements System

**Categories :**

```
COLLECTOR:
- "Fashion Hoarder" - Own 100 items
- "Full Wardrobe" - Own 500 items
- "Legendary Collector" - Own 10 Legendary items

SOCIAL:
- "Popular" - Reach 10k followers
- "Influencer" - Reach 100k followers
- "Celebrity" - Reach 1M followers

COMPETITION:
- "Battle Victor" - Win 1 Fashion Battle
- "Champion" - Win 10 Fashion Battles
- "Undefeated" - Win 3 battles in a row

FITNESS:
- "Walker" - 100,000 steps
- "Marathoner" - 1,000,000 steps
- "Ultra Runner" - 10,000,000 steps

WEALTH:
- "Millionaire" - Own $1,000,000
- "Tycoon" - Own 5 businesses
- "Mogul" - Earn $10,000,000 total

EXPLORATION:
- "Tourist" - Visit 10 locations
- "Explorer" - Visit 50 locations
- "World Traveler" - Visit 100 locations
```

**Achievement Rewards :**
```
Each achievement:
- Title badge (displayed on profile)
- Gems (10-100 depending on difficulty)
- Avatar cosmetic (rare ones)

Complete all in category:
- Exclusive outfit
- Permanent stat boost
- Special profile frame
```

---

<a name="social"></a>
## 5. 👥 FONCTIONNALITÉS SOCIALES

### 5.1 RealGram (In-Game Instagram)

**Core Feature : Share your life in-game**

**Posting System :**

```
CREATE POST:
1. Take photo in-game (photo mode)
   - Pose avatar (20+ poses)
   - Choose location
   - Add filters
   - Add stickers

2. Write caption (200 characters max)

3. Add hashtags (#StreetStyle, #LuxuryLife)

4. Post to feed

OTHER PLAYERS SEE:
- Your post in their feed
- Can like, comment
- Can share to their story
```

**Photo Mode (Advanced) :**

```
CAMERA CONTROLS:
- Free camera
- FOV slider
- Depth of field
- Filters (20+):
  → Vintage
  → Black & White
  → Neon
  → Vaporwave
  → etc.

POSES:
- 50+ poses
- Categories:
  → Casual
  → Model
  → Funny
  → Action
  → Couple (if with someone)

LOCATIONS:
- Your apartment
- VIP club
- Beach
- Rooftop
- Anywhere in the city
```

**Engagement System :**

```
LIKES:
- Tap heart to like
- No limit on likes
- Liker's follower count affects your boost
  → Celebrity likes your post = +100 followers

COMMENTS:
- Text comments
- Pre-made reactions (🔥, 💯, etc.)
- Friendly community (moderated)

SHARES:
- Share to your story (24h)
- Share to TikTok/Instagram (export)
- Share to crew feed
```

**Algorithm :**

```
Post visibility based on:
1. Your follower count (40%)
2. Engagement rate (30%)
3. Hashtag relevance (20%)
4. Recency (10%)

High engagement post:
→ Featured on "Explore" page
→ Massive follower boost
→ Can go viral

Low engagement:
→ Only shown to your followers
→ Normal growth
```

**Rewards for Posting :**
```
Post with 100+ likes: +50 followers
Post with 1000+ likes: +500 followers + "Viral" badge
Post with 10000+ likes: +5000 followers + Featured

Daily post limit: 5 posts
→ Prevents spam
→ Encourages quality
```

### 5.2 Crew System (Guilds)

**Core Feature : Team competition**

**Creating/Joining Crew :**

```
CREATE CREW:
- Cost: $10,000 or 100 gems
- Name (20 characters)
- Tag [XXX] (3-4 letters)
- Description
- Emblem (50+ options)
- Public or Private

JOIN CREW:
- Browse crews
- Filter by:
  → Active members
  → Level requirement
  → City
  → Language
- Apply or instant join (if public)

CREW SIZE:
- Min: 5 members
- Max: 50 members
```

**Crew Benefits :**

```
PASSIVE BONUSES:
- +10% XP for all members
- +5% money from jobs
- Access to crew wardrobe (shared items)
- Crew chat

ACTIVE FEATURES:
- Crew vs Crew battles
- Shared objectives
- Crew leaderboard
```

**Crew Roles :**

```
LEADER (1):
- Full control
- Can kick members
- Set requirements
- Manage wars

OFFICERS (5 max):
- Can accept members
- Can start crew events
- Can edit description

MEMBERS:
- Participate in activities
- Contribute to crew score
```

**Crew Activities :**

```
CREW WARS (Weekly):
- Crew vs Crew competition
- Total follower gain over 7 days
- Winning crew:
  → All members get 500 gems
  → Exclusive crew skin
  → Leaderboard boost

CREW QUESTS:
- Shared objectives
  Example: "Crew members walk 1,000,000 steps total"
- All contribute
- Rewards distributed when complete

CREW DONATIONS:
- Donate money to crew bank
- Used for:
  → Crew perks (XP boost upgrades)
  → Crew emblem upgrades
  → Crew events
```

**Crew Leaderboard :**

```
Ranked by:
1. Total crew followers
2. Crew level (XP from all members)
3. Wars won

Top 10 crews:
- Listed on main leaderboard
- Special crew frame
- Prestige
```

### 5.3 Rival System

**Core Feature : Personal competition**

**Auto-Assigned Rivals :**

```
Algorithm assigns 3 rivals based on:
- Similar level (±5 levels)
- Similar follower count
- Same city (if possible)
- Active players (online in last 24h)

Rivals change:
- Weekly refresh
- Can challenge to become permanent rival
```

**Rival Features :**

```
RIVAL DASHBOARD:
- See their stats
- Compare:
  → Followers
  → Style score
  → Level
  → Fashion battle wins

NOTIFICATIONS:
- "Sarah just won a Fashion Battle! (+500 followers)"
- "Mike reached 10,000 followers!"
- "Alex bought a penthouse!"

→ Creates FOMO
→ Motivates you to play
```

**Rival Challenges :**

```
CHALLENGE TYPES:

1. STYLE BATTLE (1v1):
   - Both create best outfit
   - Community votes
   - Winner: +200 followers
   - Loser: -50 followers

2. EARNINGS RACE (24h):
   - Who earns more money in 24h
   - Winner: $5,000 bonus

3. STEP CHALLENGE (7 days):
   - Who walks more steps IRL
   - Winner: 500 gems

Limits:
- 1 challenge per rival per week
- Must be accepted (not forced)
```

**Rival Rewards :**

```
Beat rival in challenge:
- Rival points +10
- 100 gems
- Achievement progress

Collect 100 rival points:
- "Rivalry King" title
- Exclusive outfit
- Permanent stat boost (+5% XP)
```

### 5.4 Dating/Relationships (Optional - Phase 2)

**Core Feature : Social simulation depth**

**Meeting NPCs & Players :**

```
NPCS (AI characters):
- Met at parties, events, locations
- Different personalities
- Friendship → Romance path
- Unlocks story content

PLAYERS:
- Opt-in to dating feature
- Swipe system (like Tinder)
- Match → Chat
- Plan in-game dates
```

**Relationship Mechanics :**

```
FRIENDSHIP:
- Levels 1-10
- Gift items to increase
- Hang out at locations
- Benefits:
  → XP boost when together
  → Shared wardrobe access

ROMANCE:
- Levels 1-10
- Exclusive relationship (1 at a time)
- Special couple activities
- Benefits:
  → Couple outfits
  → Couple photo poses
  → Follower boost (cute couple = popularity)

MARRIAGE (End-game):
- Level 10 romance
- Wedding event (other players can attend)
- Shared apartment
- Permanent XP/money boost
```

**Dating Activities :**

```
- Dinner date (restaurant mini-game)
- Movie date (watch in-game movies)
- Beach date (photo ops)
- Club date (dance mini-game)
- Home date (cook together mini-game)

Each activity:
→ Increases relationship XP
→ Unlocks dialogue
→ Can result in gifts
```

**Breakup System :**

```
Can end relationship anytime:
- Lose couple benefits
- Items gifted stay with you
- Can date someone else

Cooldown: 7 days before dating again
→ Prevents exploit
```

---

*[Continuer avec sections 6-10 dans le prochain message pour ne pas dépasser la limite]*
