export module HalfWidthConversion {
    export const toHalfWidth = (str: string) => str.replace(
        /[\uff01-\uff53]/g,
        ch => String.fromCharCode(ch.charCodeAt(0) - 0xfee0))
    export const toFullWidth = (str: string) => str.replace(
        /[\u0001-\u005d]/g,
        ch => String.fromCharCode(ch.charCodeAt(0) + 0xfee0))
}