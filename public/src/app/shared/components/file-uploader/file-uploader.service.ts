import { Injectable }                   from '@angular/core';
import { UploadResponse }               from '../../interfaces/api-response.interface';

@Injectable()
export class FileUploaderService {
    private allowedMimeTypes: string[] = [];
    private uploadURL: string;
    private chunkSizeBytes: number;
    private authToken: string;
    private fileBeingTransfered: File;
    private chunksNum: number;
    private response: UploadResponse;

    private progressChunks: number = 0;
    private progressCurrent: number = 0;

    public setOptions(options: any) {
        if (options.allowedMimeTypes.length)
            this.allowedMimeTypes = options.allowedMimeTypes;

        this.uploadURL = options.uploadURL;
        this.chunkSizeBytes = options.chunkSizeBytes;
        this.authToken = options.authToken;
    }
    public verifyFile(file: File) {
        return (!this.allowedMimeTypes.length || this.allowedMimeTypes.indexOf(file.type) > -1);
    }
    public setUploadURL(url: string) {
        this.uploadURL = url;
    }

    public transferFile(file: File): Promise<UploadResponse> {
        this.fileBeingTransfered = file;
        this.chunksNum = Math.max(Math.ceil(file.size / this.chunkSizeBytes), 1);
        this.progressChunks = 0;
        this.progressCurrent = 0;
        this.response = {
            success: false,
            finished: false,
            file: ''
        };

        return this.transferBlob(0, 0);
    }

    private transferBlob(index: number, currentChunk: number): Promise<UploadResponse> {
        var __this = this;

        __this.progressChunks = (100.0 / __this.chunksNum) * (currentChunk + 1);
        if (__this.chunksNum == currentChunk + 1 || __this.progressChunks > 100)
            __this.progressChunks = 100;

        if (index < __this.fileBeingTransfered.size) {
            return new Promise((resolve, reject) => {

                let form = new FormData();
                form.append('file', new Blob([__this.fileBeingTransfered.slice(index, index + __this.chunkSizeBytes)], { type: __this.fileBeingTransfered.type }));
                form.append('name', __this.fileBeingTransfered.name);
                form.append('chunks', __this.chunksNum);
                form.append('chunk', currentChunk);
                form.append('blob-tranfer', 1);

                let xhr = new XMLHttpRequest();
                xhr.open('POST', __this.uploadURL, true);
                xhr.withCredentials = true;
                xhr.setRequestHeader('Authorization', __this.authToken);

                xhr.upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                        __this.progressCurrent = ((100.0 / __this.chunksNum) * currentChunk) + ((100.0 / __this.chunksNum) * (e.loaded / e.total));
                        if (__this.progressCurrent > 100)
                            __this.progressCurrent = 100;
                    }
                };
                xhr.onloadend = function(e) {
                    let response: UploadResponse = JSON.parse(xhr.responseText);
                    __this.response = response;

                    if (response.success) {
                        resolve(__this.transferBlob(index + __this.chunkSizeBytes, currentChunk + 1));
                    } else {
                        reject(response);
                    }
                };
                xhr.onerror = function() {
                    reject({
                        success: false,
                        status: this.status,
                        message: xhr.statusText
                    });
                };

                xhr.send(form);
            });
        } else {
            return new Promise((resolve, reject) => {
                resolve(__this.response);
            });
        }
    }

}
