import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [ProjectService]
})
export class ProjectComponent implements OnInit {
  public projects: Project[];
  public url: String;
  constructor(private _projectService: ProjectService) { 
    this.url = GlobalService.url;
  }

  ngOnInit() {
    this.getProjects();
  }

  getProjects(){
    this._projectService.getProjects().subscribe(
      ressult => {
        if(ressult.message){
          this.projects = ressult.message;
        } 
      },
      error => {
        console.log(<any>error);
        
      }
    )
  }

}
