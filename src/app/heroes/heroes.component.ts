import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  showAlert: boolean = false;
  inputName: string = '';
  inputAge: number;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string, age: number): void {
    name = name.trim();
    if (!name) { return; }
    if (age && (age < 18 || age > 500)) {
      this.showAlert = true;
      return;
    } else {
      this.showAlert = false;
      this.inputName = '';
      this.inputAge = undefined;
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

}
