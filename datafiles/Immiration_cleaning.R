#loading packages#
library(readr)
library(dplyr)
library(ggplot2)
library(reshape2)
library(scales)
library(gridExtra)


#EU-28 immigrants data#
EU_immigration <- read_csv("interactive-journalism-module-master/interactive-journalism-module-master/interactive-journalism-module-master/Data Files/EU_immigration.csv", 
                           col_names = FALSE)
EU_immigration.clean <- EU_immigration %>% 
  select(-X1)
names(EU_immigration.clean) <- c("region", "2008", "2009","2010","2011","2012", "2013", "2014", "2015", "2016", "2017")
EU_immigration.clean.melt <- melt(EU_immigration.clean, id="region")
names(EU_immigration.clean.melt) <- c("region", "year", "immigrants")
EU_immigration.clean.melt$year <- as.numeric(as.character(EU_immigration.clean.melt$year))
EU_immigration.clean1 <- EU_immigration.clean.melt

#summarise the total for each year#
EU_immigration_Total <- EU_immigration.clean1 %>%
  mutate(immigrants = as.numeric(as.character(immigrants))) %>%  
  group_by(region) %>%
  summarise(total.count = n(), count = sum(immigrants, na.rm = FALSE ))




#CLEANING AND REGIONAL SUM OF NON-EU IMMIGRATION#

#1 Hovedstaden_Non_EU: read, clean, melt and sum#
Hovedstaden_Non_EU <- read_csv("interactive-journalism-module-master/interactive-journalism-module-master/interactive-journalism-module-master/Data Files/Hovedstaden_Non-EU.csv", 
                               col_names = FALSE)
Hovedstaden_Non_EU.clean <- Hovedstaden_Non_EU %>% 
  select(-X1)
names(Hovedstaden_Non_EU.clean) <- c("region", "2008", "2009","2010","2011","2012", "2013", "2014", "2015", "2016", "2017")
Hovedstaden_Non_EU.clean.melt <- melt(Hovedstaden_Non_EU.clean, id="region")
names(Hovedstaden_Non_EU.clean.melt) <- c("region", "year", "immigrants")
Hovedstaden_Non_EU.clean.melt$year <- as.numeric(as.character(Hovedstaden_Non_EU.clean.melt$year))
Hovedstaden_Non_EU.clean1 <- Hovedstaden_Non_EU.clean.melt

#summarise the total for each year#
Hovedstaden_nonEU_Total <- Hovedstaden_Non_EU.clean1 %>%
mutate(immigrants = as.numeric(as.character(immigrants))) %>%  
group_by(year) %>%
summarise(total.count = n(), count = sum(immigrants, na.rm = FALSE ))


#2 Sjaelland_nonEU: read, clean, melt and sum#
Sjaelland_nonEU <- read_csv("interactive-journalism-module-master/interactive-journalism-module-master/interactive-journalism-module-master/Data Files/Sjaelland_nonEU.csv", 
                            col_names = FALSE)
Sjaelland_nonEU.clean <- Sjaelland_nonEU %>% 
  select(-X1)
names(Sjaelland_nonEU.clean) <- c("region", "2008", "2009","2010","2011","2012", "2013", "2014", "2015", "2016", "2017")
Sjaelland_nonEU.clean.melt <- melt(Sjaelland_nonEU.clean, id="region")
names(Sjaelland_nonEU.clean.melt) <- c("region", "year", "immigrants")
Sjaelland_nonEU.clean.melt$year <- as.numeric(as.character(Sjaelland_nonEU.clean.melt$year))
Sjaelland_nonEU.clean1 <- Sjaelland_nonEU.clean.melt

#summarise the total for each year#
Sjaelland_nonEU_Total <- Sjaelland_nonEU.clean1 %>%
  mutate(immigrants = as.numeric(as.character(immigrants))) %>%  
  group_by(year) %>%
  summarise(total.count = n(), count = sum(immigrants, na.rm = FALSE ))


#3 Syddanmark_nonEU: read, clean, melt and sum#
Syddanmark_nonEU <- read_csv("interactive-journalism-module-master/interactive-journalism-module-master/interactive-journalism-module-master/Data Files/Syddanmark_nonEU.csv", 
                             col_names = FALSE)
Syddanmark_nonEU.clean <- Syddanmark_nonEU %>% 
  select(-X1)
names(Syddanmark_nonEU.clean) <- c("region", "2008", "2009","2010","2011","2012", "2013", "2014", "2015", "2016", "2017")
Syddanmark_nonEU.clean.melt <- melt(Syddanmark_nonEU.clean, id="region")
names(Syddanmark_nonEU.clean.melt) <- c("region", "year", "immigrants")
Syddanmark_nonEU.clean.melt$year <- as.numeric(as.character(Syddanmark_nonEU.clean.melt$year))
Syddanmark_nonEU.clean1 <- Syddanmark_nonEU.clean.melt

#summarise the total for each year#
Syddanmark_nonEU_Total <- Syddanmark_nonEU.clean1 %>%
  mutate(immigrants = as.numeric(as.character(immigrants))) %>%  
  group_by(year) %>%
  summarise(total.count = n(), count = sum(immigrants, na.rm = FALSE ))


#4 Midtjylland_nonEU: read, clean, melt and sum#
Midtjylland_nonEU <- read_csv("interactive-journalism-module-master/interactive-journalism-module-master/interactive-journalism-module-master/Data Files/Midtjylland_nonEU.csv", 
                              col_names = FALSE)
Midtjylland_nonEU.clean <- Midtjylland_nonEU %>% 
  select(-X1)
names(Midtjylland_nonEU.clean) <- c("region", "2008", "2009","2010","2011","2012", "2013", "2014", "2015", "2016", "2017")
Midtjylland_nonEU.clean.melt <- melt(Midtjylland_nonEU.clean, id="region")
names(Midtjylland_nonEU.clean.melt) <- c("region", "year", "immigrants")
Midtjylland_nonEU.clean.melt$year <- as.numeric(as.character(Midtjylland_nonEU.clean.melt$year))
Midtjylland_nonEU.clean1 <- Midtjylland_nonEU.clean.melt

#summarise the total for each year#
Midtjylland_nonEU_Total <- Midtjylland_nonEU.clean1 %>%
  mutate(immigrants = as.numeric(as.character(immigrants))) %>%  
  group_by(year) %>%
  summarise(total.count = n(), count = sum(immigrants, na.rm = FALSE ))



#5 Nordjylland_nonEU: read, clean, melt and sum#
Nordjylland_nonEU <- read_csv("interactive-journalism-module-master/interactive-journalism-module-master/interactive-journalism-module-master/Data Files/Nordjylland_nonEU.csv", 
                              col_names = FALSE)
Nordjylland_nonEU.clean <- Nordjylland_nonEU %>% 
  select(-X1)
names(Nordjylland_nonEU.clean) <- c("region", "2008", "2009","2010","2011","2012", "2013", "2014", "2015", "2016", "2017")
Nordjylland_nonEU.clean.melt <- melt(Nordjylland_nonEU.clean, id="region")
names(Nordjylland_nonEU.clean.melt) <- c("region", "year", "immigrants")
Nordjylland_nonEU.clean.melt$year <- as.numeric(as.character(Nordjylland_nonEU.clean.melt$year))
Nordjylland_nonEU.clean1 <- Nordjylland_nonEU.clean.melt

#summarise the total for each year#
Nordjylland_nonEU_Total <- Nordjylland_nonEU.clean1 %>%
  mutate(immigrants = as.numeric(as.character(immigrants))) %>%  
  group_by(year) %>%
  summarise(total.count = n(), count = sum(immigrants, na.rm = FALSE ))

#Merger all non-EU immigration for different regions#
nonEU_immigration_Total <- merge(Hovedstaden_nonEU_Total, Sjaelland_nonEU_Total, by = "year")
nonEU_immigration_Total1 <- merge(nonEU_immigration_Total, Syddanmark_nonEU_Total, by = "year")
nonEU_immigration_Total2 <- merge(nonEU_immigration_Total1, Midtjylland_nonEU_Total, by = "year")
nonEU_immigration_Total3 <- merge(nonEU_immigration_Total2, Nordjylland_nonEU_Total, by = "year")

names(nonEU_immigration_Total3) <- c("year", "X1", "X2", "X3", "X4", "X5", "X6","X7","X8","X9","X10")
nonEU_immigration_Total4 <- nonEU_immigration_Total3 %>%
  select(-X1, -X3, -X5, -X7, -X9)
names(nonEU_immigration_Total4) <- c("year", "Region Hovedstaden", "Region Sj<e6>lland", "Region Syddanmark","Region Midtjylland", "Region Nordjylland")
                                    

