// utils/colorUtils.ts
export const eventColors = [
  { front: '#e1f9ff', back: '#2fa4e4', bgClass: 'bg-cyan-200', hoverClass: 'hover:bg-cyan-300' },
  { front: '#ffdcdc', back: '#e34444', bgClass: 'bg-red-200', hoverClass: 'hover:bg-red-300' },
  { front: '#fff2d4', back: '#e6a23c', bgClass: 'bg-yellow-200', hoverClass: 'hover:bg-yellow-300' },
];

export const getEventColor = (eventId: string) => {
  // Use a consistent method to determine color based on eventId
  // This ensures the same event always gets the same color
  const colorIndex =
    Math.abs(eventId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % eventColors.length;

  return eventColors[colorIndex];
};
