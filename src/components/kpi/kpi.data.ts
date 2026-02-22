export const buildDonut = (
  value: number,
  total: number,
  color: string
) => ({
  datasets: [
    {
      data: [value, total - value],
      backgroundColor: [color, "#F1F5F9"],
      borderWidth: 0,
    },
  ],
});

export const globalDonut = {
  datasets: [
    {
      data: [60, 25, 15],
      backgroundColor: ["#1E88FF", "#F28C38", "#5ED3C6"],
      borderWidth: 0,
    },
  ],
};