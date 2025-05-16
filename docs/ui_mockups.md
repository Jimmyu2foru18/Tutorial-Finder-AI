# Tutorial Finder AI - User Interface Mockups

## Overview

This document provides conceptual UI mockups and design guidelines for the Tutorial Finder AI platform. These mockups illustrate the key user interfaces and interactions to guide frontend development. The designs prioritize usability, accessibility, and a clean, modern aesthetic.

## Design Principles

- **Simplicity**: Clean interfaces that focus on content and functionality
- **Accessibility**: WCAG 2.1 AA compliance with clear visual hierarchy
- **Responsiveness**: Fluid layouts that work across device sizes
- **Consistency**: Uniform patterns and components throughout the application
- **Feedback**: Clear system status indicators and response to user actions

## Color Palette

- **Primary**: #3366CC - Used for primary actions, links, and key UI elements
- **Secondary**: #FF9900 - Used for highlights, accents, and secondary actions
- **Neutral Dark**: #333333 - Used for text and high-contrast elements
- **Neutral Light**: #F5F5F5 - Used for backgrounds and subtle separators
- **Success**: #28A745 - Used for positive feedback and confirmations
- **Warning**: #FFC107 - Used for alerts and cautionary messages
- **Error**: #DC3545 - Used for error states and critical notifications

## Typography

- **Primary Font**: Inter - Clean, modern sans-serif for general UI text
- **Heading Font**: Montserrat - Distinctive headings with good readability
- **Monospace**: Fira Code - For code examples and technical content
- **Base Size**: 16px with a modular scale for hierarchy
- **Line Height**: 1.5 for optimal readability

## Key Screens

### 1. Homepage / Search Interface

```
+----------------------------------------------------------------------+
|  [Logo] Tutorial Finder AI                         [Sign In] [Menu ≡] |
+----------------------------------------------------------------------+
|                                                                      |
|                  Find the perfect tutorial for any game              |
|                                                                      |
|  +----------------------------------------------------------------+  |
|  | Search for tutorials...                                     🔍 |  |
|  +----------------------------------------------------------------+  |
|                                                                      |
|  Popular categories:                                                 |
|  [RPG] [FPS] [Strategy] [Puzzle] [MMO] [Fighting] [More...]         |
|                                                                      |
|  Recent searches:                                                    |
|  [Elden Ring boss strategies]                                        |
|  [Minecraft redstone tutorials]                                      |
|  [League of Legends jungle routes]                                   |
|                                                                      |
|  Featured tutorials:                                                 |
|  +------------------------+  +------------------------+              |
|  | [Thumbnail]            |  | [Thumbnail]            |              |
|  | Advanced Valorant      |  | Zelda: Tears of the    |              |
|  | Aiming Techniques      |  | Kingdom Shrine Guides  |              |
|  +------------------------+  +------------------------+              |
|                                                                      |
+----------------------------------------------------------------------+
```

### 2. Search Results Page

```
+----------------------------------------------------------------------+
|  [Logo] Tutorial Finder AI                         [Sign In] [Menu ≡] |
+----------------------------------------------------------------------+
|  Search: "Elden Ring Malenia boss fight"                    [Filter ▼] |
|                                                                      |
|  Refine your search:                                                 |
|  [Character Build ▼] [Difficulty ▼] [Video Length ▼] [Source ▼]      |
|                                                                      |
|  25 results found                                                    |
|                                                                      |
|  +----------------------------------------------------------------+  |
|  | [Video Thumbnail]                                               |  |
|  | How to Beat Malenia - Complete Strategy Guide                   |  |
|  | 15:24 · YouTube · GameGuideGuru · 1.2M views                    |  |
|  | ★★★★☆ (4.8) · 2,345 ratings                                     |  |
|  |                                                                 |  |
|  | This comprehensive guide covers all phases of the Malenia boss  |  |
|  | fight with strategies for different builds and playstyles.      |  |
|  |                                                                 |  |
|  | [Watch Video] [Listen to Audio] [Read Transcript]              |  |
|  +----------------------------------------------------------------+  |
|                                                                      |
|  +----------------------------------------------------------------+  |
|  | [Text Icon]                                                     |  |
|  | Malenia Boss Fight - Tips and Tricks for All Builds             |  |
|  | GameFAQs · Updated 3 days ago                                   |  |
|  | ★★★★★ (5.0) · 876 ratings                                       |  |
|  |                                                                 |  |
|  | A detailed walkthrough with specific tips for defeating Malenia |  |
|  | with different character builds and weapon combinations.        |  |
|  |                                                                 |  |
|  | [Read Guide] [Listen to Audio]                                  |  |
|  +----------------------------------------------------------------+  |
|                                                                      |
|  [Load More Results]                                                 |
|                                                                      |
+----------------------------------------------------------------------+
```

### 3. Tutorial Viewer - Video Format

```
+----------------------------------------------------------------------+
|  [Logo] Tutorial Finder AI                         [Sign In] [Menu ≡] |
+----------------------------------------------------------------------+
|  < Back to results                                                    |
|                                                                      |
|  How to Beat Malenia - Complete Strategy Guide                        |
|  By GameGuideGuru · Original source: YouTube · 15:24                  |
|                                                                      |
|  +----------------------------------------------------------------+  |
|  |                                                                 |  |
|  |                      [Video Player]                             |  |
|  |                                                                 |  |
|  |                                                                 |  |
|  |                                                                 |  |
|  |                                                                 |  |
|  |                                                                 |  |
|  |                                                                 |  |
|  +----------------------------------------------------------------+  |
|  | ⏮️  ⏯️  ⏭️  🔊  🔍  ⚙️                           00:45 / 15:24 |  |
|  +----------------------------------------------------------------+  |
|                                                                      |
|  Key Points:                                                         |
|  • Phase 1 strategy begins at 01:23                                  |
|  • Recommended builds and equipment at 04:56                         |
|  • Avoiding Waterfowl Dance at 08:12                                 |
|  • Phase 2 strategy begins at 10:37                                  |
|                                                                      |
|  Related Tutorials:                                                  |
|  [Elden Ring Stat Builds for Malenia]                                |
|  [Waterfowl Dance Dodge Timing]                                      |
|                                                                      |
|  Was this helpful? [👍] [👎]                                         |
|                                                                      |
+----------------------------------------------------------------------+
```

### 4. Tutorial Viewer - Audio Format

```
+----------------------------------------------------------------------+
|  [Logo] Tutorial Finder AI                         [Sign In] [Menu ≡] |
+----------------------------------------------------------------------+
|  < Back to results                                                    |
|                                                                      |
|  Malenia Boss Fight - Tips and Tricks (Audio Version)                 |
|  Generated from GameFAQs guide · 12:45                               |
|                                                                      |
|  +----------------------------------------------------------------+  |
|  |                                                                 |  |
|  |                       🔊                                        |  |
|  |                    AUDIO PLAYER                                 |  |
|  |                                                                 |  |
|  |                  [Audio Waveform Visualization]                 |  |
|  |                                                                 |  |
|  |                                                                 |  |
|  +----------------------------------------------------------------+  |
|  | ⏮️  ⏯️  ⏭️  🔊  1.0x  ⚙️                       03:21 / 12:45 |  |
|  +----------------------------------------------------------------+  |
|                                                                      |
|  Current Section: Equipment Recommendations                           |
|                                                                      |
|  Transcript:                                                         |
|  "For this fight, you'll want to prioritize weapons with bleed       |
|  effects as Malenia is susceptible to hemorrhage. The Rivers of      |
|  Blood katana is particularly effective when upgraded to +9 or +10.  |
|  Alternatively, any weapon with the Seppuku ash of war will..."      |
|                                                                      |
|  Jump to section:                                                    |
|  [Introduction] [Equipment] [Phase 1] [Waterfowl Dance] [Phase 2]    |
|                                                                      |
|  Download options: [MP3] [Podcast Format]                            |
|                                                                      |
+----------------------------------------------------------------------+
```

### 5. Conversational Search Refinement

```
+----------------------------------------------------------------------+
|  [Logo] Tutorial Finder AI                         [Sign In] [Menu ≡] |
+----------------------------------------------------------------------+
|  Search: "minecraft redstone"                                         |
|                                                                      |
|  I found 1,200+ tutorials about Minecraft redstone. Let's narrow this |
|  down to find exactly what you need.                                 |
|                                                                      |
|  What specific redstone mechanism are you looking to build?           |
|  [Basic circuits] [Doors] [Elevators] [Farms] [Other: _________]     |
|                                                                      |
|  User selected: [Doors]                                              |
|                                                                      |
|  What type of door are you interested in?                            |
|  [2x2 Piston Door] [3x3 Piston Door] [Hidden Door] [Combination Lock]|
|                                                                      |
|  User selected: [3x3 Piston Door]                                    |
|                                                                      |
|  What's your experience level with redstone?                         |
|  [Beginner] [Intermediate] [Advanced]                                |
|                                                                      |
|  User selected: [Intermediate]                                        |
|                                                                      |
|  Great! I've found 15 tutorials for intermediate-level 3x3 piston    |
|  doors in Minecraft. Here are the most relevant results:             |
|                                                                      |
|  [Results appear below]                                              |
|                                                                      |
+----------------------------------------------------------------------+
```

### 6. Tutorial Generation Request

```
+----------------------------------------------------------------------+
|  [Logo] Tutorial Finder AI                         [Sign In] [Menu ≡] |
+----------------------------------------------------------------------+
|  Search: "valorant viper lineups on pearl"                           |
|                                                                      |
|  I couldn't find specific tutorials for Viper lineups on the Pearl    |
|  map in Valorant. Would you like me to generate a custom tutorial?    |
|                                                                      |
|  Generate custom tutorial? [Yes] [No, refine search]                  |
|                                                                      |
|  User selected: [Yes]                                                |
|                                                                      |
|  Please provide any specific details to include in the tutorial:      |
|  +----------------------------------------------------------------+  |
|  | I'm looking for post-plant lineups for both A and B sites      |  |
|  +----------------------------------------------------------------+  |
|                                                                      |
|  Select output format:                                               |
|  [✓] Text guide with images                                          |
|  [✓] Audio narration                                                |
|  [ ] Video demonstration                                             |
|                                                                      |
|  Estimated generation time: 2-3 minutes                              |
|  [Generate Tutorial] [Cancel]                                        |
|                                                                      |
|  Note: Generated tutorials are created using AI and may require      |
|  verification in-game. Please provide feedback to improve quality.   |
|                                                                      |
+----------------------------------------------------------------------+
```

### 7. User Profile and History

```
+----------------------------------------------------------------------+
|  [Logo] Tutorial Finder AI                         [Sign In] [Menu ≡] |
+----------------------------------------------------------------------+
|  My Profile                                                          |
|                                                                      |
|  User: GameMaster95                                                  |
|  Member since: June 2023                                             |
|                                                                      |
|  Preferences:                                                        |
|  • Default format: Video with transcript                             |
|  • Voice preference: Voice 3 (British Male)                          |
|  • Difficulty level: Intermediate                                    |
|  • Favorite games: Elden Ring, Valorant, Minecraft                   |
|  [Edit Preferences]                                                  |
|                                                                      |
|  Recent Activity:                                                    |
|  • Viewed: "How to Beat Malenia - Complete Strategy Guide"           |
|    2 hours ago                                                       |
|  • Searched: "valorant viper lineups on pearl"                       |
|    Yesterday at 8:45 PM                                              |
|  • Generated: "Viper Post-Plant Lineups for Pearl Map"               |
|    Yesterday at 8:50 PM                                              |
|  • Rated ★★★★☆: "Minecraft Automatic Sorting System Tutorial"        |
|    3 days ago                                                        |
|                                                                      |
|  [View Full History]                                                 |
|                                                                      |
|  Saved Tutorials:                                                    |
|  • "Advanced Valorant Aiming Techniques"                             |
|  • "Elden Ring Legendary Weapons Guide"                              |
|  • "Minecraft Redstone Computer Basics"                              |
|  [Manage Saved Tutorials]                                            |
|                                                                      |
+----------------------------------------------------------------------+
```

### 8. Mobile Interface - Search and Results

```
+----------------------+    +----------------------+
| [Logo] Tutorial AI   |    | [Logo] Tutorial AI   |
| 🔍 Search...         |    | < Back to Search     |
+----------------------+    +----------------------+
|                      |    | "Elden Ring Malenia" |
| Find gaming tutorials|    | Filter ▼             |
|                      |    +----------------------+
| [Search Box]         |    | [Thumbnail]          |
|                      |    | How to Beat Malenia  |
| Popular:             |    | Complete Guide       |
| [RPG] [FPS] [More>] |    | 15:24 · YouTube      |
|                      |    | ★★★★☆ (4.8)          |
| Recent:              |    |                      |
| [Elden Ring boss]    |    | [Watch] [Listen]     |
| [Minecraft redstone] |    +----------------------+
|                      |    | [Text Icon]          |
| Featured:            |    | Malenia Boss Fight   |
| [Thumbnail]          |    | Tips and Tricks      |
| Advanced Valorant    |    | GameFAQs · 3 days ago|
| Aiming Techniques    |    | ★★★★★ (5.0)          |
|                      |    |                      |
| [Thumbnail]          |    | [Read] [Listen]      |
| Zelda: Tears of the  |    +----------------------+
| Kingdom Shrine Guides|    | [Load More Results]  |
|                      |    |                      |
| [More Featured >]    |    | Can't find what you  |
|                      |    | need? [Generate]     |
+----------------------+    +----------------------+
```

## Component Library

### Buttons

```
+------------------+  +------------------+  +------------------+
|     Primary      |  |    Secondary     |  |     Tertiary     |
+------------------+  +------------------+  +------------------+

+------------------+  +------------------+  +------------------+
|    [Disabled]    |  |      [Icon]      |  |   Icon + Text   |
+------------------+  +------------------+  +------------------+
```

### Input Fields

```
+------------------------------------------------------------------+
| Label                                                             |
| +--------------------------------------------------------------+ |
| | Input text                                                    | |
| +--------------------------------------------------------------+ |
| Helper text                                                       |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
| Label                                                             |
| +--------------------------------------------------------------+ |
| | Input text                                         [Icon/Action]| |
| +--------------------------------------------------------------+ |
| Error message                                                     |
+------------------------------------------------------------------+
```

### Cards

```
+------------------------------------------------------------------+
| [Optional Header]                                                 |
| +--------------------------------------------------------------+ |
| |                                                              | |
| |                         [Content Area]                        | |
| |                                                              | |
| +--------------------------------------------------------------+ |
| [Action] [Action]                                                 |
+------------------------------------------------------------------+
```

### Navigation

```
+------------------------------------------------------------------+
| [Logo] [Primary Nav Item] [Primary Nav Item] [Primary Nav Item] ⚙️ |
+------------------------------------------------------------------+

+----------------------+
| ≡ Menu               |
+----------------------+
| [Nav Item]           |
| [Nav Item]           |
| [Nav Item]           |
| [Nav Item]           |
+----------------------+
| [Footer Actions]     |
+----------------------+
```

## Responsive Behavior

### Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px and above

### Adaptation Guidelines

- Single column layout on mobile
- Two column layout on tablet
- Multi-column layout on desktop
- Touch-friendly tap targets (minimum 44px) on mobile
- Collapsible navigation on smaller screens
- Reduced information density on mobile

## Accessibility Considerations

- Minimum contrast ratio of 4.5:1 for all text
- Focus indicators for keyboard navigation
- ARIA labels for all interactive elements
- Alternative text for all images
- Keyboard accessible controls for media players
- Screen reader compatible markup
- Support for text scaling up to 200%

## Animation and Transitions

- Subtle loading states for search and generation
- Smooth transitions between pages (300ms)
- Microinteractions for user feedback
- Reduced motion option for users with vestibular disorders

## Implementation Notes

- Use a component-based architecture for UI development
- Implement responsive images with appropriate srcset attributes
- Optimize media loading with lazy loading techniques
- Use SVG for icons and simple illustrations
- Implement dark mode support using CSS variables
- Ensure consistent spacing using a defined spacing scale

---

*These mockups represent conceptual designs and may evolve during the implementation phase based on user testing and technical considerations.*