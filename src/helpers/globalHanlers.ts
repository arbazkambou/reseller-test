/* eslint-disable @typescript-eslint/no-explicit-any */

export function globalResponseHandler(data: any, statusCode: number): string {
  if (statusCode === 404) {
    return "Not found";
  }

  if (data?.errors?.length) {
    return data.errors.join(" ");
  } else if (data?.message) {
    return data.message;
  } else {
    return "Something went wrong!";
  }
}

export function globalErrorHandler(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "Something went wrong!";
}
