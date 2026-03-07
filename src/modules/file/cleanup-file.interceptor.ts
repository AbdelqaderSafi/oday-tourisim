import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { catchError } from 'rxjs';
import { FileService } from './file.service';

@Injectable()
export class FileCleanupInterceptor implements NestInterceptor {
  constructor(private fileService: FileService) {}

  intercept(ctx: ExecutionContext, next: CallHandler) {
    const req = ctx.switchToHttp().getRequest();

    // NestJS يضع الملفات المتعددة في req.files والملف الواحد في req.file
    const file = req.file;
    const files = req.files;

    return next.handle().pipe(
      catchError(async (err) => {
        // 1. تنظيف في حال كان الملف واحداً
        if (file && file.fileId) {
          await this.fileService.deleteFileFromImageKit(file.fileId);
        }

        // 2. تنظيف في حال كانت مصفوفة ملفات (Array)
        if (files && Array.isArray(files)) {
          const deletePromises = files.map((f) =>
            f.fileId
              ? this.fileService.deleteFileFromImageKit(f.fileId)
              : Promise.resolve(),
          );
          await Promise.all(deletePromises);
        }

        // 3. تنظيف في حال كانت الملفات موزعة على حقول (Fields)
        if (files && !Array.isArray(files)) {
          for (const key in files) {
            const fieldFiles = files[key];
            const deletePromises = fieldFiles.map((f) =>
              f.fileId
                ? this.fileService.deleteFileFromImageKit(f.fileId)
                : Promise.resolve(),
            );
            await Promise.all(deletePromises);
          }
        }

        throw err;
      }),
    );
  }
}
// import {
//   Injectable,
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
// } from '@nestjs/common';
// import { catchError } from 'rxjs';
// import { FileService } from './file.service';

// @Injectable()
// export class FileCleanupInterceptor implements NestInterceptor {
//   constructor(private fileService: FileService) {}

//   intercept(ctx: ExecutionContext, next: CallHandler) {
//     const req = ctx.switchToHttp().getRequest<Express.Request>();
//     const file = req.file;

//     return next.handle().pipe(
//       catchError(async (err) => {
//         if (file) await this.fileService.deleteFileFromImageKit(file.fileId!); // cleanup here
//         throw err; // exception filter will handle it
//       }),
//     );
//   }
// }
