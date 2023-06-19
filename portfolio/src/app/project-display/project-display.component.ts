import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { Project } from '../project';

@Component({
  selector: 'app-project-display',
  templateUrl: './project-display.component.html',
  styleUrls: ['./project-display.component.scss']
})
export class ProjectDisplayComponent implements OnInit {
  projects: Project[] = [];

  value: string = 'none';

  constructor(private dataService: DataService) { 
    this.dataService.skillSubject.subscribe((skills: string[]) => {
      this.projects = this.dataService.projects.filter((project: Project) => {
        if (this.value === 'every') {
          return project.skills.every((skill: string) => {
            return skills.includes(skill);
          });
        } else if (this.value === 'some') {
          return project.skills.some((skill: string) => {
            return skills.includes(skill);
          });
        } else {
          return true;
        }
      });
    });
    this.dataService.filterOption.subscribe((option: string) => {
      console.log("option: " + option)
      this.value = option;
    });

    this.dataService.skillSubject.next([]);
  }

  ngOnInit(): void {

  }

}
