export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total_data: number;
  total_pages: number;
  next_page: number | null;
  prev_page: number | null;
}

export type Page<T> = { data: T[]; meta: PaginationMeta };

export function buildPagination(
  page: number,
  limit: number,
  totalData: number,
): PaginationMeta {
  const totalPages = Math.ceil(totalData / limit);
  const nextPage = page < totalPages ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;

  return {
    current_page: page,
    per_page: limit,
    total_data: totalData,
    total_pages: totalPages,
    next_page: nextPage,
    prev_page: prevPage,
  };
}
