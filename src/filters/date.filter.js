export default function dateFilter(dateValue, dateFormat = 'date') {
    const options = {}

    if(dateFormat.includes('date')) {
        options.day = '2-digit'
        options.month = 'long'
        options.year = 'numeric'
    }

    if(dateFormat.includes('time')) {
        options.second = '2-digit'
        options.minute = '2-digit'
        options.hour = '2-digit'
    }
    return new Intl.DateTimeFormat('en-US', options).format(dateValue)
}