 ![logo](https://github.com/pkong97/hackthe90s/blob/master/views/images/LOGO.png)
 # [Get a Room](https://devpost.com/software/get-a-room-x0ewl1)
 
 ## Inspiration
The 90's was rife with internet chat rooms - AOL, MSN, Yahoo! Pager... There's something remarkably fun about jumping into a room anonymously and meeting interesting people. We wanted to bring that experience to the 21st century, but with a romantic twist!

## What it does
Get a Room matches two users and gets them to answer a series of questions about their interests (think newlywed game). Each answer that matches earns them points and if have enough points by the end, they are able to chat with each other!

## How we built it
**Front end**
Our designers used Adobe Illustrator and After Effects to design the UI. It was then implemented with HTML5, CSS3, and Javascript.

**Back end**
We used PostgreSQL, node.js, and express.js to create a database that stores and returns usernames and question responses. For the response matching, we used regular expression matching to determine if two answers were the same.

## Challenges we ran into
There were authentication obstacles with hosting the database on Heroku. We ended up using ngrok to create a secure tunnel to our localhost. 

## Accomplishments that we're proud of
WE LEARNED A BUNCH! We picked up socket.io, node.js, and PostgreSQL to build a functioning chat application. We're also super happy with how the UI looks. 

## What we learned
Socket.io, node.js, PostgreSQL.

## What's next for Get A Room
We would like to fully implement the UI and use natural language processing to improve the answer matching.
