import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Page, PaginationMeta } from 'src/domain/common/pagination';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    return next.handle().pipe(
      map((response) => {
        if (response && response.message && response.data) {
          if (response.data.meta && response.data.data) {
            const { data, meta } = response.data;
            const { total_data, current_page, per_page } =
              meta as PaginationMeta;
            const totalPages = Math.ceil(total_data / per_page);

            const protocol = request.protocol;
            const host = request.get('host');
            const path = request.url.split('?')[0];

            const nextPageLink =
              current_page < totalPages
                ? `${protocol}://${host}${path}?page=${current_page + 1}&limit=${per_page}`
                : null;
            const prevPageLink =
              current_page > 1
                ? `${protocol}://${host}${path}?page=${current_page - 1}&limit=${per_page}`
                : null;

            return {
              success: true,
              message: response.message,
              data: data,
              pagination: {
                current_page: current_page,
                per_page: per_page,
                total_data: total_data,
                total_pages: totalPages,
                next_page: nextPageLink,
                prev_page: prevPageLink,
              },
            };
          }
          return {
            success: true,
            message: response.message,
            data: response.data,
          };
        }

        if (response && response.message && !response.data) {
          return {
            success: true,
            message: response.message,
            data: null,
          };
        }
        return {
          success: true,
          message: '',
          data: response,
        };
      }),
    );
  }
}
