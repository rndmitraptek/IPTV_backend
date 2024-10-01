import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as minio from 'minio';
import { BufferedFile } from './minio-client.model';

@Injectable()
export class MinioClientService {
    constructor() { }

    private readonly client = new minio.Client({
        endPoint: '206.189.38.25',
        port: 9090,
        useSSL: false,
        accessKey: 'mino_ip_tv_dev',
        secretKey: 'Mat1234_',
    });

    public async generatePresignedUrl (bucketName, objectName) {
        try {
            const url = await this.client.presignedPutObject(bucketName, objectName, 60*60);
            console.log('Presigned URL:', url);
            return url;
        } catch (err) {
            console.log('Error generating presigned URL:', err);
            throw err;
        }
    };

    public async generatePresignedUrlGet (bucketName, objectName) {
        try {
            const url = await this.client.presignedGetObject(bucketName, objectName, 60*60);
            console.log('Presigned URL:', url);
            let new_url = url.split('?')[0];
            return new_url;
        } catch (err) {
            console.log('Error generating presigned URL:', err);
            throw err;
        }
    };

    public async upload(file: BufferedFile, baseBucket: string) {
        if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png') || file.mimetype.includes('pdf') || file.mimetype.includes('vnd.android.package-archive'))) {
            throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
        }

        let temp_filename = Date.now().toString();

        let hashedFileName = crypto
            .createHash('md5')
            .update(temp_filename)
            .digest('hex');

        let ext = file.originalname.substring(
            file.originalname.lastIndexOf('.'),
            file.originalname.length
        );

        const metaData = {
            'Content-Type': file.mimetype,
        };

        let date = new Date();

        let filename = hashedFileName + date.getTime() + ext;
        const fileName: string = `${filename}`;
        const fileBuffer = file.buffer;

        const put = await this.client.putObject(
            baseBucket,
            fileName,
            fileBuffer,
            fileBuffer.length,
            metaData
        );

        // return {
        //     url: `${MinioConfig.MINIO_ENDPOINT}:${MinioConfig.MINIO_PORT}/${baseBucket}/${filename}`,
        //     fileName: fileName
        // };
        return {
            url: `${filename}`,
            fileName: fileName,
            response: put
        };
    }

    async delete(baseBucket: string, objectName: string) {
        this.client.removeObject(baseBucket, objectName);
    }

    async getLinkFoto(baseBucket: string, objectName: string): Promise<string> {
        return await this.client.presignedGetObject(baseBucket, objectName);
    }
}
