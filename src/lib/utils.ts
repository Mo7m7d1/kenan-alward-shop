import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isVariableValid(variable: any) {
	return variable !== null && variable !== undefined;
}

export async function delay(ms: number) {
	await new Promise((res) => setTimeout(res, ms));
}

export function formatDateArabic(dateString: string): string {
	const monthsArabic = [
		"يناير",
		"فبراير",
		"مارس",
		"أبريل",
		"مايو",
		"يونيو",
		"يوليو",
		"أغسطس",
		"سبتمبر",
		"أكتوبر",
		"نوفمبر",
		"ديسمبر",
	];

	const daysArabic = [
		"الأحد",
		"الاثنين",
		"الثلاثاء",
		"الأربعاء",
		"الخميس",
		"الجمعة",
		"السبت",
	];

	const date = new Date(dateString);
	const day = daysArabic[date.getUTCDay()];
	const month = monthsArabic[date.getUTCMonth()];
	const dayOfMonth = date.getUTCDate();
	const year = date.getUTCFullYear();
	const time = date.toLocaleTimeString("ar-EG", {
		hour: "2-digit",
		minute: "2-digit",
	});

	return `${day}، ${dayOfMonth} ${month} ${year} ${time}`;
}

export const formatMoney = (amount: number) => {
	if (typeof amount !== "number" || isNaN(amount)) {
		return "NaN";
	}
	return `${amount.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})} ر.س`;
};
