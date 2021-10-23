import { Component, OnInit } from '@angular/core';
import { CellState } from '../interfaces/cell.state';
import { TicTacToeService } from '../services/tic-tac-toe.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  history = this.ticTacToeService.history;
  selected= 1;
  isNext = 'O';
  winner: CellState = null;


  constructor(private ticTacToeService: TicTacToeService) { }

  ngOnInit(): void {
    this.subscibeToStuff()
  }

  select(i: number){
    this.ticTacToeService.goBackTo(i);
  }

  subscibeToStuff(){
    this.ticTacToeService.getStepNumber()
      .subscribe(stepNuber => this.selected = stepNuber);

    this.ticTacToeService.getWinner()
      .subscribe(winner => this.winner = winner);

    this.ticTacToeService.getXIsNext()
      .subscribe(xIsNext => this.isNext = xIsNext ? 'X' : 'O');
  }

}
