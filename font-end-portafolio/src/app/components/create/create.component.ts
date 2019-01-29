import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { GlobalService } from 'src/app/services/global.service';

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
    // console.log(this.uploadFile);

    this._projectService.saveProject(this.project).subscribe(
      resp => {
        if(resp.message == 'true'){
        
          this._uploadService.makeFile(GlobalService.url+"uploadImag/"+resp.values._id,[],this.uploadFile,'img')
          .then((result: any) => {
            console.log(result);
            this.status = 'success';
            form.reset();
          })
          .catch((error) => {
            console.log(error);
            
          });

        }else{
          this.status = 'failed';   
          form.reset();
        }
      },
      error =>{
        this.status = 'failed ';
        console.log(error);
        
      }
    );
    
  
  }

  uploadImag(file: any){
    this.uploadFile = <Array<File>>file.target.files;

  }

}
