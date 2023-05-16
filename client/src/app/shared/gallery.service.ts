import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Gallery } from '../model/gallery.model';
import { Task } from '../model/task.model';
import { environment } from 'src/environments/environment';
import { AngularFireUploadTask } from '@angular/fire/compat/storage/task';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  
  export class GalleryService {
    baseUri:string = environment.apiBaseUrl;
    public filesArray:any=[]
   
    percentage: Observable<any>;
    snapshot: Observable<any>;
    downloadURL: string;
    task: AngularFireUploadTask;
    constructor(private http: HttpClient,
      private storage: AngularFireStorage,
      private db: AngularFirestore ){

    }
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        return throwError(
          'Something bad happened; please try again later.');
      }
    getGalleryById(id: string): Observable<any> {
        const url = `${this.baseUri}/gallery/getFileById/${id}`;
        return this.http.get<Gallery>(url).pipe(
          catchError(this.handleError)
        );
      }
    
      addGallery(gallery:Gallery , file: File): Observable<any> {
     const url = `${this.baseUri}/gallery/add-gallery`;
        var arr:any = []
        let path :any
       let firebaseArr:any = []
        const formData = new FormData();
        arr.push(file);
        if(arr.length>0){
          arr[0].forEach((item:any, i:any) => {
            path = `test/${arr[0][i].name}`;
            const ref = this.storage.ref(path);
            this.task = this.storage.upload(path, arr[0][i]);
            firebaseArr.push(`test/${arr[0][i].name}`)
           this.snapshot   = this.task.snapshotChanges().pipe(
         tap(console.log),
      // The file's download URL
         finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        this.db.collection('files').add( { downloadURL: this.downloadURL, path });
      }),
    );
            formData.append('avatar', arr[0][i]);
             formData.append('fireBaseUrl',firebaseArr[i])
          })
   }
   else{
          formData.append('avatar', arr);
        }
        formData.append('work', gallery.work);
        formData.append('siteName', gallery.siteName);
        formData.append('location', gallery.location);
        const header = new HttpHeaders();
        const params = new HttpParams();
    
        const options = {
          params,
          reportProgress: true,
          headers: header
        };
        const req = new HttpRequest('POST', url,formData,options
        );
        return this.http.request(req);
      }

      getGallery() {
        return this.http.get(`${this.baseUri}/gallery/get-gallery`);
      }

      deleteFile(id:any): Observable<any> {
        const header = new HttpHeaders();
        let url = `${this.baseUri}/gallery/delete-gallery/${id}`;
        return this.http.delete(url, { headers: header }).pipe(
          catchError(this.handleError)
        )
      }

      addTask(task:any , labourArray:any, file: File): Observable<any> {
        const url = `${this.baseUri}/task/add-task`;
        var arr:any = []
        let path :any
        let firebaseArr:any = []
        arr.push(file);
        if(arr.length>0){
          arr[0].forEach((item:any, i:any) => {
            path = `task/${arr[0][i].name}`;
            const ref = this.storage.ref(path);
            this.task = this.storage.upload(path, arr[0][i]);
            firebaseArr.push(`task/${arr[0][i].name}`)
          })
        }
        
        let obj = {
          totalLabour :  task.totalLabour,
          labourArray :JSON.stringify(labourArray),
          taskName : task.taskName,
          siteName:task.siteName,
          location: task.location,
          startDate:task.startDate,
          endDate:task.endDate,
          progressStatus: task.progressStatus,
          avatar: firebaseArr
        }
        return this.http.post(url, obj)
        .pipe(
          catchError(this.errorMgmt)
        )
      }

      updateTask(task:any ,id:any): Observable<any> {
        console.log("task",task)
       
        const url = `${this.baseUri}/task/update-task/${id}`;
        let obj = {
          totalLabour :  task.totalLabour,
          laboursArray :JSON.stringify(task.laboursArray),
          taskName : task.taskName,
          siteName:task.siteName,
          location: task.location,
          startDate:task.startDate,
          endDate:task.endDate,
          progressStatus: task.progressStatus,
          avatar: task.avatar
        }
        return this.http.put(url, obj, { headers: this.headers }).pipe(
          catchError(this.errorMgmt)
        )
      }
      getTask() {
        return this.http.get(`${this.baseUri}/task/get-task`);
      }

      deleteTask(id:any): Observable<any> {
        const header = new HttpHeaders();
        let url = `${this.baseUri}/task/delete-task/${id}`;
        return this.http.delete(url, { headers: header }).pipe(
          catchError(this.handleError)
        )
      }

      getTaskById(id: string): Observable<any> {
        const url = `${this.baseUri}/task/getTaskById/${id}`;
        return this.http.get<Gallery>(url).pipe(
          catchError(this.handleError)
        );
      }

      getGalleryByQuery(data:any): Observable<any> {
        let parameters = {"siteName":data.siteName, "location":data.location};
        let queryParams = new HttpParams({ fromObject: parameters });
        let url = `${this.baseUri}/gallery/getfileByQuery`;
        return this.http.get(url, {headers: this.headers,params:queryParams}).pipe(
          map((res:any) => {
            return res;
          }),
          catchError(this.handleError)
        )
      }
      errorMgmt(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
      }

      createGallery(data:any, file: File): Observable<any> {
        let url = `${this.baseUri}/gallery/add-gallery-mid`;
        var arr:any = []
        let path :any
        let firebaseArr:any = []
        arr.push(file);
        if(arr.length>0){
          arr[0].forEach((item:any, i:any) => {
            path = `gallery/${arr[0][i].name}`;
            const ref = this.storage.ref(path);
            this.task = this.storage.upload(path, arr[0][i]);
            firebaseArr.push(`gallery/${arr[0][i].name}`)
          })
        }
        let obj = {
          siteName:data.siteName,
          location:data.location,
          firebaseArr:firebaseArr
        }
        console.log("firebase",firebaseArr)
         return this.http.post(url, obj)
          .pipe(
            catchError(this.errorMgmt)
          )
      }

      createDrawing(data:any, file: File): Observable<any> {
        let url = `${this.baseUri}/drawing/add-drawing`;
        let path :any
        console.log("firebase",data,file)
           path = `drawing/${file.name}`;
            const ref = this.storage.ref(path);
            this.task = this.storage.upload(path, file);
         let obj = {
         fileName:data.name,
          drawingPath: path
        }
        console.log("bbbbbbbb", obj)
         return this.http.post(url, obj)
          .pipe(
            catchError(this.errorMgmt)
          )
      }

      getDrawing() {
        return this.http.get(`${this.baseUri}/drawing/get-drawing`);
      }

      getdrawingId(id: string): Observable<any> {
        const url = `${this.baseUri}/drawing/get-drawing/${id}`;
        return this.http.get<Gallery>(url).pipe(
          catchError(this.handleError)
        );
      }

      deleteDrawing(id:any): Observable<any> {
        const header = new HttpHeaders();
        let url = `${this.baseUri}/drawing/delete-drawing/${id}`;
        return this.http.delete(url, { headers: header }).pipe(
          catchError(this.handleError)
        )
      }
  }