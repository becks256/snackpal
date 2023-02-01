import { writeFile } from "fs"

const foodItems = {
  proteins: [
  "sliced ham with american cheese",
  "sliced salami with american cheese",
  "sliced turkey with swiss cheese",
  "sliced ham",
  "sliced salami",
  "sliced turkey",
  "swiss cheese slices",
  "american cheese slices",
  "cheese wheels",
  "yogurt",
  "cottage cheese",
  "boiled egg"
],
veggies: [
  "celery with peanut butter",
  "broccoli with ranch",
  "carrots with ranch",
  "cauliflower with ranch",
  "green beans",
  "bell peppers with ranch"
],
fruits: [
  "apple slices",
  "banana with nutela",
  "orange slices",
  "kiwi slices",
  "blueberries",
  "strawberries",
  "blackberries",
  "raspberries",
  "olives",
  "peach/nectarine slices",
  "raisins",
  "mama chia pouch"
],
grains: [
  "rice cakes",
  "cheerios",
  "crackers",
  "bunny grams",
  "gold fish",
  "toast with peanut butter",
  "toast with butter and honey",
  "toast with butter and cinnamon sugar",
  "pretzel thins",
  "waffle strips",
]}

const random = (min, max) => min + Math.floor(Math.random() * (max - min));

const getProtein = () => foodItems.proteins[random(0, foodItems.proteins.length - 1)]

const getRandomNumberOfFoodItems = () => random(1, Object.keys(foodItems).length - 1)

const getAdditionalFoodItems = () => {
  const choices = []
  const groups = ["fruits", "veggies", "grains"]
  const count = getRandomNumberOfFoodItems()

  for (let i = 0; i < count; i++) {
    const foodGroup = groups[random(0, groups.length - 1)]
    const groupIndex = random(0, foodItems[foodGroup].length - 1)
    choices.push(foodItems[foodGroup][groupIndex])
    groups.splice(groups.indexOf(foodGroup), 1)
  }

  return choices.join(" + ")
}

const WeeklySnackList = () => {
  const snackList = []
  const numberOfSnacks = 7
  //const csvData = []

  for (let i = 0; i < numberOfSnacks; i++) {
    snackList.push(`${getProtein()} + ${getAdditionalFoodItems()}`)
  }

  // const weeklyArray = snackList.reduce((resultArray, item, index) => { 
  //   const chunkIndex = Math.floor(index / 7)
  
  //   if(!resultArray[chunkIndex]) {
  //     resultArray[chunkIndex] = [] // start a new chunk
  //   }
  
  //   resultArray[chunkIndex].push(item)
  
  //   return resultArray
  // }, [])

  // for (let i in weeklyArray) {
  //   const item = weeklyArray[i]
  //   for (let y in item) {
      
  //   }
  // }
  console.log(snackList)
  return snackList
}

const MonthlySnackList = () => {
  const numberOfWeeks = new Array(4).fill(0)
  const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const weeklySnacks = {}

  for (let i in numberOfWeeks) {
    let snacksForWeek = WeeklySnackList()
    if (!weeklySnacks[`Week ${+i + 1}`]) {
      weeklySnacks[`Week ${+i + 1}`] = {}
    }
    for (let y in snacksForWeek) {
      weeklySnacks[`Week ${+i + 1}`][dayOfWeek[y]] = snacksForWeek[y]
    }
  }

  return weeklySnacks
}


const generateCsvSnackList = () => {

  const allSnacks = MonthlySnackList()

  let csvData = `${["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",].toString()},\n`

  for (let week in allSnacks) {
    for (let day in allSnacks[week]) {
      csvData += `${allSnacks[week][day]},`
    }
    csvData += "\n"
  }

  writeFile(`${process.env.DESTINATION_PATH}/${snackList.csv}`, csvData, (err) => {
    if (err) {
      console.log(error)
    }
  })

  return csvData
}

generateCsvSnackList()
