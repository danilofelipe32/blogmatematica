const monthMap: { [key: string]: number } = {
    'janeiro': 0,
    'fevereiro': 1,
    'março': 2,
    'marco': 2, // Common variation
    'abril': 3,
    'maio': 4,
    'junho': 5,
    'julho': 6,
    'agosto': 7,
    'setembro': 8,
    'outubro': 9,
    'novembro': 10,
    'dezembro': 11
};

export const parsePortugueseDate = (dateString: string): Date => {
    // Example: "5 de Outubro, 2025"
    try {
        const parts = dateString.replace(',', '').split(' ');
        if (parts.length < 4 || parts[1] !== 'de') {
            console.warn(`Could not parse date: ${dateString}. Falling back to current date.`);
            return new Date();
        }
        
        const day = parseInt(parts[0], 10);
        const monthName = parts[2].toLowerCase();
        const year = parseInt(parts[3], 10);
        
        const month = monthMap[monthName];
        
        if (!isNaN(day) && month !== undefined && !isNaN(year)) {
            // Create date in UTC to avoid timezone issues
            return new Date(Date.UTC(year, month, day));
        }
        
        console.warn(`Could not parse date components: ${dateString}. Falling back to current date.`);
        return new Date();
    } catch (e) {
        console.error(`Error parsing date string: "${dateString}"`, e);
        return new Date(); // Fallback
    }
};
