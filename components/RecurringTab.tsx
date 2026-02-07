import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Trash2, Wallet } from 'lucide-react';
import { RecurringItem } from '@/types';

interface RecurringTabProps {
    recurringTab: string;
    setRecurringTab: (tab: string) => void;
    recStats: { totalIncome: number, totalExpense: number };
    recList: RecurringItem[];
    openEditRecModal: (item: RecurringItem) => void;
    handleDeleteRecurring: (id: string, e: React.MouseEvent) => void;
    openNewRecModal: () => void;
}

const RecurringTab = ({
    recurringTab,
    setRecurringTab,
    recStats,
    recList,
    openEditRecModal,
    handleDeleteRecurring,
    openNewRecModal
}: RecurringTabProps) => {
    return (
        <div className="pt-4 px-4 pb-24 animate-in fade-in space-y-6 max-w-none mx-auto">
            <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar justify-center md:justify-start">
                {['all', 'Daniel', 'Gedalya'].map(t => (
                    <button
                        key={t}
                        onClick={() => setRecurringTab(t)}
                        aria-label={`Filtrar por ${t}`}
                        title={`Filtrar por ${t}`}
                        className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border ${recurringTab === t ? 'bg-slate-800 text-white' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800'}`}
                    >
                        {t === 'all' ? 'Todos' : t}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl border border-green-100 dark:border-green-800">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-1">
                        <ArrowUpCircle size={16} /> <span className="text-xs font-bold uppercase">Ingresos</span>
                    </div>
                    <div className="text-2xl font-black text-slate-800 dark:text-white">${recStats.totalIncome.toFixed(2)}</div>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl border border-red-100 dark:border-red-800">
                    <div className="flex items-center gap-2 text-red-700 dark:text-red-400 mb-1">
                        <ArrowDownCircle size={16} /> <span className="text-xs font-bold uppercase">Fijos</span>
                    </div>
                    <div className="text-2xl font-black text-slate-800 dark:text-white">${recStats.totalExpense.toFixed(2)}</div>
                </div>
                {recurringTab !== 'all' && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-800 flex justify-between items-center col-span-1 sm:col-span-2 lg:col-span-1">
                        <div>
                            <div className="text-xs font-bold text-blue-600 dark:text-blue-300 uppercase">Disponible (Teórico)</div>
                            <div className="text-xl font-bold text-slate-800 dark:text-white">${(recStats.totalIncome - recStats.totalExpense).toFixed(2)}</div>
                        </div>
                        <div className="h-10 w-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-200">
                            <Wallet size={20} />
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Detalle</h3>
                    <button onClick={openNewRecModal} aria-label="Agregar nuevo registro fijo" title="Agregar concepto fijo" className="text-xs bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full font-bold hover:bg-blue-200 transition-colors">+ Agregar</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {recList.map(r => (
                        <div key={r.id} onClick={() => openEditRecModal(r)} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex justify-between items-center cursor-pointer hover:shadow-md transition-all hover:border-blue-200 dark:hover:border-blue-800">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className={`p-2 rounded-lg flex-shrink-0 ${r.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {r.type === 'income' ? <ArrowUpCircle size={16} /> : <ArrowDownCircle size={16} />}
                                </div>
                                <div className="truncate">
                                    <div className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">{r.name}</div>
                                    <div className="text-[10px] text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full inline-block mt-1">{r.owner}</div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="font-black text-lg dark:text-white">${r.amount.toFixed(2)}</span>
                                <button onClick={(e) => handleDeleteRecurring(r.id, e)} className="text-red-300 hover:text-red-500"><Trash2 size={14} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecurringTab;
