export interface SearchParamsTypes {
  params: Promise<{
    result: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
