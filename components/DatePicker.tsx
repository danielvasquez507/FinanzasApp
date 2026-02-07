import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
    value: string;
    onChange: (date: string) => void;
    onClose: () => void;
}

const DatePicker = ({ value, onChange, onClose }: DatePickerProps) => {
    const [viewDate, setViewDate] = useState(() => {
        if (!value) return new Date();
        const d = new Date(value);
        d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
        return d;
    });

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    return (
        <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2rem] p-6 shadow-2xl animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
                <button onClick={() => setViewDate(new Date(year, month - 1, 1))} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"><ChevronLeft size={20} className="text-slate-500" /></button>
                <span className="text-lg font-bold text-slate-800 dark:text-white capitalize">{monthNames[month]} {year}</span>
                <button onClick={() => setViewDate(new Date(year, month + 1, 1))} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"><ChevronRight size={20} className="text-slate-500" /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(d => <span key={d} className="text-xs font-bold text-slate-400 py-2">{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const d = i + 1;
                    const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
                    const isSelected = value === dateStr;
                    return (
                        <button
                            key={d}
                            onClick={() => { onChange(dateStr); onClose(); }}
                            className={`w-full aspect-square rounded-xl text-sm font-bold flex items-center justify-center transition-all active:scale-95 ${isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                        >
                            {d}
                        </button>
                    );
                })}
            </div>
            <button onClick={onClose} className="w-full mt-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Cancelar</button>
        </div>
    );
};

export default DatePicker;
