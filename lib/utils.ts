import * as React from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, startOfWeek, endOfWeek } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from "@/types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const safeDate = (dateStr: string) => {
    try {
        if (!dateStr) return new Date();
        if (dateStr.includes('T')) return new Date(dateStr);
        return new Date(dateStr + 'T00:00:00');
    } catch (e) { return new Date(); }
};

export const getWeekRange = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day; // Start week on Sunday
    const start = new Date(d.setDate(diff));
    start.setHours(0, 0, 0, 0);
    const end = new Date(new Date(start).setDate(start.getDate() + 6));
    end.setHours(23, 59, 59, 999);
    return { start, end };
};

export const formatDateRange = (start: Date, end: Date) => {
    const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    const fmt = (d: Date) => `${d.getDate()} ${months[d.getMonth()]}`;
    return `${fmt(start)} - ${fmt(end)}`;
};

export const getWeekString = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), 0, 1);
    const pastDays = (date.getTime() - firstDay.getTime()) / 86400000;
    const weekNum = Math.ceil((pastDays + firstDay.getDay() + 1) / 7);
    return `W${weekNum}`;
};

export const mapApiToLocal = (tx: any): Transaction => {
    const d = tx.date ? new Date(tx.date) : new Date();
    const localDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    const dateStr = localDate.toISOString().split('T')[0];
    const range = getWeekRange(localDate);
    const weekStr = formatDateRange(range.start, range.end).trim();

    return { ...tx, date: dateStr, week: weekStr };
};

export const generateId = () => {
    return uuidv4();
};
