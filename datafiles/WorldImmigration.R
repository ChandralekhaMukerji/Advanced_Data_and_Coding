#install xlsx package#
install.packages("openxlsx", dependencies=TRUE)

#loading packages#
library(readr)
library(dplyr)
library(ggplot2)
library(reshape2)
library(scales)
library(gridExtra)
library(openxlsx)


#Number of people who have immigrated to Denmark in last 30 years#
world_immigration <- read_csv("interactive-journalism-module-master/interactive-journalism-module-master/interactive-journalism-module-master/Data Files/world_immigration.csv", 
                              col_names = FALSE)
world_immigration.clean <- world_immigration %>% 
  select(-X1, -X3, -X4, -X5, -X6, -X7, -X8, -X9)
names(world_immigration.clean) <- c("region","1987", "1988","1989","1990","1991", "1992", "1993", "1994", "1995", "1996","1997", "1998","1999","2000","2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009","2010","2011","2012", "2013", "2014", "2015", "2016", "2017")

#melting the data#
world_immigration.clean.melt <- melt(world_immigration.clean, id="region")
names(world_immigration.clean.melt) <- c("region", "year", "immigrants")
world_immigration.clean.melt$year <- as.numeric(as.character(world_immigration.clean.melt$year))
world_immigration.clean1 <- world_immigration.clean.melt

#sum all 30 years for each country#
world_immigration_TOTAL <- world_immigration.clean1 %>%
  mutate(immigrants = as.numeric(as.character(immigrants))) %>%  
  group_by(region) %>%
  summarise(count = sum(immigrants, na.rm = FALSE ))

#converting to excel for dropdown data#
write.xlsx(world_immigration_TOTAL, file = "C:/Users/Me/Documents/interactive-journalism-module-master/interactive-journalism-module-master/interactive-journalism-module-master/Data Files/world_immigration_TOTAL.xlsx", asTable = TRUE)

#cleaning for matching with world bank population data#
world_immigration_TOTAL_Clean <- world_immigration_TOTAL[-c(1, 3, 12, 30, 47, 54, 58, 59, 67, 68, 74, 73, 75, 78, 81, 85, 96, 131, 135, 147, 152, 154, 155, 157, 159, 170, 174, 175, 176, 177, 184, 187, 194, 197, 198, 200, 202, 209, 216, 229, 233, 235, 236), ]


#world population cleaning, data from world bank#
world_populationWB <- read_csv("interactive-journalism-module-master/interactive-journalism-module-master/interactive-journalism-module-master/Data Files/world_populationWB.csv")
names(world_populationWB) <- c("X1", "X2", "Country", "X4", "X5", "X6", "X7","X8", "X9", "X10", "X11", "X12", "X13", "X14","X15", "X16")
world_populationWB.clean <- world_populationWB %>% 
  select(-X1, -X2, -X4, -X5, -X6, -X7, -X8, -X9, -X10, -X11, -X12, -X13, -X14, -X16)
names(world_populationWB.clean) <- c("region","population")

#cleaning for matching with denmark immigration data#
world_populationWB.clean_Final <- world_populationWB.clean[-c(4, 28, 29, 37, 40, 54, 69, 74, 75, 79, 94, 129, 141, 146, 150, 172, 181, 182, 183, 184, 194, 213, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269), ]

#matching World Bank population data's country names with Denmark's immigration data country names in order to be able to merge data sets#
# Code: data.frame[row_number, column_number] = new_value#

world_populationWB.clean_Final[48, 1] = Ivory_Coast




