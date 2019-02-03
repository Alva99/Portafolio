import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { GlobalService } from 'src/app/services/global.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [ProjectService]

})
export class DetailsComponent implements OnInit {
  public url: String;
  public project: Project;
  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
    
    ) {
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

  deleteProject(id){
    Swal.fire({
      title: "¿Deseas eliminar este proyecto?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar proyecto"
    }).then((result) => {
      if(result.value){
        this._projectService.deleteProject(id).subscribe(
          result => {
            if(result.status){
              this._router.navigate(['/proyectos']);
            }
          },
          error => {
            console.log(<any>error);
            
          }
    
        );
      }
    }).catch((error) =>{
      console.log(error);
    });
    // 

  }

}
