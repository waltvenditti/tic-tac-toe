Tic Tac Toe
===========

see live: https://waltvenditti.github.io/tic-tac-toe/

instructions: use the "Toggle AI" buttons to set the game to single-player (it starts as multiplayer by default). Click one of the Toggle-AI buttons twice to return the setting to multiplayer. "Lemming" AI simply pulls a random move from the set of all remaining legal moves. "Reaper" uses a particular algorithm to choose its move, and is unbeatable. 

Not exactly the most complex of programs, I include in my set of pinned repositories for two reasons: one, I think the styling is pretty cool, and two, the unbeatable "Reaper" AI required groking an algorithm known as "minimax". In all of my studies of programming I find wrapping my head around algorithms to be the most fascinating and enjoyable of tasks, so I couldn't pass up this simple app for inclusion on the pinned list. 

The project itself is assigned in The Odin Project fairly early on in the JavaScript lessons. It requires making use of modules and factories to organize the code, with the goal of having as little global code as possible. The project invites you to write the unbeatable AI as extra credit. There are some webpages that describe how to implement the algorithm specifically in tic-tac-toe, so I was not completely in the dark here. Still, I had to spend some time making sense of what the algorithm actually did, then more time writing my own implementation of it. It took me a few hours to get the thing to work due to a misunderstanding of an aspect of JavaScript (I used a series of for loops for the algorithm, and did not redeclare "i" each time using "let", which caused it to malfunction). 
