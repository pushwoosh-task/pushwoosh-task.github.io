export const setPage = page => ({
  type: 'SET_PAGE',
  page
});

export const decPage = () => ({
  type: 'DEC_PAGE'
});

export const incPage = () => ({
  type: 'INC_PAGE'
});

export const setPageSize = size => ({
  type: 'SET_PAGE_SIZE',
  size
});