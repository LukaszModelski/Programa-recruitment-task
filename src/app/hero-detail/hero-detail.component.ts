import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';
import { CanDeactivateGuard } from '../can-deactivate-guard.service';

import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.scss' ]
})
export class HeroDetailComponent implements OnInit {
  showAlert: boolean = false;

  profileForm = new FormGroup({
    inputName: new FormControl(''),
    inputAge: new FormControl(''),
  });

  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private canDeactivateGuard: CanDeactivateGuard,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.hero.name !== this.profileForm.value.inputName || this.hero.age !== this.profileForm.value.inputAge) {
      return confirm('Your data could be lost, are you sure? (yes/no)');
    } else {
      return true;
    }
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        this.profileForm.patchValue({
          inputName: hero.name,
          inputAge: hero.age
        });
      });
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    if (!this.profileForm.value.inputAge || (this.profileForm.value.inputAge >= 18 && this.profileForm.value.inputAge <= 500)) {
      this.hero.name = this.profileForm.value.inputName;
      this.hero.age = this.profileForm.value.inputAge;

      this.heroService.updateHero(this.hero)
        .subscribe(() => {
          this.goBack();
        });
      this.showAlert = false;
    } else {
      this.showAlert = true;
    }
  }

  getHeroLvl (hero: Hero) {
    return this.heroService.getHeroLvl(hero);
  }

}
