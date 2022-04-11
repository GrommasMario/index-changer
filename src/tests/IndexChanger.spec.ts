import { IndexChanger } from "../"
const testList = () => [
    {
        id: 1,
    },
    {
        id: 2,
    },
    {
        id: 3,
    },
    {
        id: 4,
    },
]

describe("Test", () => {
    test('Test One', () => {
        const Object = testList();
        const indexChange = new IndexChanger(Object, 1, 1)
        indexChange.change({field: null}, 3, 0);
        
        Object.forEach((o, i) => {
            switch (i) {
                case 0:
                    expect(o.id).toBe(4)
                    break;
                case 1:
                    expect(o.id).toBe(1)
                    break;
                case 2:
                    expect(o.id).toBe(2)
                    break;
                case 3:
                    expect(o.id).toBe(3)
                    break;
            }
        })
    })

    test('Test Two', () => {
        const Object = testList();
        const indexChange = new IndexChanger(Object, 1, 1)
        indexChange.change({field: null}, 0, 3);
        Object.forEach((o, i) => {
            switch (i) {
                case 0:
                    expect(o.id).toBe(2)
                    break;
                case 1:
                    expect(o.id).toBe(3)
                    break;
                case 2:
                    expect(o.id).toBe(4)
                    break;
                case 3:
                    expect(o.id).toBe(1)
                    break;
            }
        })
    })

    test('Test Three', () => {
        const Object = testList();
        const indexChange = new IndexChanger(Object, 1, 1)
        indexChange.change({field: null}, 2, 1);
        Object.forEach((o, i) => {
            switch (i) {
                case 0:
                    expect(o.id).toBe(1)
                    break;
                case 1:
                    expect(o.id).toBe(3)
                    break;
                case 2:
                    expect(o.id).toBe(2)
                    break;
                case 3:
                    expect(o.id).toBe(4)
                    break;
            }
        })
    })

    test('Test Three', () => {
        const Object = testList();
        const indexChange = new IndexChanger(Object, 1, 1)
        indexChange.change({field: null});
        Object.forEach((o, i) => {
            switch (i) {
                case 0:
                    expect(o.id).toBe(1)
                    break;
                case 1:
                    expect(o.id).toBe(2)
                    break;
                case 2:
                    expect(o.id).toBe(3)
                    break;
                case 3:
                    expect(o.id).toBe(4)
                    break;
            }
        })
    })
})