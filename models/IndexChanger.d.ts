import { IndexChangerSetting } from "../interfaces/IndexChangerSetting";
export declare class IndexChanger<T> {
    private obj;
    private from;
    private to;
    private position;
    private indexField;
    constructor(obj: Record<keyof T, any>[], from: number, to: number);
    private resetPosition;
    private end;
    private next;
    private current;
    private currentSet;
    private oracle;
    private sort;
    plusAll(value: number, ignore?: number[]): void;
    private fixedIndexToUp;
    private fixedIndexToDown;
    private fixedIndexMiddle;
    private normalize;
    toNormal(): void;
    private addTemporaryIdIndex;
    private deleteTemporaryIdIndex;
    change(): void;
    change(setting: IndexChangerSetting<T>): void;
    change(setting: IndexChangerSetting<T>, from: number, to: number): void;
    private changer;
}
