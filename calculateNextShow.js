function formatDate(date) {
    var isoString = date.toISOString();
    var formattedString = encodeURIComponent(isoString);
    return formattedString;
}

function getMinMaxDates() {
    const MONTH_SPAN = 4;

    var currentTime = new Date();
    var timeMin = new Date(currentTime);
    timeMin.setHours(currentTime.getHours() - 1);
    var timeMax = new Date(currentTime);
    timeMax.setMonth(currentTime.getMonth() + MONTH_SPAN);

    // Format the dates in the required format
    var formattedTimeMin = formatDate(timeMin);
    var formattedTimeMax = formatDate(timeMax);

    return [formattedTimeMin, formattedTimeMax]
}

async function firstCalenderItem(matchString) {
    console.log("starting CALANDER SEARCH")
    try {
        const minMax = getMinMaxDates();

        console.log(minMax)


        // Replace 'your_api_url' with the actual API endpoint
        const response = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/j2i05osj76t7okeeulcn08m06g%40group.calendar.google.com/events?`+
            `key=AIzaSyDwLcNXDnv934vAvhPAblJ0KhclAK7k2Sc&`+
            `timeMin=${minMax[0]}&`+
            `timeMax=${minMax[1]}&`+
            `singleEvents=true&`+
            `maxResults=9999`+
            `#fromHistory`
            );
        
        if (!response.ok) {return false}

        const jsonData = await response.json();

        // Loop through json.items array
        for (let i = 0; i < jsonData.items.length; i++) {
            const item = jsonData.items[i];
            // console.log(item.summary)
            if (item.summary == matchString) {
                const eventData = item.start  
                return eventData
            }
        }
        
        console.log("COULD NOT FIND - RETURNING FALSE")
        return false
    } catch (error) {
        console.log("ERROR")
        return false
    }
}

function toHumanDate(eventData){

const startTime = eventData.dateTime
const timeZone = eventData.timeZone

// Convert timestamp to user's local time
const userLocalTime = new Date(startTime);
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const localTime = userLocalTime.toLocaleString('en-US', { timeZone: userTimezone });

let hour = userLocalTime.getHours();
const minute = userLocalTime.getMinutes();

const PMorAM = hour >= 12 ? 'pm' : 'am';

if (hour > 12) {
    hour = hour - 12;
}

// Format the date in human-readable form
const ordinalSuffix = (n) => {
    let number = Number(n);
    if(number < 20 && number > 10) return "th"
    number = number % 10;
    if(number === 1) return "st"
    if(number === 2) return "nd"
    if(number === 3) return "rd"
    return "th"
};

const date = userLocalTime.getDate();
const formattedDate = `${date}${ordinalSuffix(date)}`;
// get month name
const month = userLocalTime.toLocaleString('en-US', { month: 'long' });

// // Display the formatted date and time
return `${month} ${formattedDate} at ${hour}:${minute < 10 ? '0' : ''}${minute} ${PMorAM}`
}


async function getNextShowText(){
    SHOW_NAME = "Paul from CA"
    const firstShow = await firstCalenderItem(SHOW_NAME);
    if (firstShow == false) {return "Unknown at this time"}
    const humanDate = toHumanDate(firstShow);
    return humanDate
}

async function mainX(){
    const nextShowText = await getNextShowText();
    document.getElementById("next-show-date").textContent = nextShowText;
}
mainX()