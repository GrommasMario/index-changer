export interface IndexChangerSetting<T>{
    sort?: boolean;
    postSort?: boolean;
    normalizeOrder?: boolean;
    field?: keyof T | null;
}