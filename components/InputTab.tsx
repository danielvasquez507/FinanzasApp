import React from 'react';
import { ICON_LIB } from '@/lib/icons';
import { safeDate } from '@/lib/utils';
import { Category } from '@/types';

interface InputTabProps {
    amount: string;
    setAmount: (val: string) => void;
    categories: Category[];
    selectedCat: Category | null;
    setSelectedCat: (cat: Category) => void;
    subCat: string;
    setSubCat: (sub: string) => void;
    date: string;
    setCalendarTarget: (target: 'new' | 'edit') => void;
    setCalendarModal: (open: boolean) => void;
    notes: string;
    setNotes: (val: string) => void;
    handleSave: () => void;
}

const InputTab = ({
    amount,
    setAmount,
    categories,
    selectedCat,
    setSelectedCat,
    subCat,
    setSubCat,
    date,
    setCalendarTarget,
    setCalendarModal,
    notes,
    setNotes,
    handleSave
}: InputTabProps) => {
    return (
        <div className="pt-4 px-4 pb-5 space-y-5 animate-in slide-in-from-right-10 h-full flex flex-col">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block text-center mb-2">Monto (TC)</span>
                <div className="flex justify-center items-center mb-2 text-slate-800 dark:text-white">
                    <span className="text-4xl text-slate-300 font-light mr-1">$</span>
                    <input
                        type="number"
                        step="0.01"
                        aria-label="Ingresar monto"
                        title="Monto de la transacción"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        onBlur={() => {
                            if (amount) {
                                const val = parseFloat(amount);
                                if (!isNaN(val)) setAmount(val % 1 === 0 ? val.toString() : val.toFixed(2));
                            }
                        }}
                        className="text-6xl font-bold bg-transparent w-full text-center outline-none placeholder:text-slate-100 dark:placeholder:text-slate-800"
                        autoFocus
                    />
                </div>
            </div>
            <div className="flex-1 space-y-3">
                <div className="overflow-x-auto pb-2 no-scrollbar">
                    <div className="flex gap-3">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => { setSelectedCat(cat); setSubCat(''); }}
                                aria-label={`Seleccionar categoría ${cat.name}`}
                                title={`Categoría ${cat.name}`}
                                className={`flex-shrink-0 flex flex-col items-center gap-1 min-w-[70px] p-2 rounded-2xl border-2 transition-all ${selectedCat?.id === cat.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 opacity-100' : 'border-transparent bg-white dark:bg-slate-900 opacity-60 hover:opacity-100'}`}
                            >
                                <div className={`p-2 rounded-full ${selectedCat?.id === cat.id ? 'text-blue-600' : 'text-slate-500'}`}>
                                    {ICON_LIB[cat.iconKey]}
                                </div>
                                <span className="text-[9px] font-bold text-slate-700 dark:text-slate-300 text-center leading-tight truncate w-full">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
                {selectedCat && (
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 animate-in fade-in">
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block ml-1">Subcategoría</label>
                        <div className="flex flex-wrap gap-2">
                            {selectedCat.subs.map(sub => (
                                <button
                                    key={sub}
                                    onClick={() => setSubCat(sub)}
                                    aria-label={`Subcategoría ${sub}`}
                                    title={`Subcategoría: ${sub}`}
                                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${subCat === sub ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-700'}`}
                                >
                                    {sub}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                <div className="flex gap-2 pt-2">
                    <button
                        onClick={() => { setCalendarTarget('new'); setCalendarModal(true); }}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full px-4 py-3 text-xs font-bold text-slate-600 dark:text-slate-300 outline-none w-1/3 text-center active:scale-95 transition-transform"
                        aria-label="Cambiar fecha"
                    >
                        {new Date(safeDate(date)).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                    </button>
                    <input
                        type="text"
                        aria-label="Descripción o nota"
                        title="Descripción"
                        placeholder="Nota..."
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full px-4 py-3 text-xs font-bold outline-none dark:text-white"
                    />
                </div>
            </div>
            <button
                onClick={handleSave}
                disabled={!amount || !selectedCat || !subCat}
                aria-label="Guardar movimiento"
                title="Guardar transacción"
                className="w-full py-4 bg-blue-600 text-white rounded-full font-bold shadow-xl shadow-blue-500/20 disabled:opacity-50"
            >
                GUARDAR
            </button>
        </div>
    );
};

export default InputTab;
