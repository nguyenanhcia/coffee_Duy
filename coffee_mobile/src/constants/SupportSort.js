export const sortReceipt = function(typeFilter, result) {
    switch (typeFilter) {
        case 'day':
            var now = new Date();
            now.setHours(0, 0, 0, 0);

            var endNow = new Date();
            endNow.setHours(23, 59, 59, 999);
            return result.timeCreated >= now.getTime() && result.timeCreated <= endNow.getTime();
        case 'yesterday':
            var startYesterday = new Date();
            startYesterday.setDate(startYesterday.getDay() - 1);
            startYesterday.setHours(0, 0, 0, 0);
            var endYesterday = new Date();
            endYesterday.setDate(endYesterday.getDay() - 1);
            endYesterday.setHours(23, 59, 59, 999);
            return result.timeCreated >= startYesterday.getTime() && result.timeCreated <= endYesterday.getTime();
        case 'week':
            var startWeek = new Date();
            var dayStartWeek = startWeek.getDay();
            var monday = new Date(startWeek.getFullYear(), startWeek.getMonth(), startWeek.getDate() + (dayStartWeek === 0 ? -6 : 1) - dayStartWeek);
            monday.setHours(0, 0, 0, 0);

            const endWeek = new Date();
            const dayEndWeek = endWeek.getDay();
            let sunday = new Date(endWeek.getFullYear(), endWeek.getMonth(), endWeek.getDate() + (dayEndWeek === 0 ? 0 : 7) - dayEndWeek);
            sunday.setHours(23, 59, 59, 999);
            return result.timeCreated >= monday.getTime() && result.timeCreated <= sunday.getTime();
        case 'month':
            var startMonth = new Date();
            startMonth.setHours(0, 0, 0, 0);
            startMonth.setDate(1);

            var endMonth = new Date();
            endMonth.setHours(0, 0, 0, 0);
            endMonth.setDate(1);
            endMonth.setMonth(endMonth.getMonth() + 1);
            return result.timeCreated >= startMonth.getTime() && result.timeCreated <= endMonth.getTime() - 1;
        default:
            return true;
    }
}