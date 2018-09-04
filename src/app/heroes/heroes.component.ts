import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { CanDeactivateGuardService } from '../can-deactivate-guard.service';

import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  showAlert: boolean = false;
  inputName: string = '';
  inputAge: number;

  profileForm = new FormGroup({
    inputName: new FormControl(''),
    inputAge: new FormControl(''),
  });

  constructor(private heroService: HeroService, private canDeactivateGuard: CanDeactivateGuardService) { }

  ngOnInit() {
    this.getHeroes();
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.profileForm.value.inputName || this.profileForm.value.inputAge) {
      return confirm('Your data could be lost, are you sure? (yes/no)');
    } else {
      return true;
    }
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(): void {
    let name = this.profileForm.value.inputName;
    const age = this.profileForm.value.inputAge;
    name = name.trim();
    if (!name) { return; }
    if (age && (age < 18 || age > 500)) {
      this.showAlert = true;
      return;
    } else {
      this.showAlert = false;
      this.profileForm.patchValue({
        inputName: ' ',
        inputAge: undefined
      });
    }
    this.heroService.addHero({ name, age } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  getHeroLvl (hero: Hero) {
    return this.heroService.getHeroLvl(hero);
  }

}
