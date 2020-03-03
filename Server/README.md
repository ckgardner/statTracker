Stat Tracker Markdown
## Resource

**players**

Attributes:

* player_name (number)
* player_ppg (number)
* player_rebounds (number)
* player_assists (number)
* player_steals (number)
* player_blocks (number)
* player_turnovers (number)
* player_fouls (number)

## REST Endpoints

Name                           | Method | Path
-------------------------------|--------|------------------
Retrieve Players Collection    | GET    | /players
Insert Players member          | POST   | /players
Delete Players member          | DELETE | /players/playerId
Update Players member          | PUT    | /players/playerId