import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { GlobalService } from 'src/app/services/global.service';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['../create/create.component.css'],
  providers: [ProjectService,UploadService]
})
export class EditComponent implements OnInit {
  public title: String;
  public project: Project;
  public status: String;
  public uploadFile: Array<File>;
  public saveProject;
  public _id;
  public nameProject: String;
  public url: String;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.title = "Editar proyecto";    
    this.url = GlobalService.url;
  }
  ngOnInit() {
    this._route.params.subscribe(params =>{
      let id = params.id;
      this.getProjectId(id);
    });
  }


  getProjectId(id){
    this._projectService.getProject(id).subscribe(
      result => {
        this.project = result.message;
      },error => {
        console.log(<any>error);
        
      });
  }

  onSubmit(form){
    this._projectService.updateProject(this.project).subscribe(
      result => {
        if(result.message){
        
          if(this.uploadFile){
            this._uploadService.makeFile(GlobalService.url+"uploadImag/"+result.message._id,[],this.uploadFile,'img')
            .then((response: any) => {
              this._id = result.message._id;
              this.nameProject = form.form.value.name;
              this._router.navigate(['details/'+this._id])
            })
            .catch((error) => {
              this.status = 'failed';
            });
          }else{
              this._id = result.message._id;
              this.nameProject = form.form.value.name;
              this._router.navigate(['details/'+this._id])
          }

        }else{
          this.status = 'failed';   
        }
      },
      error => {
        
        this.status = 'failed';
      });
  }
  uploadImag(file: any){
    this.uploadFile = <Array<File>>file.target.files;

  }

}
