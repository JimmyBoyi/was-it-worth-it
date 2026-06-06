import {RouletteField} from "../models/RouletteField";
import {RouletteWinType} from "../enums/RouletteWinTypes";

export const rouletteWheel: RouletteField[] = [
    new RouletteField(0, [
        RouletteWinType.GREEN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(1, [
        RouletteWinType.RED,
        RouletteWinType.ODD,
        RouletteWinType.LOW,
        RouletteWinType.FIRST_DOZEN,
        RouletteWinType.FIRST_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(2, [
        RouletteWinType.BLACK,
        RouletteWinType.EVEN,
        RouletteWinType.LOW,
        RouletteWinType.FIRST_DOZEN,
        RouletteWinType.SECOND_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(3, [
        RouletteWinType.RED,
        RouletteWinType.ODD,
        RouletteWinType.LOW,
        RouletteWinType.FIRST_DOZEN,
        RouletteWinType.THIRD_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(4, [
        RouletteWinType.BLACK,
        RouletteWinType.EVEN,
        RouletteWinType.LOW,
        RouletteWinType.FIRST_DOZEN,
        RouletteWinType.FIRST_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(5, [
        RouletteWinType.RED,
        RouletteWinType.ODD,
        RouletteWinType.LOW,
        RouletteWinType.FIRST_DOZEN,
        RouletteWinType.SECOND_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(6, [
        RouletteWinType.BLACK,
        RouletteWinType.EVEN,
        RouletteWinType.LOW,
        RouletteWinType.FIRST_DOZEN,
        RouletteWinType.THIRD_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(7, [
        RouletteWinType.RED,
        RouletteWinType.ODD,
        RouletteWinType.LOW,
        RouletteWinType.FIRST_DOZEN,
        RouletteWinType.FIRST_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(8, [
        RouletteWinType.BLACK,
        RouletteWinType.EVEN,
        RouletteWinType.LOW,
        RouletteWinType.FIRST_DOZEN,
        RouletteWinType.SECOND_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(9, [
        RouletteWinType.RED,
        RouletteWinType.ODD,
        RouletteWinType.LOW,
        RouletteWinType.FIRST_DOZEN,
        RouletteWinType.THIRD_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(10, [
        RouletteWinType.BLACK,
        RouletteWinType.EVEN,
        RouletteWinType.LOW,
        RouletteWinType.FIRST_DOZEN,
        RouletteWinType.FIRST_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(11, [
        RouletteWinType.BLACK,
        RouletteWinType.ODD,
        RouletteWinType.LOW,
        RouletteWinType.FIRST_DOZEN,
        RouletteWinType.SECOND_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(12, [
        RouletteWinType.RED,
        RouletteWinType.EVEN,
        RouletteWinType.LOW,
        RouletteWinType.FIRST_DOZEN,
        RouletteWinType.THIRD_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(13, [
        RouletteWinType.BLACK,
        RouletteWinType.ODD,
        RouletteWinType.LOW,
        RouletteWinType.SECOND_DOZEN,
        RouletteWinType.FIRST_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(14, [
        RouletteWinType.RED,
        RouletteWinType.EVEN,
        RouletteWinType.LOW,
        RouletteWinType.SECOND_DOZEN,
        RouletteWinType.SECOND_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(15, [
        RouletteWinType.BLACK,
        RouletteWinType.ODD,
        RouletteWinType.LOW,
        RouletteWinType.SECOND_DOZEN,
        RouletteWinType.THIRD_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(16, [
        RouletteWinType.RED,
        RouletteWinType.EVEN,
        RouletteWinType.LOW,
        RouletteWinType.SECOND_DOZEN,
        RouletteWinType.FIRST_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(17, [
        RouletteWinType.BLACK,
        RouletteWinType.ODD,
        RouletteWinType.LOW,
        RouletteWinType.SECOND_DOZEN,
        RouletteWinType.SECOND_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(18, [
        RouletteWinType.RED,
        RouletteWinType.EVEN,
        RouletteWinType.LOW,
        RouletteWinType.SECOND_DOZEN,
        RouletteWinType.THIRD_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(19, [
        RouletteWinType.RED,
        RouletteWinType.ODD,
        RouletteWinType.HIGH,
        RouletteWinType.SECOND_DOZEN,
        RouletteWinType.FIRST_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(20, [
        RouletteWinType.BLACK,
        RouletteWinType.EVEN,
        RouletteWinType.HIGH,
        RouletteWinType.SECOND_DOZEN,
        RouletteWinType.SECOND_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(21, [
        RouletteWinType.RED,
        RouletteWinType.ODD,
        RouletteWinType.HIGH,
        RouletteWinType.SECOND_DOZEN,
        RouletteWinType.THIRD_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(22, [
        RouletteWinType.BLACK,
        RouletteWinType.EVEN,
        RouletteWinType.HIGH,
        RouletteWinType.SECOND_DOZEN,
        RouletteWinType.FIRST_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(23, [
        RouletteWinType.RED,
        RouletteWinType.ODD,
        RouletteWinType.HIGH,
        RouletteWinType.SECOND_DOZEN,
        RouletteWinType.SECOND_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(24, [
        RouletteWinType.BLACK,
        RouletteWinType.EVEN,
        RouletteWinType.HIGH,
        RouletteWinType.SECOND_DOZEN,
        RouletteWinType.THIRD_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(25, [
        RouletteWinType.RED,
        RouletteWinType.ODD,
        RouletteWinType.HIGH,
        RouletteWinType.THIRD_DOZEN,
        RouletteWinType.FIRST_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(26, [
        RouletteWinType.BLACK,
        RouletteWinType.EVEN,
        RouletteWinType.HIGH,
        RouletteWinType.THIRD_DOZEN,
        RouletteWinType.SECOND_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(27, [
        RouletteWinType.RED,
        RouletteWinType.ODD,
        RouletteWinType.HIGH,
        RouletteWinType.THIRD_DOZEN,
        RouletteWinType.THIRD_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(28, [
        RouletteWinType.BLACK,
        RouletteWinType.EVEN,
        RouletteWinType.HIGH,
        RouletteWinType.THIRD_DOZEN,
        RouletteWinType.FIRST_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(29, [
        RouletteWinType.BLACK,
        RouletteWinType.ODD,
        RouletteWinType.HIGH,
        RouletteWinType.THIRD_DOZEN,
        RouletteWinType.SECOND_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(30, [
        RouletteWinType.RED,
        RouletteWinType.EVEN,
        RouletteWinType.HIGH,
        RouletteWinType.THIRD_DOZEN,
        RouletteWinType.THIRD_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(31, [
        RouletteWinType.BLACK,
        RouletteWinType.ODD,
        RouletteWinType.HIGH,
        RouletteWinType.THIRD_DOZEN,
        RouletteWinType.FIRST_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(32, [
        RouletteWinType.RED,
        RouletteWinType.EVEN,
        RouletteWinType.HIGH,
        RouletteWinType.THIRD_DOZEN,
        RouletteWinType.SECOND_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(33, [
        RouletteWinType.BLACK,
        RouletteWinType.ODD,
        RouletteWinType.HIGH,
        RouletteWinType.THIRD_DOZEN,
        RouletteWinType.THIRD_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(34, [
        RouletteWinType.RED,
        RouletteWinType.EVEN,
        RouletteWinType.HIGH,
        RouletteWinType.THIRD_DOZEN,
        RouletteWinType.FIRST_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(35, [
        RouletteWinType.BLACK,
        RouletteWinType.ODD,
        RouletteWinType.HIGH,
        RouletteWinType.THIRD_DOZEN,
        RouletteWinType.SECOND_COLUMN,
        RouletteWinType.NUMBER
    ]),

    new RouletteField(36, [
        RouletteWinType.RED,
        RouletteWinType.EVEN,
        RouletteWinType.HIGH,
        RouletteWinType.THIRD_DOZEN,
        RouletteWinType.THIRD_COLUMN,
        RouletteWinType.NUMBER
    ])
];