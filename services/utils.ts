export const getEllipsisTxt = (str : string, n = 6) => {
    if (str) {
      return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
};

export const round2 = (num : number) => {
    return Math.round(num * 100) / 100;
}

export const round = (num : number, precision = 2) => (
  Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)
)