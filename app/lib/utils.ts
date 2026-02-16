import { format ,parseISO } from "date-fns";

// 日期格式化函数
export function formatDate(dateString: string) {
    return format(parseISO(dateString), 'MMM dd yyyy');
}

