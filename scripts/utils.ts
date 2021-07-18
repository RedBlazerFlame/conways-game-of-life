export const zeros = (n: number): Array<0> => {
    return [...Array(n)].map(_ => 0);
}

export const ones = (n: number): Array<1> => {
    return [...Array(n)].map(_ => 1);
}