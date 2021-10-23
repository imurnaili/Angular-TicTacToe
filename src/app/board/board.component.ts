import { Component, OnInit } from '@angular/core';
import { BoardPosition } from '../interfaces/board.position';
import { TicTacToeService } from '../services/tic-tac-toe.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  state: BoardPosition = [
    null, null, null,
    null, null, null,
    null, null, null
  ];

  constructor(private ticTacToeService: TicTacToeService) { }

  ngOnInit(): void {
    this.ticTacToeService.getState()
      .subscribe(newState => this.state = newState);

  }

  select(i: number){
    if (!this.state[i])
      this.ticTacToeService.select(i);
  }

}
