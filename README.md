# Pre-work - _Memory Game_

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program.

Submitted by: **Kiki Yem**

Time spent: **30** hours spent in total

Link to project: https://kiki-memory-game.glitch.me/

## Required Functionality

The following **required** functionality is complete:

- [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
- [x] "Start" button toggles between "Start" and "Stop" when clicked.
- [x] Game buttons each light up and play a sound when clicked.
- [x] Computer plays back sequence of clues including sound and visual cue for each button
- [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess.
- [x] User wins the game after guessing a complete pattern
- [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

- [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
- [x] Buttons use a pitch (frequency) other than the ones in the tutorial
- [x] More than 4 functional game buttons
- [x] Playback speeds up on each turn
- [x] Computer picks a different pattern each time the game is played
- [ ] Player only loses after 3 mistakes (instead of on the first mistake)
- [x] Game button appearance change goes beyond color (e.g. add an image)
- [x] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
- [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] Changed Favicon
- [x] Background lights
- [x] Start,Game Over, Win Pop up Screen with Audio and the score display in game disappears when popup screen appears
- [x] Added "Intense" Game Mode with more buttons and faster speed
- [x] Changed layout of buttons
- [x] Added "Play Again" and "Menu buttons"
- [x] Counts Score and High Score that corresponds to Game Mode
- [x] Leaderboard for each mode
- [x] Asking player to submit their name at the end of the game to add them to the leaderboard and making the submit section disapper after

## Video Walkthrough (GIF)

If you recorded multiple GIFs for all the implemented features, you can add them here:

![Classic Mode](http://g.recordit.co/dcCd11yxzW.gif)
![Intense Mode](http://g.recordit.co/fyRgYWPqVE.gif)
![Leaderboard](http://g.recordit.co/eK0bdTegXh.gif)




## Reflection Questions

1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here.
   - https://www.youtube.com/watch?v=OLaFw0SXhXg
     This video helped me learn the basic structure of creating the game pop up screens
   - https://www.w3schools.com/
     This website helped me learn html, css, javascript syntax
   - https://www.cdnfonts.com/games.font
     Used for the game font to add to the game aesthetics
   - https://www.sliderrevolution.com/resources/css-border-animation/
     Moditfied the code for 'CSS Border Animation'for the light up background to add to the game aesthetics
   - https://mixkit.co/free-sound-effects/
     Used for audio files
   - https://fontawesome.com/
     Used for icons
2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)
   
     One challenge I faced while creating this game was the process of generating the random pattern feature and debugging it. At first, I was a bit overwhelmed because this was the first optional feature I decided to implement and I had very little experience in javascript. However, I approached the feature by thinking about what I would do to create a random pattern in python. I wanted to create a list where a number generated in a random number generator function could be appended into the list. I pictured the code needed in python and searched online for the javascript syntax needed to write the similar code in javascript. I learned that “push” in javascript is similar to “append” in python. I also learned that there was a Math.random() function and the syntax needed to call integers between 2 numbers.
   
   At first I couldn’t figure out how the code broke the game, however, I decided to test the code by displaying the pattern on the website. I realized that the pattern function was being called at the wrong time in the start game function. After I fixed that I ran into another bug where every time I stopped and started the game again the pattern wasn’t resetting and there was a random pattern being pushed into the array including the previous pattern. It took me a while after logically thinking out the steps of the code to figure out that I needed to put an empty pattern array in the start game function.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)
  
      One question I have about web development is what is a good/proper way to plan what to code and stay on track with the plan. I ask this because before I started to code the optional features of the game I had a course of action (such as first creating the random pattern, then making a game over screen etc), however, I get sidetracked on focusing on the aesthetic layout of the screen even though I end up changing it later. For example, I focus time on centering the buttons on the game over screen, but then when I tweak the font and font size the layout changes and I have to go back and reposition the button. It’s part of the reason why I spent so much time on this project.
	    
      Another question I had was is there an efficient way to easily turn the html/css/javascript files into app files. I thought of this because not many people use the web for arcade games. The game would be more used as an app. I’m currently taking the CodePath IOS course learning how to make apps using swift. So, I was wondering if I would have to manually convert the html/css/javascript files into swift files.
      
      I was also wondering how web developers stay creative in implementing new features and improving old ones. I searched up how the original Simon game worked and looked at other arcade modes. But, I was wondering what developers do when they are making new features with no previous projects to look at.

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)
   
      I would have liked to add a new function that makes the random number for the pattern generate a new number if a number is repeated after 2 times. Sometimes when I played one button would repeat 3 or more times making the game too easy and boring.
       
      I started working on a leaderboard, however, I didn’t have time to fully develop it. If I had more time I would like to save the leaderboard scores across starts. I am also wondering if there is a better way to make a leaderboard either with other languages or third party databases to save the scores. I also didn’t have time to figure out how to sort the leaderboard by score, add to the leaderboard only if the score is higher than the lowest score, and add only if there are less than 10 people on the leaderboard. I also want to limit the number of characters they can input as their name and limit the kinds of words they can use to make sure it’s appropriate.
       
      In addition, I would’ve like to figure out how to make my current game modes truly endless if the patterns were guessed correctly. The game currently has a pattern length of 100 to mimic the endless game.

## Interview Recording URL Link

[My 5-minute Interview Recording](https://cdn.glitch.me/9b5dd601-1878-4a6b-9bfe-0bf5fbbb62da/video4884812632.mp4?v=1648778846807)

## License

    Copyright [Kiki Yem]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.# Pre-work - *Memory Game*
