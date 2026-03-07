import { Inject, Injectable } from '@nestjs/common';
import { imageKitToken } from './imagekit.provider';
import ImageKit, { toFile } from '@imagekit/nodejs';
import { StorageEngine } from 'multer';
import { AssetKind, Prisma } from 'generated/prisma/client';

@Injectable()
export class FileService {
  constructor(@Inject(imageKitToken) private imagekit: ImageKit) {}

  imageKitMulterStorage() {
    const imageKitStorage: StorageEngine = {
      _handleFile: (req, file, cb) => {
        toFile(file.stream)
          .then((fileData) =>
            this.imagekit.files
              .upload({
                file: fileData,
                fileName: file.originalname,
                folder: 'products',
                useUniqueFileName: true,
              })
              .then((res) => {
                cb(null, res);
              }),
          )
          .catch(cb);
      },
      _removeFile: (req, file, cb) => {
        if (!file.fileId) return cb(null);
        console.log('_removeFile of custom multer imagekit storage triggered ');
        this.deleteFileFromImageKit(file.fileId)
          .then(() => cb(null))
          .catch(cb);
      },
    };
    return imageKitStorage;
  }
  createFileAssetData(
    file: Express.Multer.File,
    kind: AssetKind, // نوع الصورة (مثلاً فندق، رحلة، الخ)
    hotelId?: string,
    tripId?: string,
    galleryId?: string,
    offerId?: string,
  ): any /* نستخدم any أو نترك TypeScript يستنتج النوع لتجنب تعارض أنواع Prisma في الـ Nested Create */ {
    const data = {
      fileId: file.fileId!, // هدول موجودين دائماً من ImageKit
      url: file.url!,
      fileSizeInKB: Math.floor(file.size / 1024),
      fileType: file.mimetype,
      kind,
      hotelId: hotelId ?? null,
      tripId: tripId ?? null,
      offerId: offerId ?? null,
      galleryId: galleryId ?? null,
    };
    return data;
  }

  // createFileAssetData(
  //   file: Express.Multer.File,
  //   kind: AssetKind,
  //   hotelId?: string,
  //   tripId?: string,
  //   galleryId?: string,
  //   offerId?: string,
  // ): Prisma.AssetUncheckedCreateInput {
  //   return {
  //     fileId: file.fileId!,
  //     fileSizeInKB: Math.floor(file.size / 1024),
  //     url: file.url!,
  //     fileType: file.mimetype,
  //     kind,
  //     hotelId: hotelId!,
  //     tripId: tripId!,
  //     offerId: offerId!,
  //     galleryId: galleryId!,
  //   };
  // }

  deleteFileFromImageKit(fileId: string) {
    return this.imagekit.files.delete(fileId);
  }
}
