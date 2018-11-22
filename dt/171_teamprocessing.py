import pandas as pd


# team data processing
def getTeamStats(year):
    indices = ["", " (1)", " (2)", " (3)", " (4)"]
    o = []
    for i in indices:
        txt = "data/teamstats/" + str(year) + "/offense/team-stats" + i + ".csv"
        o.append(pd.read_csv(txt))
    tot = o[0]
    tot['curYear'] = year
    tot['nextYear'] = year + 1
    for i in range(1, len(o)):
        tot = pd.merge(tot, o[i], on="TeamName")
        
    d = []
    for i in indices:
        txt = "data/teamstats/" + str(year) + "/defense/team-stats" + i + ".csv"
        d.append(pd.read_csv(txt))
    for i in range(0, len(d)):
        tot = pd.merge(tot, d[0], on="TeamName")
    
        
        
#     o1 = "data/teamstats/" + str(year) + "offense/team-stats.csv"
#     o2 = "data/teamstats/" + str(year) + "offense/team-stats (1).csv"
#     o3 = "data/teamstats/" + str(year) + "offense/team-stats (2).csv"
#     o4 = "data/teamstats/" + str(year) + "offense/team-stats (3).csv"
#     o5 = "data/teamstats/" + str(year) + "offense/team-stats (4).csv"
#     offense = pd.merge(o1,o2, on="TeamName")
#     offense = pd.merge(offense,o3, on="TeamName")
#     offense = pd.merge(offense,o4, on="TeamName")
#     offense = pd.merge(offense,o5, on="TeamName")
    
#     d1 = "data/teamstats/" + str(year) + "defense/team-stats.csv"
#     d2 = "data/teamstats/" + str(year) + "defense/team-stats (1).csv"
#     d3 = "data/teamstats/" + str(year) + "defense/team-stats (2).csv"
#     d4 = "data/teamstats/" + str(year) + "defense/team-stats (3).csv"
#     d5 = "data/teamstats/" + str(year) + "defense/team-stats (4).csv"
#     defense = pd.merge(o1,o2, on="TeamName")
#     defense = pd.merge(defense,o3, on="TeamName")
#     defense = pd.merge(defense,o4, on="TeamName")
#     defense = pd.merge(defense,o5, on="TeamName")
#     total = pd.merge(offense, defense, on="Teamname")
    return tot
    
l = []
for i in range(2009, 2018):
    x = getTeamStats(i)
    l.append(x)
d = pd.concat(l)

d.to_csv("data.csv")
