const getDate = (updatedDate: Date) => {
  const updateDate = new Date(updatedDate);

  const year = updateDate.getFullYear();
  const month = updateDate.getMonth() + 1;
  const date = updateDate.getDate();
  const hour = updateDate.getHours() > 12 ? updateDate.getHours() - 12 : updateDate.getHours();
  const minute = updateDate.getMinutes();
  const standard = updateDate.getHours() > 12 ? 'PM' : 'AM';

  return { year, month, date, hour, minute, standard };
};

export default getDate;
