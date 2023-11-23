test('test', () => {
    const a = 1
    const b = 2
    const c = 3

    expect(a).toBe(1);
    expect(b).toBe(2);
    //wrong toBe
    expect(c).toBe(2);
})