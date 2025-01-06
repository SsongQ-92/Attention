import { pagination } from '../config/consts';

const getPagination = (totalDataCount: number, currentPage: number) => {
  const totalPages = Math.ceil(totalDataCount / pagination.pageSize);

  const currentGroup = Math.ceil(currentPage / pagination.pageGroupSize);
  const startPage = (currentGroup - 1) * pagination.pageGroupSize + 1;
  const endPage = Math.min(startPage + pagination.pageGroupSize - 1, totalPages);

  const hasPrev = startPage > 1;
  const hasNext = endPage < totalPages;

  const pages: number[] = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return { currentPage, pages, hasPrev, hasNext };
};

export default getPagination;
