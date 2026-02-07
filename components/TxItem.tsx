import React from 'react';
import { Transaction } from '@/types';
import { ICON_LIB } from '@/lib/icons';

interface TxItemProps {
    tx: Transaction;
    cat: any;
    onClick: () => void;
}

const TxItem = ({ tx, cat, onClick }: TxItemProps) => (
    <div className="p-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group cursor-pointer" onClick={onClick}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center transition-all ${cat?.color || 'bg-slate-100 text-slate-500'} ${tx.isPaid ? 'grayscale opacity-40 scale-90' : 'shadow-sm'}`}>
                {ICON_LIB[cat?.iconKey]}
            </div>
            <div className="truncate">
                <div className={`text-xs font-bold truncate transition-all ${tx.isPaid ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                    {tx.sub}
                </div>
                <div className="text-[9px] text-slate-500 font-medium truncate uppercase tracking-tighter">
                    {tx.date}
                </div>
            </div>
        </div>
        <div className="text-right min-w-[70px]">
            <div className={`font-mono font-bold text-sm transition-all ${tx.isPaid ? 'text-slate-300' : 'text-slate-900 dark:text-white'}`}>
                ${tx.amount.toFixed(2)}
            </div>
        </div>
    </div>
);

export default TxItem;
