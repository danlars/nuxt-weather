export const formatDate = (date: Date | string, locale: string = 'da') => {
    const localDate = new Date(date);
    const options: Record<string, undefined | '2-digit'> = {
        hour: '2-digit',
        minute: '2-digit',
        month: undefined,
        day: undefined,
    };
    const isToday = isSameDay(localDate, new Date());
    const isTomorrow = isSameDay(localDate, new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
    if (!isToday && !isTomorrow) {
        options.day = '2-digit';
        options.month = '2-digit';
    }

    const formatter = new Intl.DateTimeFormat(locale, options);
    const format = formatter.format(localDate);
    if (isToday) {
        return `I dag ${format}`;
    }

    if (isTomorrow) {
        return `I morgen ${format}`;
    }

    return format;
};