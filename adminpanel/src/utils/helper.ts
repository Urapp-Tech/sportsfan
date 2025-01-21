export const getInitials = (name: string) => {
  if (!name) return '';

  const nameParts = name.trim().split(' ');
  const firstInitial = nameParts[0]?.[0]?.toUpperCase() || '';
  const secondInitial =
    nameParts.length > 1 ? nameParts[1]?.[0]?.toUpperCase() : '';

  return `${firstInitial}${secondInitial}`;
};
