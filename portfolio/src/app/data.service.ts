import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import skillProjectMap from '../assets/skillProjectMap.json';
import projects from '../assets/projects.json'
import { Project } from './project';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  skills: any = [];

  projects: Project[] = [];

  skillSubject: Subject<any> = new Subject<any>();

  filterOption: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
    this.getSkills();
    this.getInnerJoinedData();
  }

  async getInnerJoinedData() {
    // Assuming you've put your JSON files in the "assets" directory.
    const projectsResponse = projects;
    const skillProjectMapResponse = skillProjectMap;

    let joinedData: Project[] = [];

    for (let project of projectsResponse) {
      const relatedSkills = skillProjectMapResponse.filter((sp: any) => sp.projectID === project.projectID);
      if (relatedSkills.length) {
        joinedData.push({ ...project, skills: relatedSkills.map((sp: any) => sp.skill) });
      }
    }

    this.projects = joinedData;
  }

  async getSkills() {
    // Assuming you've put your JSON files in the "assets" directory.
    //get skill data
    const skills = [...new Set(skillProjectMap.map((skill: any) => {
      return skill.skill;
    }))];
    
    this.skills = skills;
  }
}
