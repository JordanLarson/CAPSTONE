## CAPSTONE FRONTEND

Social media/ surf forecast app that allows users to post on a feed, and search through local breaks in their area.

## Project Link

front-end link: https://github.com/JordanLarson/CAPSTONE

back-end link: https://github.com/JordanLarson/CAPSTONE_backend/edit/master/README.md

live site link: https://keen-hypatia-e7cb8d.netlify.app

## Project Description

A social media/ Surf forecast application that allows users to post on a feed with video, audio or text.
Users can add friends and communicate with them directly.
Users can add video files to their profile page of their favorite surf spot or of them surfing.
Users can add and a profile page and edit the page accordingly.
Users can customize the parameters of their surf report according to what type of wave they're looking for,
water temp/ wave height etc.
Provides a location for users to connect over Surfing, and find people that have recently visited the break.

## WireFrames

mobile: https://www.figma.com/file/E906sS09Dg1RgZkgjEVceE/Surf-Forecast-Mobile?node-id=0%3A1
tablet: https://www.figma.com/file/lpGjUOOclHkLDSIss4qwry/Surfly-Tablet-wireframes?node-id=0%3A1
desktop: https://www.figma.com/file/9ZaOTLbyYS2xt7bBfjZvfV/SURFLY-DESKTOP?node-id=0%3A1

## Frontend/ Backend Architecture

Frontend: https://www.figma.com/file/340qhjrLUgFzXHdjgBGQmo/Components-Tree

Backend: https://www.figma.com/file/QXDLS0peQOEXJ9zLrfTUvj/Untitled?node-id=0%3A1

# USER STORIES

# MVP Matrices

| BackEnd                          | Priority | Estimated Time | Time Invetsted | Actual Time |
| -------------------------------- | :------: | :------------: | :------------: | :---------: |
| User Schema                      |    H     |       1        |       2        |      2      |
| Wave details Schema              |    H     |       1        |       2        |      2      |
| Message Schema                   |    H     |       1        |       1        |      1      |
| Dummy account Seed Data          |    H     |       2        |       4        |      4      |
| Dummy account Routes/Controllers |    H     |       5        |       4        |      4      |
| User/Dummy Server set up         |    H     |       1        |       1        |      1      |
| Surf API database construction   |    H     |       3        |       5        |      5      |
| Message Routes/Controllers       |    H     |       4        |       3        |      3      |
| Message Server set up            |    H     |       1        |       2        |      2      |
| Research info on video upload    |    H     |       2        |       0        |      0      |
| Deploy backend database          |    H     |       3        |       1        |      1      |
| Research axios calls backend     |    H     |       10       |       10       |      10     |
| Total                            |    H     |       34       |                |      35     |

| React/Front End                         | Priority | Estimated Time | Time Invetsted | Actual Time |
| --------------------------------------- | :------: | :------------: | :------------: | :---------: |
| Navbar & Footer                         |    H     |       2        |       3        |      3      |
| React Router                            |    H     |       4        |       3        |      3      |
| Home Page                               |    H     |       1        |       1        |      1      |
| Login Page.                             |    H     |       4        |       5        |      5      |
| Favorites page with your favorite waves |    H     |       5        |       6        |      6      |
| Page with breaks in your local area     |    H     |       2        |       3        |      3      |
| Messaging component                     |    H     |       4        |       5        |      5      |
| Current Feed Page                       |    M     |       6        |       2        |      2      |
| About Page                              |    H     |       2        |       2        |      2      |
| Responsive Design                       |    H     |       6        |       6        |      6      |
| CSS/ Styling                            |    H     |       8        |       4        |      4      |
| Total                                   |    H     |       44       |                |      40      |


# Total Time spent = 75 hours
# Components

| Component             |                         Description                          |
| --------------------- | :----------------------------------------------------------: |
| App                   |                Sets up app with React Router                 |
| Nav                   | Nav guides to about, home, favorites, register, local breaks |
| Router                |              Contains Switch/Routes for content              |
| Footer                |                     Footer for the page                      |
| Form Component-create |       A form that allows users to create their account       |
| Messageboardform      |       A form that allows users to type/ send messages        |
| Favorite Spots Page   |     Page that displays your likes/ favorited surf spots      |
| About Page            |   Page displays the creator of the app, and its intentions   |
| Conversations Page    |          Page that shows your current conversations          |
| Preferences Page      |    Page that lets a user choose their search preferences     |
| Wave details          |    Shared/Reusable component that renders one users data     |

# MVP example

User can search through their local breaks/ spots to find which is best suited for their tastes that day/ skill level
User can post on a message board of the spot that they were looking at to hear feedback/ post content of that spot.
User can set up search paramters, and customize their spots.

# PostMVP

Direct Messages
Authentication/ Login
Automated bot messages for dummy conversations

## Additional Libraries

# Front End:

socket.io
React
Axios

# Back End:

Cors
MongoDB

# Code Snippet
<pre><code>
const renderMedia = (message) => {
    if (message.endsWith(".jpg") || message.endsWith(".gif")) {
      return <img src={message}></img>;
    } else {
      return <span className="message-render-span">{message}</span>;
    }
  };
</pre></code>
# Bugs & Fixes:

