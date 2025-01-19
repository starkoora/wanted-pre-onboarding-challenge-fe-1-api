export type ResponseData = {
  data: any;
};

export const createResponse = (data: any): ResponseData => {
  return {
    data,
  };
};

export type ErrorData = {
  details: any;
};

export const createError = (details: any): ErrorData => {
  return {
    details,
  };
};
