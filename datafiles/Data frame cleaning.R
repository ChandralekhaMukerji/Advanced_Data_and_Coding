# load packages#
library(readr)
library(dplyr)
library(ggplot2)
library(reshape2)
library(scales)
library(gridExtra)
library(openxlsx)

#Cleaning Regional Danish Population Vs Immigrants#
Danish_population <- read_csv("interactive-journalism-module-master/interactive-journalism-module-master/interactive-journalism-module-master/Data Files/Danish_populationQ17.csv", 
                              col_names = FALSE)
Danish_population.clean <- Danish_population %>% 
  select(-X1, -X2)
names(Danish_population.clean) <- c("region", "total", "Danes")
#calculations of % of immigrant population by region#
Danish_population.clean<- Danish_population.clean %>%
  mutate(immigrants = total-Danes, ImmigrantPercentage= immigrants/total*100)

#Cleaning of economic activity rate data#
economic_activity <- read_csv("interactive-journalism-module-master/interactive-journalism-module-master/interactive-journalism-module-master/Data Files/economic_activity.csv", 
    col_names = FALSE)
economic_activity.clean <- economic_activity %>% 
  select(-X1)
names(economic_activity.clean) <- c("region", "2008", "2009","2010","2011","2012", "2013", "2014", "2015", "2016", "2017")

#Economic Activity rate mean#
economic_activity.clean.melt <- melt(economic_activity.clean, id="region")
names(economic_activity.clean.melt) <- c("region", "year", "immigrants")
economic_activity.clean.melt$year <- as.numeric(as.character(economic_activity.clean.melt$year))
economic_activity.clean1 <- economic_activity.clean.melt
economic_activity.mean.clean1.mean <- aggregate(economic_activity.clean1[, 3], list(economic_activity.clean1$region), mean)
names(economic_activity.mean.clean1.mean) <- c("region", "Economic Activity Rate")

#Cleaning unemployment benefits#
Unemployment_benefits <- read_csv("interactive-journalism-module-master/interactive-journalism-module-master/interactive-journalism-module-master/Data Files/Unemployment_benefits.csv", 
                                  col_names = FALSE)
Unemployment_benefits.clean <- Unemployment_benefits %>% 
  select(-X1)
names(Unemployment_benefits.clean) <- c("region", "2008", "2009","2010","2011","2012", "2013", "2014", "2015", "2016", "2017")

#Unemployment benefits mean for last 10 years#
Unemployment_benefits.clean.melt <- melt(Unemployment_benefits.clean, id="region")
names(Unemployment_benefits.clean.melt) <- c("region", "year", "benefits")
Unemployment_benefits.clean.melt$year <- as.numeric(as.character(Unemployment_benefits.clean.melt$year))
Unemployment_benefits.clean1 <- Unemployment_benefits.clean.melt
Unemployment_benefits.clean1.mean <- aggregate(Unemployment_benefits.clean1[, 3], list(Unemployment_benefits.clean1$region), mean)
names(Unemployment_benefits.clean1.mean) <- c("region", "Avg_Benefits")

# merge the two datasets#
Danish_population.merge <- merge(Danish_population.clean, Unemployment_benefits.clean1.mean, by="region")
Danish_population.merge1 <- merge(Danish_population.merge,economic_activity.mean.clean1.mean, by="region")


#Cleaning of employment rate data#
employment_rate <- read_csv("interactive-journalism-module-master/interactive-journalism-module-master/interactive-journalism-module-master/Data Files/employment_rate.csv", 
                                                         col_names = FALSE)
employment_rate.clean <- employment_rate %>% 
  select(-X1)
names(employment_rate.clean) <- c("region", "2008", "2009","2010","2011","2012", "2013", "2014", "2015", "2016", "2017")


#Cleaning of unemployment data#
unemployement <- read_csv("interactive-journalism-module-master/interactive-journalism-module-master/interactive-journalism-module-master/Data Files/unemployement.csv", 
                          col_names = FALSE)
unemployement.clean <- unemployement %>% 
  select(-X1)
names(unemployement.clean) <- c("region", "2008", "2009","2010","2011","2012", "2013", "2014", "2015", "2016", "2017")

#Unemployement mean#
unemployement.clean.melt <- melt(unemployement.clean, id="region")
names(unemployement.clean.melt) <- c("region", "year", "immigrants")
unemployement.clean.melt$year <- as.numeric(as.character(unemployement.clean.melt$year))
unemployement.clean1 <- unemployement.clean.melt
unemployement.clean1.mean <- aggregate(unemployement.clean1[, 3], list(unemployement.clean1$region), mean)
names(unemployement.clean1.mean) <- c("region", "Avg. Unemployment Rate")

# merge the two datasets#
Danish_population.merge2 <- merge(Danish_population.merge1,unemployement.clean1.mean, by="region")

# calculating percentage of population claiming unemployment benefits#
Danish_population.FINAL<- Danish_population.merge2 %>%
  mutate(percentage_claiming_benefits = Avg_Benefits/total*100)

#cleaning table keeping only relevant columns#
Danish_population.FINAL1 <- Danish_population.FINAL %>% 
  select(-Danes, -immigrants, -Avg_Benefits)

#scatter plot made using plotly#



