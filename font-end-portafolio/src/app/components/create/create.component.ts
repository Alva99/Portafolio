import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { GlobalService } from 'src/app/services/global.service';
declare var $: any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService,UploadService]
})
export class CreateComponent implements OnInit {
  public title: String;
  public project: Project;
  public status: String;
  public uploadFile: Array<File>;
  public saveProject;
  public _id;
  public nameProject: String;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) { 
    this.title = "Crear proyecto";
    this.project = new Project('','','','',2019,'','');
    
  }

  ngOnInit() {
  }

  onSubmit(form){
   
   
    this._projectService.saveProject(this.project).subscribe(
      resp => {
        if(resp.message == 'true'){
        
          if(this.uploadFile){
            this._uploadService.makeFile(GlobalService.url+"uploadImag/"+resp.value._id,[],this.uploadFile,'img')
            .then((result: any) => {
              this._id = resp.value._id;
              this.nameProject = form.form.value.name;
              this.status = 'success';
              this.scrollAuto();
              form.reset();
            })
            .catch((error) => {
              console.log(error);
              this.scrollAuto();
            });
          }else{
            this.scrollAuto();
          }

        }else{
          this.status = 'failed';   
          this.scrollAuto();
        }
      },
      error =>{
        this.status = 'failed ';
        this.scrollAuto();
        
      }
    );
    
  
  }

  uploadImag(file: any){
    this.uploadFile = <Array<File>>file.target.files;
  }
  
  scrollAuto(){
      $( 'html, body').animate({
          scrollTop: 0    
      },100);
      return false;
  }

}
