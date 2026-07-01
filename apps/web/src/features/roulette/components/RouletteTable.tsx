import { useEffect } from 'react';
import { useTableBets } from '../hooks/useTableBets';
import { generateRouletteLayout } from "../utils/rouletteTableLayout";
import { BettingZone } from './BettingZone';
import { registerTableCompiler } from '../utils/tableBridge';

const layoutFields = generateRouletteLayout();

export function RouletteTable() {
    const { zoneRefs, compileCurrentBets } = useTableBets(layoutFields);
    
    useEffect(() => {
        registerTableCompiler(compileCurrentBets);
    }, [compileCurrentBets]);

    return (
        <div id="roulette-table" className="grid grid-cols-14 gap-2 bg-emerald-950 p-4 rounded-xl border-2 border-emerald-500 w-[1300px] h-[400px] select-none">
            {layoutFields.map((field) => (
                <BettingZone
                    key={field.type}
                    type={field.type}
                    label={field.label}
                    className={`flex items-center justify-center text-sm font-bold border-2 border-emerald-400/30 rounded transition-all duration-150 ${field.gridClass} ${field.bgClass}`}
                    ref={el => { zoneRefs.current[field.type] = el; }}
                />
            ))}
        </div>
    );
}