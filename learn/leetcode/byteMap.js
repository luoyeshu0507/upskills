function ByteMap() {}
ByteMap.prototype.value = 0;
ByteMap.prototype.get = function(index) {
    var value = this.value;
    return (value & (1 << index)) >> index;
}
ByteMap.prototype.set = function(index, val) {
    if (val === 1) {
        this.value = this.value | (1 << index);
    } else {
        this.value = this.value & ( ~ (1 << index));
    }
}