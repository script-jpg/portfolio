import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {Observable, Subject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {NgFor, AsyncPipe} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {DataService} from '../data.service';
import {MatRadioModule} from '@angular/material/radio';
import { NgModel } from '@angular/forms';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  SkillCtrl = new FormControl('');
  filteredSkills: Observable<string[]>;
  Skills: any[] = [];
  allSkills: string[] = this.dataService.skills;

  @ViewChild('SkillInput')
  SkillInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor(private dataService: DataService) {
    this.filteredSkills = this.SkillCtrl.valueChanges.pipe(
      startWith(null),
      map((Skill: string | null) => (Skill ? this._filter(Skill) : this.allSkills.slice())),
    );
    
  }

  radioChange(event: any): void {
    console.log(event.value);
    this.dataService.filterOption.next(event.value);
    this.dataService.skillSubject.next(this.Skills);
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our Skill
    if (value) {
      this.Skills.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.SkillCtrl.setValue(null);
  }

  remove(Skill: string): void {
    const index = this.Skills.indexOf(Skill);

    if (index >= 0) {
      this.Skills.splice(index, 1);

      this.announcer.announce(`Removed ${Skill}`);
    }
    this.dataService.skillSubject.next(this.Skills);  
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.Skills.push(event.option.viewValue);
    this.SkillInput.nativeElement.value = '';
    this.SkillCtrl.setValue(null);
    this.dataService.skillSubject.next(this.Skills);
    console.log("Skills: ", this.Skills);

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter(Skill => Skill.toLowerCase().includes(filterValue));
  }
}
