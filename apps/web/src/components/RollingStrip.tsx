import {waapi} from "animejs";
import animate = waapi.animate;
import {WheelConfig} from "../constants/rollingStripWheelConfigs";

interface RollingStripProps {
    config: WheelConfig
    getFieldColour: (name: string) => string
}

let wheelConfig: WheelConfig;

export function resetRouletteWheel() {
    animate(`.${wheelConfig.elementSelector}`, {
        translateX: 0,
        duration: 0.5,
    });
}

function calculateStripSpinDistance(target: string): number {
    const tileWidth = wheelConfig.tileWidth;
    const viewportWidth = wheelConfig.viewportWidth;
    const fieldIndex: number = wheelConfig.wheelContent.indexOf(target);
    const randomOffset = (Math.random() * (tileWidth - 4)) - 40;

    return -((fieldIndex * tileWidth) - (viewportWidth / 2) + (tileWidth / 2) + (tileWidth * wheelConfig.wheelContent.length * (wheelConfig.spins - 1)) + randomOffset);
}

export function spinStripAnimate (target: string) {
    const targetX = calculateStripSpinDistance(target);
    animate(`.${wheelConfig.elementSelector}`, {
        translateX: targetX,
        duration: 5000,
        easing: 'cubic-bezier(0.1, 1, 0.1, 4)',
    });
}

export function RollingStrip({config, getFieldColour}: RollingStripProps) {
    wheelConfig = config;
    const STRIP = Array.from({ length: config.spins }, () => config.wheelContent).flat();
    return (
        <div className="relative w-[600px] my-25 ml-10">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-1 h-[100px] bg-[#ffd700] z-10 shadow-[0_0_8px_rgba(255,215,0,0.8)]"/>
            <div className="w-full h-20 bg-[#1a1a1a] border-4 border-[#333] rounded-lg overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                <div className={`${wheelConfig.elementSelector} flex w-max h-full translate-x-0`}>
                    {STRIP.map((value, index) => {
                        const colour = getFieldColour(value);
                        return (
                            <div key={index} style={{backgroundColor: colour}} className={`w-[80px] h-full flex items-center justify-center font-bold text-2xl text-white border-r border-white/10 box-border shrink-0 `}>
                                <span>{value}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}