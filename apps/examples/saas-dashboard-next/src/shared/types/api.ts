// Common API response types for enterprise applications

// Standard API response
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string | null;
}

// Paginated API response
export interface PaginatedResponse<T = unknown> {
  success: boolean;
  message?: string;
  data: {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
  error?: string | null;
}
