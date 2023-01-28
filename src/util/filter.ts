export const arrayUnique = (key: string, arr: Array<any>) => [
	...new Map(arr.map(m => [m[key], m])).values(),
];
