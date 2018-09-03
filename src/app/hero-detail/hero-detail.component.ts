import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
  initName: string;
  initAge: number;
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
    if (this.hero.name !== this.initName || this.hero.age !== this.initAge) {
      return confirm('Your data could be lost, are you sure? (yes/no)');
    } else {
      return true;
    }
  }

  setInitValues (): void {
    this.initName = this.hero.name;
    this.initAge = this.hero.age;
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        this.setInitValues();
      });
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    if (!this.hero.age || (this.hero.age >= 18 && this.hero.age <= 500)) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => {
          this.setInitValues();
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
