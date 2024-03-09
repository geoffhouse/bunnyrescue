# bunnyrescue

Rescue virtual bunnies - fun for all the family!

Bunnyrescue was developed during Covid by Geoff House as a way to keep school children entertained during the Easter holidays.

## How to run a Bunny Rescue

To start with, you'll need to set this up on your own server. We recommend DigitalOcean, though you're free to choose.

You'll need to decide start and end dates, and communicate this to your users. Give them plenty of warning to sign up.

Usually you'll want to charge people a nominal fee to enter (and that bit's entirely up to you!). Peoples' email addresses are added to the system and they're ready to go.They'll get an email with a link for them to log in.

Before the start date, you'll need to print out a load of Bunnies (QR codes) and place them around your neighbourhood. You can do this yourself, or delegate to a team. The number of bunnies you want to place is entirely up to you - we generally hide 100-200 for 70 or 80 users.

People click on the link in their email, and choose a team name. Once logged in they can view a map of available bunnies, a list of which bunnies they've found, and a leaderboard showing all registered teams.

In their own time they then set off to find the bunnies. When they find one they scan it with a mobile phone (either in the app or using their own camera app) and log them as found. Each bunny can have a colour and an optional message which appears when scanned.

You can choose the level at which people win a small prize (by default 10) and then award larger prizes to the top finders. It's entirely up to you.

### Lessons we've learned

-   Rather than register multiple accounts per family, charge more and reward with more prizes, but use the same account
-   You'll need a lot of small prizes! If you're a charity, have a word with local supermarkets to see if they'll donate, otherwise you'll need to buy some!
-   Choose your prices carefully. Make sure it's not too cheap, but not so expensive that people expect a significant prize. We tend to charge a few pounds per child, with discounts for multiple children.
-   We recommend cutting each QR code out separately and laminating it around the edge. Otherwise it leaks and is unreadable.

## How it works

Bunnyrescue runs as a NodeJS backend, with a React-based frontend. If you have any problems, please raise them as issues in GitHub.

### Notifications

#### Emails

We use emails to communicate with users.
You'll need to register at SendGrid (https://sendgrid.com/). For the number of emails we're talking about you shouldn't have to spend any real money.

#### Admin

We support admin notifications via Slack, Pushover or Prowl. Slack is easiest and cheapest, and free for this sort of use.
Brace yourself - it's a lot of notifications!

# Installation

//TODO
