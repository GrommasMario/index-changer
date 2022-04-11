"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexChanger = void 0;
class IndexChanger {
    constructor(obj, from, to) {
        this.position = 0;
        this.obj = obj;
        this.from = from;
        this.to = to;
    }
    resetPosition() {
        this.position = 0;
    }
    end() {
        return this.position === this.obj.length - 1;
    }
    next() {
        this.position += 1;
        return this.obj[this.position];
    }
    current() {
        return this.obj[this.position];
    }
    currentSet(v) {
        return (this.obj[this.position][this.indexField] = v);
    }
    oracle() {
        return this.obj[this.position + 1];
    }
    sort() {
        this.obj.sort((a, b) => a[this.indexField] - b[this.indexField]);
    }
    plusAll(value, ignore = []) {
        this.obj.forEach((v, index) => {
            if (!ignore.includes(index)) {
                v[this.indexField] += value;
            }
        });
    }
    fixedIndexToUp() {
        while (this.obj[0][this.indexField] < 0) {
            this.plusAll(1);
        }
    }
    fixedIndexToDown() {
        while (this.obj[0][this.indexField] > 0) {
            this.plusAll(-1);
        }
    }
    fixedIndexMiddle() {
        const ignore = [];
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
    normalize() {
        while (true) {
            if (this.end()) {
                break;
            }
            const result = this.oracle()[this.indexField] - this.current()[this.indexField];
            if (result > 1) {
                this.oracle()[this.indexField] -= 1;
            }
            else {
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
    addTemporaryIdIndex() {
        this.obj.forEach((o, i) => (Object.assign(o, { _id_index: i })));
    }
    deleteTemporaryIdIndex() {
        this.obj.forEach((o) => (delete o[this.indexField]));
    }
    change(setting, from, to) {
        const { sort = true, normalizeOrder = true, postSort = true, field = 'index' } = setting;
        this.indexField = field;
        if (!field) {
            this.addTemporaryIdIndex();
            this.indexField = '_id_index';
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
        if (from !== to) {
            this.changer();
        }
        if (postSort) {
            this.sort();
        }
        if (!field) {
            this.deleteTemporaryIdIndex();
        }
    }
    changer() {
        const directional = this.to - this.from;
        if (directional !== 0) {
            this.obj.forEach((v) => {
                if (v[this.indexField] === this.from) {
                    v[this.indexField] = this.to;
                }
                else if (directional > 0 &&
                    !(v[this.indexField] > this.to || v[this.indexField] <= this.from)) {
                    v[this.indexField] = v[this.indexField] - 1;
                }
                else if (directional < 0 &&
                    !(v[this.indexField] < this.to || v[this.indexField] > this.from)) {
                    v[this.indexField] = v[this.indexField] + 1;
                }
            });
        }
    }
}
exports.IndexChanger = IndexChanger;
//# sourceMappingURL=IndexChanger.js.map