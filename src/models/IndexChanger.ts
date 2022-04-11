import { IndexChangerSetting } from "../interfaces/IndexChangerSetting";
  
export class IndexChanger<T> {
    private obj!: Record<keyof T, any>[];
    private from!: number;
    private to!: number;
    private position = 0;
    private indexField!: keyof T;
  
    constructor(obj: Record<keyof T, any>[], from: number, to: number) {
      this.obj = obj;
      this.from = from;
      this.to = to;
    }
  
    private resetPosition() {
      this.position = 0;
    }
  
    private end() {
      return this.position === this.obj.length - 1;
    }
  
    private next() {
      this.position += 1;
      return this.obj[this.position];
    }
  
    private current() {
      return this.obj[this.position];
    }
  
    private currentSet(v: number) {
      return (this.obj[this.position][this.indexField] = v);
    }
  
    private oracle() {
      return this.obj[this.position + 1];
    }
  
    private sort() {
      this.obj.sort((a, b) => a[this.indexField] - b[this.indexField]);
    }
  
    plusAll(value: number, ignore: number[] = []) {
      this.obj.forEach((v, index) => {
        if (!ignore.includes(index)) {
          v[this.indexField] += value;
        }
      });
    }
  
    private fixedIndexToUp() {
      while (this.obj[0][this.indexField] < 0) {
        this.plusAll(1);
      }
    }
  
    private fixedIndexToDown() {
      while (this.obj[0][this.indexField] > 0) {
        this.plusAll(-1);
      }
    }
  
    private fixedIndexMiddle() {
      const ignore: number[] = [];
      while (!this.end()) {
        if (this.current()[this.indexField] === this.oracle()[this.indexField]) {
          this.plusAll(1, ignore);
          ignore.push(this.position);
          this.currentSet(this.current()[this.indexField] - 1);
        }
        this.next();
      }
      this.resetPosition();
    }
  
    private normalize() {
      while (true) {
        if (this.end()) {
          break;
        }
  
        const result = this.oracle()[this.indexField] - this.current()[this.indexField];
  
        if (result > 1) {
          this.oracle()[this.indexField] -= 1;
        } else {
          this.next();
        }
      }
      this.resetPosition();
    }
  
    toNormal() {
      this.fixedIndexToUp();
      this.fixedIndexToDown();
      this.fixedIndexMiddle();
      this.normalize();
    }

    private addTemporaryIdIndex(){
        this.obj.forEach((o, i) => (Object.assign(o, {_id_index: i})))
    }

    private deleteTemporaryIdIndex(){
        this.obj.forEach((o) => (delete o[this.indexField]))
    }
  
    change(): void;
    change(setting: IndexChangerSetting<T>): void;
    change(setting: IndexChangerSetting<T>, from: number, to: number): void;
    change(
      setting?: IndexChangerSetting<T>,
      from?: number,
      to?: number,
    ): void {
    const {sort = true, normalizeOrder = true, postSort = true, field = 'index' as keyof T} = setting;
    this.indexField = field;

    if(!field){
        this.addTemporaryIdIndex();
        this.indexField = '_id_index' as keyof T;
    }

      if (from !== undefined && to !== undefined) {
        this.from = from;
        this.to = to;
      }
      if (sort) {
        this.sort();
      }
      if (normalizeOrder) {
        this.toNormal();
      }
      if(from !== to){
        this.changer();
      }
      if (postSort) {
        this.sort();
      }

      if(!field){
        this.deleteTemporaryIdIndex();
    }
    }
  
    private changer() {
      const directional = this.to - this.from;
      if (directional !== 0) {
        this.obj.forEach((v) => {
          if (v[this.indexField] === this.from) {
            v[this.indexField] = this.to;
          } else if (
            directional > 0 &&
            !(v[this.indexField] > this.to || v[this.indexField] <= this.from)
          ) {
            v[this.indexField] = v[this.indexField] - 1;
          } else if (
            directional < 0 &&
            !(v[this.indexField] < this.to || v[this.indexField] > this.from)
          ) {
            v[this.indexField] = v[this.indexField] + 1;
          }
        });
      }
    }
  }