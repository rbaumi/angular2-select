import { Component,
    ElementRef,
    Renderer,
    Input,
    Output,
    EventEmitter,
    HostListener,
    ViewChild,
    OnInit }                            from '@angular/core';
import { FileUploaderService }          from './file-uploader.service';
import { AuthService }                  from '../../services/auth.service';

@Component({
    selector: 'file-uploader',
    template: `
        <input
            type="file"
            #fileInput
            (change)="onFileInputChange()"
            style="display:none;"
        />
        <div class="drop-zone">
             <md-icon fontSet="fa" fontIcon="fa-cloud-upload" >
             </md-icon>
        </div>
        <div class="progress" *ngIf="isTransfering">
            <md-progress-bar mode="buffer" [value]="fileUploaderService.progressCurrent"  [bufferValue]="fileUploaderService.progressChunks" ></md-progress-bar>
        </div>
    `,
    styles: [`
        :host {
            border: dotted 3px lightgray;
            width: 200px;
            height: 200px;
            text-align: center;
            background-size: 100% !important;
            background-color: rgba(0, 0, 0, 0.6);
            cursor: pointer;
            display: block;
            opacity: 0.8;
            margin: auto;
        }
        md-icon {
            font-size: 120px;
            margin-top: 40px;
        }
        div.progress {
            margin-top: 20px;
            text-align: center;
            width: 200px;
        }
        /deep/ .md-progress-bar-fill::after {
            display: block !important;
        }
        div.drop-zone {
            opacity: 0.3;
            width:100%;
            height:100%;
        }
        div.drop-zone:hover {
            opacity: 0.8;
        }
        :host.file-over {
            border: dotted 3px #0055ff;
        }
    `],
    host: {
        '[class.file-over]': 'isFileOver'
    },
    providers: [
        FileUploaderService
    ]
})
export class FileUploaderComponent implements OnInit {
    @ViewChild('fileInput') fileInput: ElementRef;

    @Input() public allowedMimeTypes: string[] = [];
    @Input() public uploadURL: string;
    @Input() public chunkSizeBytes: number = 1048576;

    @Output() public onFileDrop: EventEmitter<File[]> = new EventEmitter<File[]>();
    @Output() public onError: EventEmitter<Object> = new EventEmitter<Object>();
    @Output() public onComplete: EventEmitter<Object> = new EventEmitter<Object>();

    private isFileOver: boolean = false;
    private isTransfering: boolean = false;
    private fileToTransfer: File = null;

    public constructor(
        private renderer: Renderer,
        private fileUploaderService: FileUploaderService,
        private authService: AuthService,
    ) {}

    ngOnInit() {
        this.fileUploaderService.setOptions({
            allowedMimeTypes: this.allowedMimeTypes,
            uploadURL: this.uploadURL,
            chunkSizeBytes: this.chunkSizeBytes,
            authToken: this.authService.getAuthorizationHeader()
        });
    }

    @HostListener('drop', ['$event'])
    public onDrop(event: any): void {
        let transfer = this.getTransfer(event);
        if (!transfer) {
            return;
        }

        this.onDragLeave(event);
        if (transfer.files.length) {
            if (transfer.files.length > 1) {
                this.onError.emit({
                    errorCode: 2,
                    message: 'You can upload only one file at the time'
                });
                return;
            }
            this.fileToTransfer = transfer.files[0];
            this.transferFile();
        }
    }
    @HostListener('dragover', ['$event'])
    private onDragOver(event: any): void {
        this.preventAndStop(event);
        this.isFileOver = true;
    }

    @HostListener('dragleave', ['$event'])
    private onDragLeave(event: any): any {
        this.preventAndStop(event);
        this.isFileOver = false;
    }

    @HostListener('click')
    private selectFile() {
        // from http://stackoverflow.com/a/32010791/217408
        let event = new MouseEvent('click', { bubbles: false });
        this.renderer.invokeElementMethod(this.fileInput.nativeElement, 'dispatchEvent', [event]);
    }

    private getTransfer(event: any): any {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer; // jQuery fix;
    }
    private preventAndStop(event: any): any {
        event.preventDefault();
        event.stopPropagation();
    }
    private onFileInputChange(): any {
        let files = this.fileInput.nativeElement.files;
        if (files.length) {
            this.fileToTransfer = files[0];
            this.transferFile();
        }
    }
    private transferFile(): void {
        if (!this.uploadURL) {
            this.onError.emit({
                errorCode: 3,
                message: 'Missing property [uploadURL]'
            });
            return;
        }
        this.fileUploaderService.setUploadURL(this.uploadURL);

        if (!this.fileUploaderService.verifyFile(this.fileToTransfer)) {
            this.onError.emit({
                errorCode: 1,
                message: 'This file type cannot be uploaded'
            });
            return;
        }

        this.isTransfering = true;
        this.fileUploaderService.transferFile(this.fileToTransfer)
            .then(response => {
                if (response.success && response.finished)
                    this.onComplete.emit(response.file);
                else
                    this.onError.emit({
                        errorCode: 4,
                        message: response.message
                    });

                this.isTransfering = false;
            })
            .catch ( err => {
                this.onError.emit({
                    errorCode: 4,
                    message: err
                });
                this.isTransfering = false;
            })
    }
}
