export default function ToLongDate(timestamp) {
    const date = new Date(timestamp);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const longDate = date.toLocaleString('en-US', options);

    return longDate;
}
