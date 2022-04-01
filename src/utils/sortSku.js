export default {
    /**
     * 计算sku Tree
     * @returns
     */
    cartesianProductOf() {
        return Array.prototype.reduce.call(
            arguments,
            function (a, b) {
                let res = [];
                a.forEach(function (a) {
                    b.forEach(function (b) {
                        res.push(a.concat([b]));
                    });
                });
                return res;
            },
            [[]]
        );
    },
    swapArray(arr, index, idx) {
        arr[index] = arr.splice(idx, 1, arr[index])[0];
        return arr;
    },
    // 上移 将数组index索引与后面一个元素互换位置，向数组后面移动一位
    moveUp(arr, index) {
        this.swapArray(arr, index, index - 1);
    },
    // 下移 将数组index索引与前面一个元素互换位置，向数组前面移动一位
    moveDown(arr, index) {
        this.swapArray(arr, index, index + 1);
    },
};
