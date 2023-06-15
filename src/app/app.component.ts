import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  newMemberName: string = '';
  numberOfTeams: string = '';
  members: string[] = [];
  errorMessage: string = '';
  teams: Map<number, string[]> = new Map();

  onInputMember(member: string) {
    this.newMemberName = member;
    this.errorMessage = '';
  }

  onInputTeam(teamCount: string) {
    this.numberOfTeams = teamCount;
    this.errorMessage = '';
  }

  addMember() {
    if (!this.newMemberName) {
      this.errorMessage = 'Cant add empty name';
      return;
    }

    this.members.push(this.newMemberName);
    this.newMemberName = '';
  }

  private getRandomNumber(min: number = 0, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  private handleGenerateTeamErrors() {
    if (this.members.length === 0) {
      this.errorMessage = 'Please add members';
      return false;
    }
    if (!this.numberOfTeams) {
      this.errorMessage = 'Please enter number of teams';
      return false;
    }
    if (this.members.length < parseInt(this.numberOfTeams)) {
      this.errorMessage = "Teams can't be greater than members";
      return false;
    }
    return true;
  }

  private reset() {
    this.members = [];
    this.numberOfTeams = '';
    this.newMemberName = '';
  }

  generateTeam() {
    if (!this.handleGenerateTeamErrors()) return;

    const totalTeams = parseInt(this.numberOfTeams);

    [...Array(totalTeams).keys()].forEach((team) => {
      this.teams.set(team, []);
    });

    const listOfMembers = structuredClone(this.members);
    let currentTeam = 0;

    console.log(listOfMembers.length);

    while (listOfMembers.length > 0) {
      if (currentTeam > totalTeams - 1) {
        currentTeam = 0;
      }
      const randomPosition = this.getRandomNumber(0, listOfMembers.length - 1);
      console.log(randomPosition, listOfMembers[randomPosition], listOfMembers);

      const members = this.teams.get(currentTeam) ?? [];
      members.push(listOfMembers[randomPosition]);
      this.teams.set(currentTeam, members);

      listOfMembers.splice(randomPosition, 1);

      currentTeam++;
    }

    this.reset();

    console.log(this.teams);
  }
}
